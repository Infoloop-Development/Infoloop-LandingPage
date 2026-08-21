import type React from "react";
import { ArrowUpRight } from "@/components/ui";

/**
 * The body of an "All ..." hub page: an H2 per group, then a grid of cards
 * that each carry a title, one line and an arrow. Cards are built from the
 * detail pages themselves, so a hub never advertises a page that is not
 * there. Used by /services, /industries and /hire.
 */
export type HubCard = { title: string; line: string; href: string };
export type HubGroup = { title: string; blurb?: string; cards: HubCard[] };

export function HubGroups({ groups }: { groups: HubGroup[] }) {
  return (
    <div className="container-x pb-4">
      {groups.map((g, gi) => (
        <section key={g.title} className={gi > 0 ? "mt-14 sm:mt-20" : ""} aria-labelledby={`hub-${gi}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id={`hub-${gi}`} className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink reveal sm:text-[30px]">
              {g.title}
            </h2>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-ink/50 reveal">
              {g.cards.length} {g.cards.length === 1 ? "page" : "pages"}
            </p>
          </div>
          {g.blurb && <p className="mt-2 max-w-3xl text-[16.5px] text-ink/75 reveal">{g.blurb}</p>}
          <ul className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.cards.map((c, i) => (
              <li key={c.href} className="flex reveal" style={{ "--reveal-delay": `${Math.min(i, 6) * 50}ms` } as React.CSSProperties}>
                <a href={c.href} className="group flex w-full flex-col justify-between gap-6 border border-ink bg-white p-6 transition-colors hover:bg-paper">
                  <span>
                    <span className="block font-display text-[19px] font-bold leading-tight tracking-[-0.01em] text-ink group-hover:text-orange">{c.title}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-ink/75">{c.line}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink group-hover:text-orange" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
