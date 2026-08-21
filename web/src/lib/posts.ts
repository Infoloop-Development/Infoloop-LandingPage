import { getCollection as getAstroCollection } from "astro:content";
import type { PostMeta } from "@/components/blog/PostCards";

/** All published posts, newest first, as plain card data (safe to pass to islands). */
export async function getPosts() {
  const entries = (await getAstroCollection("posts")).filter((e) => !e.data.draft);
  entries.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
  return entries;
}

export function toMeta(e: Awaited<ReturnType<typeof getPosts>>[number]): PostMeta {
  const d = e.data;
  return {
    slug: d.slug,
    title: d.title,
    description: d.description,
    categories: d.categories.length ? d.categories : [d.kicker],
    author: d.author,
    authorRole: d.authorRole,
    publishedAt: d.publishedAt.toISOString(),
    readingMinutes: d.readingMinutes,
    cover: d.cover,
    featured: d.featured,
  };
}
