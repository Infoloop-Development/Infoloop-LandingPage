import type { APIRoute } from "astro";
import { CHAT_SYSTEM, SUMMARY_SYSTEM } from "@/content/chat-knowledge";
import {
  buildClarifyMessage,
  buildDiscoveryMessage,
  buildReviewMessage,
  extractUserFeatureKeys,
  isBuildIntentMessage,
  isMergedScopeChoice,
  isSuggestFeaturesRequest,
  isUserOnlyScopeChoice,
  mergeFeatureKeys,
  nameProjectFromMessage,
  parsePlatformChoice,
  titleForPlatform,
  type BuildFlow,
  type BuildPlatform,
} from "@/lib/chat-build-flow";
import { computeEstimate, estimateTranscriptText, stackForPlatform } from "@/lib/chat-estimate";
import { buildProposalMessage } from "@/lib/chat-proposal";
import { featuresByKeys, getChatFeatures } from "@/lib/chat-features";
import { createSalesInquiryTicket, lookupTicketsForResume, resumeTicketSession, appendTicketTranscript, updateTicketEstimate, requestHandoff, pollHandoff, appendVisitorHandoffMessage, endHandoff } from "@/lib/chat-ticket";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

type Msg = { role: "user" | "assistant"; content: string };
type Lead = { fullName: string; mobile: string; email: string };
type TranscriptTurn = { role: "user" | "assistant" | "system" | "agent"; message: string; timestamp?: string };

const MAX_MESSAGE = 800;
const MAX_HISTORY = 40;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^\+?[\d\s()-]{8,20}$/;

function scrubDashes(text: string) {
  return text.replace(/\u2014/g, " - ").replace(/\u2013/g, "-");
}

function groqKey() {
  return (import.meta.env.GROQ_API_KEY as string | undefined)?.trim();
}

function groqModel() {
  return ((import.meta.env.GROQ_MODEL as string | undefined) || DEFAULT_MODEL).trim();
}

function parseLead(raw: unknown): Lead | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const fullName = typeof o.fullName === "string" ? o.fullName.trim() : "";
  const mobile = typeof o.mobile === "string" ? o.mobile.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  if (fullName.length < 2) return null;
  if (!EMAIL_RE.test(email)) return null;
  if (!MOBILE_RE.test(mobile)) return null;
  return { fullName, mobile, email };
}

function catalogTool(features: { key: string; name: string; description: string; platforms: string[] }[]) {
  return [
    {
      type: "function",
      function: {
        name: "select_project_features",
        description:
          "Select catalog features for a visitor build request. Return only keys from the catalog. Never invent prices or hours.",
        parameters: {
          type: "object",
          properties: {
            projectTitle: { type: "string", description: "Short project name for sales, e.g. Clothes shopping mobile app" },
            platform: { type: "string", enum: ["web", "mobile"] },
            flutterOnly: {
              type: "boolean",
              description: "True only if the visitor explicitly insisted on Flutter for mobile.",
            },
            featureKeys: {
              type: "array",
              items: { type: "string", enum: features.map((f) => f.key) },
              description:
                "6 to 10 feature keys from the catalog that thoroughly cover this project (not a thin list).",
            },
          },
          required: ["projectTitle", "platform", "featureKeys"],
        },
      },
    },
  ];
}

type GroqMessage = {
  role: string;
  content?: string | null;
  tool_calls?: {
    id: string;
    type: string;
    function: { name: string; arguments: string };
  }[];
};

async function groqChat(body: Record<string, unknown>) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${groqKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25000),
  });
  const data = (await res.json().catch(() => ({}))) as {
    choices?: { message?: GroqMessage; finish_reason?: string }[];
    error?: { message?: string };
  };
  return { res, data };
}

function parseToolArgs(raw: string): {
  projectTitle?: string;
  platform?: "web" | "mobile";
  flutterOnly?: boolean;
  featureKeys?: string[];
} {
  try {
    return JSON.parse(raw) as {
      projectTitle?: string;
      platform?: "web" | "mobile";
      flutterOnly?: boolean;
      featureKeys?: string[];
    };
  } catch {
    return {};
  }
}

function parseBuildFlow(raw: unknown): BuildFlow | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const step =
    o.step === "review" ? "review" : o.step === "discovery" ? "discovery" : o.step === "clarify" ? "clarify" : null;
  const projectTitle = typeof o.projectTitle === "string" ? o.projectTitle.trim() : "";
  if (!step || !projectTitle) return null;
  const platform: BuildPlatform | null | undefined =
    o.platform === "web" ? "web" : o.platform === "mobile" ? "mobile" : o.platform === null ? null : undefined;
  if ((step === "discovery" || step === "review") && platform !== "web" && platform !== "mobile") {
    return null;
  }
  return {
    step,
    projectTitle: projectTitle.slice(0, 120),
    platform: platform ?? null,
    flutterOnly: Boolean(o.flutterOnly),
    brief: typeof o.brief === "string" ? o.brief : undefined,
    userFeatureKeys: Array.isArray(o.userFeatureKeys) ? o.userFeatureKeys.map(String) : undefined,
    suggestedFeatureKeys: Array.isArray(o.suggestedFeatureKeys) ? o.suggestedFeatureKeys.map(String) : undefined,
  };
}

async function proposeFromToolArgs(
  catalog: Awaited<ReturnType<typeof getChatFeatures>>,
  args: {
    projectTitle?: string;
    platform?: "web" | "mobile";
    flutterOnly?: boolean;
    featureKeys?: string[];
  },
) {
  const keys = Array.isArray(args.featureKeys) ? args.featureKeys.slice(0, 12) : [];
  const selected = featuresByKeys(catalog, keys);
  if (!selected.length) return null;

  const platform = args.platform === "web" ? "web" : "mobile";
  const flutterOnly = Boolean(args.flutterOnly);
  const stack = stackForPlatform(platform, flutterOnly);
  const projectTitle = (args.projectTitle || "Custom project").slice(0, 120);

  const proposalDisplay = {
    projectTitle,
    platform: platform as "web" | "mobile",
    stack,
    features: selected.map((f) => ({ key: f.key, name: f.name, description: f.description })),
  };

  return {
    reply: scrubDashes(buildProposalMessage(proposalDisplay)),
    phase: "proposal" as const,
    needLead: true,
    proposal: {
      projectTitle,
      platform,
      flutterOnly,
      featureKeys: selected.map((f) => f.key),
      features: selected.map((f) => ({ key: f.key, name: f.name, description: f.description })),
      stack,
    },
    proposalDisplay,
  };
}

async function callFeatureTool(
  catalogPublic: { key: string; name: string; description: string; platforms: string[] }[],
  history: Msg[],
  message: string,
  hint?: { projectTitle?: string; platform?: "web" | "mobile"; flutterOnly?: boolean },
) {
  const userContent = hint?.projectTitle
    ? `${message}\n\n[Context: project "${hint.projectTitle}", platform ${hint.platform || "to be confirmed"}${hint.flutterOnly ? ", Flutter only" : ""}]`
    : message;

  const first = await groqChat({
    model: groqModel(),
    temperature: 0.3,
    max_tokens: 700,
    tools: catalogTool(catalogPublic),
    tool_choice: "auto",
    messages: [
      {
        role: "system",
        content: `${CHAT_SYSTEM}\n\n## Feature catalog\n${catalogPublic.map((f) => `- ${f.key}: ${f.name} [${f.platforms.join(",")}] — ${f.description}`).join("\n")}\n\nCall select_project_features now. Pick 6 to 10 keys that thoroughly cover the project for the given platform. Prefer depth over a thin list.`,
      },
      ...history,
      { role: "user", content: userContent },
    ],
  });

  if (!first.res.ok) return { error: first.data?.error?.message || "Tool call failed" };

  const toolCalls = first.data.choices?.[0]?.message?.tool_calls;
  if (!toolCalls?.length) return { error: "No features selected" };

  const call = toolCalls.find((t) => t.function?.name === "select_project_features") || toolCalls[0];
  const args = parseToolArgs(call.function?.arguments || "{}");
  if (hint?.projectTitle) args.projectTitle = hint.projectTitle;
  if (hint?.platform) args.platform = hint.platform;
  if (hint?.flutterOnly) args.flutterOnly = hint.flutterOnly;

  return { args };
}

function looksLikeFeatureList(message: string): boolean {
  return (
    message.includes(",") ||
    /\b(login|auth|catalog|cart|checkout|payment|admin|notification|upload|search|order)\b/i.test(message)
  );
}

async function summarizeTranscript(transcript: TranscriptTurn[]): Promise<string> {
  const text = transcript.map((t) => `${t.role}: ${t.message}`).join("\n").slice(0, 12000);
  const { res, data } = await groqChat({
    model: groqModel(),
    temperature: 0.2,
    max_tokens: 400,
    messages: [
      { role: "system", content: SUMMARY_SYSTEM },
      { role: "user", content: text || "No transcript." },
    ],
  });
  if (!res.ok) return "Visitor requested a build estimate via the site chatbot. See transcript for details.";
  return scrubDashes(data.choices?.[0]?.message?.content?.trim() || "Visitor requested a build estimate via the site chatbot.");
}

/**
 * Infoloop site chatbot → Groq.
 * Supports normal Q&A plus build-intent feature selection (tool call) and
 * post-lead server-side estimates + Payload sales tickets.
 */
export const POST: APIRoute = async ({ request }) => {
  if (!groqKey()) {
    return json(
      {
        error: "Chat is not configured yet. Please use the contact form at /contact or email hi@infoloop.co.",
      },
      503,
    );
  }

  let body: {
    message?: unknown;
    history?: unknown;
    action?: unknown;
    lead?: unknown;
    proposal?: unknown;
    transcript?: unknown;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const action = typeof body.action === "string" ? body.action : "chat";
  const catalog = await getChatFeatures();
  const catalogPublic = catalog.map((f) => ({
    key: f.key,
    name: f.name,
    description: f.description,
    platforms: f.platforms,
  }));

  // --- Resume previous quote ---------------------------------------------------------
  if (action === "resume_lookup") {
    const email = typeof (body as { email?: unknown }).email === "string" ? String((body as { email: string }).email).trim() : "";
    const name =
      typeof (body as { name?: unknown }).name === "string" ? String((body as { name: string }).name).trim() : "";
    if (!EMAIL_RE.test(email)) {
      return json({ error: "Please enter a valid email." }, 400);
    }
    const result = await lookupTicketsForResume(email, name || undefined);
    if (!result.ok) return json({ error: result.error || "Could not look up quotes." }, 502);
    return json({
      phase: "resume_lookup",
      tickets: result.tickets,
      count: result.tickets.length,
    });
  }

  if (action === "resume_load") {
    const docId = (body as { ticketDocId?: unknown }).ticketDocId;
    const projectName =
      typeof (body as { projectName?: unknown }).projectName === "string"
        ? String((body as { projectName: string }).projectName)
        : "";
    if (docId === undefined || docId === null || docId === "") {
      return json({ error: "Missing project selection." }, 400);
    }
    const result = await resumeTicketSession(docId as string | number, projectName);
    if (!result.ok || !result.ticket) {
      return json({ error: result.error || "Could not restore that quote." }, 502);
    }
    const t = result.ticket;
    return json({
      phase: "resume_loaded",
      ticketId: t.ticketId,
      ticketDocId: t.id,
      projectTitle: t.projectName,
      estimate: t.estimate,
      chatSummary: t.chatSummary,
      status: t.status,
      lead: {
        fullName: t.visitorName || "Visitor",
        email: t.visitorEmail,
        mobile: t.visitorMobile,
      },
      proposal: {
        projectTitle: t.projectName,
        platform: /web/i.test(t.estimate.stack || "") && !/react native|flutter/i.test(t.estimate.stack || "") ? "web" : "mobile",
        featureKeys: (t.estimate.features || []).map((f) => f.key).filter(Boolean),
        features: t.estimate.features || [],
        stack: t.estimate.stack,
      },
      reply: scrubDashes(
        [
          `Welcome back${t.visitorName ? `, ${t.visitorName.split(" ")[0]}` : ""}.`,
          "",
          `I restored your rough quote for **${t.projectName}**.`,
          t.chatSummary ? `\nHere’s a short recap:\n${t.chatSummary}` : "",
          "",
          "You can refine the scope, ask questions, or request an updated estimate. Our team can see that you returned.",
        ].join("\n"),
      ),
    });
  }

  if (action === "resume_append") {
    const docId = (body as { ticketDocId?: unknown }).ticketDocId;
    const turnsIn = Array.isArray((body as { turns?: unknown }).turns) ? (body as { turns: unknown[] }).turns : [];
    if (docId === undefined || docId === null || docId === "") {
      return json({ error: "Missing ticket." }, 400);
    }
    const turns: { role: "user" | "assistant" | "system"; message: string; timestamp: string }[] = [];
    for (const row of turnsIn.slice(-20)) {
      if (!row || typeof row !== "object") continue;
      const role = (row as TranscriptTurn).role;
      const message = typeof (row as TranscriptTurn).message === "string" ? (row as TranscriptTurn).message : "";
      if ((role === "user" || role === "assistant" || role === "system") && message) {
        turns.push({
          role,
          message: message.slice(0, MAX_MESSAGE),
          timestamp:
            typeof (row as TranscriptTurn).timestamp === "string"
              ? (row as TranscriptTurn).timestamp!
              : new Date().toISOString(),
        });
      }
    }
    const result = await appendTicketTranscript(docId as string | number, turns);
    if (!result.ok) return json({ error: result.error || "Could not sync chat." }, 502);
    return json({ ok: true });
  }

  // --- Live sales handoff ------------------------------------------------------------
  if (action === "handoff_request") {
    const docId = (body as { ticketDocId?: unknown }).ticketDocId;
    if (docId === undefined || docId === null || docId === "") {
      return json({ error: "Create or resume a quote first, then we can connect you with sales." }, 400);
    }
    const result = await requestHandoff(docId as string | number);
    if (!result.ok) return json({ error: result.error || "Could not request a connection." }, 502);
    return json({
      phase: "handoff_requested",
      transcriptCount: result.transcriptCount ?? 0,
      reply: scrubDashes(
          "I’ve notified our sales team. Keep this window open — someone will join shortly and pick up right here. Meanwhile you can keep chatting with me; I’m still here.",
      ),
    });
  }

  if (action === "handoff_poll") {
    const docId = (body as { ticketDocId?: unknown }).ticketDocId;
    if (docId === undefined || docId === null || docId === "") {
      return json({ error: "Missing ticket." }, 400);
    }
    const result = await pollHandoff(docId as string | number);
    if (!result.ok || !result.data) return json({ error: result.error || "Could not check status." }, 502);
    const all = result.data.transcript;
    let since =
      typeof (body as { sinceCount?: unknown }).sinceCount === "number"
        ? Math.max(0, Number((body as { sinceCount: number }).sinceCount))
        : 0;
    // Safety: never replay history from before the latest visitor handoff request
    if (since <= 0) {
      let lastReq = -1;
      for (let i = 0; i < all.length; i++) {
        const t = all[i];
        if (t?.role === "system" && /Visitor requested live sales chat/i.test(t.message || "")) {
          lastReq = i;
        }
      }
      if (lastReq >= 0) since = lastReq;
    }
    const newTurns = all.slice(since).filter((t) => t.role === "agent" || t.role === "system");
    return json({
      phase: "handoff_poll",
      handoffStatus: result.data.handoffStatus,
      handoffAgentName: result.data.handoffAgentName,
      handoffAgentPhoto: result.data.handoffAgentPhoto,
      handoffJoinedAt: result.data.handoffJoinedAt,
      transcriptCount: all.length,
      newTurns,
    });
  }

  if (action === "handoff_visitor_message") {
    const docId = (body as { ticketDocId?: unknown }).ticketDocId;
    const message =
      typeof (body as { message?: unknown }).message === "string"
        ? String((body as { message: string }).message).trim()
        : "";
    if (docId === undefined || docId === null || docId === "") {
      return json({ error: "Missing ticket." }, 400);
    }
    if (!message || message.length > MAX_MESSAGE) {
      return json({ error: "Please enter a message." }, 400);
    }
    const result = await appendVisitorHandoffMessage(docId as string | number, message);
    if (!result.ok) return json({ error: result.error || "Could not send." }, 502);
    return json({ ok: true, phase: "handoff_visitor_message" });
  }

  if (action === "handoff_end") {
    const docId = (body as { ticketDocId?: unknown }).ticketDocId;
    if (docId === undefined || docId === null || docId === "") {
      return json({ error: "Missing ticket." }, 400);
    }
    const reason =
      (body as { reason?: unknown }).reason === "visitor_left" ? "visitor_left" : "visitor_closed";
    const result = await endHandoff(docId as string | number, reason);
    if (!result.ok) return json({ error: result.error || "Could not end live chat." }, 502);
    return json({ ok: true, phase: "handoff_ended" });
  }

  // --- Estimate after mandatory lead -------------------------------------------------
  if (action === "estimate") {
    const lead = parseLead(body.lead);
    if (!lead) {
      return json(
        {
          error: "Please provide a valid full name, mobile number, and email before we can show an estimate.",
          needLead: true,
        },
        400,
      );
    }

    const proposal = body.proposal as
      | { projectTitle?: string; platform?: "web" | "mobile"; flutterOnly?: boolean; featureKeys?: string[] }
      | undefined;
    const keys = Array.isArray(proposal?.featureKeys) ? proposal!.featureKeys!.map(String) : [];
    const selected = featuresByKeys(catalog, keys);
    if (!selected.length) {
      return json({ error: "No valid features selected for an estimate. Ask the assistant to propose features again." }, 400);
    }

    const platform = proposal?.platform === "web" ? "web" : "mobile";
    const stack = stackForPlatform(platform, Boolean(proposal?.flutterOnly));
    const est = computeEstimate(selected, stack);
    const publicEst = {
      hourlyTotal: est.hourlyTotal,
      milestoneTotal: est.milestoneTotal,
      months: est.months,
      stack: est.stack,
      features: est.features,
    };
    const projectName = (proposal?.projectTitle || "Custom build").slice(0, 120);

    const transcriptIn = Array.isArray(body.transcript) ? body.transcript : [];
    const transcript: { role: "user" | "assistant"; message: string; timestamp: string }[] = [];
    for (const row of transcriptIn.slice(-60)) {
      if (!row || typeof row !== "object") continue;
      const role = (row as TranscriptTurn).role;
      const message = typeof (row as TranscriptTurn).message === "string" ? (row as TranscriptTurn).message : "";
      if ((role === "user" || role === "assistant") && message) {
        transcript.push({
          role,
          message: message.slice(0, MAX_MESSAGE),
          timestamp:
            typeof (row as TranscriptTurn).timestamp === "string"
              ? (row as TranscriptTurn).timestamp!
              : new Date().toISOString(),
        });
      }
    }

    const chatSummary = await summarizeTranscript([
      ...transcript,
      {
        role: "assistant" as const,
        message: estimateTranscriptText(projectName, publicEst, undefined),
        timestamp: new Date().toISOString(),
      },
    ]);

    const estimateTurn = {
      role: "assistant" as const,
      message: estimateTranscriptText(projectName, publicEst),
      timestamp: new Date().toISOString(),
    };

    const existingDocId = (body as { ticketDocId?: unknown }).ticketDocId;
    let ticketId: string | undefined;
    let ticketDocId: string | number | undefined;
    let ticketOk = false;

    if (existingDocId !== undefined && existingDocId !== null && existingDocId !== "") {
      const updated = await updateTicketEstimate(existingDocId as string | number, {
        projectName,
        chatSummary,
        estimate: publicEst,
        appendTurns: [...transcript.slice(-8), estimateTurn],
      });
      ticketOk = updated.ok;
      ticketId = updated.ticketId;
      ticketDocId = existingDocId as string | number;
      if (!updated.ok) console.warn("[chat-ticket] resume estimate update failed:", updated.error);
    } else {
      const ticket = await createSalesInquiryTicket({
        projectName,
        visitorName: lead.fullName,
        visitorEmail: lead.email,
        visitorMobile: lead.mobile,
        chatSummary,
        estimate: publicEst,
        transcript: [...transcript, estimateTurn],
      });
      ticketOk = ticket.ok;
      ticketId = ticket.ticketId;
      ticketDocId = ticket.ticketDocId;
      if (!ticket.ok) {
        console.warn("[chat-ticket] estimate succeeded but ticket was not saved:", ticket.error);
      }
    }

    return json({
      phase: "estimate",
      estimate: publicEst,
      projectTitle: projectName,
      ticketId,
      ticketDocId,
      ticketOk,
      reply: estimateTranscriptText(projectName, publicEst, ticketId),
    });
  }

  // --- Chat / build-flow (shared history) --------------------------------------------
  const history: Msg[] = [];
  if (Array.isArray(body.history)) {
    for (const row of body.history.slice(-MAX_HISTORY)) {
      if (!row || typeof row !== "object") continue;
      const role = (row as Msg).role;
      const content = typeof (row as Msg).content === "string" ? (row as Msg).content.trim() : "";
      if ((role === "user" || role === "assistant") && content && content.length <= MAX_MESSAGE) {
        history.push({ role, content });
      }
    }
  }

  const buildFlow = parseBuildFlow((body as { buildFlow?: unknown }).buildFlow);

  if (action === "suggest_features" && buildFlow?.step === "discovery" && buildFlow.platform) {
    const tool = await callFeatureTool(
      catalogPublic,
      history,
      `Please suggest a thorough feature set (6 to 10 items) for this ${buildFlow.platform} project: ${buildFlow.brief || buildFlow.projectTitle}.`,
      {
        projectTitle: buildFlow.projectTitle,
        platform: buildFlow.platform,
        flutterOnly: buildFlow.flutterOnly,
      },
    );
    if ("error" in tool) return json({ error: tool.error }, 502);
    const proposal = await proposeFromToolArgs(catalog, tool.args);
    if (!proposal) return json({ error: "Could not build a feature proposal." }, 502);
    return json(proposal);
  }

  if (action === "confirm_platform" && buildFlow?.step === "clarify") {
    const choice =
      (body as { platformChoice?: unknown }).platformChoice === "web"
        ? "web"
        : (body as { platformChoice?: unknown }).platformChoice === "both"
          ? "both"
          : (body as { platformChoice?: unknown }).platformChoice === "mobile"
            ? "mobile"
            : parsePlatformChoice(typeof body.message === "string" ? body.message : "");
    if (!choice) {
      return json({
        reply: scrubDashes(
          "Please choose **Mobile app**, **Web app**, or **Both** so we scope the right product.",
        ),
        phase: "clarify",
        buildFlow,
      });
    }
    const platform: BuildPlatform = choice === "web" ? "web" : "mobile";
    const projectTitle = titleForPlatform(buildFlow.projectTitle, platform);
    const nextFlow: BuildFlow = {
      ...buildFlow,
      step: "discovery",
      platform,
      projectTitle,
    };
    const reply = buildDiscoveryMessage(projectTitle, platform);
    return json({
      reply: scrubDashes(
        choice === "both"
          ? `${reply}\n\nNoted: you want **both**. We will price the mobile track as the main app and include web-friendly pieces (like admin) in the feature set.`
          : reply,
      ),
      phase: "discovery",
      buildFlow: nextFlow,
    });
  }

  if (action === "confirm_scope" && buildFlow?.step === "review" && buildFlow.platform) {
    const mode = (body as { scopeMode?: unknown }).scopeMode === "user_only" ? "user_only" : "merged";
    const userKeys = buildFlow.userFeatureKeys || [];
    const suggestedKeys = buildFlow.suggestedFeatureKeys || [];
    const finalKeys = mode === "user_only" ? userKeys : mergeFeatureKeys(userKeys, suggestedKeys);
    const proposal = await proposeFromToolArgs(catalog, {
      projectTitle: buildFlow.projectTitle,
      platform: buildFlow.platform,
      flutterOnly: buildFlow.flutterOnly,
      featureKeys: finalKeys,
    });
    if (!proposal) return json({ error: "Could not finalize scope." }, 502);
    return json(proposal);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE) {
    return json({ error: "Please send a short message (under 800 characters)." }, 400);
  }

  const systemWithCatalog = `${CHAT_SYSTEM}

## Feature catalog (keys only; call select_project_features only when the visitor is ready for a full proposal)
${catalogPublic.map((f) => `- ${f.key}: ${f.name} [${f.platforms.join(",")}] — ${f.description}`).join("\n")}`;

  try {
    // First build-intent: invent a clean title, always ask platform (never assume mobile/web)
    if (!buildFlow && isBuildIntentMessage(message)) {
      const named = await nameProjectFromMessage(message, groqChat, groqModel());
      const flow: BuildFlow = {
        step: "clarify",
        projectTitle: named.projectTitle,
        platform: null,
        flutterOnly: named.flutterOnly,
        brief: named.brief,
      };
      return json({
        reply: scrubDashes(buildClarifyMessage(named.projectTitle, named.brief)),
        phase: "clarify",
        buildFlow: flow,
      });
    }

    // Clarify step: wait for platform choice
    if (buildFlow?.step === "clarify") {
      const choice = parsePlatformChoice(message);
      if (!choice) {
        return json({
          reply: scrubDashes(
            "Please choose **Mobile app**, **Web app**, or **Both** (tap a button or type it). We will not assume the platform.",
          ),
          phase: "clarify",
          buildFlow,
        });
      }
      const platform: BuildPlatform = choice === "web" ? "web" : "mobile";
      const projectTitle = titleForPlatform(buildFlow.projectTitle, platform);
      const nextFlow: BuildFlow = { ...buildFlow, step: "discovery", platform, projectTitle };
      const reply = buildDiscoveryMessage(projectTitle, platform);
      return json({
        reply: scrubDashes(
          choice === "both"
            ? `${reply}\n\nNoted: you want **both**. We will price the mobile track as the main app and include web-friendly pieces (like admin) in the feature set.`
            : reply,
        ),
        phase: "discovery",
        buildFlow: nextFlow,
      });
    }

    // Discovery step: suggest on request or parse visitor features
    if (buildFlow?.step === "discovery" && buildFlow.platform) {
      if (isSuggestFeaturesRequest(message)) {
        const tool = await callFeatureTool(
          catalogPublic,
          history,
          `Suggest a thorough 6-10 feature set for this ${buildFlow.platform} project. Context: ${buildFlow.brief || message}`,
          {
            projectTitle: buildFlow.projectTitle,
            platform: buildFlow.platform,
            flutterOnly: buildFlow.flutterOnly,
          },
        );
        if ("error" in tool) return json({ error: tool.error }, 502);
        const proposal = await proposeFromToolArgs(catalog, tool.args);
        if (!proposal) return json({ error: "Could not build a feature proposal." }, 502);
        return json(proposal);
      }

      if (looksLikeFeatureList(message)) {
        const userKeys = await extractUserFeatureKeys(message, catalog, groqChat, groqModel());
        const tool = await callFeatureTool(
          catalogPublic,
          history,
          `Visitor listed their own features. Also propose a thorough complete set for ${buildFlow.projectTitle} (${buildFlow.platform}). Context: ${buildFlow.brief || ""}`,
          {
            projectTitle: buildFlow.projectTitle,
            platform: buildFlow.platform,
            flutterOnly: buildFlow.flutterOnly,
          },
        );
        if ("error" in tool) return json({ error: tool.error }, 502);

        const suggestedKeys = Array.isArray(tool.args.featureKeys) ? tool.args.featureKeys.map(String) : [];
        const userSet = new Set(userKeys);
        const extraKeys = suggestedKeys.filter((k) => !userSet.has(k));
        const userFeatures = featuresByKeys(catalog, userKeys).map((f) => ({
          key: f.key,
          name: f.name,
          description: f.description,
        }));
        const extraFeatures = featuresByKeys(catalog, extraKeys).map((f) => ({
          key: f.key,
          name: f.name,
          description: f.description,
        }));

        if (!userFeatures.length) {
          const proposal = await proposeFromToolArgs(catalog, {
            ...tool.args,
            projectTitle: buildFlow.projectTitle,
            platform: buildFlow.platform,
            flutterOnly: buildFlow.flutterOnly,
          });
          if (!proposal) return json({ error: "Could not build a feature proposal." }, 502);
          return json(proposal);
        }

        const reviewFlow: BuildFlow = {
          ...buildFlow,
          step: "review",
          userFeatureKeys: userKeys,
          suggestedFeatureKeys: extraKeys.length ? extraKeys : suggestedKeys.filter((k) => !userKeys.includes(k)),
        };

        return json({
          reply: scrubDashes(buildReviewMessage(buildFlow.projectTitle, userFeatures, extraFeatures)),
          phase: "review",
          buildFlow: reviewFlow,
        });
      }

      return json({
        reply: scrubDashes(
          "No problem. Type the features you have in mind (with a bit of detail), or tap **Suggest features for me** for a deeper starter set.",
        ),
        phase: "discovery",
        buildFlow,
      });
    }

    // Review step: confirm scope from text or nudge buttons
    if (buildFlow?.step === "review" && buildFlow.platform) {
      if (isUserOnlyScopeChoice(message) || isMergedScopeChoice(message)) {
        const mode = isUserOnlyScopeChoice(message) && !isMergedScopeChoice(message) ? "user_only" : "merged";
        const userKeys = buildFlow.userFeatureKeys || [];
        const suggestedKeys = buildFlow.suggestedFeatureKeys || [];
        const finalKeys = mode === "user_only" ? userKeys : mergeFeatureKeys(userKeys, suggestedKeys);
        const proposal = await proposeFromToolArgs(catalog, {
          projectTitle: buildFlow.projectTitle,
          platform: buildFlow.platform,
          flutterOnly: buildFlow.flutterOnly,
          featureKeys: finalKeys,
        });
        if (!proposal) return json({ error: "Could not finalize scope." }, 502);
        return json(proposal);
      }

      return json({
        reply: scrubDashes(
          "Please choose one: estimate with **only your features**, or **your features plus our suggestions** (use the buttons below).",
        ),
        phase: "review",
        buildFlow,
      });
    }

    const first = await groqChat({
      model: groqModel(),
      temperature: 0.3,
      max_tokens: 700,
      tools: catalogTool(catalogPublic),
      tool_choice: "none",
      messages: [{ role: "system", content: systemWithCatalog }, ...history, { role: "user", content: message }],
    });

    if (!first.res.ok) {
      console.error("Groq error", first.res.status, first.data?.error?.message);
      return json(
        {
          error:
            first.res.status === 429
              ? "The assistant is busy right now. Try again in a moment, or contact us at /contact."
              : "The assistant could not reply. Please try again or use /contact.",
        },
        502,
      );
    }

    const reply = first.data.choices?.[0]?.message?.content?.trim();
    if (!reply) return json({ error: "Empty reply. Please try again or use /contact." }, 502);
    return json({ reply: scrubDashes(reply), phase: "chat" });
  } catch (err) {
    console.error("Chat failed", err);
    return json({ error: "The assistant is temporarily unavailable. Please use /contact." }, 502);
  }
};
