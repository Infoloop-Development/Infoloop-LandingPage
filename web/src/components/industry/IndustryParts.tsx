import type React from "react";
import type { IndustryDetail } from "@/content/industries";
import type { TileKind } from "@/content/work";
import { CaseTile } from "@/components/work/CaseTile";
import { Mark } from "@/components/Logo";
import { Hi } from "@/components/ui";

/**
 * Sections of an industry page in 7Span's industry-page format. Drawn case
 * screens stand in for their factory photos until real images are cleared.
 * Server-rendered, no islands.
 */
const HATCH: React.CSSProperties = { backgroundImage: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px)" };
const RAIL: React.CSSProperties = { background: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px), #f47b00" };

/* ---------- Hero: eyebrow, H1 left, line right, wide visual with the button overlapping (7Span) ---------- */

export function IndustryHero({ d }: { d: IndustryDetail }) {
  return (
    <section aria-labelledby="ind-h1">
      <div className="container-x grid gap-6 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ink/70 hero-in">{d.eyebrow}</p>
          <h1 id="ind-h1" className="display-h2 mt-3 text-ink hero-in" style={{ "--d": "60ms" } as React.CSSProperties}>
            <Hi text={d.h1} />
          </h1>
        </div>
        <p className="text-[16.5px] leading-relaxed text-ink/80 hero-in lg:col-span-5 lg:pb-2" style={{ "--d": "120ms" } as React.CSSProperties}>
          {d.lede}
        </p>
      </div>
      <div className="container-x mt-8 hero-fade sm:mt-10" style={{ "--d": "180ms" } as React.CSSProperties}>
        <div className="relative">
          <div className="border border-ink" aria-hidden="true">
            <CaseTile kind={d.heroTile} size="hero" rounded={false} className="min-h-[260px] sm:min-h-[340px] lg:min-h-[400px]" />
          </div>
          {/* Button sitting on the bottom-right corner of the visual, on a white notch (7Span) */}
          <div className="absolute bottom-0 right-0 bg-white pl-4 pt-3 sm:pl-5 sm:pt-4">
            <a href="/contact" className="btn btn-ink px-7 py-4">{d.button}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Context: hatched orange rail, H2, lede, paragraphs, bullets (7Span) ---------- */

export function IndustryContext({ d }: { d: IndustryDetail }) {
  return (
    <section className="relative mt-12 border-t border-ink sm:mt-16" aria-labelledby="ctx-h2">
      <div className="absolute inset-y-0 left-0 hidden w-[7%] border-r border-ink lg:block" style={RAIL} aria-hidden="true" />
      <div className="container-x py-14 sm:py-20 lg:pl-[max(clamp(1.25rem,4vw,2.5rem),9%)]">
        <div className="max-w-3xl">
          <h2 id="ctx-h2" className="display-h2 text-ink reveal">{d.context.h2}</h2>
          <p className="lede mt-4 text-ink/85 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{d.context.lede}</p>
          {d.context.paragraphs.map((p, i) => (
            <p key={i} className="mt-5 text-[16.5px] leading-relaxed text-ink/80 reveal" style={{ "--reveal-delay": `${100 + i * 40}ms` } as React.CSSProperties}>{p}</p>
          ))}
          <ul className="mt-5 list-disc space-y-1 pl-6 text-[16.5px] text-ink reveal" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            {d.context.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink/80 reveal" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            <strong className="font-semibold text-ink">Infoloop</strong> {d.context.close.replace(/^Infoloop\s+/, "")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Four numbers with the orange arrow (7Span) ---------- */

export function NumbersRow({ items }: { items: IndustryDetail["numbers"] }) {
  return (
    <section className="border-t border-ink" aria-labelledby="num-h2">
      <h2 id="num-h2" className="sr-only">Measured results</h2>
      <ul className="container-x grid gap-8 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
        {items.map((n, i) => (
          <li key={n.value + n.label} className="reveal" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
            <a href={n.href} className="group block">
              <span className="display-stat block text-ink group-hover:text-orange">{n.value}</span>
              <span className="mt-2 flex items-start gap-3 text-[15px] leading-snug text-ink/75">
                <svg width="12" height="14" viewBox="0 0 12 14" className="mt-1 shrink-0 text-orange" aria-hidden="true"><path d="M0 0l12 7-12 7z" fill="currentColor" /></svg>
                {n.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Challenges we solve: stacked cards + visual in a rounded frame (7Span) ---------- */

export function Challenges({ d }: { d: IndustryDetail }) {
  return (
    <section className="border-t border-ink" aria-labelledby="ch-h2">
      <div className="container-x py-14 sm:py-20">
        <h2 id="ch-h2" className="display-h2 text-ink reveal">{d.challenges.h2}</h2>
        <p className="lede mt-3 max-w-4xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{d.challenges.lede}</p>
        <div className="mt-8 grid overflow-hidden rounded-tl-none rounded-br-[64px] border border-ink lg:grid-cols-12 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <ul className="divide-y divide-ink lg:col-span-6 lg:border-r lg:border-ink">
            {d.challenges.items.map((c, i) => (
              <li key={c.title} className={`p-6 ${i % 2 === 1 ? "bg-paper" : "bg-white"}`}>
                <h3 className="font-display text-[17px] font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{c.body}</p>
              </li>
            ))}
          </ul>
          <div className="p-4 sm:p-6 lg:col-span-6">
            <CaseTile kind={d.challenges.tile} size="hero" className="h-full min-h-[300px] rounded-tl-none rounded-br-[48px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Business outcomes: dark, visual left, list right (7Span) ---------- */

export function Outcomes({ d }: { d: IndustryDetail }) {
  return (
    <section className="bg-ink text-white" aria-labelledby="out-h2">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[260px] lg:col-span-4" aria-hidden="true">
          <div className="absolute inset-0 grayscale opacity-90">
            <CaseTile kind={d.outcomes.tile} size="hero" rounded={false} className="h-full" />
          </div>
        </div>
        <div className="px-6 py-14 sm:px-10 sm:py-20 lg:col-span-8 lg:pl-16 lg:pr-[max(clamp(1.25rem,4vw,2.5rem),calc((100vw-1280px)/2+2.5rem))]">
          <h2 id="out-h2" className="display-h2 text-white reveal">{d.outcomes.h2}</h2>
          <p className="lede mt-3 max-w-2xl text-white/75 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{d.outcomes.lede}</p>
          <ul className="mt-8 divide-y divide-white/20 border-y border-white/20 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            {d.outcomes.items.map((o) => (
              <li key={o.title} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-4">
                <svg width="12" height="11" viewBox="0 0 12 11" className="shrink-0 text-orange" aria-hidden="true"><path d="M6 0l6 11H0z" fill="currentColor" /></svg>
                <h3 className="font-display text-[16.5px] font-bold text-white">{o.title}</h3>
                <p className="text-[15.5px] text-white/70">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- One big client quote (7Span: photo left, quote + name right) ---------- */

export function BigQuote({ q, photoAlt = "Photo slot" }: { q: { text: string; role: string; caseSlug: string }; photoAlt?: string }) {
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="bq-h2">
      <h2 id="bq-h2" className="sr-only">What our clients say</h2>
      <div className="grid border border-ink lg:grid-cols-12 reveal">
        <div className="relative min-h-[220px] bg-mist lg:col-span-7" aria-hidden="true" data-photo-alt={photoAlt}>
          <span className="absolute left-[8%] top-[22%] h-[7%] w-[46%] rounded-full bg-white/70" />
          <span className="absolute left-[8%] top-[40%] h-[7%] w-[30%] rounded-full bg-orange/80" />
          <span className="absolute left-[8%] top-[58%] h-[7%] w-[58%] rounded-full bg-white/70" />
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-white/85 px-2.5 py-1.5 text-[11px] text-ink/70">
            <Mark size={14} /> Photo slot
          </span>
        </div>
        <div className="flex flex-col lg:col-span-5">
          <blockquote className="border-b border-ink p-7 font-display text-[22px] font-medium leading-snug tracking-[-0.01em] text-ink sm:p-8 sm:text-[24px]">{q.text}</blockquote>
          <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/70">{q.role}</p>
            <a href={`/work/${q.caseSlug}`} className="link-arrow mt-6 text-ink hover:text-orange">Read the case study</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { TileKind };
