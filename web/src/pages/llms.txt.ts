import type { APIRoute } from "astro";
import { LLMS_BASE } from "@/content/llms";
import { SITE } from "@/content/site";
import {
  getServiceDetails,
  getProducts,
  getWork,
  getHirePages,
  getIndustries,
  getSolutionGroups,
  getAbout,
  getBrand,
  getWorkIndex,
  getProductsIndex,
} from "@/lib/cms";

type Entry = { url: string; summary: string };

function push(list: Entry[], path: string, summary?: string) {
  const s = summary?.trim();
  if (!s) return;
  const base = SITE.url.replace(/\/$/, "");
  list.push({ url: `${base}${path.startsWith("/") ? path : `/${path}`}`, summary: s });
}

/**
 * /llms.txt — site-wide answer-engine file. Base copy from content/llms.ts;
 * optional per-page blurbs from CMS seo.llmSummary are appended.
 */
export const GET: APIRoute = async () => {
  const entries: Entry[] = [];

  const [services, products, cases, hire, industries, solutions, about, brand, workIndex, productsIndex] =
    await Promise.all([
      getServiceDetails(),
      getProducts(),
      getWork(),
      getHirePages(),
      getIndustries(),
      getSolutionGroups(),
      getAbout(),
      getBrand(),
      getWorkIndex(),
      getProductsIndex(),
    ]);

  for (const s of services) push(entries, `/${s.slug}`, s.seo?.llmSummary);
  for (const p of products) push(entries, `/products/${p.slug}`, p.seo?.llmSummary);
  for (const c of cases) push(entries, `/work/${c.slug}`, c.seo?.llmSummary);
  for (const h of hire) push(entries, `/${h.slug}`, h.seo?.llmSummary);
  for (const i of industries) push(entries, `/industry/${i.slug}`, i.seo?.llmSummary);
  for (const g of solutions) push(entries, `/solutions/${g.slug}`, g.seo?.llmSummary);
  push(entries, "/about", about.seo?.llmSummary);
  push(entries, "/brand-assets", brand.seo?.llmSummary);
  push(entries, "/work", workIndex.seo?.llmSummary);
  push(entries, "/products", productsIndex.seo?.llmSummary);
  for (const m of about.team.members) {
    if (m.profile?.slug) push(entries, `/${m.profile.slug}`, m.profile.seo?.llmSummary);
  }

  let body = LLMS_BASE.trimEnd();
  if (entries.length) {
    body += "\n\n## Page summaries (from CMS)\n";
    for (const e of entries) {
      body += `- ${e.summary}: ${e.url}\n`;
    }
  }
  body += "\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
