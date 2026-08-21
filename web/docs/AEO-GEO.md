# AEO and GEO

This document explains how infoloop.co is built to be found by search engines and quoted by answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews), what the site already does today, what is still missing and in what order to fix it, how to write pages that a language model can lift a clean answer from, and how to measure any of it honestly. It lives at `web/docs/AEO-GEO.md` and is referenced by `web/public/robots.txt`. Everything stated as a fact below was verified against the code and the built output in `web/dist` on 2026-08-18.

---

## 1. The three acronyms, honestly

They overlap far more than the industry admits. Treat them as three lenses on one job, not three disciplines with three budgets.

| Term | What it means here | What you actually do |
| --- | --- | --- |
| SEO | Search engine optimization. Getting a page indexed and ranked so a human clicks a blue link. | Crawlability, canonical URLs, titles and descriptions, internal links, page speed, sitemaps. |
| AEO | Answer engine optimization. Getting the page used as the source of a direct answer, whether that is a Google AI Overview, a featured snippet, or a voice assistant. | Question shaped headings, a direct answer in the first sentence, FAQ markup, clean semantic HTML. |
| GEO | Generative engine optimization. Getting a large language model to retrieve, understand and cite the page while composing an answer. | Everything under AEO, plus stable definitions, concrete numbers with units, entity clarity in structured data, and letting the AI crawlers in. |

Two honest observations:

- Roughly 80% of the work is identical across all three. A page that is fast, crawlable, well structured and factually specific wins on all three surfaces. There is no separate "GEO stack" to buy.
- The remaining 20% is real and is where this document is useful: an answer engine does not click, does not scroll, does not run your JavaScript in most cases, and often reads exactly one fetch of your HTML before deciding whether you are quotable.

"GIO" is not an established term. If a vendor uses it, they mean GEO. Do not restructure work around it.

> **Gotcha.** Google-Extended and the snippet controls do different jobs and people mix them up constantly. `Google-Extended` in robots.txt governs whether your content can be used to train and ground Gemini models. It does **not** control AI Overviews in Search. AI Overviews are governed by ordinary Googlebot access plus the `max-snippet` and `nosnippet` directives. `web/src/layouts/Base.astro` sets `max-snippet:-1`, which explicitly permits unlimited snippet length. Blocking `Google-Extended` would not remove you from AI Overviews; it would only remove you from Gemini.

---

## 2. What an answer engine actually receives

The site is Astro with `output: "static"`, so every one of the 84 pages is a complete HTML file on disk before a crawler ever arrives. React islands are server rendered at build time and hydrated afterwards, and no component in `web/src` uses `client:only`. Verified: `dist/index.html` contains 79 unique internal `href="/..."` links in the raw HTML, including every Solutions mega menu link, without any JavaScript running.

That matters more for GEO than for SEO. Googlebot renders JavaScript. Most assistant crawlers do a single fetch and parse what comes back. On this site, what comes back is the whole page.

---

## 3. Inventory: what the site already does

### 3.1 Files and mechanics

| Asset | File | Why an answer engine cares |
| --- | --- | --- |
| Explicit AI crawler allow list | `web/public/robots.txt` | 11 crawlers are named and allowed individually rather than inheriting the wildcard: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Bingbot. Naming them puts the intent on the record so nobody "tidies up" the wildcard later and silently blocks retrieval. |
| `llms.txt` | `web/public/llms.txt` (96 lines) | A single plain text brief: what Infoloop does, how it works, proof numbers, and a labeled URL list for every page group. When a model is asked "what does Infoloop do", this is the cheapest possible correct answer for it to find. |
| RSS feed | `web/src/pages/rss.xml.ts`, output at `/rss.xml` | Hand rolled, no dependency. Dated, structured, full metadata per post. Feeds are one of the few surfaces aggregators and crawlers ingest reliably. Linked from `<head>` on every page via `web/src/layouts/Base.astro`. |
| XML sitemap | `@astrojs/sitemap` in `web/astro.config.mjs`, output at `/sitemap-index.xml` and `/sitemap-0.xml` | 84 URLs, one per built page, referenced from `robots.txt` and from `<link rel="sitemap">` in the head. |
| HTML sitemap | `web/src/pages/sitemap.astro`, output at `/sitemap` | Generated from the same content the pages are built from, so it can never link to a page that does not exist. Gives crawlers and models a single flat page listing the whole site. |
| Extensionless canonical URLs | `trailingSlash: "never"` and `build.format: "file"` in `web/astro.config.mjs` | `https://infoloop.co/custom-software-development`, with no `.html` and no trailing slash. Canonical tag, sitemap entry, breadcrumb `item` and JSON-LD `url` all agree, so no page splits its authority across variants. |
| Snippet permissions | `web/src/layouts/Base.astro` | `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`. The opposite of `nosnippet`: the site explicitly allows unlimited snippet length. |
| One H1 per page | Every page template | Verified across all 84 built files: every one has exactly one `<h1>`. Models use the H1 as the page's topic label. |
| FAQ answers in the HTML | `web/src/components/sections/Faq.tsx` | A native `<details>` accordion. The answers are in the served HTML whether or not JavaScript runs and whether or not the accordion is open. An FAQ hidden behind a fetch is invisible to a single fetch crawler. |
| Self-hosted fonts, no third party JS | `@fontsource` packages, `web/src/components/Analytics.astro` | The site ships zero tracking by default. Fewer network dependencies means faster, more reliable fetches for crawlers as well as humans. |

### 3.2 Structured data in the built HTML

Counts are occurrences of each `@type` across all 84 built HTML files, not page counts. Nested nodes count: `dist/index.html` alone contains 15 `Service` nodes inside its `OfferCatalog`, and `dist/work.html` contains 5 `Article` nodes because the index repeats its children.

| `@type` | Occurrences | Where it comes from |
| --- | --- | --- |
| Service | 131 | `[service].astro`, `hire-[role].astro`, `industry/[industry].astro`, plus nested offers in the homepage `OfferCatalog` |
| Organization | 120 | The shared `@id: https://infoloop.co/#organization` node, referenced from nearly every page |
| BreadcrumbList | 83 | Every page except the homepage |
| WebPage | 67 | Plus `CollectionPage`, `AboutPage`, `ContactPage` and `ProfilePage` subtypes on hubs and profiles |
| OfferCatalog | 26 | Homepage service groups and the hire pages' engagement models |
| Person | 13 | Team profiles and blog authors |
| SoftwareApplication | 11 | OpsDeck, GarageZone, LoopIQ, Verko |
| BlogPosting | 10 | 5 posts, each also listed on `/blog` |
| Article | 10 | 5 case studies, each also listed on `/work` |
| ItemList | 8 | Hub pages and the products list |
| FAQPage | 41 | Homepage, 17 hire pages, 14 industry pages, 4 product pages, 5 blog posts |
| Review | 4 | `/testimonials`, one per published client quote, each linked to the case study behind it |
| WebSite | 1 | Homepage only, `@id: https://infoloop.co/#website`, referenced by `isPartOf` elsewhere |
| `speakable` property | 6 pages | Homepage and the 5 case studies |
| `inLanguage` property | 75 pages | 9 pages omit it (see backlog item 6) |
| `aggregateRating` | 0 | Deliberate. See 3.3. |

Reproduce these counts yourself:

```bash
cd "web/dist"
for t in FAQPage Service Organization BreadcrumbList WebPage OfferCatalog \
         Person SoftwareApplication BlogPosting Article ItemList Review WebSite; do
  printf '%-20s %s\n' "$t" "$(grep -ro "\"@type\":\"$t\"" --include='*.html' . | wc -l | tr -d ' ')"
done
grep -rl speakable  --include='*.html' . | wc -l
grep -rl inLanguage --include='*.html' . | wc -l
```

Confirm the one H1 rule still holds:

```bash
cd "web/dist"
for f in $(find . -name '*.html'); do
  n=$(grep -o '<h1' "$f" | wc -l | tr -d ' ')
  [ "$n" = "1" ] || echo "$n H1s in $f"
done
```

That loop should print nothing.

### 3.3 Why there is no `aggregateRating`

The site displays a 4.8 average rating and the four platform scores (Trustpilot 4.9, Google 4.8, Clutch 4.7, GoodFirms 4.7) as **plain text** in `web/src/components/sections/RatingsRow.tsx`. There is no `aggregateRating` markup anywhere, and that is a decision, not an oversight.

Google's structured data policy disallows self serving review markup: an organization may not mark up ratings **about itself** on its own site and expect them to be eligible for rich results. Marking them up would at best be ignored and at worst trigger a manual action. The ratings are real and worth showing to a human, so they are shown, in text, with the platform named next to each score. Answer engines read the text perfectly well.

What **is** marked up is `Review` on `/testimonials`, four of them, each with a named author, a `reviewBody` and `itemReviewed` pointing at the Organization, and each linked to the case study that produced it. Individual third party reviews are a different thing from a self declared aggregate score.

Do not add `aggregateRating` because a tool or an audit report flags it as "missing".

---

## 4. Backlog, prioritized

Effort key: **S** under half a day, **M** half a day to two days, **L** more than two days, usually because it is content work rather than code.

| # | Item | File to change | Effort | Payoff |
| --- | --- | --- | --- | --- |
| 1 | Render the service page FAQs and emit `FAQPage` | `web/src/pages/[service].astro` | S | High |
| 2 | Render the `takeaways` block on blog posts | `web/src/pages/blog/[slug].astro` | S | High |
| 3 | Direct answer first sentence pass on service and industry pages | `web/src/content/services.ts`, `web/src/content/industries.ts` | L | High |
| 4 | Add `lastmod` to the XML sitemap | `web/astro.config.mjs` | S | Medium |
| 5 | Generate `llms.txt` at build time instead of hand maintaining it | new `web/src/pages/llms.txt.ts`, delete `web/public/llms.txt` | M | Medium |
| 6 | Fill the structured data gaps (9 pages without `inLanguage`, `/blog` without a page type node) | `web/src/pages/blog.astro`, `web/src/pages/products/[slug].astro`, `web/src/pages/contact.astro`, `web/src/pages/index.astro` | S | Low to medium |
| 7 | Real `Person` identity for authors and the team | `web/src/content/about.ts` plus the profile pages | S once unblocked | Medium |
| 8 | Verify every `sameAs` URL resolves | `web/src/content/site.ts` | S | Low to medium |
| 9 | A definitions or glossary page | new page under `web/src/pages/` | M | Medium |
| 10 | Comparison and pricing transparency pages | new pages | L | High, but expensive |
| 11 | Homepage canonical trailing slash consistency | `web/src/pages/index.astro` | S | Very low |

### 1. Service page FAQs (S, high payoff, do this first)

Every one of the 15 entries in `web/src/content/services.ts` already carries a populated `faq: { q: string; a: string }[]` field, six questions each, about 90 question and answer pairs in total. None of them reaches the HTML. `FAQPage` is on 41 of 84 pages and **not one of them is a service page**, which is the exact page type a buyer's question maps to.

The code comment in `web/src/pages/[service].astro` explains why the schema is withheld today:

```
// FAQPage schema is added only when the FAQ block is rendered on the page (Google: marked-up content must be visible).
```

That reasoning is correct and must be preserved: render the block, then add the markup. The `Faq` component takes `{ eyebrow, h2, lede, items }`, so wrap the flat array the same way `web/src/pages/products/[slug].astro` already does with its `faqData` constant. Then append to the `jsonLd` array in `[service].astro`:

```ts
{ "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a } })) }
```

Benefit: 90 buyer questions with written answers, in HTML, on the 15 highest commercial intent pages on the site. This is the single largest AEO gain available for the least work.

### 2. Blog `takeaways` (S, high payoff)

`takeaways: z.array(z.string())` is declared in `web/src/content.config.ts` and populated in the front matter of all 5 posts in `web/src/content/posts/`, five bullets each. The string `takeaway` appears in **zero** built HTML files. The content exists and is thrown away.

Render it as a "Key takeaways" list directly under the dek in `web/src/pages/blog/[slug].astro`. A short, self contained, pre-summarized bullet list at the top of an article is the most quotable unit a page can offer a language model, because it needs no interpretation and no context from the surrounding prose.

### 3. Direct answer first sentence pass (L, high payoff)

Covered in section 5. This is writing work, not engineering work, and it is the item most likely to slip. Budget it as content.

### 4. `lastmod` in the sitemap (S, medium payoff)

Verified: `dist/sitemap-0.xml` contains 84 `<loc>` elements and **0** `<lastmod>` elements. `@astrojs/sitemap` accepts a `serialize` option in `web/astro.config.mjs`; feed it a modification date per URL (blog posts and case studies already carry `publishedAt` / `updatedAt` / `dateModified` in their data). Benefit: recrawl prioritization, and evidence of freshness, which matters when a model is choosing between two sources.

> **Gotcha.** Only emit a `lastmod` you can defend. A sitemap where every URL claims today's date is worse than no `lastmod` at all, because crawlers learn to ignore the field. Derive it from real content dates, not from the build timestamp.

### 5. Generate `llms.txt` (M, medium payoff)

`web/public/llms.txt` is 96 hand written lines listing every service, industry, hire role, product, case study and blog post with its URL. It is accurate today and it will go stale the first time somebody adds a page and forgets. Build it as a route the way `web/src/pages/rss.xml.ts` builds the feed, from `getServiceDetails()`, `getPosts()`, `getWork()` and the rest of `web/src/lib/cms.ts`.

Delete `web/public/llms.txt` in the same commit so a generated `/llms.txt` route and a static public file cannot collide, then confirm the built file:

```bash
cd web
npm run build
head -20 dist/llms.txt
```

Honest caveat: `llms.txt` is a proposed convention, not a standard, and no major answer engine has publicly committed to reading it. It is cheap, it does no harm, and it doubles as the best single file to paste into a model when you want a correct answer about Infoloop. Do not expect measurable traffic from it on its own.

### 6. Structured data gaps (S, low to medium payoff)

- 9 pages have no `inLanguage`: `blog.html`, `index.html`, `contact.html`, `products.html`, `work.html`, and the 4 pages under `products/`. Add `inLanguage: "en"` to their page level nodes for consistency.
- `dist/blog.html` emits `Blog`, `BlogPosting`, `BreadcrumbList`, `Organization` and `Person`, but no `WebPage` or `CollectionPage` node, unlike every other hub. Add one.
- The 4 product pages emit `SoftwareApplication`, `FAQPage` and `BreadcrumbList` but no page level node. Add a `WebPage` with `about` pointing at the `SoftwareApplication` `@id`, matching the pattern already used in `[service].astro`.
- The homepage is the only page with no `BreadcrumbList`, which is correct: a breadcrumb whose only item is the page itself is noise. Leave it.

### 7. Real `Person` identity (S once unblocked, medium payoff)

Author and team identity is the E-E-A-T lever, and it is one of the few signals that helps a model decide whether a claim is worth repeating. This is blocked on the client supplying real team photos and personal LinkedIn and X URLs, which is already on the open items list. Once they arrive, add them as `sameAs` on the `Person` nodes emitted by `web/src/pages/[person].astro`, and set `author` on `BlogPosting` to a `Person` with those profiles rather than falling back to the Organization.

### 8. Verify `sameAs` (S)

`web/src/content/site.ts` produces 8 `sameAs` URLs on the Organization node: LinkedIn, X, Instagram, Facebook, YouTube, Behance, Dribbble and GitHub. `sameAs` is how a search or answer engine ties the website to the entity it already knows about from elsewhere, so each one must resolve to a live profile that is recognizably Infoloop. **Client decision:** confirm which of these eight profiles actually exist and are claimed, and delete the rest. A `sameAs` pointing at a 404 or at somebody else's handle is worse than an absent one.

### 9. Definitions or glossary page (M, medium payoff)

Models reach for stable, unambiguous definitions. A page that defines the terms Infoloop's buyers search on (managed software retainer, staff augmentation, legacy modernization, AI copilot, low code) in two or three sentences each, with an internal link to the relevant service page, is a natural retrieval target. **Client decision:** whether this belongs at `/glossary`, folded into `/services`, or not built at all.

### 10. Comparison and pricing transparency pages (L, high payoff, expensive)

"Agency X vs agency Y" and "what does custom software cost" are among the highest volume prompts in this category, and pages that answer them with real ranges get cited. Infoloop already has a differentiated, defensible answer: a fixed price in writing before work starts, 4 to 8 week delivery, and the "We run" retainer after launch. **Client decision:** whether to publish price ranges publicly. This is a commercial call, not a technical one, and it should not be made by the engineering team. Nothing here should be published until the numbers are approved.

### 11. Homepage canonical (S, very low payoff)

`dist/index.html` sets `<link rel="canonical" href="https://infoloop.co/">` with a trailing slash, while `dist/sitemap-0.xml` and the JSON-LD `url` both use `https://infoloop.co` without one. Search engines treat root with and without the trailing slash as the same URL, so nothing is broken. Fix it only if you happen to be in the file already.

---

## 5. Writing pages a model will quote

Four patterns, in order of how much they matter.

### 5.1 Answer in the first sentence

A model that has retrieved your page is looking for a span it can lift. If the answer to the page's question is in the first sentence of a section, that span exists. If it arrives in paragraph four after a wind up, the model paraphrases from somewhere else.

`web/src/content/posts/metrics-ai-copilot-working.md` gets this right in its section openings:

> "The share of the work the copilot finishes, or drafts well enough to send, without a person stepping in. This is the headline."

Definition first, elaboration after. Every H2 section on this site should open the same way.

### 5.2 Question shaped headings

The site's blog H2s are currently statement shaped: "Write down how the job runs today", "Two: how long that work now takes". They read well and they are weaker for AEO than a heading that matches the phrasing of a real query.

The site already has 41 pages carrying explicit question and answer pairs through `FAQPage`, which covers most of this. The gap is that the 15 service pages carry none (backlog item 1) and the blog body headings are statements rather than questions. Mixing both is fine: keep the narrative H2 where the prose flow needs it, and let the FAQ block at the bottom carry the literal question phrasing.

### 5.3 Real numbers with units and a source

Vague claims are unquotable, because a model that repeats them inherits the risk. Specific claims are quotable. The site already does this well, and the pattern is worth protecting.

| Weak | Strong, and already on this site |
| --- | --- |
| "Significant savings" | "$1.2M saved a year with predictive maintenance and a multi-plant ERP" |
| "Faster response times" | "First response from hours to under two minutes, live in five weeks" |
| "Improved accuracy" | "Order fulfillment accuracy 84% to 98%, unplanned downtime down 72%" |
| "Quick delivery" | "Most projects live in 4 to 8 weeks" |
| "Highly rated" | "Trustpilot 4.9, Google 4.8, Clutch 4.7, GoodFirms 4.7" |

The rule already enforced across the content files is: only published numbers, and every number attached to the case study it came from. Keep it.

### 5.4 Stable definitions and consistent entity naming

A model builds its picture of an entity from repetition across pages. Contradictions cost you. Concretely, on this site:

- The company is "Infoloop", the legal entity is "Infoloop Technologies Inc.", and the tagline is "We build. We run." Those strings appear identically in `web/src/content/site.ts`, `web/public/llms.txt`, and the `Organization` JSON-LD node. Do not vary them per page.
- Each product gets one description, reused everywhere: OpsDeck is attendance software for manufacturing, GarageZone is garage management, LoopIQ is a learning and testing platform, Verko is AI governance and compliance.
- The shared `@id` values (`https://infoloop.co/#organization`, `https://infoloop.co/#website`) let every page point at the same node instead of asserting a slightly different organization 84 times. This is already correct across the site. Any new page template must use the same `@id` strings, not new ones.

> **Gotcha.** Anything you mark up must be visible on the page. `web/src/pages/[service].astro` withholds `FAQPage` today specifically because the FAQ block is not rendered. If you ever add markup for content a visitor cannot see, you are one automated check away from a manual action, and you will lose rich results across the whole domain, not just that page.

---

## 6. Measuring it

Start by accepting the constraint: **answer engine referrals are badly attributable, and no combination of tools available today closes the gap.** A model can read your page, absorb the fact, answer the user, and send no click at all. That is a real business outcome with no line in any analytics tool. Anyone selling you a number that claims otherwise is estimating.

### 6.1 The site currently measures nothing

`web/src/components/Analytics.astro` loads no tracker unless a `PUBLIC_*` environment variable is set, and none is set in the default build, so there is no first party traffic data yet. The chosen stack is GA4 plus Microsoft Clarity, both of which set cookies, so a consent banner ships and is on by default (see TRACKING.md). For finding assistant referrals specifically, watch the GA4 Traffic acquisition report for referrers such as `chatgpt.com`, `perplexity.ai` and `claude.ai`, and note that Google AI Overviews still arrive attributed as ordinary organic search.

> **Gotcha.** Setting any tracker variable without also setting `TRACKING_DISCLOSED=true` **fails the build on purpose**. `web/src/components/Analytics.astro` throws, and `web/src/content/legal.ts` swaps the privacy copy on the same flag: without it the policy claims no third party analytics, with it that claim is removed and a "Website analytics" section appears. This is deliberate. Do not "fix" the build by deleting the throw. Update the privacy policy, set the flag in the same deploy, and note that a lawyer's review of `/privacy` and `/terms` is still on the client's open items list.

```bash
# In the Netlify UI, Site settings > Environment variables, set BOTH:
PUBLIC_PLAUSIBLE_DOMAIN=infoloop.co
TRACKING_DISCLOSED=true
```

The full list of supported, optional trackers is in `web/.env.example`.

### 6.2 What each measurement option actually tells you

| Method | What it shows | Honest limitation |
| --- | --- | --- |
| Google Search Console | Impressions, clicks, position, per query and per page. Free. Essential. | Google has not historically broken out AI Overviews as a separate search appearance; those clicks fold into web search totals. Verify against the current GSC interface, this area changes often. |
| Bing Webmaster Tools | The Bing index, and some Copilot surfaced data. Free. | Small share of search volume, but Bing's index feeds several assistant products, so it is worth the ten minutes to verify the property. |
| Referrer report (Plausible or GA4) | Sessions arriving with `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com` as the referrer, and `utm_source=chatgpt.com` on links ChatGPT tags. | Undercounts badly. Most assistant answers produce no click. Some clients strip referrers entirely. Treat a rising trend as directional, never as the size of the effect. |
| Server side crawler hits | The only direct evidence that GPTBot, ClaudeBot or PerplexityBot fetched a specific URL. | **Not available today.** Netlify's standard plans do not expose raw access logs, and Netlify Analytics does not break traffic down by user agent. Getting this requires a Netlify Edge Function that logs the user agent. **To be decided:** whether that is worth building. |
| Manual prompt testing | Whether infoloop.co is actually cited for the questions your buyers ask. | The most honest signal available, and it is sampling, not measurement. Answers are non-deterministic and vary by account, region, session and model version. Run the same prompt list monthly and record results in a spreadsheet, not from memory. |
| Third party AI visibility trackers | Share of voice and citation tracking across assistants, packaged. | The category is young, methodologies are proprietary, and vendors sample the same non-deterministic surface you would sample by hand. **Client decision:** whether to pay for one. Run the manual list for a quarter first so you have something to sanity check a vendor's numbers against. |

### 6.3 The manual prompt list

This is the cheapest thing on the page and the one most likely to be skipped. Write 20 to 30 prompts a real buyer would type, run them monthly across ChatGPT, Claude, Perplexity and Google AI Mode, and record whether infoloop.co appears and in what context. For example:

- "best custom software development company for manufacturing"
- "attendance software for factories with biometric clock in"
- "how much does custom software development cost"
- "what should a managed software retainer include"
- "Webflow development agency that also does Shopify"
- "how do I know if an AI copilot is actually working"

Notice that the last two map directly to existing blog posts, `webflow-seo-day-one` and `metrics-ai-copilot-working`. That is the point of publishing them.

### 6.4 Running the checks locally

```bash
cd "web"
npm run build     # writes dist/
npm run check     # tsc --noEmit
npm run dev       # dev server on port 4321
```

> **Gotcha.** The Homebrew `node@22` on the original developer's Mac is broken (missing `libsimdutf`). Use `/usr/local/bin/node` there. This is a local machine quirk, not a project requirement: `web/package.json` requires Node `>=22.12.0` and Netlify builds with `NODE_VERSION = "22"` per `web/netlify.toml`. On a clean machine any Node 22 or newer works.

> **Gotcha.** `build.format: "file"` means `dist/work.html`, not `dist/work/index.html`. Extensionless URLs like `/work` are resolved by Netlify, not by the files themselves. Serving `dist/` with a plain static server will 404 on every internal link. Use `npm run dev`, or a Netlify deploy preview, to test real URLs.

> **Gotcha.** `infoloop.co` today serves a **different, older static site**: Netlify project `magenta-truffle-cbe2be`, site id `c4f21ce5-e598-47c9-8ad2-cb60596cac2e`, deployed manually with `netlify deploy --prod --dir=.` and with no git repository attached. The Astro site in `web/` is not live yet. Any `curl` against `https://infoloop.co` measures the old site. Until the cutover, test against the new site's Netlify deploy preview URL.

Once the new site is live, this is what a crawler sees:

```bash
SITE="https://infoloop.co"
curl -sA "ClaudeBot/1.0" "$SITE/custom-software-development" | grep -o '<h1[^>]*>[^<]*'
curl -s "$SITE/robots.txt"
curl -s "$SITE/llms.txt" | head -20
curl -s "$SITE/sitemap-0.xml" | grep -o '<loc>' | wc -l
```

For structured data, paste a live URL into Google's Rich Results Test and the schema.org validator. Both are manual and neither has a stable API worth scripting against.

---

## 7. Decisions the client still owns

None of these can be answered from the code. They are listed here so they do not get quietly decided by whoever touches the files next.

1. **Which analytics tool.** Decided: GA4 plus Microsoft Clarity, with Search Console and a Google Business Profile alongside. Both trackers set cookies, so the consent banner and Google Consent Mode v2 are now part of the build and are on by default. See TRACKING.md.
2. **Whether to publish price ranges** (backlog item 10). High AEO value, purely commercial risk.
3. **Whether to build a glossary page** (backlog item 9), and where it sits in the navigation.
4. **Which of the 8 `sameAs` social profiles are real** (backlog item 8).
5. **Whether to pay for an AI visibility tracker**, and if so which.
6. **Whether to build the Netlify Edge Function** that logs crawler user agents (section 6.2), which is the only route to direct evidence that assistant crawlers are fetching the site.
7. **The AI crawler policy itself.** The current position, stated in the comment at the top of `web/public/robots.txt`, is that Infoloop sells expertise and being quotable is distribution rather than theft, so every assistant crawler is allowed. If that position ever changes, change `robots.txt` and write down why, in the same commit.

---

## 8. Two known documentation defects

Both are small, both will waste somebody's afternoon, and neither has been fixed because this document is not permitted to edit code.

1. The header comment in `web/src/pages/rss.xml.ts` states that the feed is "Linked from `<head>` on every page and from `robots.txt`". The `<head>` half is true, via `web/src/layouts/Base.astro`. The `robots.txt` half is **false**: `web/public/robots.txt` contains no reference to `/rss.xml`. There is also no standard robots.txt directive for feeds, only `Sitemap:`, which is already present and correct. The fix is to correct the comment, not to invent a directive.
2. `web/src/components/Analytics.astro` and `web/.env.example` both point readers to `web/docs/TRACKING.md`. That file does not exist. The behavior they describe is real and verified; only the document is missing.
