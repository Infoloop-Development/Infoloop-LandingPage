import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Blog posts: markdown files in src/content/posts. Front matter mirrors the
 * old site's insights and the CMS `posts` collection (title, description,
 * kicker/categories, author, publishedAt, readingMinutes, takeaways).
 */
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    heading: z.string().optional(),
    kicker: z.string(),
    categories: z.array(z.string()).default([]),
    dek: z.string().optional(),
    author: z.string().default("Infoloop team"),
    authorRole: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readingMinutes: z.number().optional(),
    takeaways: z.array(z.string()).default([]),
    cover: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
