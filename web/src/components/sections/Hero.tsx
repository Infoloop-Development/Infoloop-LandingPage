import type React from "react";
import { Button, Hi, Star } from "@/components/ui";
import { HERO } from "@/content/home";
import { RATINGS } from "@/content/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Hero, Roundsite Home V1, matched section for section. The static top
 * (rating row, headline, sub, button) renders as HTML with no client JS;
 * Hero.astro places the hydrated HeroPanels island beneath it. Load
 * animation: staggered fade-up (.hero-in) via CSS.
 */
export function HeroTop({ data = HERO }: { data?: typeof HERO } = {}) {
  return (
      <div className="container-x pt-14 text-center sm:pt-20 lg:pt-24">
        <div className="hero-in flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" style={d(0)}>
          <div className="flex -space-x-2" aria-hidden="true">
            {RATINGS.map((r, i) => (
              <span
                key={r.platform}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white font-display text-[13px] font-bold ${
                  i % 2 === 0 ? "bg-ink text-white" : "bg-mist text-ink"
                }`}
              >
                {r.platform[0]}
              </span>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-0.5 text-orange" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5" />
              ))}
            </div>
            <p className="mt-0.5 font-display text-[17px] font-semibold text-ink">
              {data.rating.score} <span className="font-sans font-normal text-ink/80">{data.rating.label}</span>
            </p>
          </div>
        </div>

        <h1 id="hero-h1" className="display-hero hero-in mx-auto mt-8 max-w-4xl text-ink" style={d(120)}>
          <Hi text={data.h1} />
        </h1>
        <p className="lede hero-in mx-auto mt-6 max-w-2xl text-ink/80" style={d(240)}>
          {data.lede}
        </p>
        <div className="hero-in mt-8" style={d(360)}>
          <Button href={data.primary.href} variant="primary" className="px-6 py-4 text-[16px]">
            {data.primary.label}
          </Button>
        </div>
      </div>
  );
}

/** Small "trusted by" line under the panels. */
export function HeroTrusted({ data = HERO }: { data?: typeof HERO } = {}) {
  return (
        <p className="mt-10 flex items-center justify-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/70">
          <span className="flex items-center gap-0.5 text-orange" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5" />
            ))}
          </span>
          {data.trustedLine}
        </p>
  );
}
