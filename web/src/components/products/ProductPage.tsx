import type React from "react";
import { ArrowRight } from "@/components/ui";
import { ProductMark } from "@/components/ProductMark";
import { CaseTile } from "@/components/work/CaseTile";
import type { Product } from "@/content/products";

/* ------------------------------------------------------------------
   Product page, modelled on 7Span's Vepaar page:
   1. Banner: ink field with soft arcs, big two/three-line tagline, floating
      icon circles; the product mark tile overlaps the banner's bottom edge.
   2. H1 + one line, then a hatched strip with the demo button (7Span "Visit").
   3. The idea: H2, paragraph, big screen.
   4. Feature block one: four bordered feature cards + screen.
   5. Dark statement: screen + two-beat headline + paragraph.
   6. Feature block two (AI and automation): screen + cards, mirrored.
   7. Works with: bordered tiles.
   8. The impact: paragraph + four numbers (arrow + label).
   FAQ, proof card and CTA are rendered by the page.
   ------------------------------------------------------------------ */

const rv = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;
const HATCH_LIGHT = { backgroundImage: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px)" };

/** Small glyphs for the floating circles, themed per product. */
function Glyph({ kind }: { kind: string }) {
  const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#0A0A0A", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (kind) {
    case "clock": return <svg {...c}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" stroke="#F47B00" /></svg>;
    case "phone": return <svg {...c}><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 17h2" stroke="#F47B00" /></svg>;
    case "card": return <svg {...c}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 12h4M7 15h7" /><circle cx="16.5" cy="11.5" r="1.5" fill="#F47B00" stroke="none" /></svg>;
    case "sheet": return <svg {...c}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" /><path d="M13 14h4" stroke="#F47B00" /></svg>;
    case "factory": return <svg {...c}><path d="M4 20V10l5 3v-3l5 3v-3l6 3v7H4z" /><path d="M8 20v-3M13 20v-3" stroke="#F47B00" /></svg>;
    case "wrench": return <svg {...c}><path d="M14 4a5 5 0 0 0-4.6 6.9L4 16.3V20h3.7l5.4-5.4A5 5 0 0 0 20 10l-3 3-2-2 3-3a5 5 0 0 0-4-4z" /><circle cx="15" cy="9" r="1" fill="#F47B00" stroke="none" /></svg>;
    case "calendar": return <svg {...c}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3v4M16 3v4" /><rect x="8" y="13" width="3" height="3" fill="#F47B00" stroke="none" /></svg>;
    case "car": return <svg {...c}><path d="M5 15l1.5-5A2 2 0 0 1 8.4 8.5h7.2a2 2 0 0 1 1.9 1.5L19 15v4h-2v-2H7v2H5v-4z" /><circle cx="8" cy="15" r="1" fill="#F47B00" stroke="none" /><circle cx="16" cy="15" r="1" fill="#F47B00" stroke="none" /></svg>;
    case "message": return <svg {...c}><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 10h8" stroke="#F47B00" /></svg>;
    case "receipt": return <svg {...c}><path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3z" /><path d="M9 8h6M9 12h6" stroke="#F47B00" /></svg>;
    case "book": return <svg {...c}><path d="M4 5h6a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4V5z" /><path d="M20 5h-6a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h6V5z" fill="#F47B00" stroke="none" /></svg>;
    case "cap": return <svg {...c}><path d="M3 9l9-4 9 4-9 4-9-4z" /><path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" /><path d="M21 9v5" stroke="#F47B00" /></svg>;
    case "camera": return <svg {...c}><rect x="3" y="7" width="13" height="10" rx="2" /><path d="M16 11l5-3v8l-5-3" /><circle cx="9" cy="12" r="1.5" fill="#F47B00" stroke="none" /></svg>;
    case "shield": return <svg {...c}><path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" stroke="#F47B00" /></svg>;
    case "cert": return <svg {...c}><rect x="4" y="4" width="16" height="12" rx="2" /><path d="M8 9h8M8 12h5" /><circle cx="15" cy="18" r="2.5" fill="#F47B00" stroke="none" /></svg>;
    default: return <svg {...c}><circle cx="12" cy="12" r="6" /></svg>;
  }
}

const ICONS: Record<Product["tile"], string[]> = {
  attendance: ["clock", "card", "phone", "sheet", "factory", "calendar"],
  garage: ["car", "wrench", "calendar", "message", "receipt", "phone"],
  lms: ["book", "cap", "camera", "cert", "sheet", "phone"],
  verko: ["shield", "sheet", "calendar", "cert", "card", "message"],
};
// Kept in the outer bands so they never sit on the tagline.
const SPOTS = [
  "left-[6%] top-[16%]", "left-[16%] top-[52%]", "left-[23%] top-[12%]",
  "right-[6%] top-[18%]", "right-[16%] top-[54%]", "right-[8%] top-[78%]",
];

/** 1 + 2. Banner, mark tile, H1, one line, hatched strip with the demo button. */
export function ProductHero({ p }: { p: Product }) {
  return (
    <header aria-labelledby="product-h1">
      {/* Banner */}
      <div className="relative overflow-hidden bg-ink text-white">
        {/* soft concentric arcs, like Vepaar's rings */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.14]">
          {[420, 640, 860, 1080].map((d) => (
            <span key={d} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" style={{ width: d, height: d }} />
          ))}
        </div>
        {/* floating icon circles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          {ICONS[p.tile].map((k, i) => (
            <span key={k} className={`absolute flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] ${SPOTS[i]}`} style={{ animation: `float 6s ease-in-out ${i * 0.7}s infinite` }}>
              <Glyph kind={k} />
            </span>
          ))}
        </div>
        <div className="container-x relative flex min-h-[300px] items-center justify-center py-16 sm:min-h-[360px]">
          <p className="text-center font-display text-[36px] font-bold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[52px] lg:text-[60px] hero-in">
            {p.tagline.map((line, i) => (
              <span key={line} className={`block ${i === p.tagline.length - 1 ? "text-orange" : "text-white"}`} style={{ transform: `rotate(-4deg) translateX(${(i - (p.tagline.length - 1) / 2) * 18}px)` }}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Mark tile overlapping the banner + H1 */}
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[208px_1fr] md:gap-12">
          {/* Overlap equals the padding, so the mark always sits on white below the banner edge (7Span). */}
          <div className="relative z-10 -mt-8 h-[136px] w-[136px] border border-ink bg-white p-8 md:-mt-12 md:h-[208px] md:w-[208px] md:p-12">
            <div className="flex h-full w-full items-center justify-center [&_svg]:h-full [&_svg]:w-full">
              <ProductMark name={p.name} size={112} />
            </div>
          </div>
          <div className="pb-10 md:pt-8">
            <p className="eyebrow text-ink/50 hero-in">{p.kicker}</p>
            <h1 id="product-h1" className="display-h2 mt-3 max-w-4xl text-ink hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
              {p.h1}
            </h1>
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink/75 hero-in" style={{ "--d": "160ms" } as React.CSSProperties}>
              {p.lede}
            </p>
          </div>
        </div>
      </div>

      {/* Hatched strip with the "Visit" link to the product's own site (7Span "Visit"). Shown only when a URL is set. */}
      <div className="border-y border-line" style={HATCH_LIGHT}>
        <div className="container-x flex min-h-[64px] items-center justify-end py-3">
          {p.website && (
            <a href={p.website} target="_blank" rel="noopener noreferrer" className="btn btn-ink px-6 py-3">
              Visit {p.name}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 14 14 6M7 6h7v7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

/** Screen: real screenshot from the CMS or the drawn tile. */
function Screen({ p, index = 0, className = "" }: { p: Product; index?: number; className?: string }) {
  const s = p.screens?.[index];
  return <CaseTile kind={p.tile} cover={s ? { url: s.url, alt: s.alt } : undefined} size="hero" rounded={false} className={className} />;
}

/** 3. The idea */
export function ProductIdea({ p }: { p: Product }) {
  return (
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="idea-h2">
      <h2 id="idea-h2" className="display-h3 max-w-4xl text-ink reveal">{p.idea.h2}</h2>
      <p className="mt-4 max-w-4xl text-[16.5px] leading-relaxed text-ink/80 reveal" style={rv(60)}>{p.idea.paragraph}</p>
      <div className="mt-10 border border-line p-3 sm:p-5 reveal" style={rv(120)}>
        <Screen p={p} index={0} className="min-h-[320px] sm:min-h-[440px]" />
      </div>
    </section>
  );
}

/** 4 and 6. Feature block: cards + screen (flip swaps sides) */
export function FeatureBlock({ h2, sub, features, p, screenIndex, flip = false, id }: { h2: string; sub: string; features: Product["block1"]["features"]; p: Product; screenIndex: number; flip?: boolean; id: string }) {
  return (
    <section id={id} className="container-x pt-14 sm:pt-20" aria-labelledby={`${id}-h2`}>
      <h2 id={`${id}-h2`} className="display-h3 max-w-4xl text-ink reveal">{h2}</h2>
      <p className="mt-3 max-w-4xl text-[16.5px] leading-relaxed text-ink/75 reveal" style={rv(60)}>{sub}</p>
      <div className={`mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12 ${flip ? "" : ""}`}>
        <ul className={`space-y-0 lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
          {features.map((f, i) => (
            <li key={f.h3} className="-mt-px border border-line bg-white p-6 reveal" style={rv(i * 60)}>
              <h3 className="font-display text-[16.5px] font-bold text-ink">{f.h3}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink/75">{f.body}</p>
            </li>
          ))}
        </ul>
        <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""} reveal`} style={rv(120)}>
          <div className="h-full border border-line p-3 sm:p-4">
            <Screen p={p} index={screenIndex} className="h-full min-h-[300px] lg:min-h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** 5. Dark statement (Vepaar: "Selling was just the first step. Managing came next.") */
export function DarkStatement({ p }: { p: Product }) {
  return (
    <section className="mt-14 bg-ink text-white sm:mt-20" aria-labelledby="dark-h2">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:gap-14 sm:py-20">
        <div className="lg:col-span-6 reveal">
          <div className="border border-white/25 p-3 sm:p-4">
            <Screen p={p} index={2} className="min-h-[280px]" />
          </div>
        </div>
        <div className="lg:col-span-6 reveal" style={rv(80)}>
          <h2 id="dark-h2" className="inline-block bg-white px-4 py-3 font-display text-[21px] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:px-5 sm:py-4 sm:text-[32px]">
            {p.dark.h2}
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-gray-40">{p.dark.paragraph}</p>
        </div>
      </div>
    </section>
  );
}

/** 7. Works with (Vepaar "Integrations" row) */
export function WorksWith({ p }: { p: Product }) {
  if (!p.worksWith?.length) return null;
  return (
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="works-h2">
      <h2 id="works-h2" className="display-h3 text-ink reveal">Works with</h2>
      <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink/75 reveal" style={rv(60)}>What {p.name} connects to and runs on, out of the box.</p>
      <ul className="mt-8 grid gap-px border border-line bg-line reveal" style={{ ...rv(120), gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {p.worksWith.map((w) => (
          <li key={w} className="flex min-h-[112px] items-center justify-center bg-white p-5 text-center font-display text-[14px] font-semibold text-ink">
            {w}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 8. The impact (Vepaar): paragraph + four numbers */
export function ProductImpact({ p }: { p: Product }) {
  return (
    <section className="container-x pt-14 sm:pt-20" aria-labelledby="impact-h2">
      <h2 id="impact-h2" className="display-h3 text-ink reveal">The impact</h2>
      <p className="mt-3 max-w-4xl text-[16.5px] leading-relaxed text-ink/80 reveal" style={rv(60)}>{p.impact.paragraph}</p>
      <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 reveal" style={rv(120)}>
        {p.impact.metrics.map((m) => (
          <li key={m.label} className="pl-7">
            <p className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] tabular-nums text-ink sm:text-[52px]">{m.value}</p>
            <p className="relative mt-4 max-w-[26ch] text-[14.5px] leading-snug text-ink/70">
              <span aria-hidden="true" className="absolute -left-7 top-[5px] h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-orange" />
              {m.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Products index row (7Span products list: mark | name + line) */
export function ProductRow({ p }: { p: Product }) {
  return (
    <li>
      <a href={`/products/${p.slug}`} className="group grid grid-cols-[120px_1fr] border border-ink bg-white transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange sm:grid-cols-[160px_1fr]">
        <span className="flex items-center justify-center border-r border-ink p-6" aria-hidden="true">
          <ProductMark name={p.name} size={72} />
        </span>
        <span className="px-6 py-6 sm:px-8 sm:py-8">
          <h2 className="font-display text-[22px] font-bold leading-tight text-ink group-hover:text-orange">{p.name}</h2>
          <span className="mt-1 block text-[15px] text-ink/70">{p.kicker}</span>
          <span className="mt-3 block max-w-2xl text-[14.5px] leading-relaxed text-ink/75">{p.lede}</span>
          <span className="link-arrow mt-4 inline-flex text-[14px] text-ink group-hover:text-orange">
            See {p.name} <ArrowRight />
          </span>
        </span>
      </a>
    </li>
  );
}
