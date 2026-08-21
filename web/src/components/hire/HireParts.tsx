import type React from "react";
import type { HireDetail } from "@/content/hire";
import type { NavLink } from "@/content/site";
import type { CaseStudy } from "@/content/work";
import { Check, Hi } from "@/components/ui";

/**
 * Sections of a Hire talent page in 7Span's hire-page format. Server-rendered.
 */
const HATCH: React.CSSProperties = { backgroundImage: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px)" };

/* ---------- Hero: badge, H1, sub, paragraph, check bullets, two buttons; side panel on hatch (7Span) ---------- */

export function HireHero({ d, roles, built }: { d: HireDetail; roles: NavLink[]; built?: string[] }) {
  const live = (href: string) => !built || built.includes(href);
  return (
    <section className="relative" aria-labelledby="hire-h1">
      <div className="absolute inset-y-0 right-0 hidden w-[30%] lg:block" style={HATCH} aria-hidden="true" />
      <div className="container-x relative grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <span className="inline-flex h-16 w-16 items-center justify-center bg-orange font-display text-[26px] font-bold tracking-[-0.03em] text-ink hero-in" aria-hidden="true">{d.badge}</span>
          <h1 id="hire-h1" className="display-h2 mt-3 text-ink hero-in" style={{ "--d": "60ms" } as React.CSSProperties}>
            <Hi text={d.h1} />
          </h1>
          <p className="mt-4 font-display text-[20px] font-medium leading-snug tracking-[-0.01em] text-ink hero-in sm:text-[22px]" style={{ "--d": "100ms" } as React.CSSProperties}>{d.sub}</p>
          <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink/80 hero-in" style={{ "--d": "140ms" } as React.CSSProperties}>{d.lede}</p>
          <ul className="mt-5 space-y-2 hero-in" style={{ "--d": "180ms" } as React.CSSProperties}>
            {d.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16px] text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-orange" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3 hero-in" style={{ "--d": "180ms" } as React.CSSProperties}>
            <a href="/contact" className="btn btn-ink px-7 py-4">{d.buttons.primary}</a>
            <a href="#how" className="btn btn-outline px-7 py-4">{d.buttons.secondary}</a>
          </div>
        </div>
        {/* Side panel: the other roles you can hire, on the hatched field (7Span keeps a bordered panel here) */}
        <div className="w-full lg:col-span-5 lg:justify-self-end hero-fade" style={{ "--d": "260ms" } as React.CSSProperties}>
          <div className="border border-ink bg-white p-6 sm:p-8">
            <h2 className="font-display text-[18px] font-bold text-ink">Also available</h2>
            <p className="mt-1 text-[14px] text-ink/70">Experienced people for the rest of your stack, in 1 to 2 weeks.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {roles.map((r) => (
                <li key={r.href}>
                  {live(r.href) ? (
                    <a href={r.href} className="inline-block border border-ink px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-orange">{r.label}</a>
                  ) : (
                    <span className="inline-block border border-ink/40 px-3 py-1.5 text-[13px] font-semibold text-ink/70">{r.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why companies hire from Infoloop: bordered card grid, 3 + 2 (7Span) ---------- */

export function WhyGrid({ d }: { d: HireDetail }) {
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="hwhy-h2">
      <h2 id="hwhy-h2" className="display-h2 text-ink reveal">{d.why.h2}</h2>
      <p className="lede mt-3 max-w-3xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{d.why.lede}</p>
      <ul className="mt-8 grid border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-6 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        {d.why.items.map((w, i) => (
          <li key={w.title} className={`border-b border-r border-ink p-7 ${i < 3 ? "lg:col-span-2" : i === d.why.items.length - 1 && d.why.items.length % 2 === 1 ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-3"}`}>
            <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.01em] text-ink">{w.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{w.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Engagement models: three cards with a coloured middle and a black button bar (7Span) ---------- */

export function Models({ d }: { d: HireDetail }) {
  const tone = { orange: "bg-orange text-ink", ink: "bg-ink text-white", mist: "bg-mist text-ink" } as const;
  const tag = { orange: "border-ink text-ink", ink: "border-white/60 text-white", mist: "border-ink text-ink" } as const;
  return (
    <section id="models" className="border-t border-ink" aria-labelledby="models-h2">
      <div className="container-x py-14 sm:py-20">
        <h2 id="models-h2" className="display-h2 text-ink reveal">{d.models.h2}</h2>
        <p className="lede mt-3 max-w-3xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>{d.models.lede}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.models.items.map((m, i) => (
            <li key={m.title} className="flex flex-col border border-ink bg-white reveal" style={{ "--reveal-delay": `${120 + i * 60}ms` } as React.CSSProperties}>
              <div className="flex h-20 items-center px-6 sm:h-24 sm:px-7" aria-hidden="true">
                <ModelGlyph i={i} />
              </div>
              <div className={`flex-1 p-6 sm:p-7 ${tone[m.tone]}`}>
                <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em]">{m.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <li key={t} className={`border px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] ${tag[m.tone]}`}>{t}</li>
                  ))}
                </ul>
                <p className={`mt-4 text-[15px] leading-relaxed ${m.tone === "ink" ? "text-white/80" : "text-ink/85"}`}>{m.body}</p>
              </div>
              <a href="/contact" className="block bg-ink py-4 text-center font-display text-[14px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-charcoal hover:text-orange">{m.button}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Abstract figures for the engagement model cards (7Span: outlined shapes with red fills; ours ink outlines, one orange fill). */
function ModelGlyph({ i }: { i: number }) {
  const s = { width: 88, height: 64, viewBox: "0 0 88 64", fill: "none", stroke: "#0A0A0A", strokeWidth: 1.5 };
  if (i % 3 === 0)
    return (
      <svg {...s}>
        <rect x="8" y="6" width="40" height="52" />
        <circle cx="52" cy="34" r="16" />
        <path d="M52 18 A16 16 0 0 1 52 50 Z" fill="#F47B00" />
      </svg>
    );
  if (i % 3 === 1)
    return (
      <svg {...s}>
        <circle cx="34" cy="32" r="22" />
        <rect x="24" y="4" width="20" height="56" />
        <rect x="26" y="12" width="16" height="14" rx="3" fill="#F47B00" />
        <rect x="26" y="38" width="16" height="14" rx="3" fill="#F47B00" />
      </svg>
    );
  return (
    <svg {...s}>
      <path d="M8 6 H56 L32 34 Z" />
      <path d="M8 58 H56 L32 30 Z" />
      <path d="M22 10 L36 10 L46 54 L32 54 Z" fill="#F47B00" />
    </svg>
  );
}

/* ---------- Three dark case cards with a chevron strip (7Span) ---------- */

export function CaseCardsDark({ cases, button }: { cases: CaseStudy[]; button: string }) {
  return (
    <section className="container-x pb-14 sm:pb-20" aria-labelledby="hcases-h2">
      <h2 id="hcases-h2" className="sr-only">Related work</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <li key={c.slug} className="flex flex-col bg-ink text-white reveal" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
            <div className="flex-1 p-7">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-orange">{c.industry}</p>
              <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug text-white">{c.card.title}</h3>
            </div>
            <svg className="block h-8 w-full text-white" viewBox="0 0 400 32" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 22 L10 8 L20 22 L30 8 L40 22 L50 8 L60 22 L70 8 L80 22 L90 8 L100 22 L110 8 L120 22 L130 8 L140 22 L150 8 L160 22 L170 8 L180 22 L190 8 L200 22 L210 8 L220 22 L230 8 L240 22 L250 8 L260 22 L270 8 L280 22 L290 8 L300 22 L310 8 L320 22 L330 8 L340 22 L350 8 L360 22 L370 8 L380 22 L390 8 L400 22" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M0 30 L10 16 L20 30 L30 16 L40 30 L50 16 L60 30 L70 16 L80 30 L90 16 L100 30 L110 16 L120 30 L130 16 L140 30 L150 16 L160 30 L170 16 L180 30 L190 16 L200 30 L210 16 L220 30 L230 16 L240 30 L250 16 L260 30 L270 16 L280 30 L290 16 L300 30 L310 16 L320 30 L330 16 L340 30 L350 16 L360 30 L370 16 L380 30 L390 16 L400 30" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
            </svg>
            <a href={`/work/${c.slug}`} className="block py-4 text-center font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-orange">{button}<span className="sr-only">: {c.card.title}</span></a>
          </li>
        ))}
      </ul>
    </section>
  );
}
