import { useEffect, useId, useRef, useState } from "react";
import { Mark } from "@/components/Logo";
import { trackEvent } from "@/lib/track";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Infoloop do?",
  "How fast can a project go live?",
  "What products do you offer?",
];

const SESSION_CAP = 20;

/**
 * Branded Infoloop assistant (Groq-backed via /api/chat). Site-wide floating panel.
 */
export function Chatbot() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m the Infoloop assistant. Ask about what we build, how we work, products, or how to get in touch. For a quote, I’ll point you to a short call.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    inputRef.current?.focus();
  }, [open, messages, busy]);

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || busy) return;
    if (messages.filter((m) => m.role === "user").length >= SESSION_CAP) {
      setError("You’ve reached the chat limit for this visit. Please use the contact form.");
      return;
    }
    setError("");
    setInput("");
    const nextHistory = [...messages, { role: "user" as const, content: message }];
    setMessages(nextHistory);
    setBusy(true);
    trackEvent("chat_message", { page: typeof window !== "undefined" ? window.location.pathname : "/" });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: nextHistory.filter((m) => m.role === "user" || m.role === "assistant").slice(0, -1).slice(-8),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        setError(data.error || "Something went wrong. Try again or use /contact.");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.error || "I couldn’t reply just now. You can reach the team at /contact or hi@infoloop.co.",
          },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
      }
    } catch {
      setError("Network error. Please try again or use /contact.");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn’t reach the server. Please try again or contact us at /contact." },
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
          aria-label="Infoloop assistant"
          className="pointer-events-auto flex h-[min(560px,72vh)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_20px_50px_rgba(10,10,10,0.18)]"
        >
          <header className="flex items-center gap-3 bg-ink px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-ink">
              <Mark size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-semibold leading-tight">Infoloop assistant</p>
              <p className="text-[12px] text-white/65">We build. We run.</p>
            </div>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-[13px] text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              Close
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}`}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-[14px] leading-relaxed ${
                  m.role === "user" ? "ml-auto bg-ink text-white" : "mr-auto border border-ink/10 bg-white text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <p className="mr-auto text-[13px] text-ink/50" aria-live="polite">
                Thinking…
              </p>
            )}
            {messages.length <= 1 && (
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
              </div>
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
                placeholder="Ask about Infoloop…"
                className="min-w-0 flex-1 rounded-xl border border-ink/15 px-3 py-2 text-[14px] outline-none focus:border-orange"
                disabled={busy}
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
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
          const next = !open;
          setOpen(next);
          if (next) trackEvent("chat_opened", { page: typeof window !== "undefined" ? window.location.pathname : "/" });
        }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange text-ink">
          <Mark size={14} />
        </span>
        {open ? "Hide chat" : "Ask Infoloop"}
      </button>
    </div>
  );
}
