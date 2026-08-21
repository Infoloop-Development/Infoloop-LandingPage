
type MarkProps = {
  /** Height in px. Brand minimum on screen is 24. */
  size?: number;
  /** "ink" for light surfaces, "white" for dark surfaces. Accent stays orange. */
  tone?: "ink" | "white";
  /** Play the brand reveal (bars draw in, accent lands last). */
  animate?: boolean;
  className?: string;
};

/**
 * The infoloop mark: five horizontal bars, fixed proportions, accent always
 * on bar 2. Geometry is copied verbatim from the SVG masters in the brand kit
 * (02-logos/svg/icon-primary.svg). Never redraw by eye.
 */
export function Mark({ size = 28, tone = "ink", animate = false, className = "" }: MarkProps) {
  const bar = tone === "ink" ? "#0A0A0A" : "#FFFFFF";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`${animate ? "mark-animate" : ""} ${className}`}
    >
      <rect x="51" y="38" width="154" height="26" rx="8" fill={bar} />
      <rect x="70.5" y="76" width="115" height="26" rx="8" fill="#F47B00" />
      <rect x="25.5" y="114" width="205" height="26" rx="8" fill={bar} />
      <rect x="85.5" y="152" width="85" height="26" rx="8" fill={bar} />
      <rect x="51" y="190" width="154" height="26" rx="8" fill={bar} />
    </svg>
  );
}

type LockupProps = {
  tone?: "ink" | "white";
  /** Two-tone is the default on brand surfaces. Mono for dense contexts. */
  variant?: "twotone" | "mono";
  /** Wordmark point size in px. Icon is 1.6x, gap 0.45x per brand rules. */
  wordmarkSize?: number;
  href?: string;
  className?: string;
};

/**
 * Horizontal lockup: mark + "infoloop" wordmark set in DM Sans 700.
 * Lockup anatomy is fixed: icon height 1.6x wordmark size, gap 0.45x.
 */
export function Lockup({
  tone = "ink",
  variant = "twotone",
  wordmarkSize = 22,
  href = "/",
  className = "",
}: LockupProps) {
  const text = tone === "ink" ? "text-ink" : "text-white";
  const loop = variant === "twotone" ? "text-orange" : text;
  const iconSize = Math.round(wordmarkSize * 1.6);
  const gap = Math.round(wordmarkSize * 0.45);
  const inner = (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
    >
      <Mark size={iconSize} tone={tone} />
      <span
        className={`font-display font-bold leading-none tracking-[-0.02em] ${text}`}
        style={{ fontSize: wordmarkSize }}
      >
        info<span className={loop}>loop</span>
      </span>
    </span>
  );
  if (!href) return inner;
  return (
    <a href={href} aria-label="Infoloop home" className="inline-flex shrink-0 items-center max-lg:min-h-11">
      {inner}
    </a>
  );
}
