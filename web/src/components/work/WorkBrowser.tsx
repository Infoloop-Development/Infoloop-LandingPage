import { useMemo, useState } from "react";
import { CaseCard } from "@/components/work/CaseCard";
import type { CaseStudy, IndustryKey, Snapshot } from "@/content/work";

/**
 * 7Span's Work toolbar and grid: a search box, a "Filter by industry"
 * dropdown, a 3-column grid of bordered cards (image with the industry label
 * bar over it, one sentence below) and a "Load more" button.
 *
 * Rendered to HTML at build time with every card present (so search engines
 * see all of them); hydrated `client:visible` only for search, filter and
 * load-more. Without JavaScript the full grid simply shows.
 */
export type BrowserItem = {
  slug: string;
  href: string;
  industry: string;
  industryKey: IndustryKey;
  serviceKeys: string[];
  client: string;
  tile: CaseStudy["tile"];
  cover?: CaseStudy["cover"];
  /** One sentence, shown under the image (7Span shows one line per card). */
  text: string;
  /** Short title, used for the search index and the accessible link name. */
  title: string;
  snapshot?: boolean;
  linkLabel: string;
};

export type BrowserLabels = {
  searchPlaceholder: string;
  filterLabel: string;
  allLabel: string;
  loadMore: string;
  empty: string;
};

export function toBrowserItems(cases: CaseStudy[], snapshots: Snapshot[]): BrowserItem[] {
  return [
    ...cases.map((c) => ({
      slug: c.slug,
      href: `/work/${c.slug}`,
      industry: c.industry,
      industryKey: c.industryKey,
      serviceKeys: c.serviceKeys ?? [],
      client: c.client,
      tile: c.tile,
      cover: c.cover,
      text: c.card.blurb,
      title: c.card.title,
      linkLabel: "Read case study",
    })),
    ...snapshots.map((s) => ({
      slug: s.slug,
      href: s.href,
      industry: s.industry,
      industryKey: s.industryKey,
      serviceKeys: s.serviceKeys ?? [],
      client: s.client,
      tile: s.tile,
      text: s.card.blurb,
      title: s.card.title,
      snapshot: true,
      linkLabel: s.linkLabel,
    })),
  ];
}

/** Cards shown before "Load more" (7Span shows a first page, then a button). */
const PAGE = 3;

export function WorkBrowser({
  items,
  industries,
  labels,
}: {
  items: BrowserItem[];
  industries: { key: IndustryKey; label: string }[];
  labels: BrowserLabels;
}) {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState<"all" | IndustryKey>("all");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      if (industry !== "all" && it.industryKey !== industry) return false;
      if (!needle) return true;
      return [it.title, it.text, it.client, it.industry, ...it.serviceKeys].join(" ").toLowerCase().includes(needle);
    });
  }, [items, q, industry]);

  // Every matching card is in the HTML (search engines and no-JS readers see
  // them all); cards past the first page carry `hidden` until "Load more".
  const visible = filtered;
  // Only industries that actually have a card, so the dropdown never dead-ends.
  const options = industries.filter((i) => items.some((it) => it.industryKey === i.key));

  return (
    <div>
      {/* Toolbar: search left, industry dropdown right (7Span) */}
      <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-[1fr_260px]">
        <label className="flex items-center gap-3 bg-white px-4">
          <span className="sr-only">Search case studies</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="shrink-0 text-ink/40">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 14 14" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShown(PAGE);
            }}
            placeholder={labels.searchPlaceholder}
            className="h-12 w-full bg-transparent text-[14.5px] text-ink outline-none placeholder:text-ink/40"
          />
        </label>
        <label className="relative flex items-center bg-white">
          <span className="sr-only">{labels.filterLabel}</span>
          <select
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value as "all" | IndustryKey);
              setShown(PAGE);
            }}
            className="h-12 w-full cursor-pointer appearance-none bg-transparent pl-4 pr-10 font-display text-[14px] font-semibold text-ink outline-none"
          >
            <option value="all">{labels.filterLabel}</option>
            {options.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="pointer-events-none absolute right-4 text-ink/60">
            <path d="m3 5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="mt-10 rounded-md border border-line bg-white p-6 text-[15px] text-ink/70">{labels.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {visible.map((it, i) => (
            <CaseCard key={it.slug} hidden={i >= shown} href={it.href} industry={it.industry} tile={it.tile} cover={it.cover} text={it.text} client={it.client} linkLabel={it.linkLabel} snapshot={it.snapshot} />
          ))}
        </ul>
      )}

      {filtered.length > shown && (
        <div className="mt-10 text-center">
          <button type="button" className="btn btn-ink px-7 py-4" onClick={() => setShown((n) => n + PAGE)}>
            {labels.loadMore}
          </button>
        </div>
      )}

    </div>
  );
}
