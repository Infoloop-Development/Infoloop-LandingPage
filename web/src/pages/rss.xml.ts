import type { APIRoute } from "astro";
import { SITE } from "@/content/site";
import { getPosts, toMeta } from "@/lib/posts";

/**
 * /rss.xml — a real feed, hand-rolled so the handover repo does not gain a
 * dependency for eighty lines of XML.
 *
 * This is an AEO/GEO asset as much as a reader convenience: feeds are one of
 * the few structured, dated, full-text surfaces that answer engines and
 * aggregators ingest reliably. Linked from <head> on every page and from
 * robots.txt so it is discoverable without being crawled for.
 */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  const posts = (await getPosts()).map(toMeta).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${esc(p.description)}</description>`,
        `      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>`,
        `      <dc:creator>${esc(p.author)}</dc:creator>`,
        ...p.categories.map((c) => `      <category>${esc(c)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name ?? "Infoloop")} blog</title>
    <link>${SITE.url}/blog</link>
    <description>${esc(SITE.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0]?.publishedAt ?? Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
