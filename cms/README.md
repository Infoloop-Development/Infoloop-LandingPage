# infoloop CMS (Payload 3)

Headless CMS for infoloop.co. **Payload 3** on Next 16, **Postgres on Neon**,
hosted on **Railway or Render**. The public site (`../web`, Astro on Netlify) reads
this API at build time; publishing here pings the Netlify build hook so the static
site rebuilds.

## Content model

| Kind | Slug | What it holds |
| --- | --- | --- |
| Global | `home` | The landing page, one tab per section. Field names mirror `web/src/content/home.ts` exactly. |
| Global | `site` | Brand strings, header/footer nav (Services / Industries / Hire talent / Products / Company), offices, social, ratings. Mirrors `web/src/content/site.ts`. |
| Collection | `services` | One doc per service page, grouped Build / Grow / Transform / Consulting. Only the approved sitemap. |
| Collection | `industries` | Industry pages, four groups. |
| Collection | `hire` | "Hire X developers" pages by discipline. |
| Collection | `products` | OpsDeck, GarageZone, LoopIQ. |
| Collection | `work` | Case studies; fields mirror `web/src/content/work.ts` (CaseStudy): overview, metrics, story sections, day-to-day and extra items, tech, links, per-case CTA, dates, cover, related. |
| Global | `work-page` | The /work index: hero, stats, filters (keys are fixed selects), snapshots, trust note, FAQ, CTA. Mirrors `WorkIndex`. |
| Collection | `posts` | Blog. |
| Collection | `testimonials` | Client quotes with platform, rating and an "approved in writing" flag. |
| Collection | `pages` | Free-form pages (About, Careers, Contact, Brand assets, Privacy, Terms) built from blocks. |
| Collection | `media` | Uploads, alt text required, webp sizes thumbnail/card/og. |
| Collection | `users` | Editors; API keys enabled for the build. |

Page-like collections share `pageLike()` (`src/collections/pageLike.ts`): title, slug,
eyebrow, H1, lede, a one-sentence definition for answer engines, rich body, FAQ, CTA,
SEO group (title ≤ 60, description ≤ 158, OG image, noindex), drafts + autosave +
versions. Reads are public; writes need a login or API key.

Shared field helpers live in `src/fields`; `strings()` stores string lists as
`[{ value }]`, which the Astro adapter flattens back.

## Run locally

Node 22+ (`PATH=/usr/local/bin:$PATH` on this Mac).

```bash
cp .env.example .env         # fill DATABASE_URL and PAYLOAD_SECRET
npm install
npm run dev                  # http://localhost:3000/admin
```

Schema push is opt-in: `npm run db:push` (or `PAYLOAD_DATABASE_PUSH=true npm run dev`)
applies collection, global and field changes to the database in `cms/.env`. Nothing pushes
in production (`next start` sets `NODE_ENV=production`, and the Postgres adapter only pushes
outside it), so after any schema change run `npm run db:push` against the production
database from a developer machine, or use migrations:

```bash
npm run payload migrate:create
npm run payload migrate
```

### Seed with the approved copy

```bash
npm run seed
# or, to also create the first admin:
SEED_ADMIN_EMAIL=you@infoloop.co SEED_ADMIN_PASSWORD='...' npm run seed
```

`src/seed/index.ts` loads `web/src/content/{home,site}.ts` into the two globals so
editors start from the landing page as approved, not a blank form. It also seeds the `work-page` global and the five case studies (published, upserted by slug). Re-runnable.

## Environment

```
DATABASE_URL=postgres://USER:PASSWORD@HOST/DBNAME?sslmode=require   # Neon pooled URL
PAYLOAD_SECRET=                    # openssl rand -hex 32
PAYLOAD_PUBLIC_SERVER_URL=         # https://cms.infoloop.co once deployed
CORS_ORIGINS=http://localhost:4321,https://infoloop.co
NETLIFY_BUILD_HOOK_URL=            # from Netlify > Build hooks
```

## Deploy

**Neon**: create a project, copy the pooled connection string into `DATABASE_URL`.

**Railway** (or Render, same steps): new service from this folder / the repo with root
`cms`. Build `npm run build`, start `npm start`, add the env vars above, attach a
domain (`cms.infoloop.co`). The `Dockerfile` in this folder needs `output: "standalone"`
in `next.config.ts` before it builds; Render does not use it.
Uploads land in `media/` on the container disk by default, which does not persist
between deploys; for production attach a Render Disk at `cms/media` or add a storage
adapter (see Media). Until then every image uploaded in the CMS disappears on the next deploy.

**Netlify hook**: after the first deploy, create a Build hook in Netlify and set
`NETLIFY_BUILD_HOOK_URL` here. `src/hooks/revalidate.ts` POSTs it after any publish
or delete (debounced to one build per 30 s; drafts do not trigger it).

## Media (Bunny CDN or Cloudinary)

Two options that fit the stack sheet:

- **Bunny Storage + CDN**: `npm i @payloadcms/storage-s3` and point it at Bunny's
  S3-compatible endpoint, or the community `payload-storage-bunny` adapter. Then set
  `PAYLOAD_PUBLIC_MEDIA_URL` to the pull-zone URL and reference it in `web`.
- **Cloudinary**: `npm i payload-cloudinary` and add it to `plugins` in
  `src/payload.config.ts`.

Until one is chosen the site uses inline brand-drawn tiles and photo slots, so no
image pipeline is required to launch the landing page.

## Verified

Type-check clean, `payload generate:types` clean, booted against a local Postgres,
schema pushed, `GET /api/globals/home` and `/site` return 200 publicly, seed loads the
full approved copy, and an Astro build with `PAYLOAD_URL` set renders the landing page
identically to the local-content build.
