/** Browser speech synthesis (Web Speech API) — no extra deps. */

let speaking = false;
let voicesReady = false;
let cachedVoice: SpeechSynthesisVoice | null = null;

function scoreVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name;
  let score = 0;
  if (!voice.lang.startsWith("en")) return -1;
  if (voice.localService) score += 2;
  if (/premium|enhanced|neural|natural|wavenet|samantha|karen|moira|tessa|fiona|veena|google uk english female|google us english/i.test(name)) {
    score += 12;
  }
  if (/microsoft (aria|jenny|zira|sonia|libby)/i.test(name)) score += 10;
  if (/samantha|karen|daniel|alex|victoria|allison/i.test(name)) score += 8;
  if (/google.*english/i.test(name)) score += 5;
  if (/female|woman/i.test(name)) score += 1;
  if (/compact|basic|robot|espeak|fred/i.test(name)) score -= 8;
  return score;
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const ranked = voices
    .map((v) => ({ v, score: scoreVoice(v) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  cachedVoice = ranked[0]?.v || voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
  return cachedVoice;
}

function ensureVoicesLoaded() {
  if (typeof window === "undefined" || !window.speechSynthesis || voicesReady) return;
  const tryLoad = () => {
    if (window.speechSynthesis.getVoices().length) {
      voicesReady = true;
      cachedVoice = null;
      pickVoice();
    }
  };
  tryLoad();
  window.speechSynthesis.addEventListener("voiceschanged", tryLoad, { once: true });
}

/** Plain text for TTS — strip markdown and add natural pauses. */
export function speechPlainText(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^[-•]\s+/gm, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\n+/g, ". ")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/([.!?])\s*/g, "$1 ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function stopSpeech() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  speaking = false;
}

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function speakChunk(text: string, voice: SpeechSynthesisVoice | null, onEnd?: () => void) {
  const utter = new SpeechSynthesisUtterance(text);
  if (voice) {
    utter.voice = voice;
    utter.lang = voice.lang;
  } else {
    utter.lang = "en-US";
  }
  utter.rate = 0.9;
  utter.pitch = 0.96;
  utter.volume = 1;
  utter.onend = () => {
    speaking = false;
    onEnd?.();
  };
  utter.onerror = () => {
    speaking = false;
    onEnd?.();
  };
  speaking = true;
  window.speechSynthesis.speak(utter);
}

/** Split into sentence-sized chunks so pacing feels less robotic on long replies. */
function sentenceChunks(text: string, maxLen = 220): string[] {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const out: string[] = [];
  let buf = "";
  for (const p of parts) {
    if ((buf + " " + p).trim().length > maxLen && buf) {
      out.push(buf.trim());
      buf = p;
    } else {
      buf = buf ? `${buf} ${p}` : p;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out.length ? out : [text];
}

export function speakMessage(text: string, onEnd?: () => void) {
  if (!isSpeechSupported()) return;
  ensureVoicesLoaded();
  stopSpeech();

  const plain = speechPlainText(text);
  if (!plain) {
    onEnd?.();
    return;
  }

  const voice = pickVoice();
  const chunks = sentenceChunks(plain);
  let i = 0;

  const next = () => {
    if (i >= chunks.length) {
      onEnd?.();
      return;
    }
    const chunk = chunks[i++];
    speakChunk(chunk, voice, () => {
      if (i < chunks.length) {
        window.setTimeout(next, 180);
      } else {
        onEnd?.();
      }
    });
  };

  next();
}

export function getSpeechSpeaking() {
  return speaking;
}

export function ensureSpeechVoices() {
  ensureVoicesLoaded();
}
