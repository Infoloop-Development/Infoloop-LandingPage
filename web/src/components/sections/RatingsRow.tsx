import type React from "react";
import { Star } from "@/components/ui";
import { RATINGS } from "@/content/site";

/**
 * 7Span's ratings row: four platforms on white, divided by vertical rules,
 * each with the platform name, a star row and a "Rated x.x" label. Sits right
 * after the CTA band, before the footer. Platform names are set as text
 * (the brand book forbids the platforms' badge graphics); scores are the
 * published ones and should be updated quarterly.
 */
export function RatingsRow({ ratings = RATINGS }: { ratings?: typeof RATINGS } = {}) {
  return (
    <section className="border-t border-line bg-white" aria-labelledby="ratings-h2">
      <h2 id="ratings-h2" className="sr-only">
        Client ratings
      </h2>
      <div className="container-x py-12 sm:py-16">
        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-ink">
          {ratings.map((r, i) => (
            <li
              key={r.platform}
              className="flex flex-col items-center gap-3 px-4 text-center reveal"
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <span className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[24px]">{r.platform}</span>
              <Stars value={Number(r.score)} />
              <span className="eyebrow text-ink/70">Rated {r.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Five stars with fractional fill for the last one (e.g. 4.7 → 4 full + 70%). */
function Stars({ value }: { value: number }) {
  return (
    <span className="relative inline-flex text-mist" aria-label={`${value} out of 5 stars`} role="img">
      <span className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-5 w-5" />
        ))}
      </span>
      <span className="absolute inset-0 flex gap-0.5 overflow-hidden text-orange" style={{ width: `${(value / 5) * 100}%` }} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-5 w-5 shrink-0" />
        ))}
      </span>
    </span>
  );
}
