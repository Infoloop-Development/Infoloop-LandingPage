# CMS integration: Astro and Payload

This document explains how the static Astro site in `web/` and the Payload CMS in `cms/` fit together, so that a developer who has never seen this codebase can run both, understand exactly which piece of copy comes from where, edit the content model without breaking a build, and stand up a fresh CMS from an empty database. It covers the build-time merge model, the three functions in `web/src/lib/cms.ts` that implement it, the field-naming contract between the TypeScript content files and the Payload fields, the seed script, the publish-to-rebuild hook, and an honest list of what is not CMS-backed yet.

## How the two halves fit together

| Piece | Where | What it is |
| --- | --- | --- |
| Public site | `web/` | Astro 7, `output: "static"`, `@astrojs/netlify` adapter, `trailingSlash: "never"`, `build.format: "file"`. 84 pages. React 19 islands, Tailwind CSS 4. |
| Content of record (fallback) | `web/src/content/*.ts` | Plain TypeScript objects. Every page has a complete, approved copy here. |
| Content adapter | `web/src/lib/cms.ts` | Fetches Payload at build time and deep-merges it over the local objects. |
| CMS | `cms/` | Payload 3.88.0 on Next 16, Postgres (Neon), `@payloadcms/db-postgres`. |
| Rebuild trigger | `cms/src/hooks/revalidate.ts` | POSTs a Netlify build hook after any publish or delete. |

Nothing is fetched in the browser. The site is fully static HTML by the time it reaches Netlify.

## The build-time merge model, and why it is built this way

`web/src/lib/cms.ts` reads the Payload REST API during `astro build` and merges the result **over** the local TypeScript content. The local files are the base, the CMS is the override.

Three properties follow from that, and they are the reason for the design:

1. **The site builds with the CMS down.** Every fetch is wrapped in try/catch. A network failure, a non-200 response, or an unset `PAYLOAD_URL` logs a warning and returns `null`, and the accessor returns the local content unchanged. A CMS outage cannot break a deploy.
2. **The site builds with no CMS at all.** With `PAYLOAD_URL` unset, `fetchRaw` returns `null` before it ever calls `fetch`. This is the current state: the site as built today comes entirely from `web/src/content/`.
3. **A half-filled CMS cannot produce a half-empty page.** Empty strings, nulls and empty arrays coming back from Payload are discarded before the merge, so an editor who clears a field falls back to the repo copy rather than shipping a blank section.

The cost of that safety is the flip side of point 3: **you cannot delete copy from the CMS.** More on that under Gotchas.

## The functions in `web/src/lib/cms.ts`

All four are in `web/src/lib/cms.ts`. `normalize` and `deepMerge` are exported, so they are unit-testable.

### `fetchRaw(path)` and `fetchPayload<T>(path)`

`fetchRaw` builds the request:

```
GET ${PAYLOAD_URL}/api/${path}
Authorization: users API-Key ${PAYLOAD_TOKEN}     // only when PAYLOAD_TOKEN is set
```

Note the header format: the literal word `users` (the auth-enabled collection slug), then `API-Key`, then the key. A trailing slash on `PAYLOAD_URL` is stripped. It returns `null` on any of: `PAYLOAD_URL` unset, a non-`res.ok` status (logged as `[cms] <path> responded <status>; using local content`), or a thrown error.

`fetchPayload<T>` is `fetchRaw` plus `normalize`, and is used for globals and single documents. It returns `null` when the raw fetch returned `null`, and also when normalization reduced the whole payload to nothing.

### `normalize(value)`

Turns Payload's JSON into the shape the local content files use. Three rules, applied recursively:

- **Array rows that hold only a string become the string.** A row is unwrapped when, after ignoring `id`, its only remaining key is `value`. This is the inverse of the `strings()` field helper in `cms/src/fields/index.ts`.
- **An empty array becomes `undefined`.** An empty array means "not filled in yet", not "delete the local list".
- **Housekeeping keys are dropped from every object**, at every depth: `id`, `globalType`, `createdAt`, `updatedAt`, `_status`. Values that are `undefined`, `""` or `null` are dropped as well, and an object left with no keys becomes `undefined`.

Plain string arrays pass through untouched, which is what makes Payload multi-select fields (`hasMany: true`) work: they arrive as `["ai", "web"]` and stay that way.

### `deepMerge(local, remote)`

Recursive merge with `remote` winning:

- If either side is not a plain object, `remote` wins unless it is `undefined` or `null`, in which case `local` wins.
- For each key of `remote`: `undefined`, `null` and `""` are skipped; if both sides are plain objects the merge recurses; otherwise the remote value replaces the local one.
- **Arrays are not merged.** `isObject` deliberately excludes arrays, so an array from the CMS replaces the local array in full. There is no element-by-element merge and no append.

### `mergeBySlug(local, remote)`

A small private helper for the two array-shaped globals. It reads `remote.pages`, and if that is a non-empty array it maps over the **local** list, finds the row whose `slug` matches, and deep-merges it. If `remote.pages` is missing or empty it returns the local list untouched.

The consequence is important: `mergeBySlug` iterates the local array. A row in the CMS with a slug that does not exist locally is silently ignored. `getSolutionGroups` does the same thing against `remote.groups`.

### `getCollection(slug, query)`

Paginates a Payload collection:

```
GET /api/${slug}?limit=100&depth=1&page=${page}${query}
```

It loops until `hasNextPage` is false, normalizes each document individually (not the pagination envelope, so an empty `docs` array stays an array), and drops documents that normalize to nothing. If a page request fails it stops and returns what it has, which may be an empty array. It is used internally by `getWork`, `getServiceDetails` and `getProducts`; page components never call it directly.

### Draft handling

```ts
const PREVIEW = import.meta.env.PAYLOAD_PREVIEW === "true";
const publishedOnly = PREVIEW ? "" : "&where[_status][equals]=published";
```

That filter is appended to the three collection queries. Set `PAYLOAD_PREVIEW=true` in a preview build (with a `PAYLOAD_TOKEN`, because draft reads need auth) to build unpublished work. Globals have no draft state and are always read as-is.

## The field-naming rule

**A Payload field name must equal the key in the local TypeScript object it overrides, exactly, at every level of nesting.** There is no field mapping layer, no alias table, and no rename hook. If the names diverge, the CMS value is merged into the object under a key nothing reads, and the page silently keeps showing the repo copy.

Two clarifications that catch people out.

**The name to match is the object key, not the TypeScript export name.** For `home`, `cms.ts` assembles `LOCAL_HOME` from thirteen exports of `web/src/content/home.ts` under new keys, and it is those keys that the Payload fields mirror:

| Payload field in the `home` global | Key in `HomeContent` | Export in `web/src/content/home.ts` |
| --- | --- | --- |
| `hero` | `hero` | `HERO` |
| `trust` | `trust` | `TRUST` |
| `band` | `band` | `BAND_WORDS` |
| `services` | `services` | `SERVICES_SECTION` |
| `process` | `process` | `PROCESS` |
| `stats` | `stats` | `COMPANY_STATS` |
| `products` | `products` | `PRODUCTS` |
| `why` | `why` | `WHY` |
| `industries` | `industries` | `INDUSTRIES` |
| `proof` | `proof` | `PROOF` |
| `about` | `about` | `ABOUT` |
| `faq` | `faq` | `FAQ` |
| `cta` | `cta` | `CTA` |

The same applies to `site`, whose keys are defined by `SiteContent` in `web/src/lib/site-content.ts`: `site`, `services`, `industries`, `hire`, `products`, `company`, `offices`, `social`, `ratings`, mapping to the `SITE`, `SERVICES`, `INDUSTRIES`, `HIRE`, `PRODUCT_LINKS`, `COMPANY_LINKS`, `OFFICES`, `SOCIAL`, `RATINGS` exports of `web/src/content/site.ts`.

**The three array-shaped globals wrap their list in a fixed key.** `solutions-pages` puts the four groups under `groups`; `industry-pages` and `hire-pages` put their rows under `pages`. Those wrapper keys exist only in Payload, and `cms.ts` unwraps them.

### How arrays are represented

Payload cannot store a bare `string[]`, so the repo uses one convention and inverts it on both sides.

| Local TypeScript | Payload field | Round trip |
| --- | --- | --- |
| `band: ["We build.", "We run."]` | `strings('band')`: an array field whose only subfield is `value` (text, required) | `toPayload` in the seed writes `[{ value: "We build." }, ...]`; `normalize` in `cms.ts` reads it back to `["We build.", ...]` |
| `serviceKeys: ["ai", "web"]` | `{ type: 'select', hasMany: true }` | Stored and returned as a plain string array. No wrapping, no unwrapping. |
| `metrics: [{ value, label }]` | array field with two subfields | Passes through as objects |

> **Gotcha.** The unwrap rule is "after removing `id`, the row has exactly one key and it is called `value`". So an array field whose only subfield happens to be named `value` will always come back as a list of bare strings, whatever you intended. If you add a second subfield to an existing `strings()` array (say a `href` next to `value`), the whole list changes shape from `string[]` to `object[]` and every component that renders it breaks. Add the subfield in Payload, in the local TypeScript type, and in the component, in the same commit.

### Editorial conventions carried through the merge

Two markers travel as plain text in headings and are interpreted by the components, not by the CMS:

- `[[phrase]]` marks the single orange highlight in a heading. One per heading.
- A newline inside a heading is kept as a line break on large screens.

Both are documented in the `admin.description` of the relevant Payload fields.

## What is CMS-backed today

Every row below is wired end to end: a Payload definition, a local content file, and an accessor in `web/src/lib/cms.ts` that a page actually calls.

### Globals

| Payload global (slug) | Definition | Local content it merges over | Accessor in `cms.ts` | Fetch |
| --- | --- | --- | --- | --- |
| Home page (`home`) | `cms/src/globals/Home.ts` | `web/src/content/home.ts`, 13 exports assembled as `LOCAL_HOME` | `getHome()` | `globals/home?depth=2` |
| Site settings (`site`) | `cms/src/globals/Site.ts` | `web/src/content/site.ts` via `LOCAL_SITE` in `web/src/lib/site-content.ts` | `getSite()` | `globals/site?depth=1` |
| Work page (`work-page`) | `cms/src/globals/WorkPage.ts` | `WORK` in `web/src/content/work.ts` | `getWorkIndex()` | `globals/work-page?depth=1` |
| Products page (`products-page`) | `cms/src/globals/ProductsPage.ts` | `PRODUCTS_INDEX` in `web/src/content/products.ts` | `getProductsIndex()` | `globals/products-page?depth=1` |
| About page (`about-page`) | `cms/src/globals/AboutPage.ts` | `ABOUT` in `web/src/content/about.ts` | `getAbout()` | `globals/about-page?depth=1` |
| Brand assets page (`brand-page`) | `cms/src/globals/BrandPage.ts` | `BRAND` in `web/src/content/brand.ts` | `getBrand()` | `globals/brand-page?depth=1` |
| Solutions group pages (`solutions-pages`) | `cms/src/globals/SolutionsPages.ts` | `SOLUTIONS` in `web/src/content/solutions.ts` | `getSolutionGroups()` | `globals/solutions-pages?depth=1`, merged by slug from `groups` |
| Industry pages (`industry-pages`) | `cms/src/globals/IndustryPages.ts` | `INDUSTRIES_DETAIL` in `web/src/content/industries.ts` | `getIndustries()` | `globals/industry-pages?depth=1`, merged by slug from `pages` |
| Hire talent pages (`hire-pages`) | `cms/src/globals/HirePages.ts` | `HIRE_DETAIL` in `web/src/content/hire.ts` | `getHirePages()` | `globals/hire-pages?depth=1`, merged by slug from `pages` |

### Collections

| Payload collection (slug) | Definition | Local content it merges over | Accessor | Behavior |
| --- | --- | --- | --- | --- |
| Work (`work`) | `cms/src/collections/Work.ts` | `CASES` in `web/src/content/work.ts` | `getWork()` | Merged by slug. A CMS-only slug is merged over the `EMPTY_CASE` skeleton and therefore can create a new case page. Visible only if it has a `title`, a `card.title` and at least one row in `metrics`. Sorted so `featured` cases come first. |
| Service pages (`services`) | `cms/src/collections/Services.ts` | `SERVICES_DETAIL` in `web/src/content/services.ts` | `getServiceDetails()` | Merged by slug, **local slugs only**. A CMS document whose slug has no local counterpart is skipped entirely. |
| Products (`products`) | `cms/src/collections/Products.ts` | `PRODUCTS` in `web/src/content/products.ts` | `getProducts()` | Merged by slug, CMS-only slugs allowed via `EMPTY_PRODUCT`. Visible only with a `name`, an `h1` and at least one entry in `block1.features`. Sorted by the merged `order` field. A CMS-only product with no CTA gets a generated one. |
| Media (`media`) | `cms/src/collections/Media.ts` | none | read indirectly | Uploads. `getWork` flattens `cover` to `{ url, alt }` and `gallery` rows to `{ url, alt, caption }`; `getProducts` flattens `screens` to `{ url, alt }`. `alt` is a required field. Sizes: `thumbnail` 400x300, `card` 960x640, `og` 1200x630, output webp. |
| Users (`users`) | `cms/src/collections/Users.ts` | none | none | Editors. `auth.useAPIKey` is on, which is what makes `PAYLOAD_TOKEN` work. |

Two field-level conversions happen in `getWork` that are worth knowing about, because they exist to bridge Payload's shapes back to the schema the components expect:

- `related` is a Payload relationship. Populated documents are reduced back to an array of slug strings.
- `datePublished` and `dateModified` are Payload timestamps. They are truncated with `.slice(0, 10)` to a calendar day, because the JSON-LD schema wants a date, not an instant.

## What is **not** CMS-backed today

This list was produced by checking every file in `web/src/content/` against the globals and collections that exist. It is the honest answer to "what still needs a developer to change".

| Local content, editable only in the repo | Pages it drives | Notes |
| --- | --- | --- |
| `web/src/content/blog.ts` (`BLOG`) | `/blog` index copy | No global exists. |
| `web/src/content/posts/*.md` (5 markdown files) | `/blog/<slug>` | These are an **Astro** content collection defined in `web/src/content.config.ts`, loaded through `web/src/lib/posts.ts`. A Payload `posts` collection exists and is fully specified, but nothing in the site reads it. The blog is repo-only today. |
| `web/src/content/company.ts` (`CAREERS`, `TESTIMONIALS`, `TRUST`) | `/careers`, `/testimonials`, `/trust-center` | No global exists. |
| `web/src/content/contact.ts` (`CONTACT`) | `/contact`, the contact form and brochure gate | No global exists. |
| `web/src/content/legal.ts` (`PRIVACY`, `TERMS`, `SITEMAP`) | `/privacy`, `/terms`, `/sitemap` | Deliberately repo-only. `PRIVACY` also switches on the `TRACKING_DISCLOSED` build flag, so it must change in the same commit and deploy as any tracking change. |
| `web/src/content/hubs.ts` (`HUBS`) | `/services`, `/industries`, `/hire` hero and group copy | No global exists. The cards themselves are generated from the detail pages. |
| `web/src/content/technologies.ts` (`TECHNOLOGIES`) | `/technologies` | No global exists. |
| `INDUSTRY_CHIPS` in `web/src/content/solutions.ts` | Solutions pages | The `SOLUTIONS` export is CMS-backed; this one is not. |
| `NAV_PRIMARY`, `FOOTER_COLUMNS`, `FOOTER_LEGAL`, `allRoutes()` in `web/src/content/site.ts` | Header and footer structure, route list | `SiteContent` does not include them, so the `site` global cannot reach them. The nav **groups** are editable; the top-level nav structure is not. |

### Payload definitions that nothing reads

These exist in the CMS and appear in the admin panel, but no accessor in `cms.ts` fetches them, so editing them changes nothing on the site:

| Payload | File | Status |
| --- | --- | --- |
| `industries` collection | `cms/src/collections/Industries.ts` | Superseded by the `industry-pages` global. |
| `hire` collection | `cms/src/collections/Hire.ts` | Superseded by the `hire-pages` global. |
| `posts` collection | `cms/src/collections/Posts.ts` | The blog runs on markdown instead. |
| `testimonials` collection | `cms/src/collections/Testimonials.ts` | `/testimonials` is built from `company.ts` and case study quotes. |
| `pages` collection | `cms/src/collections/Pages.ts` | Block-based free-form pages. Nothing consumes the blocks. |

> **Gotcha.** An editor who fills in the `industries` or `hire` collection, or writes a blog post in `posts`, will see a build trigger fire and no change on the site. Decide whether to wire these up or remove them before handing the admin panel to a content team.

### CMS fields with no consumer

A few upload fields were defined ahead of the assets existing. They are safe to fill in, but nothing renders them yet:

- `home.hero.card.leftImage` and `rightImage`. The component `web/src/components/sections/HeroPanels.tsx` renders a drawn `PhotoSlot` and uses only `leftAlt` and `rightAlt`.
- `home.trust.logos`. `web/src/components/sections/TrustStrip.tsx` renders `trust.stack`, the plain-text platform names.
- `home.products.items[].image` and `home.about.founder.photo`.

## Environment variables

### `web/` (Netlify, or a local `.env`)

Every variable is optional. See `web/.env.example`.

| Variable | Effect |
| --- | --- |
| `PAYLOAD_URL` | Base URL of the CMS, no trailing slash needed. **Unset means the site builds purely from `web/src/content/`.** |
| `PAYLOAD_TOKEN` | A `users` collection API key. Only needed for draft or non-public reads; the API is public-read today. |
| `PAYLOAD_PREVIEW` | `"true"` drops the published-only filter on the `work`, `services` and `products` queries. |

`web/netlify.toml` pins `NODE_VERSION = "22"` and sets `command = "npm run build"`, `publish = "dist"`.

### `cms/` (Railway or Render, or a local `.env`)

From `cms/.env.example`:

| Variable | Effect |
| --- | --- |
| `DATABASE_URL` | Neon pooled Postgres connection string. Keep `?sslmode=require`. |
| `PAYLOAD_SECRET` | Signs auth tokens. Generate with `openssl rand -hex 32`. Changing it invalidates every session and API key. |
| `PAYLOAD_PUBLIC_SERVER_URL` | Becomes Payload's `serverURL`. See the media gotcha below. |
| `CORS_ORIGINS` | Comma-separated list, fed to both `cors` and `csrf`. Defaults to `http://localhost:4321,https://infoloop.co`. Browser origins only; the Astro build is server side and is not subject to CORS. |
| `NETLIFY_BUILD_HOOK_URL` | Where the publish hook POSTs. Unset means no rebuild is ever triggered. |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | Read by the seed script only, to create the first admin user. |

> **Gotcha.** Payload returns upload URLs relative (`/api/media/file/...`) unless `serverURL` is set. `cms.ts` copies `cover.url`, `gallery[].image.url` and `screens[].image.url` straight into the built HTML, so with `PAYLOAD_PUBLIC_SERVER_URL` unset every CMS image 404s on the static site and the failure is invisible at build time. Set it as soon as the CMS has a hostname.

> **Gotcha.** `cms/src/collections/Media.ts` writes uploads to `staticDir: '../media'`, that is `cms/media`, which is gitignored and sits on the container disk. On Railway and Render that disk does not survive a redeploy, so uploaded images disappear. No storage adapter is configured; `plugins: []` in `cms/src/payload.config.ts` is empty. Pick a storage adapter before anyone uploads anything they care about.

## Publishing triggers a rebuild

The public site is static, so saving in the CMS changes nothing until Netlify rebuilds. `cms/src/hooks/revalidate.ts` closes that loop.

- `rebuildAfterChange` is attached as an `afterChange` hook on `services`, `industries`, `hire`, `products`, `work`, `posts`, `testimonials` and `pages` (through `pageLike()` for four of them, directly for the rest). It returns early when `doc._status !== 'published'`, so **saving a draft does not trigger a build**.
- `rebuildAfterDelete` is attached as `afterDelete` on the same collections and always fires.
- `rebuildAfterGlobalChange` is attached in `cms/src/payload.config.ts` to all nine globals. Globals have no draft state, so every save on a global triggers a build.

`triggerRebuild(reason)` reads `NETLIFY_BUILD_HOOK_URL`, returns silently if it is unset, then debounces on a 30 second timer, so a burst of saves produces one build. When the timer fires it POSTs:

```json
{ "trigger_title": "<collection or global slug> changed" }
```

A non-200 response is logged as `[revalidate] Netlify hook responded <status>` and otherwise ignored.

> **Gotcha.** The debounce timer is a module-level variable in a single Node process. If the CMS restarts, redeploys or is scaled to more than one instance inside that 30 second window, a pending build is dropped or duplicated. Nothing surfaces this to the editor. If a publish appears to have had no effect, check the CMS logs and the Netlify deploy list before touching content.

> **Gotcha, current state.** `infoloop.co` is today served by a **different, older static site**: Netlify project `magenta-truffle-cbe2be`, site id `c4f21ce5-e598-47c9-8ad2-cb60596cac2e`, deployed manually with `netlify deploy --prod --dir=.` and with no git repository attached. The Astro site in `web/` is not live yet. A build hook pointed at the new Netlify site will rebuild the new site, which is not what visitors see. See `DEPLOYMENT.md` for the cutover.

## The seed script

`cms/src/seed/index.ts`, run with `npm run seed` from `cms/`, loads the approved repo copy into a fresh database so editors start from the real site rather than a blank form. It is idempotent: globals are overwritten, collection documents are upserted by slug, and the admin user is only created when the `users` collection is empty.

It imports the content directly from the sibling directory, for example `../../../web/src/content/home`, and runs through `tsx`, so no build step or type check stands between the repo copy and the database.

What it writes, in order:

| Step | Target | Source |
| --- | --- | --- |
| 1 | `home` global | the 13 exports of `web/src/content/home.ts` |
| 2 | `site` global | `SITE`, `SERVICES`, `INDUSTRIES`, `HIRE`, `PRODUCT_LINKS`, `COMPANY_LINKS`, `OFFICES`, `SOCIAL`, `RATINGS` |
| 3 | `work-page` global | `WORK`, with `snapshots[].serviceKeys` restored as plain arrays |
| 4 | `work` collection | `CASES`, upserted by slug, `_status: 'published'`, `order` set to the 1-based position in `CASES`. A second pass rewrites `related` from slugs to document ids once every document exists. |
| 5 | `products-page` global and `products` collection | `PRODUCTS_INDEX` and `PRODUCTS`, published, ordered |
| 6 | `about-page`, `brand-page` globals | `ABOUT`, `BRAND` |
| 7 | `solutions-pages` global | `{ groups: SOLUTIONS }` |
| 8 | `industry-pages`, `hire-pages` globals | `{ pages: INDUSTRIES_DETAIL }`, `{ pages: HIRE_DETAIL }` |
| 9 | `services` collection | `SERVICES_DETAIL`, published, ordered |
| 10 | first admin user | `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`, only when no user exists |

The seed's `toPayload()` is the deliberate inverse of `normalize()`: it walks the object and turns every `string` inside an array into `{ value: string }`. Two places opt out of that, because they are Payload multi-selects rather than `strings()` arrays: `work.serviceKeys` and `work-page.snapshots[].serviceKeys` are reassigned as plain arrays after the conversion. Dates are written at `T12:00:00.000Z` so the calendar day survives any server timezone.

> **Gotcha.** The seed reads `../../../web/src/content/*`, so it only runs from a checkout that contains **both** `web/` and `cms/` as siblings. If you deploy the CMS to Railway or Render with a root directory of `cms`, `npm run seed` will fail on the server with a module resolution error. Seed from a full local checkout pointed at the production `DATABASE_URL`, or ship the whole repo.

## Runbook: standing up a fresh CMS

From an empty database to a first publish that rebuilds the site.

> On this Mac only: Homebrew `node@22` is broken (missing `libsimdutf`). Prefix commands with `PATH=/usr/local/bin:$PATH` so `/usr/local/bin/node` is used. This is a local quirk, not a project requirement. Netlify builds on `NODE_VERSION` 22 per `web/netlify.toml`, and `cms/package.json` declares `engines.node: ^18.20.2 || >=20.9.0`.

### 1. Create the database

Create a project at [neon.tech](https://neon.tech) and copy the **pooled** connection string, keeping `?sslmode=require`.

### 2. Configure the CMS

```bash
cd cms
cp .env.example .env
openssl rand -hex 32          # paste the result into PAYLOAD_SECRET
```

Fill in `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL` (`http://localhost:3000` for now) and `CORS_ORIGINS`. Leave `NETLIFY_BUILD_HOOK_URL` empty until the site exists. `cms/.env` is gitignored.

### 3. Install and start

```bash
cd cms
npm install
npm run dev
```

The admin panel is at `http://localhost:3000/admin`. In dev, the Postgres adapter pushes the schema to the database on the first request, so the tables appear on their own.

### 4. Create the first admin and load the content

Payload shows a "create first user" screen on first visit. Either use it, or let the seed create the user:

```bash
cd cms
SEED_ADMIN_EMAIL=you@infoloop.co SEED_ADMIN_PASSWORD='<a long password>' npm run seed
```

Re-running plain `npm run seed` later overwrites the globals with the repo copy and upserts the collection documents. It never touches an existing user.

### 5. Verify the API from outside the admin panel

```bash
curl -s http://localhost:3000/api/globals/home | head -c 400
curl -s 'http://localhost:3000/api/work?limit=1&depth=1' | head -c 400
```

Both should return 200 without any auth header, because `read` on the content globals and collections is `anyone` (`cms/src/access/index.ts`). Collections use `publishedOrAuthenticated`, so an anonymous caller sees published documents only; `testimonials` additionally filters on `approved: true`.

### 6. Point the site at it and compare

```bash
cd web
echo 'PAYLOAD_URL=http://localhost:3000' >> .env
npm run build
```

Watch the build log for `[cms]` warnings. There should be none. The output in `web/dist` should match a build with `PAYLOAD_URL` unset, because the seed loaded exactly the repo copy. Any difference is a field-name mismatch between a Payload field and its local key, and is worth chasing down before going further.

Useful checks while you are here:

```bash
cd web
npm run check      # tsc --noEmit
npm run dev        # http://localhost:4321
```

### 7. Deploy the CMS

Railway or Render, from this repository with the service root set to `cms`:

- Build command `npm run build`
- Start command `npm start`
- Environment variables as in step 2, with `PAYLOAD_PUBLIC_SERVER_URL` set to the real hostname, for example `https://cms.infoloop.co`, and `CORS_ORIGINS` including `https://infoloop.co`
- A `Dockerfile` exists in `cms/` and works on either host

For production, do not rely on schema push. Generate and run migrations:

```bash
cd cms
npm run payload migrate:create
npm run payload migrate
```

After any change to a collection or global definition, also regenerate the generated files:

```bash
cd cms
npm run generate:types        # rewrites src/payload-types.ts
npm run generate:importmap    # rewrites src/app/(payload)/admin/importMap.js
```

### 8. Connect the publish loop

1. In Netlify, on the site that builds `web/`, create a build hook (Site settings, Build and deploy, Build hooks).
2. Set `NETLIFY_BUILD_HOOK_URL` to that URL in the CMS environment and restart the CMS.
3. In Netlify, set `PAYLOAD_URL` to the CMS hostname, and `PAYLOAD_TOKEN` only if you have made the API non-public.
4. Change one field in the `home` global, save, and wait. A build should appear in Netlify within about 30 seconds, titled `home changed`.

### 9. Roll back if the merge misbehaves

Clear `PAYLOAD_URL` in Netlify and redeploy. The site returns to the repo copy immediately. This is the escape hatch for any content problem that cannot be fixed quickly in the CMS.

## Gotchas, collected

> **You cannot clear a field from the CMS.** `normalize` drops empty strings, nulls and empty arrays, and `deepMerge` skips them. Emptying a field in the admin panel restores the repo copy rather than removing the copy from the page. To genuinely remove a section, edit the local content file. This is a deliberate trade for "a half-filled CMS cannot ship a blank page", but it surprises everyone once.

> **Arrays replace, they do not merge.** Any array you touch in the CMS must be filled in completely. Adding one FAQ row in Payload replaces the entire local FAQ list with that one row.

> **New pages need a code change for four of the content types.** `getServiceDetails` only merges CMS documents whose slug already exists in `SERVICES_DETAIL`; `mergeBySlug` (industry pages, hire pages) and `getSolutionGroups` iterate the local list and ignore unknown slugs. Only `work` and `products` accept a CMS-only slug, because they have `EMPTY_CASE` and `EMPTY_PRODUCT` skeletons to merge over. An editor creating a new service page in the CMS gets no page and no error.

> **The `order` field behaves differently in each collection.** `getProducts` sorts on the merged `order`, so it works. `getWork` seeds its map from `CASES` in local order and then only re-sorts on `featured`, so changing `order` in the CMS does not reposition an existing case; it only affects the relative order of CMS-only cases. `getServiceDetails` returns local order and never sorts, so `order` on a service document has no effect at all.

> **A publish can silently do nothing.** Three separate causes: `NETLIFY_BUILD_HOOK_URL` is unset, the document was saved as a draft rather than published, or the collection is one of the five nothing reads. None of them produce an error in the admin panel.

> **Renaming a Payload field is a silent break.** There is no validation that the Payload field tree matches the local TypeScript shape. A rename on either side means the CMS value lands under a key nothing reads and the page keeps showing the old repo copy. After any field rename, rebuild `web/` with `PAYLOAD_URL` set and diff the output.

## Decisions the client still has to make

These are open, not oversights. Each one is recorded here rather than guessed at.

- **Media storage.** No adapter is configured. `cms/README.md` sketches two options, Bunny Storage through `@payloadcms/storage-s3` and Cloudinary through `payload-cloudinary`. To be decided.
- **CMS host.** Railway or Render. Both are supported by the same build and start commands and by the `Dockerfile`. To be decided.
- **Whether the blog moves into Payload.** The `posts` collection is complete and unused; the blog runs on five markdown files with an Astro schema in `web/src/content.config.ts`. Moving it means writing a `getPosts()` accessor and reconciling the two field sets. To be decided.
- **What to do with the four other unused collections.** `industries`, `hire`, `testimonials` and `pages` should either be wired to accessors or removed from `cms/src/payload.config.ts`, so the admin panel does not offer editors work that has no effect. To be decided.
- **Whether editors may create pages without a developer.** Today they cannot, for services, industries, hire and solutions. Changing that means giving those four the same skeleton-merge treatment as `work` and `products`. To be decided.
- **Whether the API stays public-read.** It is `anyone` today, which is why `PAYLOAD_TOKEN` is optional. Locking it down means issuing a `users` API key and setting `PAYLOAD_TOKEN` in Netlify.
