/**
 * Blog posts from two sources, one shape.
 *
 * - Markdown files in src/content/posts/ (the Astro `posts` content
 *   collection, schema in src/content.config.ts). These ship with the repo.
 * - Documents in the Payload `posts` collection, published only. The CMS
 *   renders the rich text to HTML on save (`bodyHtml`, see
 *   cms/src/collections/Posts.ts), so the site never parses Lexical JSON.
 *
 * A CMS post with the same slug as a markdown post replaces it, the same
 * rule as every other CMS override on this site. Without PAYLOAD_URL the
 * markdown posts are used as-is, so the blog always builds.
 */
import { getCollection as getAstroCollection } from "astro:content";
import type { PostMeta } from "@/components/blog/PostCards";
import { getCollection, normalize } from "@/lib/cms";

export type Post = {
  slug: string;
  title: string;
  /** Longer H1 for the article page; falls back to title. */
  heading?: string;
  description: string;
  dek?: string;
  categories: string[];
  author: string;
  authorRole?: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingMinutes: number;
  takeaways: string[];
  cover?: string;
  faq: { q: string; a: string }[];
  featured: boolean;
  /** Rendered article body. */
  html: string;
  wordCount: number;
  source: "markdown" | "cms";
};

type Json = Record<string, unknown>;

const textOf = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const words = (html: string) => (textOf(html) ? textOf(html).split(" ").length : 0);
const minutes = (wordCount: number) => Math.max(1, Math.round(wordCount / 220));

async function markdownPosts(): Promise<Post[]> {
  const entries = (await getAstroCollection("posts")).filter((e) => !e.data.draft);
  return entries.map((e) => {
    const d = e.data;
    const html = e.rendered?.html ?? "";
    const wordCount = e.body ? e.body.split(/\s+/).filter(Boolean).length : words(html);
    return {
      slug: d.slug,
      title: d.title,
      heading: d.heading,
      description: d.description,
      dek: d.dek,
      categories: d.categories.length ? d.categories : [d.kicker],
      author: d.author,
      authorRole: d.authorRole,
      publishedAt: d.publishedAt,
      updatedAt: d.updatedAt,
      readingMinutes: d.readingMinutes ?? minutes(wordCount),
      takeaways: d.takeaways,
      cover: d.cover,
      faq: d.faq,
      featured: d.featured,
      html,
      wordCount,
      source: "markdown",
    };
  });
}

/** Payload `posts` documents (published only, see collection access) in the same shape. */
async function cmsPosts(): Promise<Post[]> {
  // depth=2 so `cover` and `author` arrive populated; getCollection normalises each doc.
  const docs = await getCollection<Json>("posts");
  const out: Post[] = [];
  for (const doc of docs) {
    if (typeof doc.slug !== "string" || typeof doc.title !== "string") continue;
    if (typeof doc.publishedAt !== "string") continue; // required in the CMS; a doc without it is not publishable
    const html = typeof doc.bodyHtml === "string" ? doc.bodyHtml : "";
    const wordCount = words(html);
    const topics = Array.isArray(doc.topics) ? (doc.topics as unknown[]).filter((t): t is string => typeof t === "string") : [];
    const kicker = typeof doc.kicker === "string" ? doc.kicker : "";
    const authorRel = doc.author as Json | undefined;
    const author =
      (typeof doc.authorName === "string" && doc.authorName.trim()) ||
      (authorRel && typeof authorRel.name === "string" && authorRel.name.trim()) ||
      "Infoloop team";
    const cover = doc.cover as Json | undefined;
    const faq = Array.isArray(doc.faq)
      ? (doc.faq as unknown[]).flatMap((f) => (f && typeof f === "object" && typeof (f as Json).q === "string" && typeof (f as Json).a === "string" ? [{ q: (f as Json).q as string, a: (f as Json).a as string }] : []))
      : [];
    out.push({
      slug: doc.slug,
      title: doc.title,
      heading: typeof doc.heading === "string" ? doc.heading : undefined,
      description: typeof doc.excerpt === "string" ? doc.excerpt : "",
      dek: typeof doc.dek === "string" ? doc.dek : undefined,
      categories: topics.length ? topics : kicker ? [kicker] : ["Insights"],
      author,
      authorRole: typeof doc.authorRole === "string" ? doc.authorRole : undefined,
      publishedAt: new Date(doc.publishedAt),
      readingMinutes: typeof doc.readingMinutes === "number" && doc.readingMinutes > 0 ? doc.readingMinutes : minutes(wordCount),
      takeaways: Array.isArray(doc.takeaways) ? (doc.takeaways as unknown[]).filter((t): t is string => typeof t === "string") : [],
      cover: cover && typeof cover.url === "string" ? cover.url : undefined,
      faq,
      featured: doc.featured === true,
      html,
      wordCount,
      source: "cms",
    });
  }
  return out;
}

/** All published posts, newest first. CMS posts replace markdown posts with the same slug. */
export async function getPosts(): Promise<Post[]> {
  const [md, cms] = await Promise.all([markdownPosts(), cmsPosts()]);
  const bySlug = new Map<string, Post>();
  for (const p of md) bySlug.set(p.slug, p);
  for (const p of cms) bySlug.set(p.slug, p);
  return [...bySlug.values()].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/** Card data, safe to pass to islands. */
export function toMeta(p: Post): PostMeta {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    categories: p.categories,
    author: p.author,
    authorRole: p.authorRole,
    publishedAt: p.publishedAt.toISOString(),
    readingMinutes: p.readingMinutes,
    cover: p.cover,
    featured: p.featured,
  };
}

// normalize is re-exported for tests of the CMS shape; nothing else should need it here.
export { normalize as _normalize };
