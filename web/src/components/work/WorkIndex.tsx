import type React from "react";
import { ArrowRight, Hi } from "@/components/ui";
import { CaseTile } from "@/components/work/CaseTile";
import type { CaseStudy, WorkIndex } from "@/content/work";

/* ------------------------------------------------------------------
   /work page, 7Span's Work page format: plain "Work" H1 and one paragraph,
   a tabbed featured panel (title, paragraph, "Read case study", image),
   the search + industry toolbar and card grid (WorkBrowser island), then a
   hatched CTA band. Everything here is static HTML; the tabs are a CSS
   radio group.
   ------------------------------------------------------------------ */

/** Hero: H1 + one paragraph, white background (7Span). */
export function WorkHero({ data }: { data: WorkIndex }) {
  return (
    <section aria-labelledby="work-h1">
      <div className="container-x pt-12 sm:pt-16">
        <h1 id="work-h1" className="display-h2 text-ink hero-in">
          <Hi text={data.h1} />
        </h1>
        <p className="lede mt-4 max-w-4xl text-ink/75 hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
          {data.lede}
        </p>
      </div>
    </section>
  );
}

/**
 * Featured panel with tabs (7Span: BLAST RADIO | CHICKEN MASTER | ...).
 * One radio per tab; globals.css shows the matching panel. Up to 6 tabs.
 */
/** `labelledBy`: id of a heading already on the page; the inner sr-only H2 is then skipped (industry pages). */
export function FeaturedTabs({ tabs, button = "Read case study", labelledBy }: { tabs: { label: string; c: CaseStudy }[]; button?: string; labelledBy?: string }) {
  if (tabs.length === 0) return null;
  return (
    <section aria-labelledby={labelledBy ?? "featured-h2"} className="ftabs">
      <div className="container-x mt-8 sm:mt-10 hero-fade" style={{ "--d": "160ms" } as React.CSSProperties}>
        {!labelledBy && (
          <h2 id="featured-h2" className="sr-only">
            Featured case studies
          </h2>
        )}
        <fieldset className="min-w-0 border border-line bg-white">
          <legend className="sr-only">Choose a featured case study</legend>
          {/* Two by two on a phone, one strip from sm. The strip used to scroll
              sideways here, which hid half the cases behind a gesture nobody
              knows is available and cut the last label mid-word. */}
          <div className="grid auto-rows-fr grid-cols-2 gap-px border-b border-line bg-line sm:flex sm:gap-0 sm:overflow-x-auto sm:bg-transparent">
            {/* relative on each tab: the sr-only radio is absolutely positioned and must stay inside the strip (else it widens the page on phones) */}
            {tabs.map((t, i) => (
              <span key={t.c.slug} className="relative flex sm:shrink-0">
                <input type="radio" name="featured-tab" id={`ft-${i}`} className="sr-only" defaultChecked={i === 0} />
                <label
                  htmlFor={`ft-${i}`}
                  className="ftab flex w-full cursor-pointer select-none items-center bg-paper px-4 py-3 font-display text-[11.5px] font-semibold uppercase leading-tight tracking-[0.1em] text-ink/60 transition-colors hover:text-ink sm:block sm:w-auto sm:border-r sm:border-line sm:px-5 sm:text-[12px] sm:tracking-[0.14em]"
                >
                  {t.label}
                </label>
              </span>
            ))}
          </div>
          {tabs.map((t, i) => (
            <div key={t.c.slug} className="fpanel gap-8 p-6 lg:grid-cols-2 lg:gap-12 lg:p-8" data-i={i}>
              <div className="flex flex-col">
                <h3 className="font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[28px]">{t.c.title}</h3>
                <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink/75">{t.c.card.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink/70">
                  {t.c.metrics.map((m) => (
                    <li key={m.label}>
                      <span className="font-display font-bold text-ink">{m.value}</span> {m.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <a href={`/work/${t.c.slug}`} className="btn btn-ink px-6 py-3.5">
                    {button} <ArrowRight />
                  </a>
                </div>
              </div>
              <CaseTile kind={t.c.tile} cover={t.c.cover} size="hero" rounded={false} className="min-h-[280px] lg:min-h-[360px]" />
            </div>
          ))}
        </fieldset>
      </div>
    </section>
  );
}

/**
 * CTA band (7Span "Got An Idea?" / "Launch my website"): headline and one
 * line on the left, one button on the right, nothing else. Ink panel inside
 * the container; orange stays on the action.
 */
export function WorkBand({ data }: { data: WorkIndex["band"] }) {
  return (
    <section aria-labelledby="band-h2" className="bg-white">
      <div className="container-x pb-16 sm:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 id="band-h2" className="font-display text-[30px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[38px]">
                <Hi text={data.h2} />
              </h2>
              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-gray-40">{data.lede}</p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <a href={data.button.href} className="btn btn-primary px-7 py-4 text-[16px]">
                {data.button.label} <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
