import { useEffect, useMemo, useState } from "react";
import { PostRow, type PostMeta } from "@/components/blog/PostCards";
import type { BlogIndex } from "@/content/blog";

/**
 * 7Span "Keep Exploring": search box, "Top Categories" chips on the left,
 * the list of post rows on the right, "Load More" underneath. Rendered to
 * HTML with every post present; hydrated `client:visible` for search,
 * category filter and load-more.
 */
const PAGE = 6;

export function BlogBrowser({ posts, categories, labels }: { posts: PostMeta[]; categories: string[]; labels: BlogIndex }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [shown, setShown] = useState(PAGE);
  // "More by <author>" links open the blog with ?q=<author> prefilled.
  useEffect(() => {
    const q0 = new URLSearchParams(window.location.search).get("q");
    if (q0) setQ(q0);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (cat !== "all" && !p.categories.includes(cat)) return false;
      if (!needle) return true;
      return [p.title, p.description, p.author, ...p.categories].join(" ").toLowerCase().includes(needle);
    });
  }, [posts, q, cat]);

  const chip = (active: boolean) =>
    `inline-flex cursor-pointer select-none items-center px-2.5 py-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors max-lg:min-h-11 ${
      active ? "bg-orange text-ink" : "bg-paper text-ink/70 hover:bg-mist hover:text-ink"
    }`;

  return (
    <div>
      {/* Search (7Span "Search Blog") */}
      <label className="flex items-center gap-3 border border-line bg-white px-4">
        <span className="sr-only">Search blog</span>
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

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Top categories */}
        <aside className="lg:col-span-3">
          <p className="font-display text-[19px] font-bold text-ink">{labels.categoriesLabel}</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={labels.categoriesLabel}>
            <button type="button" aria-pressed={cat === "all"} className={chip(cat === "all")} onClick={() => { setCat("all"); setShown(PAGE); }}>
              {labels.allLabel}
            </button>
            {categories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} className={chip(cat === c)} onClick={() => { setCat(c); setShown(PAGE); }}>
                {c}
              </button>
            ))}
          </div>
        </aside>

        {/* Post rows */}
        <div className="lg:col-span-9">
          {filtered.length === 0 ? (
            <p className="border border-line bg-white p-6 text-[15px] text-ink/70">{labels.empty}</p>
          ) : (
            <ul className="space-y-5" aria-live="polite">
              {filtered.map((p, i) => (
                <PostRow key={p.slug} post={p} index={i + 3} hidden={i >= shown} />
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
      </div>
    </div>
  );
}
