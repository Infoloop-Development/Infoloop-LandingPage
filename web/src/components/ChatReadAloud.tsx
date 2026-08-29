import { useEffect, useState } from "react";
import { getSpeechSpeaking, ensureSpeechVoices, isSpeechSupported, speakMessage, stopSpeech, speechPlainText } from "@/lib/chat-speech";

type Props = { text: string; className?: string };

/** Speaker control — uses the browser's built-in voice (Web Speech API). */
export function ChatReadAloud({ text, className = "" }: Props) {
  const [active, setActive] = useState(false);
  const [supported] = useState(() => isSpeechSupported());

  useEffect(() => {
    ensureSpeechVoices();
    return () => stopSpeech();
  }, []);

  if (!supported || !speechPlainText(text)) return null;

  return (
    <button
      type="button"
      title="Read aloud"
      aria-label="Read aloud"
      className={`relative group/read inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/35 transition hover:bg-ink/5 hover:text-ink/70 ${active ? "bg-orange/15 text-orange" : ""} ${className}`}
      onClick={() => {
        if (active || getSpeechSpeaking()) {
          stopSpeech();
          setActive(false);
          return;
        }
        setActive(true);
        speakMessage(text, () => setActive(false));
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11 5L6 9H3v6h3l5 4V5zm4.5 2.5a7 7 0 010 9M16 8a10 10 0 010 8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pointer-events-none absolute -top-7 right-0 hidden rounded bg-ink px-1.5 py-0.5 text-[10px] text-white group-hover/read:block">
        Read aloud
      </span>
    </button>
  );
}
