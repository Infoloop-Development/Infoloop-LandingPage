type TranscriptTurn = {
  role: "user" | "assistant" | "system" | "agent";
  message: string;
  timestamp: string;
  agentName?: string;
  agentUserId?: string;
};

type TicketPayload = {
  projectName: string;
  visitorName: string;
  visitorEmail: string;
  visitorMobile: string;
  chatSummary: string;
  estimate: {
    hourlyTotal: number;
    milestoneTotal: number;
    months: number;
    stack: string;
    features: { key: string; name: string; description?: string }[];
  };
  transcript: TranscriptTurn[];
};

export type ResumeTicketSummary = {
  id: string | number;
  ticketId: string;
  projectName: string;
  status: string;
  createdAt?: string;
  visitorName?: string;
};

export type ResumeTicketDetail = ResumeTicketSummary & {
  visitorEmail: string;
  visitorMobile: string;
  chatSummary: string;
  estimate: TicketPayload["estimate"];
  transcript: TranscriptTurn[];
};

function payloadConfig() {
  const base = (import.meta.env.PAYLOAD_URL as string | undefined)?.replace(/\/$/, "");
  const token = import.meta.env.PAYLOAD_TOKEN as string | undefined;
  if (!base || !token) return null;
  return { base, token };
}

function authHeaders(token: string) {
  return {
    Authorization: `users API-Key ${token}`,
    "Content-Type": "application/json",
  };
}

/** Digits-only mobile for fuzzy match across formatting. */
export function normalizeMobile(mobile: string): string {
  return mobile.replace(/\D/g, "");
}

function mobilesMatch(a: string, b: string): boolean {
  const na = normalizeMobile(a);
  const nb = normalizeMobile(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  // Allow match when one has country code suffix of the other (last 10 digits)
  const tail = (s: string) => (s.length > 10 ? s.slice(-10) : s);
  return tail(na) === tail(nb);
}

/**
 * Create a Sales Inquiry Ticket in Payload after an estimate.
 */
export async function createSalesInquiryTicket(
  ticket: TicketPayload,
): Promise<{ ok: boolean; ticketId?: string; ticketDocId?: string | number; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) {
    console.warn("[chat-ticket] PAYLOAD_URL or PAYLOAD_TOKEN missing; ticket not created");
    return { ok: false, error: "CMS not configured for tickets" };
  }

  try {
    const res = await fetch(`${cfg.base}/api/sales-inquiry-tickets`, {
      method: "POST",
      headers: authHeaders(cfg.token),
      body: JSON.stringify({
        projectName: ticket.projectName,
        visitorName: ticket.visitorName,
        visitorEmail: ticket.visitorEmail,
        visitorMobile: ticket.visitorMobile,
        chatSummary: ticket.chatSummary,
        estimate: ticket.estimate,
        transcript: ticket.transcript,
        status: "Received",
        handoffStatus: "none",
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => ({}))) as {
      doc?: { ticketId?: string; id?: string | number };
      errors?: unknown;
      message?: string;
    };
    if (!res.ok) {
      const detail = typeof data.message === "string" ? data.message : JSON.stringify(data.errors ?? data);
      console.error("[chat-ticket] Payload error", res.status, detail);
      return { ok: false, error: `Payload ${res.status}: ${detail}` };
    }
    return { ok: true, ticketId: data.doc?.ticketId, ticketDocId: data.doc?.id };
  } catch (err) {
    console.error("[chat-ticket] failed", err);
    return { ok: false, error: "Ticket create failed" };
  }
}

/** Update estimate + append turns on an existing ticket (resume / re-quote). */
export async function updateTicketEstimate(
  docId: string | number,
  patch: {
    projectName: string;
    chatSummary: string;
    estimate: TicketPayload["estimate"];
    appendTurns: TranscriptTurn[];
  },
): Promise<{ ok: boolean; ticketId?: string; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, error: "CMS not configured" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(12000),
    });
    const doc = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc;
    if (!getRes.ok || !doc.id) return { ok: false, error: "Ticket not found" };

    const existing = Array.isArray(doc.transcript) ? doc.transcript : [];
    const merged = [...existing, ...patch.appendTurns].slice(-120);

    const patchRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}`, {
      method: "PATCH",
      headers: authHeaders(cfg.token),
      body: JSON.stringify({
        projectName: patch.projectName,
        chatSummary: patch.chatSummary,
        estimate: patch.estimate,
        transcript: merged,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!patchRes.ok) {
      const err = await patchRes.json().catch(() => ({}));
      console.error("[chat-ticket] update estimate failed", err);
      return { ok: false, error: "Update failed" };
    }
    return { ok: true, ticketId: doc.ticketId || String(doc.id) };
  } catch (err) {
    console.error("[chat-ticket] update estimate failed", err);
    return { ok: false, error: "Update failed" };
  }
}

type PayloadTicketDoc = {
  id: string | number;
  ticketId?: string;
  projectName?: string;
  status?: string;
  createdAt?: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorMobile?: string;
  chatSummary?: string;
  estimate?: TicketPayload["estimate"];
  transcript?: TranscriptTurn[];
  notes?: { body?: string; author?: string; at?: string }[];
  statusHistory?: { status?: string; reason?: string; changedAt?: string; changedBy?: string }[];
  resumeCount?: number;
  lastVisitorReturnAt?: string;
  handoffStatus?: string;
  handoffRequestedAt?: string;
  handoffJoinedAt?: string;
  handoffAgentName?: string;
  handoffAgentPhoto?: string;
};

export type HandoffPoll = {
  handoffStatus: string;
  handoffAgentName?: string;
  handoffAgentPhoto?: string;
  handoffJoinedAt?: string;
  transcript: TranscriptTurn[];
};

/** Find tickets for resume by email (required) + optional name filter. */
export async function lookupTicketsForResume(
  email: string,
  name?: string,
): Promise<{ ok: boolean; tickets: ResumeTicketSummary[]; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, tickets: [], error: "CMS not configured" };

  const emailNorm = email.trim().toLowerCase();
  const nameNorm = (name || "").trim().toLowerCase();
  try {
    const qs = new URLSearchParams({
      limit: "50",
      sort: "-createdAt",
      depth: "0",
      "where[visitorEmail][equals]": emailNorm,
    });
    // Also try original casing if different
    const res = await fetch(`${cfg.base}/api/sales-inquiry-tickets?${qs}`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(15000),
    });
    let data = (await res.json().catch(() => ({}))) as { docs?: PayloadTicketDoc[]; message?: string };
    if (!res.ok) {
      // Retry without lowercasing in case stored mixed-case
      const qs2 = new URLSearchParams({
        limit: "50",
        sort: "-createdAt",
        depth: "0",
        "where[visitorEmail][equals]": email.trim(),
      });
      const res2 = await fetch(`${cfg.base}/api/sales-inquiry-tickets?${qs2}`, {
        headers: authHeaders(cfg.token),
        signal: AbortSignal.timeout(15000),
      });
      data = (await res2.json().catch(() => ({}))) as { docs?: PayloadTicketDoc[]; message?: string };
      if (!res2.ok) {
        return { ok: false, tickets: [], error: data.message || "Lookup failed" };
      }
    }

    const docs = Array.isArray(data.docs) ? data.docs : [];
    // If exact match returned nothing (case / formatting), broaden with contains then filter locally
    let candidates = docs;
    if (!candidates.length) {
      const qsLoose = new URLSearchParams({
        limit: "50",
        sort: "-createdAt",
        depth: "0",
        "where[visitorEmail][contains]": emailNorm.split("@")[0] || emailNorm,
      });
      const resLoose = await fetch(`${cfg.base}/api/sales-inquiry-tickets?${qsLoose}`, {
        headers: authHeaders(cfg.token),
        signal: AbortSignal.timeout(15000),
      });
      const looseData = (await resLoose.json().catch(() => ({}))) as { docs?: PayloadTicketDoc[] };
      if (resLoose.ok && Array.isArray(looseData.docs)) candidates = looseData.docs;
    }

    const matched = candidates.filter((d) => {
      if (typeof d.visitorEmail !== "string" || d.visitorEmail.trim().toLowerCase() !== emailNorm) {
        return false;
      }
      if (!nameNorm) return true;
      const stored = typeof d.visitorName === "string" ? d.visitorName.trim().toLowerCase() : "";
      if (!stored) return false;
      return stored === nameNorm || stored.includes(nameNorm) || nameNorm.includes(stored);
    });

    return {
      ok: true,
      tickets: matched.map((d) => ({
        id: d.id,
        ticketId: d.ticketId || String(d.id),
        projectName: d.projectName || "Untitled project",
        status: d.status || "Received",
        createdAt: d.createdAt,
        visitorName: d.visitorName,
      })),
    };
  } catch (err) {
    console.error("[chat-ticket] lookup failed", err);
    return { ok: false, tickets: [], error: "Lookup failed" };
  }
}

/** Mark visitor return and return full ticket for chat restore. */
export async function resumeTicketSession(
  docId: string | number,
  projectName: string,
): Promise<{ ok: boolean; ticket?: ResumeTicketDetail; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, error: "CMS not configured" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(15000),
    });
    const getData = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc & { message?: string };
    if (!getRes.ok || !getData.id) {
      return { ok: false, error: getData.message || "Ticket not found" };
    }

    const now = new Date().toISOString();
    const prevStatus = getData.status || "Received";
    const nextStatus = prevStatus === "Received" ? "Open" : prevStatus;
    const history = Array.isArray(getData.statusHistory) ? [...getData.statusHistory] : [];
    history.push({
      status: nextStatus,
      reason: `Visitor returned via Ivy and resumed “${projectName || getData.projectName}”. New chat session started (see chat history divider).`,
      changedAt: now,
      changedBy: "ivy-chatbot",
    });

    const notes = Array.isArray(getData.notes) ? [...getData.notes] : [];
    notes.push({
      body: `Return visit via Ivy — resumed project “${getData.projectName}”. Messages below the return divider in Chat History are the new session.`,
      author: "ivy-chatbot",
      at: now,
    });

    const transcript = Array.isArray(getData.transcript) ? [...getData.transcript] : [];
    transcript.push({
      role: "system",
      message: `—— Return visit · ${new Date(now).toLocaleString()} ——`,
      timestamp: now,
    });

    const patchBody: Record<string, unknown> = {
      notes,
      statusHistory: history,
      transcript,
      lastVisitorReturnAt: now,
      resumeCount: (typeof getData.resumeCount === "number" ? getData.resumeCount : 0) + 1,
    };
    if (nextStatus !== prevStatus) {
      patchBody.status = nextStatus;
    }

    const patchRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}`, {
      method: "PATCH",
      headers: authHeaders(cfg.token),
      body: JSON.stringify(patchBody),
      signal: AbortSignal.timeout(15000),
    });
    const patchData = (await patchRes.json().catch(() => ({}))) as { doc?: PayloadTicketDoc; message?: string };
    if (!patchRes.ok) {
      console.error("[chat-ticket] resume patch failed", patchRes.status, patchData.message);
      // Still return the ticket we fetched so chat can continue even if patch fails
    }

    const doc = patchData.doc || getData;
    const est = doc.estimate;
    if (!est || typeof est.hourlyTotal !== "number") {
      return { ok: false, error: "Ticket has no estimate to restore" };
    }

    return {
      ok: true,
      ticket: {
        id: doc.id,
        ticketId: doc.ticketId || String(doc.id),
        projectName: doc.projectName || "Untitled project",
        status: doc.status || nextStatus,
        createdAt: doc.createdAt,
        visitorName: doc.visitorName,
        visitorEmail: doc.visitorEmail || "",
        visitorMobile: doc.visitorMobile || "",
        chatSummary: doc.chatSummary || "",
        estimate: {
          hourlyTotal: est.hourlyTotal,
          milestoneTotal: est.milestoneTotal,
          months: est.months,
          stack: est.stack || "",
          features: Array.isArray(est.features) ? est.features : [],
        },
        transcript: Array.isArray(doc.transcript) ? doc.transcript : transcript,
      },
    };
  } catch (err) {
    console.error("[chat-ticket] resume failed", err);
    return { ok: false, error: "Resume failed" };
  }
}

/** Append transcript turns to an existing ticket (return-visit updates). */
export async function appendTicketTranscript(
  docId: string | number,
  turns: TranscriptTurn[],
): Promise<{ ok: boolean; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg || !turns.length) return { ok: false, error: "Nothing to append" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(12000),
    });
    const doc = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc;
    if (!getRes.ok || !doc.id) return { ok: false, error: "Ticket not found" };

    const existing = Array.isArray(doc.transcript) ? doc.transcript : [];
    const merged = [...existing, ...turns].slice(-120);

    const patchRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}`, {
      method: "PATCH",
      headers: authHeaders(cfg.token),
      body: JSON.stringify({ transcript: merged }),
      signal: AbortSignal.timeout(12000),
    });
    if (!patchRes.ok) {
      const err = await patchRes.json().catch(() => ({}));
      console.error("[chat-ticket] append transcript failed", err);
      return { ok: false, error: "Append failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[chat-ticket] append failed", err);
    return { ok: false, error: "Append failed" };
  }
}

/** Visitor requests live sales handoff on an existing ticket. */
export async function requestHandoff(
  docId: string | number,
): Promise<{ ok: boolean; transcriptCount?: number; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, error: "CMS not configured" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(12000),
    });
    const doc = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc;
    if (!getRes.ok || !doc.id) return { ok: false, error: "Ticket not found" };

    const existing = Array.isArray(doc.transcript) ? doc.transcript : [];

    // Already waiting — don't spam dividers; client polls from current length
    if (doc.handoffStatus === "requested") {
      return { ok: true, transcriptCount: existing.length };
    }

    const now = new Date().toISOString();
    const transcript = [...existing];
    transcript.push({
      role: "system",
      message: `—— Visitor requested live sales chat · ${new Date(now).toLocaleString()} ——`,
      timestamp: now,
    });

    const notes = Array.isArray(doc.notes) ? [...doc.notes] : [];
    notes.push({
      body: "Visitor asked to connect with a sales executive via Ivy. Ticket is waiting — open Chat History and click Start chat.",
      author: "ivy-chatbot",
      at: now,
    });

    // Fresh waiting session (also clears a previous live agent so reconnect is clean)
    const patchRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}`, {
      method: "PATCH",
      headers: authHeaders(cfg.token),
      body: JSON.stringify({
        handoffStatus: "requested",
        handoffRequestedAt: now,
        handoffJoinedAt: null,
        handoffAgent: null,
        handoffAgentName: null,
        handoffAgentPhoto: null,
        transcript,
        notes,
        status: doc.status === "Received" ? "Open" : doc.status,
        ...(doc.status === "Received"
          ? {
              statusHistory: [
                ...(Array.isArray(doc.statusHistory) ? doc.statusHistory : []),
                {
                  status: "Open",
                  reason: "Visitor requested live sales handoff via Ivy",
                  changedAt: now,
                  changedBy: "ivy-chatbot",
                },
              ],
            }
          : {}),
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!patchRes.ok) {
      const err = await patchRes.json().catch(() => ({}));
      console.error("[chat-ticket] handoff request failed", err);
      return { ok: false, error: "Could not request handoff" };
    }
    return { ok: true, transcriptCount: transcript.length };
  } catch (err) {
    console.error("[chat-ticket] handoff request failed", err);
    return { ok: false, error: "Could not request handoff" };
  }
}

/** Visitor left / closed chat — clear Live / Waiting on the ticket. */
export async function endHandoff(
  docId: string | number,
  reason: "visitor_closed" | "visitor_left" = "visitor_closed",
): Promise<{ ok: boolean; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, error: "CMS not configured" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(10000),
    });
    const doc = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc;
    if (!getRes.ok || !doc.id) return { ok: false, error: "Ticket not found" };

    const status = doc.handoffStatus || "none";
    if (status !== "requested" && status !== "active") {
      return { ok: true };
    }

    const now = new Date().toISOString();
    const transcript = Array.isArray(doc.transcript) ? [...doc.transcript] : [];
    transcript.push({
      role: "system",
      message:
        reason === "visitor_left"
          ? `—— Visitor left the chat · ${new Date(now).toLocaleString()} ——`
          : `—— Visitor closed the chat · ${new Date(now).toLocaleString()} ——`,
      timestamp: now,
    });

    const notes = Array.isArray(doc.notes) ? [...doc.notes] : [];
    notes.push({
      body:
        status === "active"
          ? "Visitor closed the site chat while live with an agent. Live status cleared."
          : "Visitor closed the site chat while waiting for an agent. Waiting status cleared.",
      author: "ivy-chatbot",
      at: now,
    });

    const patchRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}`, {
      method: "PATCH",
      headers: authHeaders(cfg.token),
      body: JSON.stringify({
        handoffStatus: "ended",
        transcript,
        notes,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!patchRes.ok) {
      const err = await patchRes.json().catch(() => ({}));
      console.error("[chat-ticket] end handoff failed", err);
      return { ok: false, error: "Could not end handoff" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[chat-ticket] end handoff failed", err);
    return { ok: false, error: "Could not end handoff" };
  }
}

/** Poll handoff state + latest transcript for the site chat. */
export async function pollHandoff(
  docId: string | number,
): Promise<{ ok: boolean; data?: HandoffPoll; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, error: "CMS not configured" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(10000),
    });
    const doc = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc;
    if (!getRes.ok || !doc.id) return { ok: false, error: "Ticket not found" };

    return {
      ok: true,
      data: {
        handoffStatus: doc.handoffStatus || "none",
        handoffAgentName: doc.handoffAgentName,
        handoffAgentPhoto: doc.handoffAgentPhoto,
        handoffJoinedAt: doc.handoffJoinedAt,
        transcript: Array.isArray(doc.transcript) ? doc.transcript : [],
      },
    };
  } catch (err) {
    console.error("[chat-ticket] handoff poll failed", err);
    return { ok: false, error: "Poll failed" };
  }
}

/** Visitor message during live handoff (no AI). */
export async function appendVisitorHandoffMessage(
  docId: string | number,
  message: string,
): Promise<{ ok: boolean; data?: HandoffPoll; error?: string }> {
  const cfg = payloadConfig();
  if (!cfg) return { ok: false, error: "CMS not configured" };

  try {
    const getRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}?depth=0`, {
      headers: authHeaders(cfg.token),
      signal: AbortSignal.timeout(12000),
    });
    const doc = (await getRes.json().catch(() => ({}))) as PayloadTicketDoc;
    if (!getRes.ok || !doc.id) return { ok: false, error: "Ticket not found" };

    const status = doc.handoffStatus || "none";
    if (status !== "requested" && status !== "active") {
      return { ok: false, error: "Live chat is not active" };
    }

    const now = new Date().toISOString();
    const transcript = Array.isArray(doc.transcript) ? [...doc.transcript] : [];
    transcript.push({
      role: "user",
      message: message.slice(0, 800),
      timestamp: now,
    });

    const patchRes = await fetch(`${cfg.base}/api/sales-inquiry-tickets/${docId}`, {
      method: "PATCH",
      headers: authHeaders(cfg.token),
      body: JSON.stringify({ transcript: transcript.slice(-120) }),
      signal: AbortSignal.timeout(12000),
    });
    if (!patchRes.ok) {
      return { ok: false, error: "Could not send message" };
    }

    return {
      ok: true,
      data: {
        handoffStatus: status,
        handoffAgentName: doc.handoffAgentName,
        handoffAgentPhoto: doc.handoffAgentPhoto,
        handoffJoinedAt: doc.handoffJoinedAt,
        transcript,
      },
    };
  } catch (err) {
    console.error("[chat-ticket] visitor handoff message failed", err);
    return { ok: false, error: "Could not send message" };
  }
}
