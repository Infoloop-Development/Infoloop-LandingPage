import type React from "react";
import { Hi } from "@/components/ui";
import { COMPANY_STATS, TRUST } from "@/content/home";
import { Star } from "@/components/ui";

/**
 * 7Span "Trusted by Global Brands": left-aligned heading and sub, then a
 * slow logo marquee. infoloop's client logos are not cleared, so the row
 * shows the platforms the team is certified on and builds with, set as gray
 * wordmarks. Swap in mono-ink client logos when they are approved.
 */
export function TrustStrip({ data = TRUST, stats = COMPANY_STATS }: { data?: typeof TRUST; stats?: typeof COMPANY_STATS } = {}) {
  const items = [...data.stack, ...data.stack];
  return (
    <section className="border-b border-line bg-white" aria-labelledby="trust-h2">
      <div className="container-x pt-14 pb-10 sm:pt-20 sm:pb-12">
        <h2 id="trust-h2" className="font-display text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink reveal sm:text-[32px]">
          <Hi text={data.h2} />
        </h2>
        <p className="mt-2 max-w-4xl text-[18px] leading-relaxed text-ink/80 reveal sm:text-[20px]" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          {data.sub}
        </p>
      </div>
      <div className="marquee relative overflow-hidden pb-14 sm:pb-20 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <ul className="marquee-track items-center gap-16 px-8" aria-hidden="true">
          {items.map((name, i) => (
            <li key={`${name}-${i}`} className="font-display text-[26px] font-bold tracking-[-0.02em] text-ink/45 sm:text-[30px]">
              {name}
            </li>
          ))}
        </ul>
        <ul className="sr-only">
          {data.stack.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      {/* Company credibility strip */}
      <div className="border-t border-line">
        <dl className="container-x grid grid-cols-2 gap-y-6 py-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center reveal">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[28px] font-bold tracking-tight text-ink">
                {s.value}
                {"suffix" in s && s.suffix ? <Star className="ml-1 inline-block h-4 w-4 align-baseline text-orange" /> : null}
              </dd>
              <dd className="mt-1 text-[13px] text-ink/70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
