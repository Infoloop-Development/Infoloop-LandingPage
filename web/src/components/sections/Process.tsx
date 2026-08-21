import type React from "react";
import { Hi } from "@/components/ui";
import { PROCESS } from "@/content/home";

/**
 * "Our process": left-aligned heading and sub, then four dark tiles in one
 * row, alternating ink / charcoal, each with the step number inside a loop
 * that fills a quarter further at every step, and the title and description
 * at the bottom. Reads 1 → 2 → 3 → 4 left to right; stacks on small screens.
 *
 * The loop is ours rather than 7Span's circle / square / triangle set: the
 * name is Infoloop, the arc says how far through the work you are, and the
 * fourth step closes the ring, which is the promise (we stay and run it).
 * Faint concentric rings sit behind each card, the same motif as the contact
 * page band and the product banners.
 */
export function Process({ data = PROCESS }: { data?: typeof PROCESS } = {}) {
  return (
    <section className="section-y" id="process" aria-labelledby="process-h2">
      <div className="container-x">
        <p className="eyebrow text-ink/60 reveal">{data.eyebrow}</p>
        <h2 id="process-h2" className="display-h2 mt-3 text-ink reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          <Hi text={data.h2} />
        </h2>
        <p className="lede mt-4 max-w-3xl text-ink/70 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          {data.lede}
        </p>

        <ol className="mt-10 grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((st, i) => (
            <li
              key={st.n}
              className={`relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-lg p-7 text-white reveal lg:p-8 ${
                i % 2 === 0 ? "bg-ink" : "bg-charcoal"
              }`}
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <RingField />
              <div className="relative">
                <StepLoop n={i + 1} of={data.steps.length} />
              </div>
              <div className="relative">
                <h3 className="font-display text-[22px] font-bold leading-tight text-white">
                  <Hi text={st.title} className="text-white" />
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-40">{st.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * The step number inside a loop that is one quarter more complete at each
 * step. Track in white at low opacity, progress in Loop Orange.
 */
function StepLoop({ n, of }: { n: number; of: number }) {
  const R = 30;
  const C = 2 * Math.PI * R;
  const done = (C * n) / Math.max(of, 1);
  return (
    <span className="relative inline-flex h-[76px] w-[76px] items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 76 76" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="38" cy="38" r={R} fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="4" />
        <circle cx="38" cy="38" r={R} fill="none" stroke="#F47B00" strokeWidth="4" strokeLinecap="butt" strokeDasharray={`${done} ${C - done}`} />
      </svg>
      <span className="relative font-display text-[30px] font-bold leading-none tracking-[-0.03em] text-white">{n}</span>
    </span>
  );
}

/** Faint concentric rings bottom-right of a dark tile (the site's ink motif). */
function RingField() {
  return (
    <svg className="pointer-events-none absolute -bottom-40 -right-40 h-[300px] w-[300px] opacity-[0.10]" viewBox="0 0 300 300" fill="none" aria-hidden="true">
      {[145, 112, 79, 46].map((r) => (
        <circle key={r} cx="150" cy="150" r={r} stroke="#FFFFFF" strokeWidth="1" />
      ))}
    </svg>
  );
}
