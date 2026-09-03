# infoloop.co, site (Astro)

The public website. Static HTML built with **Astro 7** (the "Astro 5" line in the
stack sheet; 7 is current and API-compatible for what we use), **React 19** islands
only where there is interaction, **Tailwind CSS 4**, **TypeScript**. Content comes
from **Payload 3** (`../cms`) at build time and falls back to the copy in
`src/content/` when the CMS is not configured, so the site always builds.

| Piece | Where |
| --- | --- |
| Landing page | `src/pages/index.astro` |
| Work index and case studies | `src/pages/work.astro`, `src/pages/work/[slug].astro`, components in `src/components/work/`, copy in `src/content/work.ts` |
| Products index and pages | `src/pages/products.astro`, `src/pages/products/[slug].astro`, components in `src/components/products/`, copy in `src/content/products.ts` |
| Blog index and posts | `src/pages/blog.astro`, `src/pages/blog/[slug].astro`, posts as markdown in `src/content/posts/` (content collection in `src/content.config.ts`), copy in `src/content/blog.ts` |
| Contact | `src/pages/contact.astro`, `src/components/contact/*` (form + brochure gate islands), copy in `src/content/contact.ts`; brochure PDF at `public/downloads/infoloop-brochure.pdf` (v1 generated from site copy) |
| About | `src/pages/about.astro`, drawn parts in `src/components/about/AboutParts.tsx` (value tiles, road, priority thumbs, team cards), copy in `src/content/about.ts`; CMS global `about-page` |
| Personal pages | `src/pages/[person].astro` → `/<slug>` (e.g. `/nimit`), card in `src/components/about/ProfileCard.tsx`, data in each team member's `profile` in `src/content/about.ts` |
| Brand assets | `src/pages/brand-assets.astro`, copy in `src/content/brand.ts`; files in `public/brand/` (lockups, marks, `tagline/`), bundle at `public/downloads/infoloop-brand-assets.zip` (guidelines PDF + logos svg/png/pdf-vector + tagline; built from `brand-assets/infoloop-brand-kit`); CMS global `brand-page` |
| Solutions group pages | `src/pages/solutions/[group].astro` → `/solutions/build|grow|transform|consulting`, sections in `src/components/solutions/SolutionParts.tsx` (reuses `sections/Process`, `TaglineBand`, `RoadArt`, `PostCard`), copy in `src/content/solutions.ts`; CMS global `solutions-pages` |
| Service pages (15) | `src/pages/[service].astro` → `/<menu-slug>` (e.g. `/custom-software-development`, `/ui-ux-design`, `/legacy-app-modernization`, `/technology-consulting`), copy in `src/content/services.ts` (`SERVICES_DETAIL`), CMS collection `services`, sections shared with the group pages in `src/components/solutions/SolutionParts.tsx` (+ `PillGrid`) |
| Industry pages | `src/pages/industry/[industry].astro` → `/industry/<slug>` (all 14 in the menu), sections in `src/components/industry/IndustryParts.tsx`, copy in `src/content/industries.ts`, CMS global `industry-pages` |
| Hire talent pages | `src/pages/hire-[role].astro` → `/hire-<role>` (all 17 in the menu), sections in `src/components/hire/HireParts.tsx`, copy in `src/content/hire.ts`, CMS global `hire-pages` |
| Index (hub) pages | `src/pages/services.astro`, `industries.astro`, `hire.astro` → `/services`, `/industries`, `/hire`, cards in `src/components/hub/HubGroups.tsx`, copy in `src/content/hubs.ts` |
| Company pages | `src/pages/careers.astro`, `testimonials.astro`, `trust-center.astro`, copy in `src/content/company.ts` |
| Legal and sitemap | `src/pages/privacy.astro`, `src/pages/terms.astro` (shared `src/components/legal/LegalDoc.astro`), `src/pages/sitemap.astro` (generated from the content modules), copy in `src/content/legal.ts` |
| Site chrome (header, footer, reveal observer) | `src/layouts/Site.astro` (every page uses it) |
| Layout, meta, JSON-LD | `src/layouts/Base.astro` |
| Sections (React, rendered to static HTML) | `src/components/sections/*` |
| Islands (ship JS) | `Nav` (`client:load`, drawer), `HeroPanels` (`client:load`, scroll parallax), `RevealObserver` (`client:idle`) |
| Copy defaults | `src/content/home.ts`, `src/content/site.ts` |
| CMS adapter | `src/lib/cms.ts` (`getHome`, `getSite`, `getWorkIndex`, `getWork`, `getCollection`) |
| Contact endpoint | `src/pages/api/contact.ts` (Netlify function, `prerender = false`) |
| Styles / brand tokens | `src/styles/globals.css` |
| SEO files | `public/robots.txt`, `public/llms.txt`, sitemap from `@astrojs/sitemap` |

## Run

Requires Node 22+. On this Mac the Homebrew `node@22` is broken; use
`PATH=/usr/local/bin:$PATH` (Node 25).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/
npm run check        # tsc over the TS/TSX (fast); `npm run typecheck` runs astro check
```

## Content

Every section component takes a `data` prop and defaults to the local copy:

```tsx
export function Faq({ data = FAQ }: { data?: typeof FAQ } = {}) { ... }
```

`index.astro` calls `getHome()` / `getSite()` and passes the result down. With
`PAYLOAD_URL` set, the adapter fetches `/api/globals/home` and `/api/globals/site`,
normalises Payload's shapes (`[{ value }]` lists become `string[]`, row `id`s and
timestamps are dropped, empty fields are ignored) and deep-merges them over the local
defaults. Whatever the editor leaves empty falls back to the repo copy.

Editorial markers carried through both sources:

- `[[phrase]]` in a heading = the single orange highlight (`Hi` in `components/ui.tsx`).
- a line break in a heading = `<br class="hidden lg:block">`.

Copy rules that apply to every page: "Infoloop" with a capital I in copy, never the
word "system(s)", no em dashes, only published numbers, one H1, an H2 per section
and an H3 per card, `aria-labelledby` on sections, no two CTAs with the same label.

## Environment

Copy `.env.example` to `.env`:

```
PAYLOAD_URL=            # e.g. https://cms.infoloop.co ; unset = local content
PAYLOAD_TOKEN=          # optional users API key (drafts / private reads)
CONTACT_WEBHOOK_URL=    # where /api/contact forwards leads
GROQ_API_KEY=           # console.groq.com — required for /api/chat (at build time)
GROQ_MODEL=             # optional; default openai/gpt-oss-20b
```

## Deploy (Render)

The site runs on a Render Web Service: root directory `web`, build `npm ci && npm run build`,
start **`npm start`** (`server.mjs`, which adds the security headers and asset caching that
`netlify.toml` used to provide). Create a **Deploy Hook** on the service and paste its URL into
the CMS environment as `SITE_BUILD_HOOK_URL` so publishing in Payload rebuilds the site.
Full runbook: `docs/DEPLOYMENT.md`, section 0. `netlify.toml` is kept only for a Netlify
deployment; Render ignores it (redirects live in `redirects.mjs`).

## Work section

- `/work`: 7Span's Work page format: "Work" H1 + one paragraph, tabbed featured panel (CSS radios), search + filter-by-industry toolbar and card grid (`WorkBrowser` island, `client:visible`; all cards are in the HTML, six shown then "Load more"), hatched CTA band.
- `/work/<slug>`: 7Span case layout: header (back link, read time, client, H1, intro line, industry/services/timeline), Introduction box, The challenge (intro + bullets + closing line, image right), Our approach (black section, numbered zigzag steps), The results (one or two sentences + metric callouts, numbers only), Technology used table + disclosure + related links, More of our work, short closing band with a service-specific button ("Rebuild my Shopify store"). Article + BreadcrumbList schema.
- URLs are extension-less without trailing slash (`trailingSlash: "never"`, `build.format: "file"`); `netlify.toml` 301s the old `/case-*` and `/work-*` URLs to the new pages.
- Content lives in `src/content/work.ts` (a verified rewrite of the case studies published on the previous site) and is overridden per slug by published Payload `work` documents; a CMS-only case is merged over an empty skeleton so a partly filled document cannot break the build. Cover images from the CMS replace the drawn tiles when present.
- Rules baked in: only numbers, quotes and client names from the published cases; the drawn tiles carry no figures that are not in the source; no two CTA buttons on a page share a label ("Book a call" in hero/aside, "Scope my project" in the closing band).

## Products

- `/products`: 7Span-style list (mark | name + line), CTA band. `/products/<slug>`: modelled on 7Span's Vepaar page: ink banner with tagline and floating icons, product mark tile over the banner edge, H1 + line, hatched strip with "Book a demo", The idea + screen, feature block one (4 cards + screen), dark two-beat statement, feature block two (AI/automation), Works with, The impact (4 numbers), case-study card, FAQ, closing band with the product button. Copy = verified rewrite of the old site's product pages; screens are drawn tiles until real screenshots are uploaded in the CMS (`screens`).

## Blog

- `/blog`: 7Span's blog page: "Our knowledge hub" + one line, three featured cards, "Keep exploring" + search, top-category chips + post rows (`BlogBrowser` island), "Load more". `/blog/<slug>`: header band (title, date, categories, read time), single-column article, a "Talk to our experts" card inserted before the third H2, author card, "More" with three related cards. Posts are markdown in `src/content/posts/` (front matter: title, description, slug, kicker, categories, dek, author, authorRole, publishedAt, readingMinutes, takeaways). Covers are drawn from the title until real images exist (`cover`). Blog + BlogPosting schema.

## Contact

- `/contact`: 7Span's contact page: hero (H1 + line, photo slot in a hatched frame), ink band with the white "Schedule a meeting" card and the form (name, email, phone, company, country, looking for, about project, budget, timeline, how did you hear), "Up for a quick connect?" band (email + US/India phone boxes), "A glimpse into our expertise" with a gated **Download brochure** (name + work email → lead posted as `type: brochure` → PDF opens). `/api/contact` now accepts the extra fields. ContactPage schema.

## About

- `/about`: 7Span's About page, section for section: **Our story** (H1, sub, two paragraphs, photo slot over a hatched panel), **About** (orange hatched rail, three paragraphs), tagline marquee, **Our vision** (rail, two-line statement + one line), **7 values we hold** (horizontal card rail, drawn tiles in ink/orange/mist), **Discover life @ Infoloop** (the site CTA panel: rounded ink, centred, one button to LinkedIn), **Core priorities** (heading left, thumbnail list right), **Our team** (bordered photo cards: photo, name, small-caps role, then LinkedIn / X / personal-page icons; no QR codes, no flags; three members: Nimit, Rahul, Riya Kaneria), tagline marquee, closing statement (stacked tagline + one paragraph). AboutPage + Organization (founder) schema. Only published facts.
- `/<slug>` (e.g. `/nimit`): the personal page 7Span's business-card QR codes open (7span.com/kaushal). Standalone card, no site chrome: ink header with photo + small-caps tag chips, name, role, bio, a row of contact icons (LinkedIn, email, phone), link rows with an icon tile (Founded Infoloop, Building: OpsDeck/GarageZone/LoopIQ/Verko, Our work, Start a conversation), three photo slots, lockup + "Meet the team" under the card. Generated for every member with `profile.slug`; the team card name links there. ProfilePage + Person schema.

## Brand assets

- `/brand-assets`: 7Span's Brand page: orange band with the orange-field mark on guide lines and a white card overlapping it (H1, one line, **Download assets** → ZIP), Logo and mark (two-tone vs mono, do-nots, primary lockup in a box), ink band with four white tiles (logo / mark, light / dark, each a direct download), Tagline (graphic box + when / do not), Founders and team images (the /about team cards), closing statement. Rules from the brand kit README v1.1 plus the site decision "Infoloop" with capital I in copy. Rebuild the ZIP from `brand-assets/infoloop-brand-kit` when the kit changes.

## Solutions group pages

- `/solutions/build`, `/grow`, `/transform`, `/consulting`: one template in 7Span's service-page format: hero (H1 with one highlight, benefit-led line, ink button, then a **proof panel** over the hatched band: three measured numbers on ink + one drawn case screen with a caption link, in place of 7Span's team video) → marquee → **what we offer** (rounded cards on hatch, one per service in the group; unlinked until the service pages exist, `linked` prop) → **our process** (4 dark tiles) → **why Infoloop for …** (dark section, tailored heading per group: building software / growth / transformation / consulting; numbered list + photo slot) → three client quote cards (from case studies) → the site CTA panel (`sections/CtaPanel`: rounded ink panel, centred headline + one line + one button; Nimit's pick, 2026-08-17) → ratings row (Trustpilot / Google / Clutch / GoodFirms, as on the home page) → footer (like 7Span's category pages; industries chips, technologies table, before/after, other services and blogs are built and kept for the service pages under each group). Copy is a plain rewrite of the old site's service pages; only published numbers. Service + OfferCatalog schema.

## Service pages

- `/<slug>` for every Solutions menu item, first `/custom-software-development` (Build → Custom applications), the template for the rest. 7Span's service page format thoroughly: hero (benefit-led H1 with one highlight, ~35-word line, ink button, proof panel) → marquee → **<service> built for your industry** (eight rounded cards, one line of what we build per ICP industry) → **our <service> process** (4 dark tiles) → **why Infoloop for <service>** (dark, 7 reasons + photo slot) → **industries we serve** (chips) → **technologies we use** (table) → three client quotes → CTA panel → **other <group> services** (siblings) → marquee → latest blogs → closing line. FAQ (6 questions from the old page) is in the data and emitted as FAQPage schema only when rendered (not yet; 7Span has no FAQ block). All 15 service pages are built (Build 6, Grow 4, Transform 2, Consulting 3); group pages link every offer card and every "Other services" row automatically once a slug exists in `SERVICES_DETAIL`. CMS: `services` collection mirrors `ServiceDetail` (seeded from the repo copy; published docs merge over local by slug via `getServiceDetails()`).

## Industry pages

- `/industry/<slug>`: all 14 industries in the menu. Manufacturing is the approved reference; the other 13 follow it exactly. 7Span's industry page format: hero (orange eyebrow, H1 left, one line right, wide visual of two drawn case screens with the button overlapping bottom-right) → **context** (orange hatched rail: H2, lede, two paragraphs, three bullets, closing line) → **four numbers** with orange arrows → **problems we solve** (four stacked cards + visual in a rounded frame) → marquee → **case studies** (the work page's tabbed panel) → **what working with Infoloop gets you** (dark, visual + list) → trusted-by strip → one big client quote → blogs (industry category first) → FAQs (rendered, FAQPage schema) → CTA panel. Copy from the old manufacturing page; only published numbers.

## Hire talent pages

- `/hire-<role>`: all 17 roles in the menu. JavaScript developers is the approved reference; the other 16 follow it exactly. 7Span's hire page format: hero (orange badge "JS", H1 with the technology highlighted, sub line, paragraph, four check bullets, two buttons, "Also available" roles panel on the hatch) → thin marquee → **why companies hire developers from Infoloop** (bordered 3 + 2 grid) → **how you can hire from us** (4 dark tiles, `#how`) → **<tech> expertise** (table, only technologies from the Hire menu) → **our engagement models** (three cards: set piece of work / engineer in your team / build it, then we run it; no prices published, so tags say fixed price / monthly / retainer) → big client quote → three dark case cards → **schedule a meeting** (ink band, ContactForm island) → FAQs → CTA panel → related blogs → **roles that work alongside this one** (six related roles, from `more.roles`) → ratings row.

## Technologies

- `/technologies` (7Span keeps one under Company): hero (H1, sub line, paragraph, panel of every mark), marquee, then a tabbed panel with the category rail on the left and the tools on the right (CSS radios, no JavaScript), a dark "How we choose a technology" section, CTA and ratings. Copy is in `src/content/technologies.ts`; **a technology belongs there only if we would put a client's production work on it today**, and each tile links to the matching hire page. Tiles carry a lettered mark rather than a vendor logo until logo use is cleared.

## Landing page services grid

The six cards in `sections/Services.tsx` are **not clickable**, the same call 7Span makes: the card is a summary you read, and the one thing to click is the "Explore our services" button, which goes to `/services`. The hrefs stay in `SERVICES_SECTION` because the CMS shares that shape with the menu, they are simply not rendered as links. No page loses internal links by this: every service is still linked from the menu, the footer, `/services` and the sitemap.

## Index (hub) pages

- `/services`, `/industries` and `/hire` are the three "All …" targets the menu links to. One shape each: hero (eyebrow, H1 with one highlight, lede, ink button) → marquee → an H2 per menu group with a page count and a card grid → CTA panel → ratings. **Every card is generated from the page it links to** (services from the Solutions group offer list, industries from their H1, roles from their sub line) and groups are filtered to pages that actually exist, so a hub can never advertise a page that is not built. Hero copy and group blurbs are in `src/content/hubs.ts`. CollectionPage + ItemList + BreadcrumbList schema.

## Company pages

- `/careers`: hero → marquee → **Open roles first** → dark "what working here is actually like" → the four hiring steps (shared `sections/Process`) → where we work → CTA. `CAREERS.roles` in `src/content/company.ts` is **empty until there is a real opening**, and the page then renders the "Nothing open right now" panel instead of inventing one; each real role also emits JobPosting schema. Applications go to the careers email, no form.
- `/testimonials`: hero → marquee → a quote wall built from `getWork()` → the three linked case studies → CTA → ratings. **Only quotes published in `work.ts` appear**, each with a link to the case study behind it, so a testimonial can never exist without the work. Review schema per quote.
- `/trust-center`: hero → marquee → ownership (code, accounts, data, leaving) → dark day-to-day practice → **"What we do not claim"** → report a problem → CTA. The honest section states plainly that **no SOC 2 / ISO 27001 certification is held today**; if that changes, change `src/content/company.ts` the same day. Security claims here are still to be confirmed by Nimit before launch.

## Legal and sitemap

- `/privacy` and `/terms`: 7Span's plain document layout: hero (eyebrow, H1, one line, "Last updated"), a sticky numbered contents rail, then H2 sections with paragraphs and orange-square bullets, closing with the site CTA panel. Copy is in `src/content/legal.ts` and is **written to match what the build actually does**: one contact form, one brochure form, no analytics, no tracking cookies, no advertising pixels. If the site ever gains analytics, a cookie banner or a CRM, update "What we collect" and "What we do not do" the same day. **Both documents are drafts pending a lawyer's review before launch.**
- `/sitemap`: 7Span's HTML sitemap: an H2 per group, each a hatched field of bordered link rows with an arrow (the `OtherServices` component). Every group is generated from the same content the pages are built from (solutions, services, industries, hire, products, work, blog), so it can never link to a page that does not exist. Personal pages (/nimit and the rest) are deliberately not listed, the same call 7Span makes: they stay linked from the team cards on /about and stay in the XML sitemap. CollectionPage + ItemList schema.

## Marquee speed

Every scrolling strip (tagline bands, the trusted-by logo row) runs at one reading speed: a small inline script in `src/layouts/Site.astro` sets `--marquee-duration` per strip from its own width, so duration = half the track width / 100px per second, matching 7Span at about 100px/s. It re-runs when fonts finish loading and on resize. Without JS the CSS fallback duration applies, and reduced motion still switches the animation off.

## Adding a page

1. `src/pages/<slug>.astro`, wrap in `Base` with `title`, `description`, `canonical`, `jsonLd`.
2. Read content with `getCollection("services")` etc. (returns `[]` without a CMS).
3. Sections are plain React components rendered statically; add `client:*` only when
   the component needs the browser.

## Verification done on the landing page

Build green, `tsc` clean, no console errors, one H1 + 11 H2s, five JSON-LD blocks
(Organization, WebSite, WebPage, ItemList, FAQPage), title 58 chars, description 157,
no horizontal overflow on mobile, drawer/parallax/marquees working. Building with
and without the CMS produces identical page HTML.
