import type React from "react";
import { Mark } from "@/components/Logo";
import { ArrowRight, Hi } from "@/components/ui";
import { ABOUT } from "@/content/home";

/**
 * About infoloop. Left: entity H2, two short paragraphs, internal links.
 * Right: a fact panel (dl of published facts) and the founder. Search and
 * answer engines get a named entity, structured facts and a person; readers
 * get something they can scan in ten seconds.
 */
export function About({ data = ABOUT }: { data?: typeof ABOUT } = {}) {
  return (
    <section className="section-y border-b border-line" id="about" aria-labelledby="about-h2">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ink/60 reveal">{data.eyebrow}</p>
          <h2 id="about-h2" className="display-h2 mt-3 max-w-2xl text-ink reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            <Hi text={data.h2} />
          </h2>
          {data.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`max-w-2xl text-[16.5px] leading-relaxed text-ink/85 reveal ${i === 0 ? "mt-6" : "mt-4"}`}
              style={{ "--reveal-delay": `${120 + i * 60}ms` } as React.CSSProperties}
            >
              {p}
            </p>
          ))}
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 reveal" style={{ "--reveal-delay": "260ms" } as React.CSSProperties}>
            {data.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-arrow text-ink">
                  {l.label} <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          {/* Fact panel */}
          <dl className="divide-y divide-line-dark overflow-hidden rounded-xl bg-ink text-white reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            {data.facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[112px_1fr] gap-4 px-6 py-3.5 text-[14px]">
                <dt className="font-display font-semibold text-gray-40">{f.k}</dt>
                <dd className="text-white">{f.v}</dd>
              </div>
            ))}
          </dl>

          {/* Founder */}
          <div className="mt-4 flex items-center gap-4 rounded-xl border border-line p-4 reveal" style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
            <span
              role="img"
              aria-label={`Photo slot: ${data.founder.name}`}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-mist"
            >
              <Mark size={22} />
            </span>
            <div>
              <p className="font-display text-[15px] font-bold text-ink">{data.founder.name}</p>
              <p className="text-[13px] text-ink/70">{data.founder.role}</p>
              <p className="mt-1 text-[13px] text-ink/70">{data.founder.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
