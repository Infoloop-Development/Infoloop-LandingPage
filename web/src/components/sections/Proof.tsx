import type React from "react";
import { ArrowRight, ArrowUpRight, Hi } from "@/components/ui";
import { PROOF } from "@/content/home";

/**
 * Proof section: three featured outcomes as mini case studies (sector tag,
 * metric, a descriptive H3, what we did, before → after with a proportional
 * bar), then three secondary outcomes as one compact row, the honesty line
 * and one button. Company-level numbers live in the stat strip under the
 * logos and in the About fact panel, so this section is only client results.
 */
export function Proof({ data = PROOF }: { data?: typeof PROOF } = {}) {
  return (
    <section className="bg-ink text-white" id="proof" aria-labelledby="proof-h2">
      <div className="container-x section-y">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-gray-40 reveal">{data.eyebrow}</p>
            <h2 id="proof-h2" className="display-h2 mt-3 text-white reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
              <Hi text={data.h2} />
            </h2>
            <p className="lede mt-5 max-w-2xl text-gray-40 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              {data.lede}
            </p>
          </div>
          <div className="mt-6 shrink-0 lg:mt-1 reveal" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <a href={data.cta.href} className="btn btn-outline-light">
              {data.cta.label} <ArrowRight />
            </a>
          </div>
        </div>

        {/* Featured outcomes */}
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {data.featured.map((f, i) => (
            <li key={f.title} className="reveal" style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <a
                href={f.href}
                className="group flex h-full flex-col rounded-2xl bg-white p-7 text-ink transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-ink/60">{f.sector}</span>
                  <ArrowUpRight className="text-ink/40 transition-colors group-hover:text-orange" />
                </div>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-[48px] font-bold leading-none tracking-[-0.03em] tabular-nums sm:text-[52px]">{f.metric}</span>
                  <span className="text-[14px] text-ink/70">{f.unit}</span>
                </p>
                <h3 className="mt-4 font-display text-[19px] font-bold leading-snug text-ink">{f.title}</h3>
                <p className="mb-6 mt-2 text-[14.5px] leading-relaxed text-ink/70">{f.what}</p>

                {/* Before → after */}
                <div className="mt-auto border-t border-line pt-5">
                  <div className="flex items-start gap-3 text-[13.5px]">
                    <span className="w-14 shrink-0 font-display font-semibold text-ink/60">Before</span>
                    <span className="text-ink/80">{f.before}</span>
                  </div>
                  <div className="mt-2 flex items-start gap-3 text-[13.5px]">
                    <span className="w-14 shrink-0 font-display font-semibold text-ink">After</span>
                    <span className="font-semibold text-ink">{f.after}</span>
                  </div>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-mist" aria-hidden="true">
                    <span className="block h-full rounded-full bg-orange" style={{ width: `${f.bar}%` }} />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Secondary outcomes */}
        <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {data.more.map((m, i) => (
            <li key={m.text} className="reveal" style={{ "--reveal-delay": `${240 + i * 60}ms` } as React.CSSProperties}>
              <a href={m.href} className="group grid h-full grid-cols-[88px_1fr] items-start gap-4 bg-ink p-6 transition-colors hover:bg-charcoal">
                <span className="font-display text-[28px] font-bold leading-none tracking-[-0.03em] text-white tabular-nums">{m.metric}</span>
                <span className="text-[14px] leading-snug text-gray-40 group-hover:text-white">{m.text}</span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
