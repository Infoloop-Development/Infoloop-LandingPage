import { BAND_WORDS } from "@/content/home";

/**
 * 7Span's black "MAKING IT POSSIBLE" marquee band, carrying infoloop's
 * tagline. Repeats are separated by a small orange spark (a neutral glyph,
 * not the logo, like 7Span's asterisk). Continuous scroll, pauses on hover,
 * off under reduced motion; the first repeat is real content.
 */
export function TaglineBand({ data = BAND_WORDS }: { data?: typeof BAND_WORDS } = {}) {
  const reps = Array.from({ length: 10 });
  const line = (
    <span className="whitespace-nowrap font-display text-[28px] font-bold tracking-[-0.03em] text-white sm:text-[36px]">
      {data[0]} <span className="text-orange">{data[1]}</span>
    </span>
  );
  const half = (prefix: string, first = false) => (
    <>
      {first ? (
        <p className="flex items-center gap-10">
          {line}
          <Spark />
        </p>
      ) : (
        <div className="flex items-center gap-10" aria-hidden="true">
          {line}
          <Spark />
        </div>
      )}
      {reps.map((_, i) => (
        <div key={`${prefix}${i}`} className="flex items-center gap-10" aria-hidden="true">
          {line}
          <Spark />
        </div>
      ))}
    </>
  );
  return (
    <div className="marquee overflow-hidden bg-ink py-6 sm:py-8">
      <div className="marquee-track items-center gap-10 pr-10">
        {half("a", true)}
        {half("b")}
      </div>
    </div>
  );
}

/** Four-point spark separator. */
function Spark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-orange">
      <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5C16.9 12.6 12.6 16.9 12 22.5 11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" fill="currentColor" />
    </svg>
  );
}
