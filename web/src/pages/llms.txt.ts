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
  getHubs,
  getCompany,
  getContact,
  getTechnologies,
  getBlogIndex,
} from "@/lib/cms";

type Entry = { url: string; summary: string };

function push(list: Entry[], path: string, summary?: string, noindex?: boolean) {
  const s = summary?.trim();
  // A page hidden from search engines is not advertised to answer engines either.
  if (!s || noindex) return;
  const base = SITE.url.replace(/\/$/, "");
  list.push({ url: `${base}${path.startsWith("/") ? path : `/${path}`}`, summary: s });
}

/**
 * /llms.txt — site-wide answer-engine file. Base copy from content/llms.ts;
 * optional per-page blurbs from CMS seo.llmSummary are appended.
 */
export const GET: APIRoute = async () => {
  const entries: Entry[] = [];

  const [services, products, cases, hire, industries, solutions, about, brand, workIndex, productsIndex, hubs, company, contact, technologies, blogIndex] =
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
      getHubs(),
      getCompany(),
      getContact(),
      getTechnologies(),
      getBlogIndex(),
    ]);

  for (const s of services) push(entries, `/${s.slug}`, s.seo?.llmSummary, s.seo?.noindex);
  for (const p of products) push(entries, `/products/${p.slug}`, p.seo?.llmSummary, p.seo?.noindex);
  for (const c of cases) push(entries, `/work/${c.slug}`, c.seo?.llmSummary, c.seo?.noindex);
  for (const h of hire) push(entries, `/${h.slug}`, h.seo?.llmSummary, h.seo?.noindex);
  for (const i of industries) push(entries, `/industry/${i.slug}`, i.seo?.llmSummary, i.seo?.noindex);
  for (const g of solutions) push(entries, `/solutions/${g.slug}`, g.seo?.llmSummary, g.seo?.noindex);
  push(entries, "/about", about.seo?.llmSummary, about.seo?.noindex);
  push(entries, "/brand-assets", brand.seo?.llmSummary, brand.seo?.noindex);
  push(entries, "/work", workIndex.seo?.llmSummary, workIndex.seo?.noindex);
  push(entries, "/products", productsIndex.seo?.llmSummary, productsIndex.seo?.noindex);
  for (const h of hubs) push(entries, `/${h.slug}`, h.seo?.llmSummary, h.seo?.noindex);
  push(entries, "/careers", company.careers.seo?.llmSummary, company.careers.seo?.noindex);
  push(entries, "/testimonials", company.testimonials.seo?.llmSummary, company.testimonials.seo?.noindex);
  push(entries, "/trust-center", company.trust.seo?.llmSummary, company.trust.seo?.noindex);
  push(entries, "/contact", contact.seo?.llmSummary, contact.seo?.noindex);
  push(entries, "/technologies", technologies.seo?.llmSummary, technologies.seo?.noindex);
  push(entries, "/blog", blogIndex.seo?.llmSummary, blogIndex.seo?.noindex);
  for (const m of about.team.members) {
    if (m.profile?.slug) push(entries, `/${m.profile.slug}`, m.profile.seo?.llmSummary, m.profile.seo?.noindex);
  }

  // The base file is committed with Windows line endings; serve one convention.
  let body = LLMS_BASE.replace(/\r\n/g, "\n").trimEnd();
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
