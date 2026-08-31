# Infoloop work log

Running log of agent/handover work. Ask anytime for a status summary (“status”, “what did we do”, “what’s left”).

---

## 2026-08-29

### Ivy: resume quote + live sales handoff + waiting bell
- Resume previous quote (soft chip, email lookup, project picker, same ticket)
- Live sales handoff (Waiting badge, admin Start chat, agent join/avatars, AI vs agent transcript)
- Admin-wide notification bell + sound when someone is Waiting
- Related fixes: tickets list clickable, reconnect not dumping old Admin chat, DB columns
- Commit: `8277933` (cms + web)

### Build / deploy hygiene
- Remove macOS-only `@next/swc-darwin-arm64` direct dependency — `26102b7`
- Fix SalesInquiryTickets TypeScript errors for CMS production build — `3797e4f`

### Security / Dependabot (inherited from design zip)
- CMS: `sharp` → 0.35.4, `vitest` → 4.1.11, `esbuild` override `>=0.25`
- Web: `sharp` override + `@astrojs/netlify` → 8.2.4
- Commit message documents these came from the provided design zip, not later Infoloop work
- Commit: `bfc629b` on `production` + `main`

### Tracking setup
- `WORKLOG.md` + `.cursor/rules/work-tracking.mdc` (always-on) committed so progress can be reported on request

---

## 2026-08-31

### Render: web needs Node Web Service for Ivy
- Live chat failed because `/api/chat` does not run on Render **Static** + Netlify adapter
- Switched `web` to `@astrojs/node` standalone for Render Web Service
- CMS stays on Render; Groq/PAYLOAD_* belong on **web** env only
- First Render build failed on old commit still using `@astrojs/netlify` + missing `TRACKING_DISCLOSED` while CMS analytics is on

---

## Open / left

| Item | Notes |
|------|--------|
| Redeploy `Infoloop-WebMain` after Node-adapter push | Root `web`, start `node ./dist/server/entry.mjs`, env must include `TRACKING_DISCLOSED=true` (CMS has analytics), plus GROQ + PAYLOAD_* + `HOST=0.0.0.0` |
| `image-size` + `extract-zip` Dependabot alerts | Unpatched Netlify-dev deps; skipped on purpose |

---

## How to ask

- **status** / **what did we do** → summary from this file + any newer chat work  
- **what’s left** → Open section above  
