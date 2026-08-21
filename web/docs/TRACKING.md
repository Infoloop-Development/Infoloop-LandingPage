# Tracking and analytics

This document explains how analytics is wired into the site, how to turn a tool on, and what has to change in the privacy policy at the same moment. The site ships with no tracking at all. That is a deliberate default, and the build actively refuses to let you break it: if you configure a tracker without also declaring that the privacy policy has been updated, the build fails. Everything below was verified against the code in `web/` on 18 August 2026. This file lives at `web/docs/TRACKING.md`, which is the path the code comments point at.

---

## 1. The default: nothing loads

`web/src/components/Analytics.astro` is rendered as the last element inside `<head>` on every page (`web/src/layouts/Base.astro`, line 57). It reads seven environment variables. With none of them set it emits nothing at all: no script tags, no cookies, no network requests to a third party.

Verify it on a clean build:

```bash
cd web
npm run build
grep -rlE "plausible|googletagmanager|clarity\.ms|posthog|licdn" dist --include="*.html" | wc -l
```

That prints `0` against all 84 built HTML pages.

This default is correct for three reasons, and they are worth understanding before you change it.

1. **The privacy policy makes a factual claim that depends on it.** `/privacy` currently states "No tracking cookies. This website sets no cookies for advertising or profiling" and "No advertising pixels and no third-party analytics that follow you around the web." Those sentences come from `web/src/content/legal.ts`, lines 74 to 78. They are true only while no tracker is configured.
2. **A software agency's own site is a work sample.** The trust center and the privacy policy are read by the same buyers who are asking whether you will handle their customers' data carefully.
3. **Nothing is lost by waiting.** The wiring is already done. Turning a tool on is one environment variable and a redeploy, and you get data from that moment forward. There is no code work sitting between you and analytics.

---

## 2. Supported tools

Every tool is optional and off by default. Set the variable in the Netlify UI (Site configuration, Environment variables) and redeploy.

| Tool | Environment variable | Sets cookies or persistent storage | Needs consent in the EU and UK | Notes |
| --- | --- | --- | --- | --- |
| Plausible | `PUBLIC_PLAUSIBLE_DOMAIN` | No | No | Loads `https://plausible.io/js/script.js` with `defer` and `data-domain` set to the value you give. |
| Google Analytics 4 | `PUBLIC_GA4_ID` | Yes (`_ga`, `_ga_*`) | Yes | Configured with `anonymize_ip: true`, `allow_google_signals: false`, `allow_ad_personalization_signals: false`. Ignored when `PUBLIC_GTM_ID` is also set. |
| Google Tag Manager | `PUBLIC_GTM_ID` | Whatever the container loads, in practice yes | Yes | The build cannot see inside the container. Everything about compliance moves into GTM, where this guard has no reach. |
| PostHog | `PUBLIC_POSTHOG_KEY` | Yes | Yes | Initialized with `person_profiles: "identified_only"`. Host comes from `PUBLIC_POSTHOG_HOST`, defaulting to `https://eu.i.posthog.com`. |
| Microsoft Clarity | `PUBLIC_CLARITY_ID` | Yes | Yes | Session recording and heatmaps, which is a larger privacy question than page counting. |
| LinkedIn Insight Tag | `PUBLIC_LINKEDIN_PARTNER_ID` | Yes, third party | Yes | Advertising and audience building. Only useful if you actually run LinkedIn Ads. |

Two control variables sit alongside them:

| Variable | Purpose |
| --- | --- |
| `TRACKING_DISCLOSED` | Must be the exact string `"true"` for a build with any tracker to succeed. It also swaps the privacy copy. See sections 3 and 4. |
| `PUBLIC_POSTHOG_HOST` | Only read when `PUBLIC_POSTHOG_KEY` is set. Defaults to `https://eu.i.posthog.com`. |

The `PUBLIC_` prefix is meaningful. Astro inlines `PUBLIC_*` values into the HTML and client JavaScript at build time, so they end up visible in the page source, which is fine for analytics IDs since they are public by nature. `TRACKING_DISCLOSED` has no prefix, is read only during the build, and never reaches the browser.

`web/.env.example` documents the same set for local work. Copy it to `web/.env` and leave every value empty to reproduce the shipped default.

> **Gotcha:** setting `PUBLIC_GA4_ID` and `PUBLIC_GTM_ID` together silently drops the direct GA4 tag. The code is `{ga4 && !gtm && ...}` at `Analytics.astro` line 66. That is intentional (double tagging inflates every number), but if you set both and then look for `gtag/js` in the page source, you will not find it. Configure GA4 inside the GTM container instead, or use one variable, not both.

---

## 3. The `TRACKING_DISCLOSED` build guard

`Analytics.astro` lines 35 to 41:

```js
if (anyTracker && !disclosed) {
  throw new Error(
    "Tracking is configured but TRACKING_DISCLOSED is not 'true'.\n" +
      "Set TRACKING_DISCLOSED=true only after updating the privacy policy to\n" +
      "disclose what you now collect. See web/docs/TRACKING.md.",
  );
}
```

Reproduce it:

```bash
cd web
PUBLIC_PLAUSIBLE_DOMAIN=infoloop.co npm run build
```

The build dies on the first page it prerenders and exits non-zero:

```text
 prerendering static routes
  ├─ /about.htmlTracking is configured but TRACKING_DISCLOSED is not 'true'.
Set TRACKING_DISCLOSED=true only after updating the privacy policy to
disclose what you now collect. See web/docs/TRACKING.md.
  Stack trace:
    at file:///.../.netlify/build/.prerender/chunks/cms_XXXXXXXX.mjs:25:38
```

The chunk filename in the stack trace is a build hash and changes every time. The message is the part that matters. On Netlify this appears in the deploy log and the deploy is marked failed, so the broken state never goes live.

**Why the guard exists.** A privacy policy that denies the tracking the site actually runs is a legal problem, not a cosmetic one. Environment variables get set in a hurry by whoever is closest to the dashboard, and the person who sets `PUBLIC_GA4_ID` is usually not the person thinking about `/privacy`. The guard forces those two acts into the same deploy by making one impossible without the other.

The same check runs in `npm run dev`, because it lives in component frontmatter and executes every time a page is rendered, not only during a production build.

### The warning for cookie-based tools

`Analytics.astro` lines 45 to 47 print a warning whenever a cookie-setting tool is enabled:

```text
[analytics] Cookie-setting trackers are on with PUBLIC_CONSENT_REQUIRED=false. No consent is collected. See web/docs/TRACKING.md.
```

> **Gotcha:** this warning prints once per prerendered page, so a production build with GA4 enabled prints it 84 times. It is noise, not a failure, and the build still succeeds. Do not go looking for a bug.

### The guard is one-directional

Setting `TRACKING_DISCLOSED=true` with no tracker configured builds cleanly and publishes a privacy policy that describes analytics you are not running. Verified: with only that variable set, zero HTML files reference any tracker, and `/privacy` still gains its "Website analytics" section. Nothing catches this. Do not set the flag ahead of time "so it is ready".

---

## 4. What changes in the privacy policy

`web/src/content/legal.ts` reads the same flag at line 20 and rewrites `/privacy` accordingly. There is no separate copy to edit by hand.

| Section | With `TRACKING_DISCLOSED` unset (today) | With `TRACKING_DISCLOSED=true` |
| --- | --- | --- |
| "What we do not do" | Three bullets, opening with "No tracking cookies. This website sets no cookies for advertising or profiling." and "No advertising pixels and no third-party analytics that follow you around the web." | Two bullets. Both analytics claims are removed. What remains is the narrower "No advertising pixels. We do not run retargeting" plus the promise not to sell or trade data. |
| "Website analytics" | Absent. | Added, after "What we do not do". Describes what is collected (pages viewed, referrer, country or city level location from IP, device and browser), what is not collected (name, email, phone unless typed into a form), and that blocking analytics does not break the site. |

Verify either state locally:

```bash
cd web
npm run build && grep -c "Website analytics" dist/privacy.html   # prints 0
TRACKING_DISCLOSED=true npm run build && grep -c "Website analytics" dist/privacy.html   # prints 1
```

> **Gotcha:** one claim does not flip. `PRIVACY.seo.description` at `legal.ts` line 153 still reads "No tracking cookies, no advertising pixels, no selling data" and is not behind the flag. After you enable tracking it keeps appearing four times in `dist/privacy.html`: the `meta name="description"`, `og:description`, `twitter:description` and the page's JSON-LD `description`. The visible page is correct and the machine-readable summary contradicts it. Editing that line is a one-word job, but it is a source change, so it has to be made deliberately and reviewed. Treat it as a required step of turning tracking on, not an optional tidy-up.

Two things the flag cannot do for you, and both are still owed:

- The "Website analytics" wording describes generic page analytics. If you enable Clarity (session recording) or the LinkedIn Insight Tag (advertising), that section understates what you are doing and needs new copy written for it.
- `/privacy` and `/terms` are drafts pending a lawyer's review. That review should happen with the tracking decision made, not before it, so the reviewer sees the version that will actually ship.

---

## 5. Which stack to choose

**Recommendation: Plausible alone, that is `PUBLIC_PLAUSIBLE_DOMAIN` and nothing else.** The reasoning, since you should be able to disagree with it on the merits:

- **The questions this site has to answer are shallow.** It is 84 marketing pages whose job is to produce contact form submissions, brochure requests and phone calls. The useful questions are: which pages precede an enquiry, which sources bring people who enquire, and is traffic growing. Plausible answers all three on one screen. GA4's additional depth (funnels, audiences, cohort explorations) is built for products with sessions and repeat usage, which this site does not have.
- **Cookieless means no banner.** A cookie banner on a B2B lead site costs you conversions on every page, needs building and maintaining, and needs a lawyer to look at it. Skipping it is worth more than the marginal reporting depth.
- **The privacy position is itself a sales asset.** You sell software engineering to companies that care who touches their data. "Our own site runs no tracking cookies" is a line you can say in a sales call, and it stays largely true with a cookieless tool.
- **B2B traffic volumes make GA4 noisy.** At the volumes a site like this sees, GA4 thresholds and models a meaningful share of its reporting, and its free-tier retention for event and user level data tops out well short of a B2B sales cycle. Check the current retention setting in the GA4 admin before relying on year-over-year comparisons.
- **Ad blocking hits both tools, not just one.** Do not choose GA4 expecting more complete data. A technical B2B audience blocks Google's domains more aggressively than most.

**Choose GA4 or GTM instead when one of these is true**, and they are real reasons, not fallbacks:

- You are going to run Google Ads and want conversion import and remarketing. That effectively requires GA4, and remarketing requires the consent work in section 6.
- An investor, board or acquirer expects to see GA4, and arguing about it costs more than running it.
- You need to manage many tags without a deploy, in which case GTM is the right tool and the compliance burden moves into the container.

**The other three are situational.** PostHog is a product analytics tool and belongs inside OpsDeck, GarageZone, LoopIQ and Verko, not on a marketing site. Clarity records sessions, which is a materially bigger privacy commitment than counting pages and needs its own privacy copy. The LinkedIn Insight Tag is only worth its cookie if you are actively spending on LinkedIn Ads.

**One option that needs no code at all:** Netlify Analytics is a paid, server-side add-on enabled in the Netlify UI. It reads request logs, ships no JavaScript, sets no cookies, cannot be blocked by an ad blocker, and would not trip the `TRACKING_DISCLOSED` guard because it involves no `PUBLIC_*` variable. It gives you pageviews, top pages, referrers and 404s, and it cannot do conversion events at all. The existing policy already discloses that the host keeps server records including IP address, so this may need no policy change, but that is a judgment for the lawyer rather than a fact from the code.

**Decision still to be made by the client:** which of these to run, and whether Google Ads or LinkedIn Ads are part of the plan, since that answer changes everything below.

---

## 6. If you pick a cookie-based tool: what a consent banner requires

**A consent banner ships with this site, and it is on by default.** `web/src/components/ConsentBanner.astro` renders automatically whenever any cookie-setting tracker is configured, and not at all when none is. It is deliberately plain: two equally weighted buttons, no pre-ticked "legitimate interest" toggle, and declining is one click and is remembered in `localStorage` under `il-consent`.

Consent is expressed through **Google Consent Mode v2** rather than by blocking the tag outright. Consent starts `denied`, so GA4 still receives cookieless pings and your page totals survive a rejection instead of vanishing. A grant upgrades it in place. Microsoft Clarity records sessions, so unlike GA4 it is not started at all until a grant, and a later decline calls `clarity("consent", false)`.

Verified in a browser against a real build:

| Visitor action | Banner | Stored | Consent Mode | Clarity |
| --- | --- | --- | --- | --- |
| First visit | shown | none | `default: denied` | not loaded |
| Allow | hidden | `granted` | `update: granted` | loaded |
| Reload after Allow | hidden | `granted` | `default: granted` | loaded |
| Decline | hidden | `denied` | `update: denied` | not loaded |

Set `PUBLIC_CONSENT_REQUIRED=false` to suppress the banner. Do that only on legal advice about your specific audience, not to lift your numbers. There is still no "manage cookies" link in the footer to reopen the choice after it is made: if you need one, clearing `il-consent` from `localStorage` restores the banner, and wiring a footer link to do that is a small job.

If you go ahead, this is the work, and none of it is written yet:

- **The script must not run before consent.** This is the structural part. Because the site is statically generated and `PUBLIC_*` values are inlined at build time, the tag is baked into all 84 HTML files. There is no runtime switch. A banner therefore cannot prevent the tag being *present*; it has to prevent it *executing*, which means moving the loader out of the `Analytics.astro` build-time branch and into code that runs after a stored choice is read.
- **A stored choice per visitor, per purpose,** that survives navigation, can be changed later, and is exposed through a persistent link (conventionally in the footer, which currently has no such link).
- **Reject as easy as accept.** A single click, at the same level of prominence.
- **Some record of what was consented to and when.**
- **A cookie table in `/privacy`:** name, purpose, lifetime, first or third party. The current policy has no such table because it currently has no cookies to list.
- **Consent Mode v2 signals if any Google advertising product is involved.** Confirm the current requirement with Google before building to it, since the details have moved more than once.

Buying a consent management platform instead of building one is reasonable, but note the trade: the CMP is itself a third-party script and a data processor, so it goes into the "Who else sees it" section of the policy.

Which jurisdictions bind you (EU, UK, US states, India) depends on where your visitors are and where you operate from, and that is a question for the lawyer who reviews the policy, not one this document can settle.

---

## 7. Turning it on

The order matters. Steps 1 and 2 must land in the same deploy.

**1. Test the exact combination locally first.**

```bash
cd web
TRACKING_DISCLOSED=true PUBLIC_PLAUSIBLE_DOMAIN=infoloop.co npm run build
grep -o '<script[^>]*plausible[^>]*>' dist/index.html
grep -c "Website analytics" dist/privacy.html
```

Expect the script tag with your domain, and `1`.

**2. Fix `PRIVACY.seo.description`** at `web/src/content/legal.ts` line 153 so the meta description no longer claims "No tracking cookies". Commit it with the same change.

**3. Set the variables in Netlify.** Site configuration, then Environment variables, then add both `TRACKING_DISCLOSED` (value `true`, exactly, lowercase) and your tracker variable. Set the values for the production context specifically rather than for all contexts. The CLI equivalent, if you prefer it:

```bash
netlify env:set TRACKING_DISCLOSED true --context production
netlify env:set PUBLIC_PLAUSIBLE_DOMAIN infoloop.co --context production
```

**4. Trigger a deploy.** See `DEPLOYMENT.md` for how this site is deployed and for the fact that `infoloop.co` is currently served by a different, older Netlify project, so a new build does not reach the live domain until the cutover happens.

> **Gotcha:** saving an environment variable changes nothing on the live site. The values are read at build time and inlined into static HTML, so every change needs a rebuild. If you set a variable and then load the site expecting to see the tag, you will see the previous build, conclude the variable is broken, and lose an hour.

> **Gotcha:** if you set the variables for all deploy contexts, every deploy preview and branch deploy also reports into your production analytics property. Your own pre-launch clicking then shows up as traffic. Scope the values to the production context, or use a separate property for previews.

**Note on Node.** Netlify builds with `NODE_VERSION = "22"`, set in `web/netlify.toml`, and `package.json` requires `>=22.12.0`. On the Mac these docs were written on, the Homebrew `node@22` install is broken (missing `libsimdutf`) and `/usr/local/bin/node` has to be used instead. That is a fault of that one machine, not a requirement of this project.

---

## 8. Verifying after deploy

**Check the tag is in the HTML.** Until the cutover, point these at the Netlify deploy URL rather than `infoloop.co`, which still serves the old site:

```bash
curl -s https://<your-deploy-url>/ | grep -o 'plausible.io/js/script.js'
curl -s https://<your-deploy-url>/contact | grep -o 'data-domain="[^"]*"'
```

**Check the request actually fires.** Open the site in a browser with any ad blocker disabled, open DevTools, Network tab, filter on the vendor domain (`plausible.io`, `googletagmanager.com`, `clarity.ms`), reload, and confirm a `200` for the script and a request for the pageview. A script that loads but sends no pageview usually means a wrong domain or property ID, not a wiring problem.

**Check the vendor dashboard.** Plausible and GA4 both have a realtime view. Load two or three pages and watch them arrive. If nothing arrives within a minute, the ID is wrong.

**Check the privacy policy shipped in the same deploy:**

```bash
curl -s https://<your-deploy-url>/privacy | grep -c "Website analytics"          # expect 1
curl -s https://<your-deploy-url>/privacy | grep -c "No tracking cookies"        # expect 0 once line 153 is fixed
```

**Do not expect the numbers to match your server logs.** A meaningful share of a technical B2B audience blocks analytics entirely. The numbers are for comparing pages and periods against each other, not for counting humans.

**Exclude your own traffic** before you read anything into the data. Plausible documents a `localStorage` flag for excluding your own visits from a given browser; GA4 uses internal traffic rules based on IP. Without this, an agency team browsing its own site distorts a low-traffic site badly.

**Confirm nothing else regressed.** The site has no Content Security Policy header (`web/netlify.toml` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` only), so no header change is needed to allow a tracker script. If a CSP is added later, every analytics domain has to be added to it at the same time.

Separately: no `google-site-verification` meta tag exists anywhere in the site. If you want Search Console (which is not a tracker, ships no script, and needs no consent), verify by DNS TXT record, since that survives the Netlify cutover and any future host change.

---

## 9. Conversion events worth defining

Analytics without conversion events on this site would tell you which pages are busy and nothing about which pages produce work. The site has exactly four kinds of conversion, and none of them currently fires an event, because no event code exists anywhere in `web/src`.

| Event | Fires when | Where the hook goes |
| --- | --- | --- |
| `contact_form_submitted` | `/api/contact` returns ok for the main enquiry form | `web/src/components/contact/ContactForm.tsx`, line 36, immediately after `setStatus("sent")` |
| `brochure_requested` | The brochure gate submits successfully and the PDF opens | `web/src/components/contact/BrochureGate.tsx`, line 28, after `setStatus("done")` |
| `phone_click` | Click on any `tel:` link | Delegated document listener, see below |
| `email_click` | Click on any `mailto:` link | Same listener |
| `whatsapp_click` | Click on any `wa.me` link | Same listener |
| `brand_assets_downloaded` | Click on `/downloads/infoloop-brand-assets.zip` | Same listener |

Useful properties to attach:

- **Page path** on every event. The enquiry form is mounted on `/contact` *and* on every `hire-<role>` page (`web/src/pages/hire-[role].astro`, line 71), so without the path you cannot tell a hiring enquiry from a project enquiry.
- **Form type** on form events: the main form posts `type: "project"` and the gate posts `type: "brochure"`.
- **Which address or number** on click events. There are three phone numbers (`+91 97261 81000` sales India, `+1 (773) 717-9128` sales US, `+91 70166 74182` HR) and two email addresses (`hi@infoloop.co`, `careers@infoloop.co`) in `web/src/content/site.ts`. Job applicants clicking `careers@infoloop.co` are not leads, and merging them into the same conversion count makes the sales funnel look better than it is.

**Why a delegated listener rather than editing every link.** `tel:` and `mailto:` hrefs appear in `Nav.tsx`, `Footer.tsx`, `sections/CtaBand.tsx`, `contact.astro`, `careers.astro`, `trust-center.astro`, `privacy.astro` and `content/about.ts`. Editing each one is a large diff that decays the moment someone adds a link. One listener covers all of them, including links added later. Put it at the end of `web/src/components/Analytics.astro` inside the same `{plausible && (...)}` guard so it ships only when tracking is on. Illustrative shape, nothing like this is in the repository today:

```html
<script is:inline>
  window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
  document.addEventListener("click", function (e) {
    var el = e.target instanceof Element ? e.target : null;
    var a = el && el.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var page = window.location.pathname;
    if (href.indexOf("tel:") === 0) window.plausible("phone_click", { props: { target: href.slice(4), page: page } });
    else if (href.indexOf("mailto:") === 0) window.plausible("email_click", { props: { target: href.slice(7), page: page } });
    else if (href.indexOf("wa.me/") > -1) window.plausible("whatsapp_click", { props: { page: page } });
    else if (href.indexOf("/downloads/") === 0) window.plausible("file_download", { props: { file: href, page: page } });
  });
</script>
```

Notes on implementing this for real:

- **Plausible's base script is what is loaded today.** Custom events called through `window.plausible(...)` work with it. Plausible also publishes script variants that auto-track outbound links and file downloads, which would replace the `/downloads/` branch above; enabling those means changing the `src` on `Analytics.astro` line 50 to the variant filename from Plausible's docs. The manual approach above is portable across all six supported tools, which is why it is the recommendation.
- **The two React hooks need a global type declaration.** `tsconfig.json` extends `astro/tsconfigs/strict` and there is no `src/env.d.ts` in the repository, so calling `window.plausible(...)` from a `.tsx` file will fail `npm run check` until you add one with a `declare global` block.
- **In GA4, mark `contact_form_submitted` and `brochure_requested` as key events.** GA4's own recommended name for this is `generate_lead`, so use that name if anything downstream (Google Ads conversion import) expects it.

**Attribution is already partly solved without analytics.** Both forms post `submitted_from` (the page path) and `utm_source`, `utm_medium`, `utm_campaign` to `CONTACT_WEBHOOK_URL`, and `/api/contact` stamps `received_at` and `user_agent` on top. Whatever CRM sits behind that webhook is the authoritative record of where a lead came from, because it ties the source to a real named person and, later, to real revenue. Analytics only fills in the part the CRM cannot see: the visitors who never submitted anything. Do not build a second, contradictory attribution model in the analytics tool.

**A server-side option exists if ad blocking becomes a real problem.** `web/src/pages/api/contact.ts` runs as a Netlify function and is the one server-side code path on the site. A conversion could be sent from there (GA4 Measurement Protocol, Plausible's events API, PostHog's capture API) after the webhook succeeds, which no client-side blocker can prevent. Nothing of the sort exists today, and it introduces its own disclosure question, so treat it as a later decision rather than a launch item.

---

## Search Console, Business Profile and the CRM

Analytics tells you what visitors did. These three tell you how they found you
and what happened after they got in touch. Set them up in this order.

### 1. Google Search Console

Search Console is the only place you see the queries people actually typed
before clicking, and the only place Google tells you a page is broken.

**Verify ownership.** Prefer the **domain property** (a DNS TXT record on
`infoloop.co`), because it covers every subdomain and both `http` and `https`
in one go and survives a site rebuild. If whoever is doing the setup has no DNS
access, fall back to the meta tag:

```bash
PUBLIC_GSC_VERIFICATION=the-token-google-gives-you
```

That renders `<meta name="google-site-verification">` into the `<head>` of all
84 pages. It needs no other change and no consent, since it sets nothing.

**Then, in Search Console:**

1. Submit the sitemap: `https://infoloop.co/sitemap-index.xml`.
2. Use URL Inspection on three or four pages you care about and request
   indexing, rather than waiting.
3. Link the property to GA4 (GA4 > Admin > Search Console links). Without this
   link, GA4 cannot show you queries at all.

**What to watch, in order of usefulness:** the Queries report filtered to
positions 5 to 20, which is where a small copy change moves you onto page one;
Pages with impressions but a low click rate, which is usually a title or a meta
description problem, both editable in the content files; and the Indexing
report, where a page you expected to be live shows up as excluded.

**Gotcha:** URLs on this site have no trailing slash and no `.html` extension
(`/careers`, not `/careers/` or `/careers.html`). Search Console treats those as
different URLs. Always inspect the extensionless form.

### 2. Google Business Profile

A Business Profile is what puts you in the map pack and the right hand panel for
searches like "software company Surat". It matters more than most B2B firms
expect, because it is also one of the sources answer engines read for basic
facts about a company.

**The rule that decides whether it works: your name, address and phone must
match the website exactly.** Not approximately. Google connects a listing to a
website by comparing them, and "Suite 1101" against "Ste 1101" is a mismatch.
The site publishes, in `web/src/content/site.ts`:

| Field | Value on the site |
| --- | --- |
| Name | Infoloop |
| India address | Suite 1101, Rajhans Skylar, Surat 395007, Gujarat, India |
| US address | 8 The Green, Dover, Delaware 19901, United States |
| Phone (sales) | +91 97261 81000 |
| Email | hi@infoloop.co |

Copy those into the listing character for character, or change the site so both
agree. They are already published as `PostalAddress` and `Place` entries inside
the `Organization` structured data on the home and about pages, so Google can
read them.

**After the listing is claimed**, paste its public URL into `PROFILE_LINKS` in
`web/src/content/site.ts`:

```ts
export const PROFILE_LINKS: string[] = [
  "https://g.page/your-listing",
];
```

That appends it to the Organization `sameAs`, which is the strongest signal
tying this website to that listing. It is deliberately empty until then,
because a `sameAs` pointing at nothing is worse than none at all.

**One honest caveat:** a Business Profile needs a real address that can receive
verification post, and the profile is public. If the Dover address is a
registered agent rather than a staffed office, list the Surat office and leave
it at that. Listing an address you do not occupy risks suspension.

### 3. Attio

The contact form already delivers to `CONTACT_WEBHOOK_URL`. Attio is
**additive**: set `ATTIO_API_KEY` and each enquiry also upserts a Person record.

```bash
ATTIO_API_KEY=your-key-from-settings-developers-api-keys
```

How it behaves, and why:

- It runs **after** the webhook and its failures are logged, never returned to
  the visitor. Losing an enquiry because a CRM was briefly down is a worse
  outcome than a missing CRM record, so the webhook stays the source of truth.
- It **upserts on email address**, so a repeat enquiry updates the existing
  person instead of creating a duplicate.
- The full enquiry (company, phone, budget, timeline, UTM parameters, the
  message) is written into the record description, so nothing is lost even if
  an attribute is not mapped.

**Check this before you rely on it.** The payload uses Attio's default
attribute slugs for the standard People object: `email_addresses`, `name`,
`description`. If your workspace renames those, adds required attributes, or
you would rather land enquiries on a custom object, the request body in
`web/src/pages/api/contact.ts` has to match or Attio returns a 400. Confirm
with:

```bash
curl -H "Authorization: Bearer $ATTIO_API_KEY" \
  https://api.attio.com/v2/objects/people/attributes
```

**If you would rather not put an API key in the site's environment**, delete
nothing: just leave `ATTIO_API_KEY` unset and point `CONTACT_WEBHOOK_URL` at a
Zapier or Make scenario that writes to Attio. Same result, one more moving part,
one less secret on the web host.

### What connects to what

| | Verifies | Reads | Writes |
| --- | --- | --- | --- |
| GA4 | GSC link | Site pages | GA4 property |
| Clarity | Project ID | Sessions, after consent | Clarity dashboard |
| Search Console | DNS or meta tag | `sitemap-index.xml` | Nothing |
| Business Profile | Post or phone | `Organization` schema, NAP | Nothing |
| Attio | API key | Contact form POSTs | People records |
