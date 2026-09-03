import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ChatEstimateCard } from "@/components/ChatEstimateCard";
import { ChatMessageBody } from "@/components/ChatMessageBody";
import { ChatReadAloud } from "@/components/ChatReadAloud";
import type { PublicEstimate } from "@/lib/chat-estimate";
import { estimateFeaturesReply, estimateTranscriptText } from "@/lib/chat-estimate";
import type { BuildFlow } from "@/lib/chat-build-flow";
import { LEAD_ALREADY_ON_FILE, LEAD_CAPTURE_PROMPT } from "@/lib/chat-proposal";
import { stopSpeech } from "@/lib/chat-speech";
import { trackEvent } from "@/lib/track";

const IVY_AVATAR = "/chat/ivy-avatar.png";

function IvyAvatar({ size, className = "" }: { size: number; className?: string }) {
  return (
    <img
      src={IVY_AVATAR}
      alt=""
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}

function PersonAvatar({
  size,
  photo,
  name,
  fallback = "Ivy",
}: {
  size: number;
  photo?: string | null;
  name?: string | null;
  fallback?: "Ivy" | "initial";
}) {
  if (fallback === "Ivy" && !photo) {
    return <IvyAvatar size={size} />;
  }
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover ring-2 ring-orange/80"
        style={{ width: size, height: size }}
        draggable={false}
      />
    );
  }
  const initial = (name || "S").trim().slice(0, 1).toUpperCase() || "S";
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-ink font-display font-semibold text-white ring-2 ring-orange/80"
      style={{ width: size, height: size, fontSize: Math.max(11, Math.round(size * 0.38)) }}
      aria-hidden
    >
      {initial}
    </span>
  );
}

type Msg = {
  role: "user" | "assistant" | "agent" | "system";
  content: string;
  kind?: "plain" | "estimate" | "lead_prompt" | "agent_join";
  estimate?: PublicEstimate;
  projectTitle?: string;
  ticketId?: string;
  agentName?: string;
  agentPhoto?: string;
};

type Proposal = {
  projectTitle: string;
  platform: "web" | "mobile";
  flutterOnly?: boolean;
  featureKeys: string[];
  features?: { key: string; name: string; description?: string }[];
  stack?: string;
};

type Lead = { fullName: string; mobile: string; email: string };

const SUGGESTIONS = [
  "What does Infoloop do?",
  "Can you build a mobile app for clothes shopping?",
  "What products do you offer?",
];

const RESUME_CHIP = "I already got a quote";

type ResumeTicketOption = {
  id: string | number;
  ticketId: string;
  projectName: string;
  status: string;
  /** Server-issued proof this browser may open the ticket; sent back on every ticket action. */
  token?: string;
};

const SESSION_CAP = 20;
const LEAD_FORM_DELAY_MS = 1400;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_RE = /^\+?[\d\s()-]{8,20}$/;

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Ivy, Infoloop's assistant. Ask about what we build, how we work, products, or how to get in touch. If you want us to build something, describe it and I can suggest features and a rough estimate.",
  kind: "plain",
};

function speechForMessage(m: Msg): string {
  if (m.kind === "estimate" && m.estimate) {
    return estimateTranscriptText(m.projectTitle, m.estimate, m.ticketId);
  }
  return m.content;
}

/**
 * Ivy — Infoloop site assistant (Groq-backed via /api/chat).
 * Build-intent → feature proposal → lead prompt → mandatory lead → estimate card + ticket.
 */
export function Chatbot() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [awaitingLead, setAwaitingLead] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [leadForm, setLeadForm] = useState<Lead>({ fullName: "", mobile: "", email: "" });
  const [leadErrors, setLeadErrors] = useState<Partial<Record<keyof Lead, string>>>({});
  const [buildFlow, setBuildFlow] = useState<BuildFlow | null>(null);
  const [resumeStep, setResumeStep] = useState<"idle" | "form" | "picker" | "active">("idle");
  const [resumeForm, setResumeForm] = useState({ name: "", email: "" });
  const [resumeErrors, setResumeErrors] = useState<{ email?: string }>({});
  const [resumeTickets, setResumeTickets] = useState<ResumeTicketOption[]>([]);
  const [ticketDocId, setTicketDocId] = useState<string | number | null>(null);
  const [ticketToken, setTicketToken] = useState<string | null>(null);
  const [handoffStatus, setHandoffStatus] = useState<"none" | "requested" | "active" | "ended">("none");
  const [handoffAgent, setHandoffAgent] = useState<{ name: string; photo?: string } | null>(null);
  const [suggestHandoff, setSuggestHandoff] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticketDocIdRef = useRef<string | number | null>(null);
  const ticketTokenRef = useRef<string | null>(null);
  const handoffPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptCountRef = useRef(0);
  const seenAgentJoinRef = useRef(false);
  const handoffStatusRef = useRef<"none" | "requested" | "active" | "ended">("none");

  useEffect(() => {
    ticketDocIdRef.current = ticketDocId;
  }, [ticketDocId]);

  useEffect(() => {
    ticketTokenRef.current = ticketToken;
  }, [ticketToken]);

  useEffect(() => {
    handoffStatusRef.current = handoffStatus;
  }, [handoffStatus]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    if (!showLeadForm && resumeStep !== "form") inputRef.current?.focus();
  }, [open, messages, busy, showLeadForm, resumeStep]);

  // Tab close / navigate away while Waiting or Live → clear CMS Live tag
  useEffect(() => {
    if (!open) return;
    const endIfLive = () => {
      const docId = ticketDocIdRef.current;
      const status = handoffStatusRef.current;
      if (docId == null || (status !== "requested" && status !== "active")) return;
      const body = JSON.stringify({
        action: "handoff_end",
        ticketDocId: docId,
        ticketToken: ticketTokenRef.current,
        reason: "visitor_left",
      });
      try {
        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
          navigator.sendBeacon("/api/chat", new Blob([body], { type: "application/json" }));
          return;
        }
      } catch {
        /* fall through */
      }
      void fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    };
    const onPageHide = () => endIfLive();
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onPageHide);
    };
  }, [open]);

  useEffect(() => () => {
    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    if (appendTimerRef.current) clearTimeout(appendTimerRef.current);
    if (handoffPollRef.current) clearInterval(handoffPollRef.current);
    stopSpeech();
  }, []);

  const closeChat = () => {
    const docId = ticketDocIdRef.current;
    const live = handoffStatus === "requested" || handoffStatus === "active";
    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    if (appendTimerRef.current) clearTimeout(appendTimerRef.current);
    if (handoffPollRef.current) clearInterval(handoffPollRef.current);
    stopSpeech();
    if (live && docId != null) {
      // Fire-and-forget so Live/Waiting clears even if the panel closes immediately
      void fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "handoff_end", ticketDocId: docId, ticketToken: ticketTokenRef.current, reason: "visitor_closed" }),
        keepalive: true,
      }).catch(() => {});
    }
    setOpen(false);
    setBusy(false);
    setError("");
    setInput("");
    setMessages([WELCOME]);
    setProposal(null);
    setAwaitingLead(false);
    setShowLeadForm(false);
    setLead(null);
    setLeadForm({ fullName: "", mobile: "", email: "" });
    setLeadErrors({});
    setBuildFlow(null);
    setResumeStep("idle");
    setResumeForm({ name: "", email: "" });
    setResumeErrors({});
    setResumeTickets([]);
    setTicketDocId(null);
    setTicketToken(null);
    setHandoffStatus("none");
    setHandoffAgent(null);
    setSuggestHandoff(false);
    transcriptCountRef.current = 0;
    seenAgentJoinRef.current = false;
  };

  const queueTranscriptAppend = (turns: { role: "user" | "assistant"; message: string; timestamp: string }[]) => {
    const docId = ticketDocIdRef.current;
    if (!docId || !turns.length) return;
    // While live with a human, don't mix AI transcript appends
    if (handoffStatus === "active") return;
    if (appendTimerRef.current) clearTimeout(appendTimerRef.current);
    appendTimerRef.current = setTimeout(() => {
      void fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resume_append", ticketDocId: docId, ticketToken: ticketTokenRef.current, turns }),
      }).catch(() => {});
    }, 600);
  };

  const stopHandoffPoll = () => {
    if (handoffPollRef.current) {
      clearInterval(handoffPollRef.current);
      handoffPollRef.current = null;
    }
  };

  const startHandoffPoll = () => {
    stopHandoffPoll();
    const tick = async () => {
      const docId = ticketDocIdRef.current;
      if (!docId) return;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "handoff_poll",
            ticketDocId: docId,
            ticketToken: ticketTokenRef.current,
            sinceCount: transcriptCountRef.current,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          handoffStatus?: string;
          handoffAgentName?: string;
          handoffAgentPhoto?: string;
          transcriptCount?: number;
          newTurns?: { role: string; message: string; agentName?: string; timestamp?: string }[];
        };
        if (!res.ok) return;
        if (typeof data.transcriptCount === "number") transcriptCountRef.current = data.transcriptCount;
        if (data.handoffStatus === "active") {
          setHandoffStatus("active");
          if (data.handoffAgentName) {
            setHandoffAgent({ name: data.handoffAgentName, photo: data.handoffAgentPhoto });
          }
        } else if (data.handoffStatus === "requested") {
          setHandoffStatus("requested");
        }
        const turns = Array.isArray(data.newTurns) ? data.newTurns : [];
        if (!turns.length) return;
        setMessages((m) => {
          const next = [...m];
          for (const t of turns) {
            if (t.role === "system" && /joined|Live chat/i.test(t.message || "")) {
              if (seenAgentJoinRef.current) continue;
              seenAgentJoinRef.current = true;
              next.push({
                role: "agent",
                kind: "agent_join",
                content: t.message,
                agentName: data.handoffAgentName || "Sales",
                agentPhoto: data.handoffAgentPhoto,
              });
              continue;
            }
            if (t.role === "agent" && t.message) {
              // Join card already covers the first greeting — don't duplicate it
              if (
                seenAgentJoinRef.current &&
                /I've got everything discussed|I'll help you from here|help you navigate/i.test(t.message)
              ) {
                continue;
              }
              next.push({
                role: "agent",
                kind: "plain",
                content: t.message,
                agentName: t.agentName || data.handoffAgentName || "Sales",
                agentPhoto: data.handoffAgentPhoto,
              });
            }
          }
          return next;
        });
      } catch {
        /* ignore poll errors */
      }
    };
    void tick();
    handoffPollRef.current = setInterval(() => void tick(), 3500);
  };

  const requestSalesHandoff = async (opts?: { skipUserBubble?: boolean }) => {
    const docId = ticketDocIdRef.current;
    if (!docId) {
      setError("Get a rough estimate first (or resume a quote), then we can connect you with sales.");
      return;
    }
    setBusy(true);
    setError("");
    setSuggestHandoff(false);
    seenAgentJoinRef.current = false;
    setHandoffAgent(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "handoff_request", ticketDocId: docId, ticketToken: ticketTokenRef.current }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        transcriptCount?: number;
      };
      if (!res.ok) {
        setError(data.error || "Could not connect you right now.");
        return;
      }
      // Only stream live turns after this request — never replay older agent chats
      transcriptCountRef.current =
        typeof data.transcriptCount === "number" ? data.transcriptCount : transcriptCountRef.current;
      setHandoffStatus("requested");
      setMessages((m) => {
        const next = [...m];
        if (!opts?.skipUserBubble) {
          next.push({ role: "user", content: "Connect me with sales", kind: "plain" });
        }
        next.push({
          role: "assistant",
          content:
            data.reply ||
            "I’ve notified our sales team. Meanwhile it’s fine to keep chatting with me — I’m still here until they join.",
          kind: "plain",
        });
        return next;
      });
      trackEvent("chat_handoff_request", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
      startHandoffPoll();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const wantsHuman =
    /\b(talk to (a |someone|sales|human|person|executive|agent)|speak to (a |someone|sales|human|person)|connect (me )?with (sales|someone|a person|an? (executive|agent|human))|real person|human (please|help)|call me back|sales (team|exec|executive))\b/i;

  const scheduleLeadPrompt = () => {
    if (lead) return;
    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    setAwaitingLead(true);
    setShowLeadForm(false);
    leadTimerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: LEAD_CAPTURE_PROMPT, kind: "lead_prompt" }]);
      setShowLeadForm(true);
    }, LEAD_FORM_DELAY_MS);
  };

  const priorHistory = (msgs: Msg[]) =>
    msgs
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: speechForMessage(m) }))
      .slice(-(SESSION_CAP * 2));

  /** Apply assistant reply; returns proposal to estimate immediately when lead is already on file. */
  const applyChatResponse = (
    data: {
      reply?: string;
      error?: string;
      phase?: string;
      needLead?: boolean;
      proposal?: Proposal;
      buildFlow?: BuildFlow;
    },
    _nextHistory: Msg[],
  ): { ok: boolean; estimateWith?: Proposal } => {
    if (!data.reply) return { ok: false };
    setMessages((m) => [...m, { role: "assistant", content: data.reply!, kind: "plain" }]);
    if (data.buildFlow) setBuildFlow(data.buildFlow);
    if (data.proposal?.featureKeys?.length) {
      setProposal(data.proposal);
      setBuildFlow(null);
    }
    if (data.phase === "proposal" && data.proposal?.featureKeys?.length && lead) {
      setMessages((m) => [...m, { role: "assistant", content: LEAD_ALREADY_ON_FILE, kind: "plain" }]);
      return { ok: true, estimateWith: data.proposal };
    }
    if (data.needLead && !lead && data.phase === "proposal") {
      scheduleLeadPrompt();
    }
    return { ok: true };
  };

  const runConfirmPlatform = async (msgs: Msg[], choice: "mobile" | "web" | "both") => {
    if (!buildFlow || buildFlow.step !== "clarify" || busy) return;
    setBusy(true);
    setError("");
    const label = choice === "mobile" ? "Mobile app" : choice === "web" ? "Web app" : "Both";
    const nextHistory = [...msgs, { role: "user" as const, content: label, kind: "plain" as const }];
    setMessages(nextHistory);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm_platform",
          platformChoice: choice,
          message: label,
          history: priorHistory(nextHistory),
          buildFlow,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        phase?: string;
        proposal?: Proposal;
        buildFlow?: BuildFlow;
      };
      if (!res.ok) {
        setError(data.error || "Could not save platform choice.");
      } else {
        const applied = applyChatResponse(data, nextHistory);
        if (!applied.ok) setError(data.error || "Could not save platform choice.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const runSuggestFeatures = async (msgs: Msg[]) => {
    if (!buildFlow || busy) return;
    setBusy(true);
    setError("");
    const label = "Suggest features for me";
    const nextHistory = [...msgs, { role: "user" as const, content: label, kind: "plain" as const }];
    setMessages(nextHistory);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "suggest_features",
          message: label,
          history: priorHistory(nextHistory),
          buildFlow,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        phase?: string;
        needLead?: boolean;
        proposal?: Proposal;
        buildFlow?: BuildFlow;
      };
      if (!res.ok) {
        setError(data.error || "Could not suggest features.");
      } else {
        const applied = applyChatResponse(data, nextHistory);
        if (!applied.ok) {
          setError(data.error || "Could not suggest features.");
        } else if (applied.estimateWith && lead) {
          await runEstimate(
            [
              ...nextHistory,
              { role: "assistant", content: data.reply!, kind: "plain" },
              { role: "assistant", content: LEAD_ALREADY_ON_FILE, kind: "plain" },
            ],
            lead,
            applied.estimateWith,
          );
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const runConfirmScope = async (msgs: Msg[], mode: "user_only" | "merged") => {
    if (!buildFlow || buildFlow.step !== "review" || busy) return;
    setBusy(true);
    setError("");
    const label = mode === "user_only" ? "My features only" : "Include your suggestions";
    const nextHistory = [...msgs, { role: "user" as const, content: label, kind: "plain" as const }];
    setMessages(nextHistory);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm_scope",
          scopeMode: mode,
          message: label,
          history: priorHistory(nextHistory),
          buildFlow,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        phase?: string;
        needLead?: boolean;
        proposal?: Proposal;
      };
      if (!res.ok) {
        setError(data.error || "Could not confirm scope.");
      } else {
        const applied = applyChatResponse(data, nextHistory);
        if (!applied.ok) {
          setError(data.error || "Could not confirm scope.");
        } else if (applied.estimateWith && lead) {
          await runEstimate(
            [
              ...nextHistory,
              { role: "assistant", content: data.reply!, kind: "plain" },
              { role: "assistant", content: LEAD_ALREADY_ON_FILE, kind: "plain" },
            ],
            lead,
            applied.estimateWith,
          );
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const transcriptPayload = (msgs: Msg[]) =>
    msgs.map((m) => ({
      role: m.role,
      message: speechForMessage(m),
      timestamp: new Date().toISOString(),
    }));

  const startResume = () => {
    if (busy || resumeStep !== "idle") return;
    setError("");
    setResumeStep("form");
    setMessages((m) => [
      ...m,
      { role: "user", content: RESUME_CHIP, kind: "plain" },
      {
        role: "assistant",
        content:
          "Happy to pull that up. Enter the email you used for the quote — name is optional if it helps narrow things down.",
        kind: "plain",
      },
    ]);
    trackEvent("chat_resume_start", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
  };

  const submitResumeLookup = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const nextErrors: { email?: string } = {};
    if (!EMAIL_RE.test(resumeForm.email.trim())) nextErrors.email = "Enter a valid email.";
    setResumeErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "resume_lookup",
          email: resumeForm.email.trim(),
          name: resumeForm.name.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        tickets?: ResumeTicketOption[];
        count?: number;
      };
      if (!res.ok) {
        setError(data.error || "Could not look up quotes.");
        return;
      }
      const tickets = Array.isArray(data.tickets) ? data.tickets : [];
      if (!tickets.length) {
        setResumeStep("idle");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "I couldn’t find a quote with that email. You can start a fresh estimate anytime by describing what you’d like to build.",
            kind: "plain",
          },
        ]);
        return;
      }
      if (tickets.length === 1) {
        await loadResumeTicket(tickets[0]!);
        return;
      }
      setResumeTickets(tickets);
      setResumeStep("picker");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `I found ${tickets.length} quotes linked to those details. Which project would you like to reopen?`,
          kind: "plain",
        },
      ]);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const loadResumeTicket = async (ticket: ResumeTicketOption) => {
    setBusy(true);
    setError("");
    setResumeStep("idle");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "resume_load",
          ticketDocId: ticket.id,
          ticketToken: ticket.token,
          projectName: ticket.projectName,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        reply?: string;
        ticketId?: string;
        ticketDocId?: string | number;
        ticketToken?: string;
        projectTitle?: string;
        estimate?: PublicEstimate;
        lead?: Lead;
        proposal?: Proposal;
        chatSummary?: string;
      };
      if (!res.ok || !data.estimate) {
        setError(data.error || "Could not restore that quote.");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.error || "I couldn’t restore that quote. You can try again or start a new estimate.",
            kind: "plain",
          },
        ]);
        return;
      }
      if (data.lead) setLead(data.lead);
      if (data.proposal?.featureKeys?.length) setProposal(data.proposal);
      setTicketDocId(data.ticketDocId ?? ticket.id);
      setTicketToken(data.ticketToken ?? ticket.token ?? null);
      setResumeStep("active");
      setSuggestHandoff(true);
      setBuildFlow(null);
      setAwaitingLead(false);
      setShowLeadForm(false);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "Welcome back — here’s your previous quote.", kind: "plain" },
        {
          role: "assistant",
          content: "",
          kind: "estimate",
          estimate: data.estimate,
          projectTitle: data.projectTitle || ticket.projectName,
          ticketId: data.ticketId,
        },
      ]);
      trackEvent("chat_resume_loaded", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
    } catch {
      setError("Network error while restoring quote.");
    } finally {
      setBusy(false);
    }
  };

  const runEstimate = async (msgs: Msg[], currentLead: Lead, currentProposal: Proposal) => {
    setBusy(true);
    setError("");
    setShowLeadForm(false);
    setAwaitingLead(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "estimate",
          lead: currentLead,
          proposal: currentProposal,
          transcript: transcriptPayload(msgs),
          ...(ticketDocIdRef.current ? { ticketDocId: ticketDocIdRef.current, ticketToken: ticketTokenRef.current } : {}),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        needLead?: boolean;
        ticketId?: string;
        ticketDocId?: string | number;
        ticketToken?: string;
        estimate?: PublicEstimate;
        projectTitle?: string;
      };
      if (!res.ok || !data.estimate) {
        if (data.needLead && !currentLead) {
          setAwaitingLead(true);
          setShowLeadForm(true);
        }
        setError(data.error || "Could not generate an estimate.");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.error || "I could not generate an estimate yet. Please check your details and try again.",
            kind: "plain",
          },
        ]);
        return;
      }
      if (data.ticketDocId != null) {
        setTicketDocId(data.ticketDocId);
        setTicketToken(data.ticketToken ?? null);
        setSuggestHandoff(true);
      }
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "",
          kind: "estimate",
          estimate: data.estimate,
          projectTitle: data.projectTitle || currentProposal.projectTitle,
          ticketId: data.ticketId,
        },
      ]);
      trackEvent("chat_estimate", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
    } catch {
      setError("Network error while estimating.");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I could not reach the estimate service. Please try again or use /contact.", kind: "plain" },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const submitLead = async (e: FormEvent) => {
    e.preventDefault();
    if (busy || !proposal) return;
    const nextErrors: Partial<Record<keyof Lead, string>> = {};
    if (leadForm.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
    if (!MOBILE_RE.test(leadForm.mobile.trim())) nextErrors.mobile = "Enter a valid mobile number.";
    if (!EMAIL_RE.test(leadForm.email.trim())) nextErrors.email = "Enter a valid email.";
    setLeadErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const saved: Lead = {
      fullName: leadForm.fullName.trim(),
      mobile: leadForm.mobile.trim(),
      email: leadForm.email.trim(),
    };
    setLead(saved);
    setShowLeadForm(false);
    setAwaitingLead(false);
    trackEvent("chat_lead", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
    await runEstimate(messages, saved, proposal);
  };

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || busy) return;
    if (showLeadForm && !lead) {
      setError("Please complete the contact form above first, then we will show your estimate.");
      return;
    }
    if (messages.filter((m) => m.role === "user").length >= SESSION_CAP) {
      setError("You've reached the chat limit for this visit. Please use the contact form.");
      return;
    }
    setError("");
    setInput("");
    const nextHistory = [...messages, { role: "user" as const, content: message, kind: "plain" as const }];
    setMessages(nextHistory);
    setBusy(true);
    trackEvent("chat_message", { page: typeof window !== "undefined" ? window.location.pathname : "/" });

    // Live with a human: relay only — no AI
    if (handoffStatus === "active") {
      const docId = ticketDocIdRef.current;
      try {
        if (docId) {
          await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "handoff_visitor_message", ticketDocId: docId, ticketToken: ticketTokenRef.current, message }),
          });
        }
      } catch {
        setError("Could not deliver that message. Please try again.");
      } finally {
        setBusy(false);
      }
      return;
    }

    // Waiting for sales (requested): keep using Ivy — replies sync to the ticket via resume_append

    if (wantsHuman.test(message) && ticketDocIdRef.current) {
      setBusy(false);
      await requestSalesHandoff({ skipUserBubble: true });
      return;
    }

    // Soft suggest handoff when the ask looks too deep for a rough bot quote
    if (
      ticketDocIdRef.current &&
      handoffStatus === "none" &&
      /\b(contract|sla|nda|enterprise|compliance|hipaa|soc\s*2|timeline commitment|guaranteed|negotiate|discount|custom quote|detailed proposal|statement of work|sow)\b/i.test(
        message,
      )
    ) {
      setSuggestHandoff(true);
    }

    const prior = priorHistory(nextHistory.slice(0, -1));

    const asksAboutContact =
      Boolean(lead) &&
      /\b(call me|contact me|reach (me|out)|will .+ call|someone call|my (details|contact|number|email|name|phone|mobile)|share (my )?(details|contact)|give you my|how (will|do) you (call|reach|contact)|need my (email|number|name|details))\b/i.test(
        message,
      );

    const lastEstimate = [...nextHistory].reverse().find((m) => m.kind === "estimate" && m.estimate);
    const asksAboutFeatures =
      /\b(what|which|which ones?|list|show|tell|considering|included|include|based on|cover|covers|component)\b/i.test(
        message,
      ) && /\b(feature|features|scope|component|components|included)\b/i.test(message);

    const wantsNewEstimate =
      Boolean(proposal) &&
      Boolean(lead) &&
      /\b(estimate|pricing|price|cost|quote|how much)\b/i.test(message) &&
      !asksAboutFeatures &&
      !/\b(what|which|why|how did|how was|based on|considering|included)\b/i.test(message);

    try {
      if (asksAboutContact && lead) {
        const reply = `Thanks, ${lead.fullName.split(" ")[0]}. We already have your details (${lead.email}, ${lead.mobile}). Our team will call you on those. No need to share them again.`;
        setMessages((m) => [...m, { role: "assistant", content: reply, kind: "plain" }]);
        queueTranscriptAppend([
          { role: "user", message, timestamp: new Date().toISOString() },
          { role: "assistant", message: reply, timestamp: new Date().toISOString() },
        ]);
        return;
      }

      if (asksAboutFeatures && (lastEstimate?.estimate || proposal?.features?.length)) {
        const features = lastEstimate?.estimate?.features?.length
          ? lastEstimate.estimate.features
          : proposal?.features || [];
        const title = lastEstimate?.projectTitle || proposal?.projectTitle;
        const reply = estimateFeaturesReply(title, features);
        setMessages((m) => [...m, { role: "assistant", content: reply, kind: "plain" }]);
        queueTranscriptAppend([
          { role: "user", message, timestamp: new Date().toISOString() },
          { role: "assistant", message: reply, timestamp: new Date().toISOString() },
        ]);
        return;
      }

      if (wantsNewEstimate && proposal && lead) {
        await runEstimate(nextHistory, lead, proposal);
        return;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: prior, action: "chat", buildFlow }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
        phase?: string;
        needLead?: boolean;
        proposal?: Proposal;
        buildFlow?: BuildFlow;
      };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again or use /contact.");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.error || "I could not reply just now. You can reach the team at /contact or hi@infoloop.co.",
            kind: "plain",
          },
        ]);
      } else {
        const applied = applyChatResponse(data, nextHistory);
        if (!applied.ok) {
          setError(data.error || "Something went wrong. Try again or use /contact.");
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: data.error || "I could not reply just now. You can reach the team at /contact or hi@infoloop.co.",
              kind: "plain",
            },
          ]);
        } else {
          if (data.reply) {
            queueTranscriptAppend([
              { role: "user", message, timestamp: new Date().toISOString() },
              { role: "assistant", message: data.reply, timestamp: new Date().toISOString() },
            ]);
          }
          if (applied.estimateWith && lead) {
            await runEstimate(
              [
                ...nextHistory,
                { role: "assistant", content: data.reply!, kind: "plain" },
                { role: "assistant", content: LEAD_ALREADY_ON_FILE, kind: "plain" },
              ],
              lead,
              applied.estimateWith,
            );
          }
        }
      }
    } catch {
      setError("Network error. Please try again or use /contact.");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I could not reach the server. Please try again or contact us at /contact.", kind: "plain" },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-label="Ivy, Infoloop assistant"
          className="pointer-events-auto flex h-[min(680px,82vh)] w-[min(calc(100vw-1.5rem),480px)] flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_20px_50px_rgba(10,10,10,0.18)]"
        >
          <header className="flex items-center gap-3 bg-ink px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
              {handoffStatus === "active" ? (
                <PersonAvatar size={36} photo={handoffAgent?.photo} name={handoffAgent?.name} fallback="initial" />
              ) : (
                <span className="ring-2 ring-orange/90 rounded-full">
                  <IvyAvatar size={36} />
                </span>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-semibold leading-tight">
                {handoffStatus === "active" && handoffAgent ? handoffAgent.name : "Ivy"}
              </p>
              <p className="text-[12px] text-white/65">
                {handoffStatus === "active"
                  ? "Sales · live chat"
                  : handoffStatus === "requested"
                    ? "Still with Ivy · sales joining soon"
                    : "Infoloop assistant · We build. We run."}
              </p>
            </div>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-[13px] text-white/80 hover:bg-white/10 hover:text-white"
              onClick={closeChat}
              aria-label="Close chat"
            >
              Close
            </button>
          </header>

          <p className="border-b border-ink/10 bg-paper px-3 py-2 text-[11px] leading-snug text-ink/55">
            {handoffStatus === "requested"
              ? "Still chatting with Ivy — that’s fine. A sales executive will join this chat when they’re ready."
              : handoffStatus === "active"
                ? "You’re chatting live with Infoloop sales."
                : "This chat keeps context only while this window is open. Close it or reload the page and the conversation starts fresh."}
          </p>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-3.5 py-3.5">
            {messages.map((m, i) => {
              if (m.kind === "agent_join") {
                return (
                  <div
                    key={`${i}-join`}
                    className="mr-auto flex w-full max-w-full items-start gap-2.5 rounded-2xl border border-orange/30 bg-orange/10 px-3.5 py-3 text-ink"
                  >
                    <PersonAvatar size={40} photo={m.agentPhoto} name={m.agentName} fallback="initial" />
                    <div className="min-w-0 pt-0.5">
                      <p className="font-display text-[14px] font-semibold leading-snug">
                        {m.agentName || "Sales"} joined
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug text-ink/70">
                        Customer success · they’ll help you navigate from here.
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-ink/50">
                        They already have everything you’ve discussed with Ivy.
                      </p>
                    </div>
                  </div>
                );
              }

              const isUser = m.role === "user";
              const isAgent = m.role === "agent";
              const showAvatar = !isUser;

              return (
                <div
                  key={`${i}-${m.role}-${m.kind}`}
                  className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {showAvatar && (
                    <span className="mb-0.5 shrink-0">
                      {isAgent ? (
                        <PersonAvatar
                          size={28}
                          photo={m.agentPhoto || handoffAgent?.photo}
                          name={m.agentName || handoffAgent?.name}
                          fallback="initial"
                        />
                      ) : (
                        <PersonAvatar size={28} fallback="Ivy" />
                      )}
                    </span>
                  )}
                  <div
                    className={`rounded-2xl text-[14px] leading-relaxed ${
                      m.kind === "estimate"
                        ? "w-full max-w-[calc(100%-2.25rem)] border border-ink/10 bg-white px-3.5 py-3 text-ink"
                        : isUser
                          ? "max-w-[85%] bg-ink px-3 py-2 text-white"
                          : isAgent
                            ? "max-w-[85%] border border-orange/25 bg-white px-3 py-2 text-ink"
                            : "max-w-[85%] border border-ink/10 bg-white px-3 py-2 text-ink"
                    }`}
                  >
                    {(m.role === "assistant" || m.role === "agent") && (
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <span className="font-display text-[11px] font-semibold tracking-wide text-ink/45">
                          {m.role === "agent" ? m.agentName || handoffAgent?.name || "Sales" : "Ivy"}
                        </span>
                        {m.role === "assistant" && <ChatReadAloud text={speechForMessage(m)} />}
                      </div>
                    )}
                    {m.kind === "estimate" && m.estimate ? (
                      <ChatEstimateCard projectTitle={m.projectTitle} estimate={m.estimate} ticketId={m.ticketId} />
                    ) : (
                      <ChatMessageBody text={m.content} tone={isUser ? "user" : "assistant"} />
                    )}
                  </div>
                </div>
              );
            })}
            {busy && (
              <p className="mr-auto text-[13px] text-ink/50" aria-live="polite">
                Thinking…
              </p>
            )}

            {buildFlow?.step === "clarify" && !busy && !proposal && (
              <div className="flex flex-wrap gap-2 pt-1">
                {(
                  [
                    ["mobile", "Mobile app"],
                    ["web", "Web app"],
                    ["both", "Both"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1.5 text-left text-[12px] font-medium text-ink hover:border-orange hover:bg-orange/15"
                    onClick={() => void runConfirmPlatform(messages, value)}
                    disabled={busy}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {buildFlow?.step === "discovery" && buildFlow.platform && !busy && !proposal && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1.5 text-left text-[12px] font-medium text-ink hover:border-orange hover:bg-orange/15"
                  onClick={() => void runSuggestFeatures(messages)}
                  disabled={busy}
                >
                  Suggest features for me
                </button>
              </div>
            )}

            {buildFlow?.step === "review" && !busy && !proposal && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-left text-[12px] text-ink/80 hover:border-orange hover:text-ink"
                  onClick={() => void runConfirmScope(messages, "user_only")}
                  disabled={busy}
                >
                  My features only
                </button>
                <button
                  type="button"
                  className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1.5 text-left text-[12px] font-medium text-ink hover:border-orange hover:bg-orange/15"
                  onClick={() => void runConfirmScope(messages, "merged")}
                  disabled={busy}
                >
                  Include your suggestions
                </button>
              </div>
            )}

            {messages.length <= 1 && resumeStep === "idle" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-left text-[12px] text-ink/80 hover:border-orange hover:text-ink"
                    onClick={() => void send(s)}
                    disabled={busy}
                  >
                    {s}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-left text-[12px] text-ink/60 hover:border-orange hover:text-ink"
                  onClick={startResume}
                  disabled={busy}
                >
                  {RESUME_CHIP}
                </button>
              </div>
            )}

            {resumeStep === "form" && (
              <form
                onSubmit={(e) => void submitResumeLookup(e)}
                className="mr-auto w-full max-w-[95%] space-y-2 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm"
              >
                <p className="font-display text-[13px] font-semibold text-ink">Find your quote</p>
                <p className="text-[12px] leading-snug text-ink/55">
                  Email is required. Name is optional and helps if you have more than one quote.
                </p>
                <label className="block text-[12px] text-ink/70">
                  Name <span className="text-ink/40">(optional)</span>
                  <input
                    value={resumeForm.name}
                    onChange={(e) => setResumeForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-2 py-1.5 text-[14px] outline-none focus:border-orange"
                    disabled={busy}
                    autoComplete="name"
                  />
                </label>
                <label className="block text-[12px] text-ink/70">
                  Email
                  <input
                    required
                    type="email"
                    value={resumeForm.email}
                    onChange={(e) => setResumeForm((f) => ({ ...f, email: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-2 py-1.5 text-[14px] outline-none focus:border-orange"
                    disabled={busy}
                    autoComplete="email"
                  />
                  {resumeErrors.email && <span className="text-orange">{resumeErrors.email}</span>}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    className="flex-1 rounded-xl border border-ink/15 px-3 py-2 text-[13px] text-ink/70 hover:border-ink/30 disabled:opacity-40"
                    onClick={() => {
                      setResumeStep("idle");
                      setResumeErrors({});
                      setMessages((m) => [
                        ...m,
                        { role: "assistant", content: "No problem — ask anything, or describe a new project anytime.", kind: "plain" },
                      ]);
                    }}
                  >
                    Never mind
                  </button>
                  <button
                    type="submit"
                    disabled={busy}
                    className="flex-1 rounded-xl bg-orange px-3 py-2 font-display text-[13px] font-semibold text-ink disabled:opacity-40"
                  >
                    Look up
                  </button>
                </div>
              </form>
            )}

            {resumeStep === "picker" && resumeTickets.length > 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {resumeTickets.map((t) => (
                  <button
                    key={String(t.id)}
                    type="button"
                    className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1.5 text-left text-[12px] font-medium text-ink hover:border-orange hover:bg-orange/15"
                    onClick={() => void loadResumeTicket(t)}
                    disabled={busy}
                  >
                    {t.projectName}
                  </button>
                ))}
              </div>
            )}

            {showLeadForm && !lead && proposal && (
              <form
                onSubmit={(e) => void submitLead(e)}
                className="mr-auto w-full max-w-[95%] space-y-2 rounded-2xl border border-ink/10 bg-white p-3 shadow-sm"
              >
                <p className="font-display text-[13px] font-semibold text-ink">Your contact details</p>
                <p className="text-[12px] leading-snug text-ink/55">
                  We use these only to share your estimate and follow up if you want a consultation. Required before any pricing is shown.
                </p>
                <label className="block text-[12px] text-ink/70">
                  Full name
                  <input
                    required
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm((l) => ({ ...l, fullName: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-2 py-1.5 text-[14px] outline-none focus:border-orange"
                    disabled={busy}
                    autoComplete="name"
                  />
                  {leadErrors.fullName && <span className="text-orange">{leadErrors.fullName}</span>}
                </label>
                <label className="block text-[12px] text-ink/70">
                  Mobile number
                  <input
                    required
                    value={leadForm.mobile}
                    onChange={(e) => setLeadForm((l) => ({ ...l, mobile: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-2 py-1.5 text-[14px] outline-none focus:border-orange"
                    disabled={busy}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {leadErrors.mobile && <span className="text-orange">{leadErrors.mobile}</span>}
                </label>
                <label className="block text-[12px] text-ink/70">
                  Email
                  <input
                    required
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm((l) => ({ ...l, email: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-ink/15 px-2 py-1.5 text-[14px] outline-none focus:border-orange"
                    disabled={busy}
                    autoComplete="email"
                  />
                  {leadErrors.email && <span className="text-orange">{leadErrors.email}</span>}
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-xl bg-orange px-3 py-2 font-display text-[13px] font-semibold text-ink disabled:opacity-40"
                >
                  Show my estimate
                </button>
              </form>
            )}

            {awaitingLead && !showLeadForm && !lead && (
              <p className="mr-auto text-[12px] text-ink/45">Preparing the next step…</p>
            )}

            {proposal && lead && !showLeadForm && handoffStatus === "none" && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void runEstimate(messages, lead, proposal)}
                className="mr-auto rounded-full border border-ink/15 bg-white px-3 py-1.5 text-[12px] text-ink/80 hover:border-orange hover:text-ink disabled:opacity-40"
              >
                Show rough estimate again
              </button>
            )}

            {suggestHandoff && ticketDocId && handoffStatus === "none" && !busy && (
              <div className="mr-auto w-full max-w-[95%] space-y-2 rounded-2xl border border-orange/25 bg-orange/5 p-3">
                <p className="text-[13px] leading-snug text-ink/80">
                  Prefer to talk this through with someone from Infoloop? We can connect you with a sales executive in this chat.
                </p>
                <button
                  type="button"
                  className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white hover:bg-ink/90"
                  onClick={() => void requestSalesHandoff()}
                  disabled={busy}
                >
                  Connect me with sales
                </button>
              </div>
            )}

            {handoffStatus === "requested" && (
              <p className="mr-auto text-[12px] text-ink/55" aria-live="polite">
                Sales has been notified. Keep asking Ivy anything meanwhile.
              </p>
            )}
          </div>

          <form
            className="border-t border-ink/10 bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            {error && <p className="mb-2 text-[12px] text-orange">{error}</p>}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={800}
                placeholder={
                  showLeadForm && !lead
                    ? "Review the message above, then complete the form…"
                    : resumeStep === "form"
                      ? "Enter your email above…"
                      : handoffStatus === "requested"
                        ? "Ask Ivy while you wait…"
                        : handoffStatus === "active"
                          ? `Message ${handoffAgent?.name || "sales"}…`
                          : "Ask about Infoloop…"
                }
                className="min-w-0 flex-1 rounded-xl border border-ink/15 px-3 py-2 text-[14px] outline-none focus:border-orange"
                disabled={busy || (showLeadForm && !lead) || resumeStep === "form"}
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={busy || !input.trim() || (showLeadForm && !lead) || resumeStep === "form"}
                className="rounded-xl bg-orange px-3 py-2 font-display text-[13px] font-semibold text-ink disabled:opacity-40"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-[11px] text-ink/45">
              AI helper for Infoloop topics.{" "}
              <a href="/contact" className="underline hover:text-ink" onClick={() => trackEvent("chat_cta_click", { page: "/" })}>
                Talk to the team
              </a>
              .
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-ink px-4 py-3 font-display text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(10,10,10,0.25)] hover:bg-ink/90"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open) {
            closeChat();
            return;
          }
          setOpen(true);
          trackEvent("chat_opened", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
        }}
      >
        <span className="flex h-7 w-7 shrink-0 overflow-hidden rounded-full ring-2 ring-orange/90">
          <IvyAvatar size={28} />
        </span>
        {open ? "Hide chat" : "Ask Ivy"}
      </button>
    </div>
  );
}
