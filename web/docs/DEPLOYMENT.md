# Deploying infoloop.co

This document explains how to build and deploy the Astro site in `web/` to Netlify, and how to cut the `infoloop.co` domain over from the site that serves it today. Read the cutover section before you create anything in Netlify: the new site is not live yet, the domain is attached to a different Netlify project, and the order of operations matters.

---

## 1. What you are deploying

| Item | Value |
| --- | --- |
| Source directory | `web/` (the repository root is **not** the site root) |
| Framework | Astro 7, `output: "static"`, `@astrojs/netlify` adapter |
| Pages produced | 84 HTML files plus `sitemap-index.xml`, `sitemap-0.xml`, `rss.xml`, `robots.txt`, `llms.txt` |
| Server code | One endpoint, `/api/contact`, deployed as a Netlify function |
| URL style | Extensionless, no trailing slash (`trailingSlash: "never"`, `build.format: "file"`), so `/work` is served from `work.html` |
| Canonical host | `https://infoloop.co`, hard coded as `site` in `web/astro.config.mjs` |

Everything else is static. The Payload CMS in `cms/` is read at build time only. If `PAYLOAD_URL` is unset or unreachable the build falls back to the TypeScript content files in `web/src/content/` and still produces the same 84 pages, so a CMS outage cannot break a deploy.

---

## 2. Prerequisites

| Requirement | Detail |
| --- | --- |
| Node | 22.12.0 or newer (`engines` in `web/package.json`). Netlify is pinned to `NODE_VERSION = "22"` in `web/netlify.toml`. |
| Package manager | npm. `web/package-lock.json` is committed, so use `npm ci`, not `npm install`, for reproducible builds. |
| Git host | A remote the Netlify UI can read. See the gotcha below. |
| Netlify access | An account with permission to create a project in the "Infoloop technologies®" team, and permission to move a custom domain between projects in that team. |

Build the site locally once before you touch Netlify:

```bash
cd web
npm ci
npm run build
```

Output lands in two places, and both matter:

- `web/dist/` : the static files, which become the publish directory.
- `web/.netlify/v1/` : the adapter's Netlify Frameworks API output, including the SSR function at `web/.netlify/v1/functions/ssr/ssr.mjs` that serves `/api/contact`.

Other useful scripts:

```bash
npm run dev        # http://localhost:4321
npm run check      # tsc --noEmit, fast
npm run typecheck  # astro check, slower and stricter
npm run preview    # serve the built dist/
```

> **Gotcha: this repository has no git remote.**
> `git remote -v` returns nothing today, and the current working branch is `astro-payload-site`, not `main`. Netlify's continuous deployment needs a repository it can read on GitHub, GitLab, Bitbucket or Azure DevOps. Push the repository first, then decide which branch Netlify treats as production. Which host and which production branch are decisions for your team, not something the code specifies.

> **Gotcha: Node on the handover Mac.**
> This applies only to the machine the site was built on, not to your infrastructure. The Homebrew `node@22` install there is broken (`libsimdutf.33.dylib` is missing), and the Netlify CLI is linked against it, so bare `netlify` and bare `node` both fail. Prefix the path to use the working Node 25 install:
> ```bash
> PATH=/usr/local/bin:$PATH npm ci
> PATH=/usr/local/bin:$PATH netlify --version   # netlify-cli/24.9.0 node-v25.9.0
> ```

---

## 3. Creating the Netlify project

Create a **new** Netlify project from the git repository. Do not modify the project that currently serves `infoloop.co`; section 8 covers that one.

### Build settings

`web/netlify.toml` already declares the build. Netlify reads it relative to the base directory, so the only thing you must set in the UI is the base directory.

| Netlify setting | Value | Where it comes from |
| --- | --- | --- |
| Base directory | `web` | **Set this in the UI.** Nothing in the repository can set it for you. |
| Build command | `npm run build` | `[build] command` in `web/netlify.toml` |
| Publish directory | `dist` | `[build] publish` in `web/netlify.toml`, resolved as `web/dist` |
| Functions directory | not set | The adapter uses the Frameworks API output in `web/.netlify/v1/`, so there is nothing to configure |
| Node version | 22 | `[build.environment] NODE_VERSION` in `web/netlify.toml` |

> **Gotcha: base directory is the single most common way to break this deploy.**
> There is no `netlify.toml` at the repository root, only at `web/netlify.toml`. If the base directory is left empty, Netlify runs the build from the repository root, finds no `package.json`, and the build fails outright. Worse, if someone "fixes" that by setting the build command to `cd web && npm run build` and the publish directory to `web/dist` while leaving the base directory empty, the build succeeds and the site looks fine, but `web/netlify.toml` is never read: **all nine redirect rules and all four security headers silently disappear**, and the `/api/contact` function is not registered. Set the base directory to `web` and let the file do the rest.

### What `web/netlify.toml` configures

- **Redirects.** Five old case study URLs, each in both bare and `.html` form, 301 to the new `/work/<slug>` pages, all with `force = true`.
- **Headers on `/*`.** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- **Headers on `/_astro/*`.** `Cache-Control: public, max-age=31536000, immutable`. Safe because Astro fingerprints those filenames.

Note that the site currently serving `infoloop.co` also sends a `Content-Security-Policy` header, and `web/netlify.toml` does not. Whether to port a CSP across is a decision you need to make; if you do, it has to be rewritten anyway, because the old policy allowlists Google Tag Manager and this site ships no trackers by default.

---

## 4. Environment variables

Set these in the Netlify UI under **Site configuration > Environment variables**. `web/.env.example` is the annotated reference; copy it to `web/.env` for local work.

| Variable | Required | Effect if unset |
| --- | --- | --- |
| `CONTACT_WEBHOOK_URL` | **Required for launch** | `/api/contact` returns HTTP 503 and no lead is delivered. See section 5. |
| `PAYLOAD_URL` | Optional | The build uses the local content files in `web/src/content/` only. The CMS is ignored. |
| `PAYLOAD_TOKEN` | Optional | Payload is read anonymously. Only needed if the Payload API is not public read. |
| `PAYLOAD_PREVIEW` | Optional | Published Payload documents only. Set to `true` to build drafts instead. Intended for a preview context, not production. |
| `TRACKING_DISCLOSED` | Conditional | Only meaningful alongside a tracker variable. See the analytics gotcha below. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Optional | No Plausible script. Cookieless. |
| `PUBLIC_GA4_ID` | Optional | No GA4 script. Cookie based. |
| `PUBLIC_GTM_ID` | Optional | No GTM container. Use instead of `PUBLIC_GA4_ID`, not alongside it: when `PUBLIC_GTM_ID` is set, the GA4 block is skipped. |
| `PUBLIC_POSTHOG_KEY` | Optional | No PostHog. |
| `PUBLIC_POSTHOG_HOST` | Optional | Defaults to `https://eu.i.posthog.com`. |
| `PUBLIC_CLARITY_ID` | Optional | No Microsoft Clarity. |
| `PUBLIC_LINKEDIN_PARTNER_ID` | Optional | No LinkedIn Insight tag. |

There is no `NETLIFY_BUILD_HOOK_URL` in this table on purpose: that variable belongs to the **CMS** environment, not the site. See section 7.

> **Gotcha: every variable here is read at build time, including the one the serverless function uses.**
> Astro resolves `import.meta.env.*` while compiling. In the build currently sitting in `web/.netlify/`, `CONTACT_WEBHOOK_URL` was unset, so the compiler eliminated the entire webhook delivery branch. The compiled function is now literally this and nothing else:
> ```js
> console.error("[contact] CONTACT_WEBHOOK_URL is not set; lead not delivered", lead);
> return json({ error: "We could not send that. Please email hi@infoloop.co." }, 503);
> ```
> The consequence: setting the variable in the Netlify UI and then using **Publish deploy** on an existing build does nothing at all. You must trigger a **new build**. Set your environment variables before the first production build, and after any change to them, redeploy with "Clear cache and deploy site".

> **Gotcha: turning on any tracker without `TRACKING_DISCLOSED=true` fails the build on purpose.**
> `web/src/components/Analytics.astro` throws at build time if any `PUBLIC_*` tracker variable is set while `TRACKING_DISCLOSED` is not exactly the string `"true"`. This is deliberate, not a bug. `web/src/content/legal.ts` keys the privacy copy off the same flag: without it, `/privacy` states the site runs no third party analytics; with it, that claim is removed and a "Website analytics" section appears. The flag exists so the policy cannot drift out of step with reality. Set both variables in the same deploy, and read `web/docs/TRACKING.md` first. Separately: enabling a cookie setting tracker (GA4, GTM, PostHog, Clarity, LinkedIn) automatically switches on the consent banner and Google Consent Mode v2, both of which ship with the site. Set `PUBLIC_CONSENT_REQUIRED=false` to suppress the banner, and the build logs a console warning if you do.

---

## 5. The `/api/contact` function

`web/src/pages/api/contact.ts` sets `export const prerender = false`, which is why the site needs the Netlify adapter at all. The adapter emits one function, registered at `path: "/*"` with `preferStatic: true`, so static files always win and only unmatched requests reach it.

What the endpoint does, in order:

1. Rejects anything that is not a JSON object with HTTP 400.
2. Drops honeypot submissions: a non-empty `website` field returns `{"ok": true}` and delivers nothing.
3. Validates: name of at least 2 characters, and an email matching a basic pattern. Failures return HTTP 422 with a human readable message that the form displays.
4. Builds a normalized lead: contact fields, UTM parameters, `submitted_from`, `received_at`, and the user agent, with each field length capped.
5. POSTs that lead as JSON to `CONTACT_WEBHOOK_URL` with an 8 second timeout.

Status codes you will see:

| Condition | Response |
| --- | --- |
| Delivered | `200 {"ok": true}` |
| Honeypot triggered | `200 {"ok": true}`, nothing sent |
| Validation failed | `422` with a message |
| Malformed body | `400` |
| Webhook non-2xx, or timed out | `502`, message points the visitor at `hi@infoloop.co` |
| `CONTACT_WEBHOOK_URL` unset in a production build | `503`, same message, lead logged to the function log |

Three parts of the site post to this endpoint: the contact page form (`web/src/components/contact/ContactForm.tsx`), a second lead form (`web/src/components/ContactForm.tsx`), and the brochure gate (`web/src/components/contact/BrochureGate.tsx`), which only opens `/downloads/infoloop-brochure.pdf` after a successful response. If the endpoint is broken, the brochure download is broken too.

The destination is not specified anywhere in the code. `web/.env.example` suggests Zapier, Make, Slack or HubSpot. **Choosing and creating that webhook is an open item on the client side.** Until it exists, the launch is not finished.

In `npm run dev` the behavior differs: with no webhook set, the lead is logged with `console.info` and the endpoint returns 200, so you can test forms locally without a destination.

---

## 6. Deploy previews

Deploy previews work with no extra configuration once the base directory is right. Each pull request gets its own build and URL.

Two things to know:

- **Previews build with the same environment variables as production unless you scope them.** If `CONTACT_WEBHOOK_URL` is set for all contexts, a form submitted on a preview URL sends a real lead to your real CRM. Either scope the variable to the production context only, or point previews at a throwaway webhook.
- **Canonical URLs on a preview point at `infoloop.co`.** `site` is hard coded in `web/astro.config.mjs`, so every canonical tag, `og:url`, sitemap entry and JSON-LD URL on a preview names the production domain. That is correct behavior, not a bug, but it means previews must not be indexed. Netlify serves deploy previews with a `noindex` robots header; verify rather than assume:

```bash
curl -sSI https://deploy-preview-1--YOUR-PROJECT.netlify.app/ | grep -i x-robots-tag
```

If that header is absent, do not leave the preview URL in a public place.

---

## 7. Rebuilding when CMS content changes

The site reads Payload at build time, so publishing in the CMS changes nothing until a build runs. Wire that up once:

1. In Netlify, go to **Site configuration > Build & deploy > Build hooks** and create a hook. Name it something obvious, for example "Payload publish".
2. Copy the generated URL.
3. Set it as `NETLIFY_BUILD_HOOK_URL` in the **CMS** environment (see `cms/.env.example`). `cms/src/hooks/revalidate.ts` POSTs to it after any publish.

You can also fire it by hand:

```bash
curl -X POST -d '{}' https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

Treat the hook URL as a secret. Anyone holding it can trigger builds.

---

## 8. Cutover: replacing the site that serves infoloop.co today

### How the domain is served right now

| Fact | Value |
| --- | --- |
| Netlify project | `magenta-truffle-cbe2be` |
| Site ID | `c4f21ce5-e598-47c9-8ad2-cb60596cac2e` |
| Team | Infoloop technologies® |
| Git repository | **None attached.** Nothing rebuilds automatically. |
| How it is deployed | By hand: `netlify deploy --prod --dir=.` |
| Source of that build | The static files in the repository's `build/` folder, 64 HTML pages, with its own `netlify.toml` |
| Custom domain | `infoloop.co` |
| Domain alias | `infoloopglobal.com` |
| Pretty URLs | Enabled, which is why every old page answers at both `/about` and `/about.html` |

The new Astro site is not live anywhere. Nothing you do in the new Netlify project affects the live domain until you move it, which makes this a genuinely low risk cutover as long as you follow the order below.

### The redirect gap you must close first

The old site has 64 pages. The new site has 84, but the URL sets are not the same. Comparing the two builds, **41 content URLs that exist on the live site today have neither a page nor a redirect on the new site.** After cutover, each of those returns a 404 and loses whatever link equity and ranking it had.

Seven of them have an exact counterpart in the new build and should be redirected. These are verified, slug for slug:

| Old URL | New URL |
| --- | --- |
| `/managed-software-retainer-guide` | `/blog/managed-software-retainer-guide` |
| `/metrics-ai-copilot-working` | `/blog/metrics-ai-copilot-working` |
| `/reduce-payroll-errors-attendance` | `/blog/reduce-payroll-errors-attendance` |
| `/ship-ai-agent-production` | `/blog/ship-ai-agent-production` |
| `/webflow-seo-day-one` | `/blog/webflow-seo-day-one` |
| `/industries-automotive` | `/industry/automotive` |
| `/industries-manufacturing` | `/industry/manufacturing` |

The remaining 34 have no equivalent page, and **where each one should point is a decision for the client, not something the code can answer**:

`/ai-agents-copilots`, `/ai-readiness-checklist`, `/attendance-management-system`, `/build-vs-buy-ai`, `/comparisons`, `/customers`, `/garage-management-system`, `/glossary`, `/hire-dedicated-team`, `/how-we-work`, `/industries-training-providers`, `/infoloop-vs-agency`, `/infoloop-vs-in-house`, `/insights`, `/lms-testing-platform`, `/partners`, `/pricing`, `/product-tour`, `/resources`, `/resources-cto-checklist`, `/responsible-ai`, `/roi-calculator`, `/security`, `/solutions`, `/style-guide`, `/thank-you`, `/we-run`, `/webflow-cms-guide`, `/webflow-vs-shopify`, `/webflow-vs-wordpress`, `/websites-and-stores`, `/what-is-a-managed-software-retainer`, `/what-is-an-ai-agent`, `/what-is-an-ai-copilot`

Pull the last 12 months of Search Console data for these before deciding. The ones with real impressions deserve a 301 to the closest new page; the rest can be left to 404, which is a legitimate choice as long as it is a choice.

Add whichever you decide on to `web/netlify.toml` in the same style as the rules already there, and add both forms of each URL:

```toml
[[redirects]]
  from = "/ship-ai-agent-production"
  to = "/blog/ship-ai-agent-production"
  status = 301
  force = true

[[redirects]]
  from = "/ship-ai-agent-production.html"
  to = "/blog/ship-ai-agent-production"
  status = 301
  force = true
```

> **Gotcha: one wildcard rule will not do this for you.**
> Netlify's splat only matches at the end of a path, so a single `from = "/*.html"` rule never fires. The old site's `netlify.toml` works around this with one explicit rule per page, and so must yours. Both forms of every URL are live today because Pretty URLs is on, so both need covering.

### The alias domains

`infoloopglobal.com` is attached to the old project as an alias, and Netlify aliases do **not** redirect on their own. The old project's `netlify.toml` handles that with explicit forced 301s from `https://infoloopglobal.com/*`, `https://www.infoloopglobal.com/*` and `https://www.infoloop.co/*` to `https://infoloop.co/:splat`. **`web/netlify.toml` contains no equivalent rules.**

You have two workable options, and this is a decision to make before cutover, not after:

1. **Leave the aliases on the old project.** Keep `magenta-truffle-cbe2be` published with its domains and its redirect rules. Those 301s keep pointing at `https://infoloop.co`, which by then serves the new site. Simplest, and it costs nothing.
2. **Move the aliases to the new project.** Then you must port the three alias redirect rules into `web/netlify.toml` yourself, or `infoloopglobal.com` will serve the new site directly and you will have the same content on two domains.

Whichever you pick, confirm `www.infoloop.co` behaves after cutover. It is covered by an explicit rule today and by nothing in the new configuration.

### Order of operations

Do this at a low traffic hour, with both Netlify project dashboards open in separate tabs.

1. Push the repository to your git host and confirm the branch you want Netlify to treat as production.
2. Create the new Netlify project from that repository. **Set the base directory to `web`.**
3. Set the environment variables from section 4. At minimum, `CONTACT_WEBHOOK_URL` must be real.
4. Add the redirect rules you decided on to `web/netlify.toml` and commit them.
5. Let the build run. Fix anything red before going further.
6. Run the entire smoke checklist in section 10 against the project's `*.netlify.app` URL, substituting that host for `infoloop.co`. Everything except the canonical tags and the domain specific redirects should pass there.
7. If `infoloop.co` uses external DNS rather than Netlify DNS, lower the TTL on its records to 300 seconds and wait at least the length of the old TTL before continuing. If it uses Netlify DNS, skip this.
8. Confirm the old project's most recent deploy is healthy and note its deploy ID. This is your rollback target.
9. Remove `infoloop.co` from `magenta-truffle-cbe2be`. Netlify will not let two projects claim the same custom domain, so this has to come first. **This starts the downtime window.**
10. Immediately add `infoloop.co` as the custom domain on the new project and set it as primary.
11. Wait for the TLS certificate to provision. HTTPS may error for a few minutes while Let's Encrypt issues it. Do not announce anything until `https://infoloop.co` loads cleanly in a browser.
12. If DNS records need to change (external DNS), update them now and wait for propagation.
13. Run the smoke checklist against `https://infoloop.co`.
14. Resubmit `https://infoloop.co/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
15. Leave the old project in place, unmodified, for at least 30 days.

Steps 9 through 11 are the only window where the domain can be unreachable. Everything before step 9 is reversible with no visitor impact at all.

### Rolling back

You have three levels, cheapest first.

**Level 1, the deploy was bad but the domain move was fine.** In the new project, open **Deploys**, pick the last known good deploy and use **Publish deploy**. Instant, no rebuild. Note the limitation from section 4: this restores code and content but not environment variable changes, because those are compiled in.

**Level 2, put the old site back on the domain.** Reverse steps 9 and 10: remove `infoloop.co` from the new project, add it back to `magenta-truffle-cbe2be`, and let the certificate reissue. The old project still holds its deploy history, so its last deploy is served as soon as the domain resolves.

**Level 3, the old project itself is damaged.** The full old site still exists in the repository's `build/` folder, including its `netlify.toml`. Redeploy it exactly the way it was deployed before:

```bash
cd build
netlify deploy --prod --dir=.
```

Run that against site ID `c4f21ce5-e598-47c9-8ad2-cb60596cac2e`. On the handover Mac, prefix it with `PATH=/usr/local/bin:$PATH` for the reason given in section 2.

> **Gotcha: do not delete `magenta-truffle-cbe2be`, and do not delete the `build/` folder.**
> Between them they are the only way to restore the current site. The project has no git repository attached, so its deploy history is the only copy of what is live today apart from that folder.

---

## 9. Custom domain and DNS

Once `infoloop.co` is attached to the new project:

- **Set the primary domain explicitly.** Netlify redirects the other names it holds to the primary. Get this wrong and canonical tags will disagree with what the server actually serves, because `astro.config.mjs` always emits `https://infoloop.co`.
- **Netlify DNS versus external DNS.** If the domain uses Netlify DNS, attaching it is enough. If it is hosted elsewhere, point the apex at Netlify with an `ALIAS`, `ANAME` or flattened `CNAME` record where the provider supports it, or Netlify's load balancer A record where it does not, and point `www` at the project's `*.netlify.app` hostname with a `CNAME`. Follow whatever Netlify's domain panel shows for the project at the time; do not copy IP addresses out of old documentation.
- **HTTPS.** Netlify provisions a Let's Encrypt certificate automatically once DNS resolves. Enable "Force HTTPS" after it is issued.
- **Pretty URLs.** The old project has this enabled, which is why `/about` and `/about.html` both answer there. The new build outputs `work.html`, `about.html` and so on, and relies on `/work` and `/about` resolving. Verify extensionless URLs on the new project before cutover (step 6 of the order of operations covers this). If any of them 404, check that setting under asset optimization before you go looking for bugs in the build.

---

## 10. Post-deploy smoke checklist

Run every one of these. Against a deploy preview or the project's Netlify subdomain, substitute that host for `infoloop.co`.

### Pages, one per template

Each of these should return 200:

```bash
for u in / /services /work /work/manufacturing-erp-predictive-maintenance \
         /products /products/opsdeck /blog /blog/ship-ai-agent-production \
         /industries /industry/manufacturing /hire /hire-react-developers \
         /solutions/build /about /contact /careers /testimonials \
         /trust-center /brand-assets /technologies /sitemap /nimit \
         /privacy /terms; do
  printf '%s  %s\n' "$(curl -sS -o /dev/null -w '%{http_code}' "https://infoloop.co$u")" "$u"
done
```

### Machine readable files

```bash
curl -sSI https://infoloop.co/robots.txt      # 200, text/plain
curl -sSI https://infoloop.co/llms.txt        # 200
curl -sS  https://infoloop.co/sitemap-index.xml | head -c 200
curl -sS  https://infoloop.co/sitemap-0.xml | grep -c '<loc>'   # expect 84
curl -sS  https://infoloop.co/rss.xml | head -c 200
```

Confirm `robots.txt` still names the answer engine crawlers it allows on purpose: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `Bingbot`. That policy is deliberate and documented in `web/docs/AEO-GEO.md`.

### Downloads

```bash
curl -sSI https://infoloop.co/downloads/infoloop-brochure.pdf     # 200, application/pdf
curl -sSI https://infoloop.co/downloads/infoloop-brand-assets.zip # 200
```

### Redirects from the old site

Every one should return 301 with the expected `Location`:

```bash
for u in /case-machinery-erp /case-machinery-erp.html \
         /work-brightlane-garages /work-brightlane-garages.html \
         /case-fintech-support-copilot /case-fintech-support-copilot.html \
         /case-dtc-shopify-rebuild /case-dtc-shopify-rebuild.html \
         /case-manufacturing-attendance /case-manufacturing-attendance.html; do
  printf '%s  %-45s -> %s\n' \
    "$(curl -sS -o /dev/null -w '%{http_code}' "https://infoloop.co$u")" "$u" \
    "$(curl -sS -o /dev/null -w '%{redirect_url}' "https://infoloop.co$u")"
done
```

Add any redirects you created from the section 8 gap list to this loop.

### The contact endpoint

```bash
curl -sS -X POST https://infoloop.co/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Deploy smoke test","email":"you@yourcompany.com","message":"Ignore, deploy verification."}'
```

Expect `{"ok":true}`, and then confirm the lead actually arrived at the webhook destination. A 503 means `CONTACT_WEBHOOK_URL` was not present at build time; set it and run a fresh build, not a republish. This test creates a real lead, so use an address you can identify and delete afterwards.

Also confirm validation still bites:

```bash
curl -sS -X POST https://infoloop.co/api/contact \
  -H 'Content-Type: application/json' -d '{"name":"x","email":"nope"}'   # expect 422
```

Then submit the form once in a browser at `https://infoloop.co/contact`, and use the brochure gate on the same page to confirm the PDF opens after submission.

### Headers

```bash
curl -sSI https://infoloop.co/ | grep -Ei 'x-frame-options|x-content-type|referrer-policy|permissions-policy'
```

All four should be present. If they are missing, the base directory is almost certainly not set to `web`, so `web/netlify.toml` was never read. Also confirm the immutable cache header on a hashed asset:

```bash
curl -sSI "https://infoloop.co$(curl -sS https://infoloop.co/ | grep -o '/_astro/[^\"]*\.css' | head -1)" | grep -i cache-control
```

### Tracking is genuinely off

Unless you deliberately enabled a tracker, this must print nothing:

```bash
curl -sS https://infoloop.co/ | grep -Ei 'plausible|googletagmanager|posthog|clarity\.ms|licdn'
```

If it prints something, `/privacy` and the deployed reality have to be reconciled before you go any further. Cross check the policy text at `https://infoloop.co/privacy`.

### Canonical host

```bash
curl -sS https://infoloop.co/ | grep -o '<link rel="canonical"[^>]*>'
```

Expect `https://infoloop.co/`. Spot check two or three inner pages, and confirm the RSS `<link rel="alternate">` in `<head>` points at `https://infoloop.co/rss.xml`.

### Unknown URLs

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://infoloop.co/this-page-does-not-exist
```

Expect 404. Be aware that there is no `src/pages/404.astro` and no `404.html` in the build, so this is the framework's bare 404, not a branded page. The old site had a designed 404. Building one for the new site is an open decision.

---

## 11. Open items that block a clean launch

These are not deployment steps. They are things the deployment cannot compensate for, and they are owed by the client rather than the engineers.

- `CONTACT_WEBHOOK_URL`: pick the destination and create the webhook. Without it every form on the site returns 503.
- Redirect mapping for the 34 old URLs listed in section 8.
- A lawyer's review of `/privacy` and `/terms`.
- Real team photos and personal LinkedIn or X URLs for the three person pages.
- Product screenshots, which currently render as drawn placeholder tiles.
- Confirmation that `+91 97261 81000` is reachable on WhatsApp, since the site links to it.
