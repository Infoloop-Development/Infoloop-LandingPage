import type React from "react";
import { Hi, SectionHead } from "@/components/ui";
import { WHY } from "@/content/home";

/* Line icons, 1.75 stroke. Inline so the section has no icon dependency. */
const ICONS: Record<string, React.ReactNode> = {
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />,
  tag: <path d="m3 12 9-9h9v9l-9 9-9-9zM16 8h.01" />,
  shield: <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3zM9 12l2 2 4-4" />,
  pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
};

/**
 * Why choose infoloop: six cards on a collapsed-border grid (7Span). This
 * merges the earlier value-props and why-us lists into one section.
 */
export function Why({ data = WHY }: { data?: typeof WHY } = {}) {
  return (
    <section className="section-y bg-paper border-y border-line" id="why" aria-labelledby="why-h2">
      <div className="container-x">
        <SectionHead id="why-h2" eyebrow={data.eyebrow} title={<Hi text={data.h2} />} lede={data.lede} />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((w, i) => (
            <li
              key={w.title}
              className="bg-white p-6 lg:p-8 reveal"
              style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[w.icon]}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-[19px] font-bold leading-snug text-ink">
                <Hi text={w.title} />
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
