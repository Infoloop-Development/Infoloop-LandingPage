/**
 * Content adapter. Astro builds are static, so content is fetched from
 * Payload CMS at build time and merged over the local defaults in
 * src/content/*. When PAYLOAD_URL is unset (local dev, first deploy) the
 * local files are used as-is, so the site always builds.
 *
 * Payload shape (see ../cms/src/globals): a `home` global whose groups mirror
 * the exports of src/content/home.ts (hero, trust, band, services, process,
 * stats, products, why, industries, proof, about, faq, cta) and a `site`
 * global for nav, footer, offices, social and ratings. Collections
 * (services, industries, hire, products, work, posts, testimonials, pages)
 * feed the other pages through getCollection().
 *
 * Editorial conventions carried through from the TS content:
 * - `[[phrase]]` in a heading marks the single orange highlight.
 * - `\n` in a heading is a line break on large screens.
 */
import * as HOME from "@/content/home";
import { LOCAL_SITE, type SiteContent } from "@/lib/site-content";
import { flattenSeoImage } from "@/lib/seo";

export type { SiteContent } from "@/lib/site-content";

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL as string | undefined;
const PAYLOAD_TOKEN = import.meta.env.PAYLOAD_TOKEN as string | undefined;

type Json = Record<string, unknown>;

function isObject(v: unknown): v is Json {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/**
 * Bring Payload's JSON to the local content shape:
 * - array rows `{ id, value }` become plain strings (Payload cannot store
 *   `string[]`, so string lists are arrays of `{ value }`);
 * - the `id` Payload adds to every array row is dropped;
 * - empty strings become undefined so they do not override local copy.
 */
export function normalize(v: unknown): unknown {
  if (Array.isArray(v)) {
    // An empty array means "not filled in yet", not "remove the local list".
    if (v.length === 0) return undefined;
    return v.map((row) => {
      if (isObject(row)) {
        const keys = Object.keys(row).filter((k) => k !== "id");
        if (keys.length === 1 && keys[0] === "value") return row.value;
      }
      return normalize(row);
    });
  }
  if (isObject(v)) {
    const out: Json = {};
    for (const [k, val] of Object.entries(v)) {
      if (k === "id" || k === "globalType" || k === "createdAt" || k === "updatedAt" || k === "_status") continue;
      const n = normalize(val);
      if (n !== undefined && n !== "" && n !== null) out[k] = n;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return v;
}

/** Deep-merge `remote` over `local`; arrays from remote replace local arrays. */
export function deepMerge<T>(local: T, remote: unknown): T {
  if (!isObject(local) || !isObject(remote)) return (remote === undefined || remote === null ? local : (remote as T));
  const out: Json = { ...local };
  for (const [k, v] of Object.entries(remote)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = isObject(v) && isObject(local[k]) ? deepMerge(local[k], v) : v;
  }
  return out as T;
}

/**
 * One request per distinct path for the life of the process. Every page asks
 * for the site and analytics globals, so an 85-page build made several hundred
 * identical requests to the CMS; now it makes one each. Prerendered pages are
 * frozen at build time anyway, so nothing observable changes.
 */
const inflight = new Map<string, Promise<unknown | null>>();

/** Raw JSON from the Payload REST API, or null when unset/unreachable. */
function fetchRaw(path: string): Promise<unknown | null> {
  let p = inflight.get(path);
  if (!p) {
    p = fetchRawUncached(path);
    inflight.set(path, p);
  }
  return p;
}

async function fetchRawUncached(path: string): Promise<unknown | null> {
  if (!PAYLOAD_URL) return null;
  try {
    const res = await fetch(`${PAYLOAD_URL.replace(/\/$/, "")}/api/${path}`, {
      headers: PAYLOAD_TOKEN ? { Authorization: `users API-Key ${PAYLOAD_TOKEN}` } : {},
    });
    if (!res.ok) {
      console.warn(`[cms] ${path} responded ${res.status}; using local content`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[cms] ${path} failed; using local content`, err);
    return null;
  }
}

/** One document or global, normalised to the local content shape. */
async function fetchPayload<T>(path: string): Promise<T | null> {
  const raw = await fetchRaw(path);
  return raw === null ? null : ((normalize(raw) ?? null) as T | null);
}

export type HomeContent = {
  hero: typeof HOME.HERO;
  trust: typeof HOME.TRUST;
  band: typeof HOME.BAND_WORDS;
  services: typeof HOME.SERVICES_SECTION;
  process: typeof HOME.PROCESS;
  stats: typeof HOME.COMPANY_STATS;
  products: typeof HOME.PRODUCTS;
  why: typeof HOME.WHY;
  industries: typeof HOME.INDUSTRIES;
  proof: typeof HOME.PROOF;
  about: typeof HOME.ABOUT;
  faq: typeof HOME.FAQ;
  cta: typeof HOME.CTA;
};

const LOCAL_HOME: HomeContent = {
  hero: HOME.HERO,
  trust: HOME.TRUST,
  band: HOME.BAND_WORDS,
  services: HOME.SERVICES_SECTION,
  process: HOME.PROCESS,
  stats: HOME.COMPANY_STATS,
  products: HOME.PRODUCTS,
  why: HOME.WHY,
  industries: HOME.INDUSTRIES,
  proof: HOME.PROOF,
  about: HOME.ABOUT,
  faq: HOME.FAQ,
  cta: HOME.CTA,
};

/** Flatten a Payload media upload to { url, alt }. */
function flattenMedia(value: unknown): { url: string; alt?: string } | undefined {
  if (!isObject(value) || typeof value.url !== "string") return undefined;
  return { url: value.url, alt: typeof value.alt === "string" ? value.alt : undefined };
}

/** Home page content: Payload `home` global merged over local defaults. */
export async function getHome(): Promise<HomeContent> {
  const remote = await fetchPayload<Json>("globals/home?depth=2");
  if (!remote) return LOCAL_HOME;
  const hero = remote.hero as Json | undefined;
  const card = hero && isObject(hero.card) ? (hero.card as Json) : undefined;
  if (card) {
    const left = flattenMedia(card.leftImage);
    const right = flattenMedia(card.rightImage);
    if (left) {
      card.leftImage = left;
      if (left.alt) card.leftAlt = left.alt;
    } else delete card.leftImage;
    if (right) {
      card.rightImage = right;
      if (right.alt) card.rightAlt = right.alt;
    } else delete card.rightImage;
  }
  return deepMerge(LOCAL_HOME, remote);
}

/** Site-wide content (nav, footer, offices, social): Payload `site` global merged over local defaults. */
export async function getSite(): Promise<SiteContent> {
  const remote = await fetchPayload<Json>("globals/site?depth=1");
  return remote ? deepMerge(LOCAL_SITE, remote) : LOCAL_SITE;
}

/**
 * All published documents of a collection (services, industries, hire,
 * products, work, posts, testimonials, pages). Returns [] without a CMS so
 * pages that list a collection still build.
 */
export async function getCollection<T = Json>(slug: string, query = ""): Promise<T[]> {
  const out: T[] = [];
  let page = 1;
  for (;;) {
    // Normalise each doc, not the pagination envelope (an empty `docs` must stay an array).
    const res = (await fetchRaw(`${slug}?limit=100&depth=2&page=${page}${query ? `&${query}` : ""}`)) as
      | { docs?: unknown[]; hasNextPage?: boolean }
      | null;
    if (!res) break;
    for (const doc of res.docs ?? []) {
      const n = normalize(doc);
      if (n) out.push(n as T);
    }
    if (!res.hasNextPage) break;
    page += 1;
  }
  return out;
}

/* ---------------- Work (case studies) ---------------- */
import { CASES, WORK, type CaseStudy, type WorkIndex } from "@/content/work";

/** Set PAYLOAD_PREVIEW=true to build drafts (with PAYLOAD_TOKEN); default is published only. */
const PREVIEW = import.meta.env.PAYLOAD_PREVIEW === "true";
const publishedOnly = PREVIEW ? "" : "&where[_status][equals]=published";

/** /work index copy: Payload `work-page` global merged over local WORK. */
export async function getWorkIndex(): Promise<WorkIndex> {
  const remote = await fetchPayload<Json>("globals/work-page?depth=2");
  if (!remote) return WORK;
  if (isObject(remote.seo)) flattenSeoImage(remote.seo as Json);
  return deepMerge(WORK, remote);
}

/** Shape a CMS-only case study is merged over, so a partly filled document can never break the build. */
const EMPTY_CASE: CaseStudy = {
  slug: "",
  client: "",
  named: false,
  industry: "",
  industryKey: "manufacturing",
  services: [],
  serviceKeys: [],
  tags: "",
  tile: "erp",
  title: "",
  lede: "",
  card: { title: "", blurb: "", metric: "", metricLabel: "" },
  metrics: [],
  meta: { industry: "", services: [], stack: [], timeline: "", status: "Live, run by Infoloop" },
  intro: { sub: "", paragraphs: [] },
  glance: [],
  situation: [],
  challenges: [],
  approach: [],
  built: [],
  resultsSub: "",
  results: [],
  quote: { text: "", name: "", role: "" },
  dayToDay: { h2: "", items: [] },
  extra: { eyebrow: "", h2: "", items: [] },
  tech: [],
  note: "",
  seo: { title: "", description: "" },
};

/**
 * All case studies: published Payload `work` docs merged over the local
 * ones by slug (a CMS doc with a new slug is added on top of EMPTY_CASE; a
 * CMS doc with a known slug overrides that local case field by field).
 * A case needs a title, a card title and at least one metric to be listed.
 * Order: featured first, then CMS `order`, then local order.
 */
export async function getWork(): Promise<CaseStudy[]> {
  const remote = await getCollection<Json & { slug?: string; order?: number }>("work", "sort=order" + publishedOnly);
  const bySlug = new Map<string, CaseStudy>(CASES.map((c) => [c.slug, c]));
  for (const doc of remote) {
    if (!doc.slug) continue;
    // Payload returns populated relationships and uploads as documents.
    if (Array.isArray(doc.related)) doc.related = (doc.related as unknown[]).map((r) => (isObject(r) ? (r.slug as string) : (r as string))).filter(Boolean);
    if (isObject(doc.cover) && typeof doc.cover.url === "string") doc.cover = { url: doc.cover.url, alt: typeof doc.cover.alt === "string" ? doc.cover.alt : undefined };
    else delete doc.cover;
    if (isObject(doc.seo)) flattenSeoImage(doc.seo);
    if (Array.isArray(doc.gallery)) {
      doc.gallery = (doc.gallery as unknown[])
        .map((g) => {
          if (!isObject(g) || !isObject(g.image) || typeof g.image.url !== "string") return null;
          const override = typeof g.alt === "string" && g.alt.trim() ? g.alt.trim() : undefined;
          const mediaAlt = typeof g.image.alt === "string" ? g.image.alt : undefined;
          return { url: g.image.url, alt: override || mediaAlt, caption: g.caption };
        })
        .filter(Boolean);
      if ((doc.gallery as unknown[]).length === 0) delete doc.gallery;
    }
    // Payload dates are full timestamps; the schema wants a calendar day.
    for (const k of ["datePublished", "dateModified"] as const) if (typeof doc[k] === "string") doc[k] = (doc[k] as string).slice(0, 10);
    const local = bySlug.get(doc.slug) ?? EMPTY_CASE;
    bySlug.set(doc.slug, deepMerge(local, doc));
  }
  const all = [...bySlug.values()].filter((c) => c.title && c.card?.title && c.metrics.length > 0);
  return all.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

/** Related cases: explicit list first (never itself, no duplicates), then same industry, then the rest. */
export function relatedCases(c: CaseStudy, all: CaseStudy[], n = 3): CaseStudy[] {
  const explicit = [...new Set(c.related ?? [])].filter((s) => s !== c.slug).map((s) => all.find((x) => x.slug === s)).filter(Boolean) as CaseStudy[];
  const same = all.filter((x) => x.slug !== c.slug && x.industryKey === c.industryKey && !explicit.includes(x));
  const rest = all.filter((x) => x.slug !== c.slug && !explicit.includes(x) && !same.includes(x));
  return [...explicit, ...same, ...rest].slice(0, n);
}

/* ---------------- About ---------------- */
import { ABOUT, type AboutContent } from "@/content/about";

/** /about copy: Payload `about-page` global merged over local. */
export async function getAbout(): Promise<AboutContent> {
  const remote = await fetchPayload<Json>("globals/about-page?depth=2");
  if (!remote) return ABOUT;
  if (isObject(remote.seo)) flattenSeoImage(remote.seo as Json);
  const team = (remote as { team?: { members?: Json[] } }).team;
  if (team && Array.isArray(team.members)) {
    for (const m of team.members) {
      if (isObject(m) && isObject(m.profile) && isObject((m.profile as Json).seo)) {
        flattenSeoImage((m.profile as Json).seo as Json);
      }
    }
  }
  return deepMerge(ABOUT, remote);
}

/* ---------------- Brand assets ---------------- */
import { BRAND, type BrandContent } from "@/content/brand";

/** /brand-assets copy: Payload `brand-page` global merged over local. */
export async function getBrand(): Promise<BrandContent> {
  const remote = await fetchPayload<Json>("globals/brand-page?depth=2");
  if (!remote) return BRAND;
  if (isObject(remote.seo)) flattenSeoImage(remote.seo as Json);
  return deepMerge(BRAND, remote);
}

/* ---------------- Solutions group pages ---------------- */
import { SOLUTIONS, type SolutionGroup } from "@/content/solutions";

/** The four group pages: Payload `solutions-pages` global merged over local, by slug. */
export async function getSolutionGroups(): Promise<SolutionGroup[]> {
  const remote = await fetchPayload<{ groups?: Json[] }>("globals/solutions-pages?depth=2");
  const groups = remote?.groups;
  if (!Array.isArray(groups) || groups.length === 0) return SOLUTIONS;
  return SOLUTIONS.map((local) => {
    const r = groups.find((g) => g && g.slug === local.slug);
    if (!r) return local;
    if (isObject(r.seo)) flattenSeoImage(r.seo as Json);
    return deepMerge(local, r);
  });
}

/* ---------------- Service pages ---------------- */
import { SERVICES_DETAIL, type ServiceDetail } from "@/content/services";

/** Service pages: published Payload `services` docs merged over the repo copy by slug. */
export async function getServiceDetails(): Promise<ServiceDetail[]> {
  const remote = await getCollection<Json & { slug?: string }>("services", "sort=order" + publishedOnly);
  const bySlug = new Map<string, ServiceDetail>(SERVICES_DETAIL.map((s) => [s.slug, s]));
  for (const doc of remote) {
    if (!doc.slug) continue;
    const local = bySlug.get(doc.slug);
    // Only slugs the site knows (menu items) get a page; unknown CMS slugs need a local skeleton first.
    if (local) {
      if (isObject(doc.seo)) flattenSeoImage(doc.seo);
      bySlug.set(doc.slug, deepMerge(local, doc));
    }
  }
  return [...bySlug.values()];
}

/* ---------------- Industry and hire pages ---------------- */
import { INDUSTRIES_DETAIL, type IndustryDetail } from "@/content/industries";
import { HIRE_DETAIL, type HireDetail } from "@/content/hire";

/** Merge a Payload array global over a local array, matched by slug. */
function mergeBySlug<T extends { slug: string }>(local: T[], remote: unknown): T[] {
  const rows = (remote as { pages?: Json[] } | null)?.pages;
  if (!Array.isArray(rows) || rows.length === 0) return local;
  return local.map((l) => {
    const r = rows.find((x) => x && x.slug === l.slug);
    if (!r) return l;
    if (isObject(r.seo)) flattenSeoImage(r.seo as Json);
    return deepMerge(l, r);
  });
}

/** Industry pages: Payload `industry-pages` merged over local, by slug. */
export async function getIndustries(): Promise<IndustryDetail[]> {
  return mergeBySlug(INDUSTRIES_DETAIL, await fetchPayload<Json>("globals/industry-pages?depth=2"));
}

/** Hire pages: Payload `hire-pages` merged over local, by slug. */
export async function getHirePages(): Promise<HireDetail[]> {
  return mergeBySlug(HIRE_DETAIL, await fetchPayload<Json>("globals/hire-pages?depth=2"));
}

/* ---------------- Products ---------------- */
import { PRODUCTS, PRODUCTS_INDEX, type Product, type ProductsIndex } from "@/content/products";

/** /products index copy: Payload `products-page` global merged over local. */
export async function getProductsIndex(): Promise<ProductsIndex> {
  const remote = await fetchPayload<Json>("globals/products-page?depth=2");
  if (!remote) return PRODUCTS_INDEX;
  if (isObject(remote.seo)) flattenSeoImage(remote.seo as Json);
  return deepMerge(PRODUCTS_INDEX, remote);
}

const EMPTY_PRODUCT: Product = {
  slug: "",
  name: "",
  kicker: "",
  tagline: [],
  h1: "",
  lede: "",
  industryKey: "manufacturing",
  tile: "attendance",
  caseSlug: "",
  idea: { h2: "", paragraph: "" },
  block1: { h2: "", sub: "", features: [] },
  dark: { h2: "", paragraph: "" },
  block2: { h2: "", sub: "", features: [] },
  worksWith: [],
  impact: { paragraph: "", metrics: [] },
  faq: [],
  cta: { h2: "", lede: "", button: "" },
  seo: { title: "", description: "" },
};

/**
 * Products: published Payload `products` docs merged over the local ones by
 * slug (new slugs are merged over an empty skeleton). A product needs a
 * name, an H1 and at least one feature to be listed.
 */
export async function getProducts(): Promise<Product[]> {
  const remote = await getCollection<Json & { slug?: string }>("products", "sort=order" + publishedOnly);
  const bySlug = new Map<string, Product>(PRODUCTS.map((p) => [p.slug, p]));
  for (const doc of remote) {
    if (!doc.slug) continue;
    if (Array.isArray(doc.screens)) {
      doc.screens = (doc.screens as unknown[])
        .map((g) => {
          if (!isObject(g) || !isObject(g.image) || typeof g.image.url !== "string") return null;
          const override = typeof g.alt === "string" && g.alt.trim() ? g.alt.trim() : undefined;
          const mediaAlt = typeof g.image.alt === "string" ? g.image.alt : undefined;
          return { url: g.image.url, alt: override || mediaAlt };
        })
        .filter(Boolean);
      if ((doc.screens as unknown[]).length === 0) delete doc.screens;
    }
    if (isObject(doc.seo)) flattenSeoImage(doc.seo);
    const local = bySlug.get(doc.slug) ?? EMPTY_PRODUCT;
    bySlug.set(doc.slug, deepMerge(local, doc));
  }
  const list = [...bySlug.values()].filter((p) => p.name && p.h1 && p.block1.features.length > 0);
  // A CMS-only product without a CTA still gets a usable band and button.
  for (const p of list) {
    p.cta = { h2: p.cta?.h2 || `See ${p.name} on [[your use case]].`, lede: p.cta?.lede || "A 20 minute walkthrough, then a clear scope, timeline and price.", button: p.cta?.button || `Book a ${p.name} demo` };
  }
  return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/* ---------------- Hub, company, contact, technologies and blog index pages ---------------- */
import { HUBS, type Hub } from "@/content/hubs";
import { CAREERS, TESTIMONIALS, TRUST } from "@/content/company";
import { CONTACT } from "@/content/contact";
import { TECHNOLOGIES } from "@/content/technologies";
import { BLOG, type BlogIndex } from "@/content/blog";

/** One global (or one group of a global) merged over its local copy, seo image flattened. */
function mergeGlobal<T>(local: T, remote: unknown): T {
  if (!isObject(remote)) return local;
  if (isObject(remote.seo)) flattenSeoImage(remote.seo as Json);
  return deepMerge(local, remote);
}

/** The three hub pages (/services, /industries, /hire): Payload `hub-pages` merged over local, by slug. */
export async function getHubs(): Promise<Hub[]> {
  return mergeBySlug(HUBS, await fetchPayload<Json>("globals/hub-pages?depth=2"));
}

/** /careers, /testimonials and /trust-center: one `company-pages` global, three groups. */
export async function getCompany() {
  const r = await fetchPayload<Json>("globals/company-pages?depth=2");
  return {
    careers: mergeGlobal(CAREERS, r?.careers),
    testimonials: mergeGlobal(TESTIMONIALS, r?.testimonials),
    trust: mergeGlobal(TRUST, r?.trust),
  };
}

/** /contact copy, including the form's dropdown lists. */
export async function getContact(): Promise<typeof CONTACT> {
  return mergeGlobal(CONTACT, await fetchPayload<Json>("globals/contact-page?depth=2"));
}

/** /technologies copy. */
export async function getTechnologies(): Promise<typeof TECHNOLOGIES> {
  return mergeGlobal(TECHNOLOGIES, await fetchPayload<Json>("globals/technologies-page?depth=2"));
}

/** /blog index copy and the two blocks repeated on every article. Posts themselves: see lib/posts.ts. */
export async function getBlogIndex(): Promise<BlogIndex> {
  return mergeGlobal(BLOG, await fetchPayload<Json>("globals/blog-page?depth=2"));
}
