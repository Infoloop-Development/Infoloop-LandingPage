import { Mark } from "@/components/Logo";

/* ------------------------------------------------------------------
   Blog cards, 7Span's blog format:
   - PostCard (featured row): cover with the title drawn in it, category
     tags in small caps, title, "BY AUTHOR / DATE" in mono caps, and the
     folded corner bottom-right.
   - PostRow (list): cover left, category / title / author + date right.
   Covers are drawn (title on a brand field) until real cover images exist.
   ------------------------------------------------------------------ */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  author: string;
  authorRole?: string;
  publishedAt: string; // ISO date
  readingMinutes?: number;
  cover?: string;
  featured?: boolean;
};

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase();
}

const TONES = [
  { bg: "bg-ink", fg: "text-white", accent: "bg-orange", bar: "bg-white/25" },
  { bg: "bg-orange", fg: "text-ink", accent: "bg-ink", bar: "bg-ink/20" },
  { bg: "bg-mist", fg: "text-ink", accent: "bg-orange", bar: "bg-white/80" },
  { bg: "bg-charcoal", fg: "text-white", accent: "bg-orange", bar: "bg-white/20" },
];

/** Drawn cover: the title set large on a brand field, with the five-bar motif (7Span covers carry the title too). */
export function PostCover({ post, index = 0, className = "" }: { post: PostMeta; index?: number; className?: string }) {
  if (post.cover) {
    return <img src={post.cover} alt="" loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  }
  const t = TONES[index % TONES.length];
  return (
    <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-5 sm:p-6 ${t.bg} ${t.fg} ${className}`} aria-hidden="true">
      <div className="pointer-events-none absolute -right-8 top-4 flex w-[55%] flex-col gap-2 opacity-90">
        {[["22%", "70%"], ["34%", "52%"], ["0%", "90%"], ["44%", "40%"], ["22%", "70%"]].map(([l, w], i) => (
          <span key={i} className={`block h-3 rounded-full ${i === 1 ? t.accent : t.bar}`} style={{ marginLeft: l, width: w }} />
        ))}
      </div>
      <p className="relative max-w-[78%] font-display text-[19px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[22px]">{post.title}</p>
      <div className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-80">
        <Mark size={16} tone={t.fg === "text-white" ? "white" : "ink"} />
        Infoloop
      </div>
    </div>
  );
}

/** Small caps category list, 7Span "FRONTEND · WEB" */
function Cats({ cats, className = "" }: { cats: string[]; className?: string }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55 ${className}`}>
      {cats.map((c, i) => (
        <span key={c}>
          {i > 0 && <span className="mx-2 text-ink/30">·</span>}
          {c}
        </span>
      ))}
    </p>
  );
}

/** Folded corner, bottom-right (7Span cards) */
function Fold() {
  return <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-l border-t border-ink bg-white [clip-path:polygon(0_0,100%_0,100%_100%)]" />;
}

/** Featured card: cover on top, meta below */
export function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <li className="group relative flex flex-col overflow-hidden border border-ink bg-white transition-colors hover:bg-paper focus-within:ring-2 focus-within:ring-orange">
      <div className="aspect-[16/9] border-b border-ink">
        <PostCover post={post} index={index} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Cats cats={post.categories} />
        <h3 className="mt-2.5 font-display text-[18px] font-bold leading-snug text-ink">
          <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </a>
        </h3>
        <p className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60">
          By {post.author}
          <span className="block">{fmtDate(post.publishedAt)}</span>
        </p>
      </div>
      <Fold />
    </li>
  );
}

/** List row: cover left, meta right */
export function PostRow({ post, index = 0, hidden = false }: { post: PostMeta; index?: number; hidden?: boolean }) {
  return (
    <li hidden={hidden} className="group relative grid overflow-hidden border border-ink bg-white transition-colors hover:bg-paper focus-within:ring-2 focus-within:ring-orange sm:grid-cols-[minmax(0,44%)_1fr]">
      <div className="aspect-[16/9] border-b border-ink sm:aspect-auto sm:min-h-[200px] sm:border-b-0 sm:border-r">
        <PostCover post={post} index={index} />
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <Cats cats={post.categories} />
        <h3 className="mt-2.5 font-display text-[18px] font-bold leading-snug text-ink sm:text-[19px]">
          <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </a>
        </h3>
        <p className="mt-2 hidden text-[14px] leading-relaxed text-ink/70 lg:block">{post.description}</p>
        <p className="mt-auto pt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60">
          By {post.author}
          <span className="block">{fmtDate(post.publishedAt)}</span>
        </p>
      </div>
      <Fold />
    </li>
  );
}
