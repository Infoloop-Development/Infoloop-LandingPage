# infoloop.co: handover

This package contains the new infoloop.co website, the CMS it is designed to
read from, and the documentation your developers need to deploy it, connect it
to Payload, turn on analytics and keep it findable.

Read this page first. It tells you what state the project is actually in, what
has to happen before launch, and what is still waiting on you rather than on
your developers.

---

## 1. What you are getting

| Folder | What it is |
| --- | --- |
| `web/` | The website. Astro 7 static build, React islands only where something has to move, Tailwind CSS 4, TypeScript. 84 pages. |
| `cms/` | Payload 3 CMS. Deep-merges over the site's content files at build time. |
| `brand-assets/` | The master brand kit. The logos and the downloadable ZIP on `/brand-assets` are generated from it. |
| `web/docs/` | The four guides: deployment, CMS, tracking, and search and answer engines. |

84 pages: 15 services, 14 industries, 17 hire-a-role pages, 4 solution group
pages, 5 case studies, 4 products, 5 blog posts, 3 personal pages, plus home,
about, contact, work, brand assets, technologies, careers, testimonials, trust
center, sitemap, privacy and terms.

---

## 2. The one thing to understand before anything else

**infoloop.co is not currently running this site.**

Today the domain is served by an older static build, deployed by hand with
`netlify deploy --prod --dir=.` to Netlify project `magenta-truffle-cbe2be`.
That project has **no git repository attached**, so nothing rebuilds it
automatically and nothing about the new site affects it yet.

That is deliberate and it is safe: the new site cannot break the live one. But
it means launch is a real cutover with an order of operations, not a merge.
`web/docs/DEPLOYMENT.md` covers that step by step, including how to roll back.

Keep the old build until the new site is live and verified. It is the only way
to put the current site back.

---

## 3. The architecture decision that matters most

The site reads the CMS **at build time, not in the browser**. Payload globals
and collections are fetched during `npm run build` and deep-merged over the
TypeScript content files in `web/src/content/`.

Two consequences your developers should know before they start:

**The site builds even when the CMS is down.** If `PAYLOAD_URL` is unset or
unreachable, the build falls back to the local content files and produces the
same 84 pages. The CMS is an editing convenience layered on top of a site that
is complete without it. This was a deliberate choice: a marketing site that
goes dark because a CMS container restarted is a bad trade.

**Publishing means rebuilding.** An editor pressing publish in Payload does not
change the live site by itself; it pings a Netlify build hook, Netlify rebuilds,
and the new HTML goes out a minute or two later. If your team expects instant
updates, that expectation needs resetting now rather than on launch day.

---

## 4. Launch path

Roughly in this order. The detail for each step is in the linked guide.

| # | Step | Guide | Blocked on |
| --- | --- | --- | --- |
| 1 | Get `web/` building on Netlify at a preview URL | DEPLOYMENT | Nothing |
| 2 | Set `CONTACT_WEBHOOK_URL` so the contact form goes somewhere | DEPLOYMENT | You: which inbox or CRM |
| 3 | Stand up Payload, seed it, connect `PAYLOAD_URL` | CMS-INTEGRATION | Your devs |
| 4 | Replace placeholder photography | ... | You: see section 6 |
| 5 | Lawyer reviews `/privacy` and `/terms` | ... | You |
| 6 | Decide the analytics stack and turn it on | TRACKING | You: see section 5 |
| 7 | Cut the domain over, keep the old build until verified | DEPLOYMENT | Nothing |
| 8 | Submit the sitemap, confirm the AI crawler policy | AEO-GEO | Nothing |

**Gotcha, and it costs everyone an afternoon:** when you connect the repository
to Netlify, set the site's **base directory to `web`**. The repository root is
not the site root. Everything else in the build config is already correct in
`web/netlify.toml`.

---

## 5. Analytics: the decision, and the trap

The site currently ships **no tracking at all**. No analytics, no cookies, no
pixels. `/privacy` says so in plain words, and that statement is true of the
build you are holding.

The plumbing for six tools is already wired and switched off: Plausible, GA4,
Google Tag Manager, PostHog, Microsoft Clarity, and LinkedIn Insight. Turning
any of them on is one environment variable.

**The trap:** the moment you set one, the privacy policy is lying. So the build
refuses to run. Setting a tracking variable without also setting
`TRACKING_DISCLOSED=true` fails the build with a message telling you why, and
setting the flag rewrites the privacy copy to disclose what you now collect.
You cannot ship a tracker and a policy that denies it. That is intentional.

**The recommendation, briefly.** For a site selling considered B2B services to
a few hundred serious visitors a month, Plausible is the better first choice:
it is cookieless, so no consent banner, no cookie interstitial standing between
a prospect and your homepage, and the privacy claim stays close to what it is
now. Add GA4 only if someone will genuinely use the reporting depth, and expect
to build a consent banner for the EU and UK if you do. No consent UI ships with
this site. `web/docs/TRACKING.md` has the full comparison and the conversion
events worth defining.

---

## 6. What is still waiting on you

None of these block deployment. All of them block a launch you would be proud
of.

| Item | Why it matters |
| --- | --- |
| Team photographs | The about page and the three personal pages use drawn placeholders. |
| Personal LinkedIn and X URLs | The team currently links to the company profiles as a stand-in. |
| A WhatsApp number | `/nimit`, `/rahul` and `/riya` point WhatsApp and call at the published sales line. Confirm it is actually on WhatsApp: `wa.me` shows visitors an "invalid number" screen if it is not. |
| `CONTACT_WEBHOOK_URL` | Until it is set, contact form submissions go nowhere. |
| Product screenshots | Product pages use drawn tiles instead of real screens. |
| Lawyer review of `/privacy` and `/terms` | Both are drafts written to match what the build actually does. They have not been reviewed. |
| Confirmation of the trust center claims | `/trust-center` describes how you handle code, accounts and data. Read it and confirm each line is true of how you operate. |
| Brochure v2 | The current PDF was generated from site copy as a placeholder. |
| Social handles | Instagram, Facebook, YouTube, Behance, Dribbble and GitHub URLs were assumed from the pattern `/infoloop` and are unverified. |

---

## 7. Honest notes on what this site does not do

- **No aggregate rating markup.** The 4.8 rating appears as text, not as
  structured data. Google disallows self-serving review markup about your own
  organization, and faking it risks a manual action.
- **No consent banner.** Fine while nothing sets cookies. Required if you turn
  on GA4, GTM, PostHog, Clarity or LinkedIn and serve the EU or UK.
- **Blog posts are files, not CMS entries.** They live as markdown in
  `web/src/content/posts/`. The Payload `posts` collection exists but is not
  wired to the site yet; it needs a rich text to HTML step. See
  CMS-INTEGRATION.md.
- **The old site's URLs.** Redirects for the previous `/case-*` and `/work-*`
  URLs are in `web/netlify.toml`. If the old site has other URLs with traffic
  or backlinks, map them before cutover, not after.

---

## 8. Running it locally

```bash
cd web
npm ci
npm run dev          # http://localhost:4321
```

```bash
npm run check        # TypeScript, no emit
npm run build        # static build into web/dist
```

The site builds with no environment variables set. That is the fastest way to
confirm a fresh checkout works before you add anything to it.
