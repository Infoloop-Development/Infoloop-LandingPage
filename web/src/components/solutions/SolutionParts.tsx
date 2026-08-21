import type React from "react";
import type { SolutionGroup, Quote, TechRow, BeforeAfter } from "@/content/solutions";
import type { NavLink } from "@/content/site";
import { Mark } from "@/components/Logo";
import { CaseTile } from "@/components/work/CaseTile";
import { ArrowUpRight, Hi } from "@/components/ui";
import { CtaPanel as SiteCta } from "@/components/sections/CtaPanel";

/**
 * Sections of a Solutions group page, in 7Span's service-page format.
 * Server-rendered, no islands. Hatch and borders follow the rest of the site.
 */
const HATCH: React.CSSProperties = { backgroundImage: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px)" };

/* ---------- Hero ---------- */

/** Structural props so the same sections serve group pages and service pages. */
export type HeroData = Pick<SolutionGroup, "h1" | "lede" | "button" | "proof">;
export type WhyData = Pick<SolutionGroup, "why">;
export type IndustriesData = Pick<SolutionGroup, "industries">;
export type CtaData = Pick<SolutionGroup, "cta">;

export function SolutionHero({ g }: { g: HeroData }) {
  return (
    <section aria-labelledby="sol-h1">
      <div className="container-x pt-12 sm:pt-16">
        <h1 id="sol-h1" className="display-h2 max-w-4xl text-ink hero-in">
          <Hi text={g.h1} />
        </h1>
        <p className="lede mt-4 max-w-4xl text-ink/80 hero-in" style={{ "--d": "60ms" } as React.CSSProperties}>
          {g.lede}
        </p>
        <a href="/contact" className="btn btn-ink mt-8 hero-in" style={{ "--d": "120ms" } as React.CSSProperties}>
          {g.button}
        </a>
      </div>
      {/* Proof panel over the hatched band. 7Span puts a team video here; we show measured
          outcomes and one drawn case screen instead (proof over faces, per Nimit). */}
      <div className="relative mt-12 pb-12 sm:mt-14 sm:pb-16">
        <div className="absolute inset-x-0 bottom-0 h-[42%] border-t border-ink" style={HATCH} aria-hidden="true" />
        <div className="container-x relative hero-fade" style={{ "--d": "180ms" } as React.CSSProperties}>
          <div className="grid border border-ink bg-white lg:grid-cols-12">
            <ul className="grid divide-y divide-white/15 bg-ink text-white lg:col-span-5" aria-label="Measured results">
              {g.proof.metrics.map((m) => (
                <li key={m.value + m.label}>
                  <a href={m.href} className="group flex items-baseline gap-4 px-7 py-6 transition-colors hover:bg-charcoal sm:px-8">
                    <span className="display-stat shrink-0 text-white">
                      <span className="text-orange">{m.value.match(/^[+$<-]/)?.[0] ?? ""}</span>
                      {m.value.replace(/^[+$<-]/, "")}
                    </span>
                    <span className="text-[14.5px] leading-snug text-white/75 group-hover:text-white">{m.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col border-t border-ink lg:col-span-7 lg:border-l lg:border-t-0">
              <div className="flex-1 p-3 sm:p-4">
                <CaseTile kind={g.proof.tile} size="hero" rounded={false} className="h-full min-h-[260px]" />
              </div>
              <a href={g.proof.href} className="flex items-center justify-between gap-4 border-t border-ink px-5 py-3.5 text-[14px] text-ink transition-colors hover:bg-paper hover:text-orange">
                <span>{g.proof.caption}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- What we offer: rounded pill cards on a hatched field (7Span) ---------- */

/** `linked`: true links every card; an array links only the hrefs that exist as pages (the rest stay plain until built). */
export function OfferGrid({ g, linked = false }: { g: SolutionGroup; linked?: boolean | string[] }) {
  const isLinked = (href: string) => (Array.isArray(linked) ? linked.includes(href) : linked);
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="offer-h2">
      <h2 id="offer-h2" className="display-h2 text-ink reveal">{g.offer.h2}</h2>
      <p className="lede mt-3 max-w-3xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{g.offer.lede}</p>
      <ul className="mt-8 grid gap-2 rounded-[40px] p-2 sm:grid-cols-2 lg:grid-cols-3 reveal" style={{ ...HATCH, "--reveal-delay": "120ms" } as React.CSSProperties}>
        {g.offer.items.map((o) => {
          const inner = (
            <>
              <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.01em] text-ink">{o.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{o.body}</p>
            </>
          );
          return (
            <li key={o.title} className="rounded-[32px] border border-ink bg-white">
              {isLinked(o.href) ? (
                <a href={o.href} className="block h-full rounded-[32px] p-7 transition-colors hover:bg-paper hover:[&_h3]:text-orange">{inner}</a>
              ) : (
                <div className="p-7">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Why choose Infoloop: numbered list + photo (7Span) ---------- */

export function WhyList({ g }: { g: WhyData }) {
  // Dark section (light / dark rhythm, like 7Span): white type on ink, orange numerals.
  const hatchLight: React.CSSProperties = { backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 7px)" };
  return (
    <section className="bg-ink text-white" aria-labelledby="why-h2">
      <div className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h2 id="why-h2" className="display-h2 text-white reveal">{g.why.h2}</h2>
          <ol className="mt-8 max-w-xl reveal" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            {g.why.items.map((w, i) => (
              <li key={w} className={`flex items-center gap-4 py-3 pl-4 pr-5 text-[16px] text-white ${i % 2 === 0 ? "border-l-2 border-white" : "border border-white/40"}`}>
                <span className="font-display text-[13px] font-bold tabular-nums text-orange">{String(i + 1).padStart(2, "0")}</span>
                <span>{w}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6 reveal" style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
          <div className="p-6 sm:p-8" style={hatchLight}>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/40 bg-mist" aria-hidden="true" data-photo-alt={g.why.photoAlt}>
              {[["12%", "14%", "58%"], ["8%", "32%", "42%"], ["4%", "50%", "70%"], ["10%", "68%", "38%"]].map(([l, t, w], i) => (
                <span key={i} className={`absolute h-[7%] rounded-full ${i === 1 ? "bg-orange/80" : "bg-white/70"}`} style={{ left: l, top: t, width: w }} />
              ))}
              <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-white/85 px-2.5 py-1.5 text-[11px] text-ink/70">
                <Mark size={14} /> Photo slot
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries we serve: chips on a hatched field (7Span) ---------- */

export function IndustryChips({ g, chips }: { g: IndustriesData; chips: NavLink[] }) {
  return (
    <section className="border-t border-ink" aria-labelledby="ind-h2">
      <div className="container-x py-14 sm:py-20">
        <h2 id="ind-h2" className="display-h2 text-ink reveal">{g.industries.h2}</h2>
        <p className="lede mt-3 max-w-4xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{g.industries.lede}</p>
        <div className="mt-8 p-2 reveal" style={{ ...HATCH, "--reveal-delay": "120ms" } as React.CSSProperties}>
          <ul className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c.label}>
                <span className="inline-flex items-center gap-2 border border-ink bg-white px-4 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
                  <span className="h-2 w-2 bg-orange" aria-hidden="true" />
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Technologies we use: table (7Span) ---------- */

export function TechTable({ h2, rows }: { h2: string; rows: TechRow[] }) {
  return (
    <section className="border-t border-ink" aria-labelledby="tech-h2">
      <div className="container-x py-14 sm:py-20">
        <h2 id="tech-h2" className="display-h2 text-ink reveal">{h2}</h2>
        <table className="mt-8 w-full border-collapse border border-ink text-left reveal" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-ink last:border-b-0">
                <th scope="row" className="w-[36%] border-r border-ink px-5 py-4 text-[16px] font-normal text-ink">{r.label}</th>
                <td className="px-5 py-4">
                  <div className="overflow-hidden">
                    <ul className="-ml-[13px] flex flex-wrap items-center gap-y-1.5">
                      {r.items.map((t) => (
                        <li key={t} className="border-l border-ink/30 px-3 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Before and after (7Span, Transform) ---------- */

export function BeforeAfterList({ h2, lede, items }: { h2: string; lede: string; items: BeforeAfter[] }) {
  return (
    <section className="border-t border-ink" aria-labelledby="ba-h2">
      <div className="container-x py-14 sm:py-20">
        <h2 id="ba-h2" className="display-h2 text-ink reveal">{h2}</h2>
        <p className="lede mt-3 max-w-3xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{lede}</p>
        <ul className="mt-8 divide-y divide-ink border border-ink reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          {items.map((it) => (
            <li key={it.href} className="grid gap-4 p-5 sm:grid-cols-12 sm:items-center sm:p-6">
              <h3 className="font-display text-[17px] font-bold leading-snug text-ink sm:col-span-4">
                <a href={it.href} className="underline decoration-orange decoration-2 underline-offset-4 hover:text-orange">{it.title}</a>
              </h3>
              <div className="sm:col-span-4">
                <p className="eyebrow text-ink/70">Before</p>
                <p className="mt-1 text-[15px] text-ink/80">{it.before}</p>
              </div>
              <div className="border-l-2 border-orange pl-4 sm:col-span-4">
                <p className="eyebrow text-ink/70">After</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">{it.after}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Client quotes: three bordered cards with a notched footer (7Span) ---------- */

export function QuoteCards({ quotes }: { quotes: Quote[] }) {
  return (
    <section className="border-t border-ink" aria-labelledby="quotes-h2">
      <div className="container-x py-14 sm:py-20">
        <h2 id="quotes-h2" className="sr-only">What our clients say</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <li key={q.caseSlug} className="flex flex-col border border-ink bg-white reveal" style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <blockquote className="flex-1 p-7 text-[16px] leading-relaxed text-ink">{q.text}</blockquote>
              <footer className="relative flex border-t border-ink">
                <span className="hidden w-16 shrink-0 border-r border-ink lg:block lg:w-24" aria-hidden="true" />
                <div className="relative min-w-0 flex-1 break-words bg-paper px-6 py-4">
                  <span className="absolute -top-px right-8 h-3 w-6 bg-white [clip-path:polygon(0_0,100%_0,50%_100%)]" aria-hidden="true" />
                  <p className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/70">{q.role}</p>
                  <a href={`/work/${q.caseSlug}`} className="mt-1 inline-block text-[13px] font-semibold text-ink underline decoration-orange underline-offset-4 hover:text-orange">Read the case study<span className="sr-only">: {q.role}</span></a>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Other services: bordered link rows on a hatched field (7Span) ---------- */

/** `linked`: array of hrefs that exist as pages; the rest render as plain rows until built. Omit to link all. */
export function OtherServices({ h2, links, linked }: { h2: string; links: NavLink[]; linked?: string[] }) {
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="other-h2">
      <h2 id="other-h2" className="display-h2 text-ink reveal">{h2}</h2>
      <ul className="mt-8 grid auto-rows-fr gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3 reveal" style={{ ...HATCH, "--reveal-delay": "80ms" } as React.CSSProperties}>
        {links.map((l) => {
          const live = !linked || linked.includes(l.href);
          const inner = (
            <>
              <span>
                {l.label}
                {l.blurb && <span className="block text-[13px] text-ink/60">{l.blurb}</span>}
              </span>
              {live && <ArrowUpRight className="h-4 w-4 shrink-0" />}
            </>
          );
          return (
            <li key={l.href} className="flex">
              {live ? (
                <a href={l.href} className="flex w-full items-center justify-between gap-4 border border-ink bg-white px-5 py-4 text-[16px] text-ink transition-colors hover:bg-paper hover:text-orange">{inner}</a>
              ) : (
                <div className="flex w-full items-center justify-between gap-4 border border-ink bg-white px-5 py-4 text-[16px] text-ink">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- CTA: the site's minimal ink panel, centred (see sections/CtaPanel) ---------- */

export function CtaPanel({ g }: { g: CtaData }) {
  return <SiteCta id="sol-cta-h2" h2={g.cta.h2} lede={g.cta.lede} button={{ label: g.cta.button, href: "/contact" }} />;
}

/* ---------- Generic pill grid: rounded cards on a hatched field (7Span "solutions for your industry") ---------- */

export function PillGrid({ id, h2, lede, items, cols = 3 }: { id: string; h2: string; lede: string; items: { title: string; body: string }[]; cols?: 3 | 4 }) {
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby={id}>
      <h2 id={id} className="display-h2 text-ink reveal">{h2}</h2>
      <p className="lede mt-3 max-w-3xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{lede}</p>
      <ul className={`mt-8 grid gap-2 rounded-[40px] p-2 sm:grid-cols-2 reveal ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`} style={{ ...HATCH, "--reveal-delay": "120ms" } as React.CSSProperties}>
        {items.map((o) => (
          <li key={o.title} className="rounded-[32px] border border-ink bg-white p-7">
            <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.01em] text-ink">{o.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{o.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
