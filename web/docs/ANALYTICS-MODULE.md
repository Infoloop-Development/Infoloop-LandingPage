# Analytics & tracking module

**Audience:** Infoloop team (marketing, ops, leadership)  
**Where it lives:** CMS → **Settings → Analytics & tracking**  
**Public site:** [https://infoloop-web.onrender.com](https://infoloop-web.onrender.com)  
**CMS:** [https://infoloop-cms.onrender.com](https://infoloop-cms.onrender.com)

This document explains what the Analytics module does, what each field means, how it affects the live website and privacy policy, and how to connect Google Analytics (or related tools) **without asking a developer to change code**.

---

## 1. What this module does

The Infoloop website is a **static site**. Measurement tags (Google Analytics, etc.) are not typed into page code by hand. Instead:

1. An editor opens the CMS and fills in tracking IDs.
2. They save.
3. The public site **rebuilds** and the tags appear on every page.

So analytics is a **configuration task**, not an engineering task.

| Without this module | With this module |
| --- | --- |
| Someone asks a developer to set env vars and redeploy | Marketing pastes a `G-` ID in the CMS and saves |
| Privacy policy can drift out of date | Policy copy updates when you tick the disclosure box |
| Easy to forget consent / double-tag GA | Consent and “don’t set both GA4 and GTM” are built in |
| Forms don’t report as conversions | Contact + brochure + phone/email clicks already fire events |

---

## 2. How it fits the product

| Piece | Role |
| --- | --- |
| **CMS (Payload)** | Store analytics settings; editor UI |
| **Website (Astro)** | At build time, read those settings and inject scripts into every page |
| **Deploy hook** | When analytics is saved, the site rebuilds so changes go live |

**Important:** Saving in the CMS does **not** change the live HTML by itself. A rebuild must run (automatic if the deploy hook is connected). Expect about **1–2 minutes** after save.

---

## 3. Fields — what they do

Open: **CMS → Settings → Analytics & tracking**

### Google

| Field | Example | What it does |
| --- | --- | --- |
| **Google Analytics 4 ID** | `G-XXXXXXXXXX` | Turns on GA4 on the whole site (page views + our conversion events). |
| **Google Tag Manager ID** | `GTM-XXXXXXX` | Loads GTM instead. If this is set, the direct GA4 tag above is **skipped** so numbers are not double-counted. Put GA4 inside the GTM container. |
| **Google Search Console verification** | long token string | Adds the HTML verification meta tag. Prefer **DNS** verification when possible; this is the fallback. Not a tracker; no cookies. |

### Other tools (optional)

| Field | What it does | Notes |
| --- | --- | --- |
| **Plausible domain** | Cookieless page analytics | Often `infoloop.co`. Usually no cookie banner. |
| **Microsoft Clarity ID** | Session recordings / heatmaps | Stronger privacy impact; needs consent. |
| **LinkedIn Insight partner ID** | Ads / remarketing | Only if you run LinkedIn Ads. |
| **PostHog key / host** | Product-style analytics | Rarely needed on a marketing site. |

### Privacy & consent

| Field | What it does |
| --- | --- |
| **Privacy policy updated** | **Required** before any tracker goes live. When ticked, `/privacy` discloses that the site uses analytics. If any tracker ID is filled and this is **off**, the site build **fails on purpose** so we never ship tracking that the policy denies. |
| **Ask visitors for cookie consent** | Default **on**. Shows a simple Allow / Decline banner for cookie-based tools (GA4, GTM, Clarity, etc.). Uses Google Consent Mode v2 so GA can still get privacy-safe signals when declined. Turn off only on legal advice. |

---

## 4. Impact on the website and the business

### What visitors see

- With **no IDs** filled: site works as today — no analytics scripts.
- With **GA4** (and privacy ticked): GA loads on all pages; cookie banner appears (if consent is on).
- `/privacy` gains a **Website analytics** section when disclosure is on, and drops the “no tracking cookies / no third-party analytics” claims that would otherwise be false.

### What the business gets

| Goal | How this module helps |
| --- | --- |
| Traffic & popular pages | GA4 (or Plausible) page views |
| Leads from the site | `generate_lead` when the contact form succeeds |
| Brochure interest | `brochure_requested` when the brochure gate succeeds |
| Call / email intent | `phone_click`, `email_click`, `whatsapp_click` |
| Asset downloads | `file_download` for `/downloads/…` links |

In GA4, mark **`generate_lead`** and **`brochure_requested`** as **key events** (conversions) so reports focus on real outcomes, not only page views.

### What it does *not* do

- It does not replace a CRM. Form data still goes to your webhook / inbox; analytics only measures behaviour.
- It does not turn on Google Ads by itself. Ads need their own setup; GTM is the usual place if you add many tags later.
- It does not lawyer-approve `/privacy`. The copy updates automatically for analytics disclosure; a lawyer should still review before public launch.

---

## 5. Why this makes tracking easy

1. **One screen** — paste IDs, tick privacy, save.  
2. **No repo access** — no env files, no pull requests for a measurement ID.  
3. **Safety rail** — cannot enable tracking while the privacy policy still says “we don’t track.”  
4. **Consent built in** — no separate banner project for GA4.  
5. **Conversions already coded** — forms and click events ship with the site; you only configure the vendor and mark key events in GA4.  
6. **Same path for future tools** — Plausible, Clarity, LinkedIn, PostHog use the same CMS page.

---

## 6. How to connect Google Analytics (step by step)

### A. In Google Analytics

1. Create or open a **GA4** property for the Infoloop website.  
2. Create a **Web** data stream for your live domain (e.g. `infoloop.co` or the current Render URL).  
3. Copy the **Measurement ID** (`G-…`).  
4. (Later) Admin → **Events** → mark `generate_lead` and `brochure_requested` as key events.  
5. Use **Realtime** after go-live to confirm hits.

### B. In Infoloop CMS

1. Sign in: [https://infoloop-cms.onrender.com/admin](https://infoloop-cms.onrender.com/admin)  
2. Go to **Settings → Analytics & tracking**.  
3. Paste the Measurement ID into **Google Analytics 4 ID**.  
4. Tick **Privacy policy updated**.  
5. Leave **Ask visitors for cookie consent** on unless legal says otherwise.  
6. **Save**.

### C. After save

1. Wait for the website rebuild (deploy hook), usually 1–2 minutes.  
2. Open the live site in a browser **without** an aggressive ad blocker.  
3. In GA4 → **Realtime**, load a few pages; you should see activity.  
4. Open `/privacy` and confirm the analytics section is present.  
5. Submit a test contact form (if appropriate) and check that `generate_lead` appears (may take a short delay).

### Using Google Tag Manager instead

1. Create a GTM web container; copy `GTM-…`.  
2. In CMS, fill **Google Tag Manager ID** and leave **GA4 ID** empty (or accept that direct GA4 is disabled when GTM is set).  
3. Inside GTM, add the GA4 Configuration tag and your events.  
4. Tick privacy disclosure, save, wait for rebuild.

---

## 7. Recommended setup for Infoloop

| Scenario | Recommendation |
| --- | --- |
| Simple traffic + leads | **GA4 only** (`G-…`) + privacy ticked + consent on |
| Many marketing tags / Google Ads later | **GTM** + GA4 configured inside GTM |
| Want cookieless, minimal banner friction | **Plausible** alone (or Plausible + careful legal review if also using GA) |
| Session recordings | Clarity only if product/marketing truly need it — disclose more carefully |

For a B2B marketing site, **GA4 + consent + key events on leads** is usually enough.

---

## 8. Checklist before calling it “done”

- [ ] Deploy hook: CMS save triggers a **web** rebuild on Render  
- [ ] CMS: GA4 (or GTM) ID saved  
- [ ] CMS: **Privacy policy updated** ticked  
- [ ] Live `/privacy` shows analytics disclosure  
- [ ] Cookie banner appears on first visit (if consent on)  
- [ ] GA4 Realtime shows page views  
- [ ] Key events configured for `generate_lead` and `brochure_requested`  
- [ ] Team traffic filtered / excluded in GA4 where possible  
- [ ] Lawyer review of privacy when tracking is on (recommended before brand domain launch)

---

## 9. Who to ask

| Topic | Owner |
| --- | --- |
| Paste IDs / turn tools on or off | Marketing or ops (CMS access) |
| Deploy hook / rebuild not firing | Whoever manages Render |
| Privacy / consent legal wording | Legal counsel |
| Broken build or CMS screen | Engineering |

---

## 10. One-line summary for stakeholders

**The Analytics module lets Infoloop connect Google Analytics (and related tools) from the CMS in minutes: paste the ID, confirm privacy disclosure, save, and the site rebuilds with tracking and lead events — no code change required.**
