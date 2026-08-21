import type React from "react";
import { ArrowRight, Hi, SectionHead } from "@/components/ui";
import { INDUSTRIES } from "@/content/home";

/**
 * Industry cards for the four core ICP sectors: manufacturing, healthcare,
 * SaaS, biorenewables. Each card names the concrete things we build for that
 * sector and carries one published outcome as proof.
 */
export function Industries({ data = INDUSTRIES }: { data?: typeof INDUSTRIES } = {}) {
  return (
    <section className="section-y bg-paper border-y border-line" id="industries" aria-labelledby="industries-h2">
      <div className="container-x">
        <SectionHead
          id="industries-h2"
          eyebrow={data.eyebrow}
          title={<Hi text={data.h2} />}
          lede={data.lede}
          action={
            <a href={data.cta.href} className="link-arrow text-ink">
              {data.cta.label} <ArrowRight />
            </a>
          }
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((ind, i) => (
            <li key={ind.name} className="reveal" style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <a
                href={ind.href}
                className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange lg:p-7"
              >
                <IndustryGlyph i={i} />
                <h3 className="display-h3 mt-5 text-ink">{ind.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink/70">{ind.body}</p>
                <div className="mt-auto pt-6">
                  <p className="font-display text-[13px] font-semibold text-ink">
                    <span className="text-ink">•</span> {ind.proof}
                  </p>
                  <span className="link-arrow mt-3 text-ink">
                    {ind.linkLabel} <ArrowRight />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IndustryGlyph({ i }: { i: number }) {
  // Four line glyphs: factory, clinic cross, product window, leaf.
  const paths = [
    <path key="f" d="M3 21V9l6 4V9l6 4V9l6 4v8H3zM7 17h2M11 17h2M15 17h2" />,
    <path key="h" d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12H4V8zM12 9v8M8 13h8" />,
    <path key="s" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM4 9h16M8 6.5h.01M11 6.5h.01" />,
    <path key="l" d="M20 4c-8 0-14 5-14 12 0 1.5.3 2.8.8 4C9 14 13 10 20 4zM6 20c3-5 7-9 12-12" />,
  ];
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[i % 4]}
      </svg>
    </span>
  );
}
