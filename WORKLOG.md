# Infoloop work log

Running log of agent/handover work. Ask anytime for a status summary (“status”, “what did we do”, “what’s left”).

---

## 2026-09-03

### Integrate developer fixed zip (`Infoloop-LandingPage-fixed.zip`)
- Synced zip `web/` + `cms/` into repo (kept local `.env` files)
- Fixed corrupt trailing `\\n` in `cms/package.json` from the zip
- `build.format: "directory"` + `server.mjs` (`npm start`) + `redirects.mjs` + link checker
- Clean URLs again (`/blog`, `/work`, `/products` — no `.html` hacks)
- Chat hardening (rate limit, body cap, ticket tokens)
- CMS: new globals (Blog/Company/Contact/Hub/Technologies) + `SITE_BUILD_HOOK_URL`
- Local verify: `npm run build` Links OK; `npm start` serves `/blog` `/work` `/products` 200
- Added root `render.yaml` documenting Start Command = `npm start`

**Render WebMain (do in dashboard if not already):**
- Start Command → `npm start` (not `node ./dist/server/entry.mjs`)
- Manual Deploy after this push

**CMS (do in dashboard / locally):**
- Set `SITE_BUILD_HOOK_URL` to Infoloop-WebMain Deploy Hook (or keep existing `NETLIFY_BUILD_HOOK_URL`)
- From a machine that can reach Neon: `cd cms && npm run db:push` (schema push hung in this agent environment)

---

## 2026-08-31

### Render: web needs Node Web Service for Ivy
- Bumped `astro` to 7.2.9 so `@astrojs/node` startup (`app.getLogger`) works on Render
- Switched `web` to `@astrojs/node` standalone for Render Web Service
- Temporary `.html` nav plugs for blog/work/products (superseded by zip directory format)

---

## 2026-08-29

### Ivy: resume quote + live sales handoff + waiting bell
- Commit: `8277933` (cms + web)

### Security / Dependabot (inherited from design zip)
- Commit: `bfc629b` on `production` + `main`

### Tracking setup
- `WORKLOG.md` + `.cursor/rules/work-tracking.mdc`

---

## Open / left

| Item | Notes |
|------|--------|
| Render WebMain Start Command | Must be `npm start` after this deploy |
| CMS `SITE_BUILD_HOOK_URL` + `npm run db:push` | New globals need schema push from a networked machine |
| `image-size` + `extract-zip` Dependabot | Unpatched Netlify-dev deps; skipped |

---

## How to ask

- **status** / **what did we do** → summary from this file + any newer chat work  
- **what’s left** → Open section above  
