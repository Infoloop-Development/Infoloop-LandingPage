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
- `WORKLOG.md` + `.cursor/rules/work-tracking.mdc` (always-on) — local, not committed yet

---

## Open / left

| Item | Notes |
|------|--------|
| `image-size` + `extract-zip` Dependabot alerts | No patched npm release; only via Netlify **local-dev**. Breaking “fix” = downgrade `@astrojs/netlify` — skipped on purpose |
| Commit tracking files | `WORKLOG.md` + `.cursor/` still untracked — say if you want them pushed |

---

## How to ask

- **status** / **what did we do** → summary from this file + any newer chat work  
- **what’s left** → Open section above  
