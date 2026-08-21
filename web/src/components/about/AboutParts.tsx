import type { Priority, TeamMember, Value, ValueKey } from "@/content/about";
import { SocialIcon } from "@/components/Footer";

/**
 * Pieces of the About page that are drawn rather than photographed: the
 * value tiles (7Span uses colourful abstract art; ours stays in ink, orange,
 * mist and hatch), the priority thumbnails, the road under "Life @", the
 * team photo tiles and the small country flags. All server-rendered SVG,
 * no islands.
 */

const INK = "#0A0A0A";
const ORANGE = "#F47B00";
const MIST = "#E8E8E5";
const WHITE = "#FFFFFF";

/* ---------- Values rail ---------- */

export function ValueArt({ k }: { k: ValueKey }) {
  const common = { width: "100%", height: "100%", viewBox: "0 0 384 220", preserveAspectRatio: "xMidYMid slice", "aria-hidden": true as const };
  const hatchId = `vh-${k}`;
  const hatch = (
    <defs>
      <pattern id={hatchId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill={WHITE} />
        <rect width="1.5" height="8" fill={INK} opacity="0.55" />
      </pattern>
    </defs>
  );
  switch (k) {
    case "clarity":
      // Two circles overlapping: a lens. Clear where they meet.
      return (
        <svg {...common}>
          {hatch}
          <rect width="384" height="220" fill={MIST} />
          <circle cx="150" cy="110" r="86" fill={ORANGE} />
          <circle cx="240" cy="110" r="86" fill={`url(#${hatchId})`} stroke={INK} strokeWidth="2" />
          <path d="M195 36 A86 86 0 0 1 195 184 A86 86 0 0 1 195 36 Z" fill={INK} />
        </svg>
      );
    case "ownership":
      // A loop that comes back on itself: we return, we stay.
      return (
        <svg {...common}>
          {hatch}
          <rect width="384" height="220" fill={INK} />
          <rect x="40" y="40" width="304" height="140" fill={`url(#${hatchId})`} />
          <circle cx="170" cy="110" r="58" fill="none" stroke={ORANGE} strokeWidth="26" />
          <circle cx="170" cy="110" r="71" fill="none" stroke={INK} strokeWidth="2" />
          <circle cx="170" cy="110" r="45" fill="none" stroke={INK} strokeWidth="2" />
          <circle cx="170" cy="52" r="12" fill={WHITE} stroke={INK} strokeWidth="2" />
          <rect x="268" y="88" width="44" height="44" fill={ORANGE} stroke={INK} strokeWidth="2" />
        </svg>
      );
    case "transparency":
      // Stacked panes: everything visible.
      return (
        <svg {...common}>
          {hatch}
          <rect width="384" height="220" fill={ORANGE} />
          <rect x="70" y="30" width="180" height="120" fill={WHITE} stroke={INK} strokeWidth="2" />
          <rect x="120" y="60" width="180" height="120" fill={`url(#${hatchId})`} stroke={INK} strokeWidth="2" />
          <rect x="170" y="90" width="180" height="120" fill={INK} />
          <rect x="220" y="120" width="130" height="90" fill={MIST} stroke={INK} strokeWidth="2" />
        </svg>
      );
    case "simplicity":
      // One square, one dot. Nothing more than needed.
      return (
        <svg {...common}>
          <rect width="384" height="220" fill={WHITE} />
          <rect x="0" y="0" width="384" height="220" fill={MIST} />
          <rect x="112" y="30" width="160" height="160" fill={WHITE} stroke={INK} strokeWidth="2" />
          <circle cx="192" cy="110" r="44" fill={ORANGE} />
          <rect x="0" y="176" width="384" height="44" fill={INK} />
        </svg>
      );
    case "speed":
      // Diagonal bars racing right.
      return (
        <svg {...common}>
          {hatch}
          <rect width="384" height="220" fill={INK} />
          <path d="M20 40 h150 l40 40 h-150 z" fill={ORANGE} />
          <path d="M60 100 h190 l40 40 h-190 z" fill={WHITE} />
          <path d="M100 160 h230 l30 30 h-230 z" fill={`url(#${hatchId})`} stroke={WHITE} strokeWidth="1.5" />
          <circle cx="330" cy="60" r="26" fill={ORANGE} />
        </svg>
      );
    case "craft":
      // A grid of small squares, one picked out: attention to the small thing.
      return (
        <svg {...common}>
          {hatch}
          <rect width="384" height="220" fill={WHITE} />
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={22 + c * 44} y={20 + r * 38} width="30" height="30" fill={r === 2 && c === 4 ? ORANGE : (r + c) % 3 === 0 ? INK : MIST} stroke={INK} strokeWidth={r === 2 && c === 4 ? 2 : 0} />
            )),
          )}
        </svg>
      );
    case "partnership":
    default:
      // Two shapes leaning on each other.
      return (
        <svg {...common}>
          {hatch}
          <rect width="384" height="220" fill={MIST} />
          <path d="M40 200 L150 20 L260 200 Z" fill={INK} />
          <path d="M150 200 L260 40 L370 200 Z" fill={ORANGE} stroke={INK} strokeWidth="2" />
          <path d="M150 200 L205 110 L260 200 Z" fill={`url(#${hatchId})`} stroke={INK} strokeWidth="2" />
          <circle cx="90" cy="60" r="20" fill={WHITE} stroke={INK} strokeWidth="2" />
        </svg>
      );
  }
}

/** Horizontal card rail, 7Span "7 Values We Hold": art on top, title, grey
    tag line, paragraph. Native scroll with snap; the first card lines up
    with the container edge, the last card can scroll fully into view. */
export function ValuesRail({ items }: { items: Value[] }) {
  const pad = "max(clamp(1.25rem, 4vw, 2.5rem), calc((100% - 1280px) / 2 + clamp(1.25rem, 4vw, 2.5rem)))";
  return (
    <div className="mt-10 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]" role="region" tabIndex={0} aria-label="Our values, scroll sideways">
      <ul className="flex snap-x snap-mandatory gap-4 pr-6" style={{ paddingLeft: pad }}>
        {items.map((v) => (
          <li key={v.key} className="w-[min(84vw,384px)] shrink-0 snap-start border border-ink bg-white">
            <div className="aspect-[384/220] border-b border-ink">
              <ValueArt k={v.key} />
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink">{v.title}</h3>
              <p className="mt-1.5 text-[15px] text-ink/60">{v.tag}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink/80">{v.body}</p>
            </div>
          </li>
        ))}
        <li aria-hidden="true" className="w-px shrink-0" style={{ paddingLeft: pad }} />
      </ul>
    </div>
  );
}

/* ---------- Life @ band road ---------- */

/** Perspective road under the "Life @" button (7Span draws one too): two
    orange edges, a dashed centre line, vanishing to the middle. */
export function RoadArt() {
  return (
    <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="block h-[160px] w-full sm:h-[220px]" aria-hidden="true">
      <defs>
        <linearGradient id="road-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A0A0A" />
          <stop offset="1" stopColor="#3a3a37" />
        </linearGradient>
      </defs>
      <path d="M720 0 L1440 250 L1440 260 L0 260 L0 250 Z" fill="url(#road-g)" />
      <path d="M708 0 L0 232 L0 260 L60 260 L722 6 Z" fill={ORANGE} />
      <path d="M732 0 L1440 232 L1440 260 L1380 260 L718 6 Z" fill={ORANGE} />
      {[[8, 3], [26, 5], [50, 8], [82, 12], [124, 18], [178, 26]].map(([y, w], i) => (
        <rect key={i} x={720 - w} y={y} width={w * 2} height={Math.max(4, w * 1.6)} fill={ORANGE} />
      ))}
      <path d="M700 232 L740 232 L760 260 L680 260 Z" fill={ORANGE} />
    </svg>
  );
}

/* ---------- Core priorities ---------- */

/** Small square thumbnails, one glyph each (7Span uses meme GIFs; ours are
    still tiles that read at a glance). */
export function PriorityThumb({ k }: { k: Priority["key"] }) {
  const base = { width: 64, height: 64, viewBox: "0 0 64 64", "aria-hidden": true as const };
  switch (k) {
    case "people":
      return (
        <svg {...base}>
          <rect width="64" height="64" fill={ORANGE} />
          <circle cx="24" cy="26" r="8" fill={INK} />
          <circle cx="42" cy="24" r="6" fill={WHITE} stroke={INK} strokeWidth="2" />
          <path d="M8 52 a16 16 0 0 1 32 0 z" fill={INK} />
          <path d="M34 52 a12 12 0 0 1 24 0 z" fill={WHITE} stroke={INK} strokeWidth="2" />
        </svg>
      );
    case "clarity":
      return (
        <svg {...base}>
          <rect width="64" height="64" fill={INK} />
          <circle cx="32" cy="32" r="14" fill={WHITE} />
          <circle cx="32" cy="32" r="6" fill={ORANGE} />
          <path d="M32 6 v8 M32 50 v8 M6 32 h8 M50 32 h8" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "door":
      return (
        <svg {...base}>
          <rect width="64" height="64" fill={MIST} />
          <rect x="16" y="10" width="26" height="46" fill={WHITE} stroke={INK} strokeWidth="2" />
          <path d="M42 10 L54 16 V50 L42 56 Z" fill={ORANGE} stroke={INK} strokeWidth="2" />
          <circle cx="36" cy="34" r="2.5" fill={INK} />
        </svg>
      );
    case "words":
    default:
      return (
        <svg {...base}>
          <rect width="64" height="64" fill={WHITE} />
          <rect x="10" y="14" width="44" height="30" rx="3" fill={ORANGE} stroke={INK} strokeWidth="2" />
          <path d="M20 44 L18 54 L30 44 Z" fill={ORANGE} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 24 h24 M20 32 h16" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ---------- Team ---------- */

export function Flag({ c }: { c: NonNullable<TeamMember["country"]> }) {
  const label = c === "in" ? "India" : "United States";
  return (
    <span className="inline-block" role="img" aria-label={label} title={label}>
      {c === "in" ? (
        <svg width="36" height="24" viewBox="0 0 36 24" aria-hidden="true">
          <rect width="36" height="8" fill="#FF9933" />
          <rect y="8" width="36" height="8" fill="#FFFFFF" />
          <rect y="16" width="36" height="8" fill="#138808" />
          <circle cx="18" cy="12" r="3" fill="none" stroke="#000080" strokeWidth="0.9" />
          <circle cx="18" cy="12" r="0.6" fill="#000080" />
        </svg>
      ) : (
        <svg width="36" height="24" viewBox="0 0 36 24" aria-hidden="true">
          <rect width="36" height="24" fill="#FFFFFF" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} y={i * (24 / 13) * 2} width="36" height={24 / 13} fill="#B22234" />
          ))}
          <rect width="15" height={(24 / 13) * 7} fill="#3C3B6E" />
        </svg>
      )}
    </span>
  );
}

/** Photo tile: orange ground with an angled ink wedge behind the head, like
    7Span's red tile. A neutral silhouette until a real photo is supplied. */
export function TeamPhoto({ m }: { m: TeamMember }) {
  return (
    <div className="relative aspect-square w-[144px] overflow-hidden border border-ink bg-orange" aria-hidden={m.photo ? undefined : true}>
      <span className="absolute inset-0" style={{ background: "linear-gradient(115deg, transparent 58%, rgba(10,10,10,0.18) 58%)" }} />
      {m.photo ? (
        <img src={m.photo} alt={m.name} width={144} height={144} loading="lazy" decoding="async" className="relative h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 144 144" className="relative h-full w-full" aria-hidden="true">
          <circle cx="72" cy="56" r="26" fill={INK} opacity="0.85" />
          <path d="M22 144 a50 50 0 0 1 100 0 z" fill={INK} opacity="0.85" />
        </svg>
      )}
    </div>
  );
}

export function TeamCard({ m }: { m: TeamMember }) {
  const page = m.profile?.slug ? `/${m.profile.slug}` : undefined;
  const icons: { label: string; href: string; ext: boolean; glyph: "linkedin" | "x" | "page" }[] = [
    ...(m.linkedin ? [{ label: `${m.name} on LinkedIn`, href: m.linkedin, ext: true, glyph: "linkedin" as const }] : []),
    ...(m.x ? [{ label: `${m.name} on X`, href: m.x, ext: true, glyph: "x" as const }] : []),
    ...(page ? [{ label: `${m.name}, personal page`, href: page, ext: false, glyph: "page" as const }] : []),
  ];
  return (
    <li className={`border border-ink bg-white p-8 ${m.placeholder ? "border-dashed" : ""}`}>
      <div className="flex items-start gap-4">
        <TeamPhoto m={m} />
        {m.placeholder && (
          <span className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60 sm:inline">
            Photo, name and role to come
          </span>
        )}
      </div>
      <h3 className="mt-6 font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink">
        {page ? (
          <a href={page} className="hover:text-orange">
            {m.name}
          </a>
        ) : (
          m.name
        )}
      </h3>
      <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">{m.role}</p>
      {/* LinkedIn, X and the personal page (7Span shows a QR here; ours are plain links, per Nimit) */}
      {icons.length > 0 && (
        <ul className="mt-6 flex items-center gap-2" aria-label={`Links for ${m.name}`}>
          {icons.map((ic) => (
            <li key={ic.glyph}>
              <a
                href={ic.href}
                target={ic.ext ? "_blank" : undefined}
                rel={ic.ext ? "noopener noreferrer" : undefined}
                aria-label={ic.label}
                title={ic.label}
                className="flex h-9 w-9 items-center justify-center border border-ink text-ink transition-colors hover:bg-orange"
              >
                {ic.glyph === "page" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="9" cy="11" r="2.2" />
                    <path d="M5.5 17a3.5 3.5 0 0 1 7 0" />
                    <path d="M14 10h4M14 13.5h4" />
                  </svg>
                ) : (
                  <span className="[&>svg]:h-4 [&>svg]:w-4">
                    <SocialIcon name={ic.glyph} />
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** Small orange cross before a "do not" line on the brand page (7Span uses a red ❌). */
export function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <path d="M3 3l10 10M13 3L3 13" stroke="#F47B00" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
