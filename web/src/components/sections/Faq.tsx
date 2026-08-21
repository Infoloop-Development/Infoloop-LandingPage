import type React from "react";
import { Hi, SectionHead } from "@/components/ui";
import { FAQ } from "@/content/home";

/**
 * Native <details> accordion: works without JavaScript, keyboard accessible,
 * and the answers are in the HTML for search and answer engines. FAQPage
 * JSON-LD is emitted from page.tsx.
 */
export function Faq({ data = FAQ }: { data?: typeof FAQ } = {}) {
  return (
    <section className="section-y bg-paper border-y border-line" id="faq" aria-labelledby="faq-h2">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHead
          id="faq-h2"
            eyebrow={data.eyebrow}
            title={<Hi text={data.h2} />}
            lede={data.lede}
          />
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {data.items.map((f, i) => (
              <li key={f.q} className="reveal" style={{ "--reveal-delay": `${i * 40}ms` } as React.CSSProperties}>
                <details className="group px-6 py-5" open={i === 0}>
                  <summary className="flex min-h-11 items-center justify-between gap-6 font-display text-[17px] font-bold text-ink">
                    <span>{f.q}</span>
                    <span
                      className="faq-plus inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink"
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                        <path d="M7 2v10M2 7h10" />
                      </svg>
                    </span>
                  </summary>
                  <p className="faq-a mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/70">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
