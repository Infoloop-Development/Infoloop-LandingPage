/** Fire a named conversion to whatever analytics tools are loaded. */
export function trackEvent(name: string, props: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { ilTrack?: (n: string, p?: Record<string, string>) => void };
  if (typeof w.ilTrack === "function") w.ilTrack(name, props);
}
