import type React from "react";
import { ArrowRight, Check } from "@/components/ui";
import { CaseCard } from "@/components/work/CaseCard";
import { CaseTile } from "@/components/work/CaseTile";
import type { CaseStudy } from "@/content/work";

/* ------------------------------------------------------------------
   Case study page, adapted from 7Span's case layout:
   1. Header (white): back link, "Case study · N min read", client, H1,
      intro, Industry / Services / Timeline row.
   2. Introduction (7Span "Product Vision"): bordered box with the hatched
      left edge, subtitle and one or two paragraphs.
   3. The challenge: intro line, bullet points, closing line; image right.
   4. Our approach: black section, intro left, numbered zigzag step cards
      right (what we built).
   5. The results: heading, one or two sentences, the numbers (7Span "The Impact").
   6. Technology used: two-column table.
   7. More of our work (in 7Span's testimonial slot).
   8. CTA band (rendered by the page).
   ------------------------------------------------------------------ */

const rv = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;
const HATCH = { backgroundImage: "repeating-linear-gradient(135deg, #f47b00 0 5px, transparent 5px 10px)" };

/** Reading time from the story text, like 7Span's "3 mins read". */
export function readingTime(c: CaseStudy): number {
  const words = [c.lede, c.intro?.sub ?? "", ...(c.intro?.paragraphs ?? []), ...c.situation, ...(c.challenges ?? []), c.challengeClose ?? "", ...c.approach, ...c.built.flatMap((i) => [i.h3, i.body]), ...c.results]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** 1. Header */
export function CaseHeader({ c, ctaHref = "/contact" }: { c: CaseStudy; ctaHref?: string }) {
  return (
    <header className="bg-white" aria-labelledby="case-h1">
      <div className="container-x pt-10 sm:pt-12">
        <a href="/work" className="link-arrow inline-flex text-[13.5px] text-ink/70 hover:text-orange hero-in">
          <span aria-hidden="true" className="mr-1.5">&larr;</span> Work
        </a>
        <div className="mt-8 hero-in" style={{ "--d": "60ms" } as React.CSSProperties}>
          <p className="eyebrow text-ink/50">
            Case study <span className="mx-2 text-ink/25" aria-hidden="true">|</span> <span className="normal-case tracking-normal">{readingTime(c)} min read</span>
          </p>
          <p className="mt-1.5 font-display text-[17px] font-semibold text-ink">{c.client}</p>
        </div>
        <h1 id="case-h1" className="display-h2 mt-6 max-w-4xl text-ink hero-in" style={{ "--d": "120ms" } as React.CSSProperties}>
          {c.title}
        </h1>
        <p className="lede mt-5 max-w-3xl text-ink/75 hero-in" style={{ "--d": "180ms" } as React.CSSProperties}>
          {c.lede}
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-[14px] hero-in" style={{ "--d": "240ms" } as React.CSSProperties}>
          <div>
            <dt className="eyebrow text-orange">Industry</dt>
            <dd className="mt-1.5 text-ink">{c.meta.industry}</dd>
          </div>
          <div>
            <dt className="eyebrow text-orange">Services</dt>
            <dd className="mt-1.5 text-ink">{c.meta.services.join(", ")}</dd>
          </div>
          <div>
            <dt className="eyebrow text-orange">{c.meta.timeline ? "Timeline" : "Status"}</dt>
            <dd className="mt-1.5 text-ink">{c.meta.timeline || c.meta.status}</dd>
          </div>
        </dl>
        <p className="mt-6 hero-in" style={{ "--d": "300ms" } as React.CSSProperties}>
          <a href={ctaHref} className="link-arrow text-ink hover:text-orange">
            Ask how this would work for you <ArrowRight />
          </a>
        </p>
      </div>
    </header>
  );
}

/** 2. Introduction (7Span "Product Vision" box with the hatched left edge) */
function Introduction({ c }: { c: CaseStudy }) {
  if (!c.intro?.paragraphs?.length) return null;
  return (
    <section id="introduction" className="container-x mt-12 scroll-mt-28 sm:mt-16" aria-labelledby="intro-h2">
      <div className="relative border border-line bg-white reveal">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 sm:w-4" style={HATCH} />
        <div className="px-6 py-8 pl-9 sm:px-10 sm:py-10 sm:pl-14 lg:pl-16">
          <h2 id="intro-h2" className="display-h3 text-ink">Introduction</h2>
          <p className="mt-2 text-[17px] leading-snug text-ink/80">{c.intro.sub}</p>
          <div className="mt-5 max-w-3xl space-y-4">
            {c.intro.paragraphs.map((t) => (
              <p key={t.slice(0, 40)} className="text-[15.5px] leading-relaxed text-ink/75">{t}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 3. The challenge: text left, image right */
function Challenge({ c }: { c: CaseStudy }) {
  return (
    <section id="challenge" className="container-x mt-14 scroll-mt-28 sm:mt-20" aria-labelledby="challenge-h2">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 reveal">
          <h2 id="challenge-h2" className="display-h3 text-ink">The challenge</h2>
          <div className="mt-5 space-y-4">
            {c.situation.map((p) => (
              <p key={p.slice(0, 40)} className="text-[16px] leading-relaxed text-ink/80">{p}</p>
            ))}
          </div>
          {c.challenges?.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {c.challenges.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                  <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 bg-orange" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {c.challengeClose && <p className="mt-5 text-[16px] font-medium leading-relaxed text-ink">{c.challengeClose}</p>}
        </div>
        <div className="lg:col-span-5 reveal" style={rv(80)}>
          <CaseTile kind={c.tile} cover={c.cover} size="hero" rounded={false} className="h-full min-h-[260px] lg:min-h-[340px]" />
        </div>
      </div>
    </section>
  );
}

/** 4. Our approach: black section, numbered zigzag step cards (7Span) */
function Approach({ c }: { c: CaseStudy }) {
  return (
    <section id="approach" className="mt-14 scroll-mt-28 bg-ink text-white sm:mt-20" aria-labelledby="approach-h2">
      <div className="container-x py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 reveal">
            <h2 id="approach-h2" className="display-h3 text-white">Our approach</h2>
            <div className="mt-5 space-y-4">
              {c.approach.map((p) => (
                <p key={p.slice(0, 40)} className="text-[15.5px] leading-relaxed text-gray-40">{p}</p>
              ))}
            </div>
          </div>
          <ol className="lg:col-span-8">
            {c.built.map((s, i) => (
              <li
                key={s.h3}
                className={`relative -mt-px flex gap-5 border border-white/25 bg-ink p-6 sm:gap-6 sm:p-7 reveal ${i % 2 === 1 ? "lg:ml-[14%]" : "lg:mr-[14%]"}`}
                style={rv(i * 60)}
              >
                <span aria-hidden="true" className="relative flex h-12 w-12 shrink-0 items-center justify-center font-display text-[30px] font-bold leading-none tabular-nums text-white">
                  <span className="absolute inset-0 rounded-md bg-orange" style={{ clipPath: "polygon(0 0, 100% 0, 100% 62%, 62% 100%, 0 100%)" }} />
                  <span className="relative">{i + 1}</span>
                </span>
                <div>
                  <h3 className="font-display text-[18px] font-bold leading-snug text-white">{s.h3}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-gray-40">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 5. The results (7Span "The Impact"): heading, one or two sentences, then the numbers. */
function Results({ c }: { c: CaseStudy }) {
  return (
    <section id="results" className="container-x mt-14 scroll-mt-28 sm:mt-20" aria-labelledby="results-h2">
      <h2 id="results-h2" className="display-h3 text-ink reveal">The results</h2>
      {c.resultsSub && <p className="mt-3 max-w-4xl text-[17px] leading-relaxed text-ink/80 reveal" style={rv(60)}>{c.resultsSub}</p>}
      <ul className={`mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${c.metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} reveal`} style={rv(120)}>
        {c.metrics.map((m) => (
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

/** 6. Technology used: two-column table (7Span) + pages behind the build */
function Technology({ c }: { c: CaseStudy }) {
  const rows: { label: string; items: string[] }[] = [
    { label: "Technology", items: c.tech },
    { label: "What we did", items: c.meta.services },
    { label: "Runs today", items: [c.meta.status] },
  ].filter((r) => r.items.length > 0);
  return (
    <section id="tech" className="container-x mt-14 scroll-mt-28 sm:mt-20" aria-labelledby="tech-h2">
      <h2 id="tech-h2" className="display-h3 text-ink reveal">Technology used</h2>
      <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-ink/70 reveal" style={rv(60)}>A quick look at what runs behind this build.</p>
      <table className="mt-8 w-full border-collapse border border-line text-[14px] reveal" style={rv(120)}>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-b-0">
              <th scope="row" className="w-[34%] border-r border-line bg-paper px-5 py-4 text-left font-display font-semibold text-ink sm:w-[28%]">
                {r.label}
              </th>
              <td className="px-5 py-3.5">
                <ul className="flex flex-wrap gap-2">
                  {r.items.map((t) => (
                    <li key={t} className="rounded-sm border border-line px-2.5 py-1 font-display text-[12.5px] font-semibold uppercase tracking-[0.06em] text-ink/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/** Body = Introduction, The challenge, Our approach, The results, Technology */
export function CaseBody({ c, ctaHref = "/contact" }: { c: CaseStudy; ctaHref?: string }) {
  return (
    <>
      <Introduction c={c} />
      <Challenge c={c} />
      <Approach c={c} />
      <Results c={c} />
      <Technology c={c} />
    </>
  );
}

/** 7. More of our work: three 7Span-style cards (replaces the testimonial slot) */
export function RelatedWork({ items, allHref = "/work" }: { items: CaseStudy[]; allHref?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="container-x mt-16 sm:mt-24" aria-labelledby="related-h2">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-ink/50 reveal">Keep reading</p>
          <h2 id="related-h2" className="display-h3 mt-3 text-ink reveal" style={rv(60)}>More of our work</h2>
        </div>
        <a href={allHref} className="btn btn-outline reveal" style={rv(120)}>
          All case studies <ArrowRight />
        </a>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <CaseCard key={c.slug} href={`/work/${c.slug}`} industry={c.industry} tile={c.tile} cover={c.cover} text={c.card.blurb} client={c.client} />
        ))}
      </ul>
    </section>
  );
}
