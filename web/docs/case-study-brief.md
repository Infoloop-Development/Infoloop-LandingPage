# Case study brief (locked structure)

Use this to hand over a new case study. Fill one copy of the **Template** at the bottom per case (or type the same fields straight into the CMS: Work → Case study). Everything below the line renders in a fixed order, so nothing needs designing per case.

## How the page is built (7Span case layout, locked)

| # | On the page | Field(s) | Notes |
| --- | --- | --- | --- |
| 1 | Header: "Work" back link, "Case study · N min read", client, **H1**, intro line, Industry / Services / Timeline row, text link | `client`, `named`, `title`, `lede`, `meta.industry`, `meta.services`, `meta.timeline` or `meta.status` | Read time is automatic. Anonymous clients are described ("A three-plant manufacturer"). |
| 2 | **Introduction** box (hatched left edge): subtitle + 1 to 2 paragraphs | `intro.sub`, `intro.paragraphs` | 7Span "Product Vision / Introduction": who the client is and what they set out to do. |
| 3 | **The challenge**: one intro line, bullet points, one closing line; image right | `situation` (1 short paragraph), `challenges` (4 to 6 bullets), `challengeClose`, `cover` or `tile` | Same shape as 7Span. |
| 4 | **Our approach** (black section): intro left, numbered step cards right | `approach` (1 to 2 paragraphs), `built` (4 to 6 steps: title + one or two sentences) | The zigzag steps. One capability per step: what it does for the business. |
| 5 | **The results**: heading, one or two sentences, then the numbers (3 or 4 callouts) | `resultsSub`, `metrics` (3 to 4) | 7Span "The Impact". Numbers, not paragraphs. Only measured figures. |
| 6 | **Technology used** table | `tech`, `meta.services`, `meta.status` | Plain names: "Cloud ERP", "IoT sensors", "Shopify", "OpsDeck". |
| 7 | **More of our work** (3 cards) | automatic | Same industry first. Sits where 7Span puts the testimonial. |
| 8 | Closing band | `cta.h2`, `cta.lede`, `cta.button.label` | The button names the service we gave them (7Span: "Launch my website"; ours: "Rebuild my Shopify store", "Set up OpsDeck for my plants"). One `[[highlight]]` in the H2. |

Optional, not shown on the page: `note`, `links`, `results` paragraphs, `quote` (needs written approval), `gallery`, `glance`, `dayToDay`, `extra`. Send them only if you have them.

Index card (on /work): `card.title` (under 60 chars), `card.blurb` (one sentence, under 160 chars), `card.metric`, `card.metricLabel`, plus `industryKey`, `serviceKeys`, `tile`. SEO: `seo.title` (max 60 incl. " | Infoloop"), `seo.description` (110 to 158).

## Rules every case must pass

1. **Only measured numbers.** Every figure must be the measured outcome of that engagement and approvable if a prospect asks on a call. No estimates, no rounding up, no industry averages. If a number is confidential, leave it out rather than blur it.
2. **Client naming.** `named: true` only with written permission. Otherwise describe them: "A three-plant manufacturer", "A fintech scale-up". Say what you may say in `note` ("Client identified on request under NDA. Figures are this engagement's measured outcomes.").
3. **Quotes** need written approval and a real role (name optional). No quote is better than an unapproved one.
4. **Voice.** Plain words a plant manager or founder reads without effort. Outcomes before technology. Sentences under 25 words where possible. No hype ("cutting-edge", "seamless", "world-class").
5. **House style.** Never the word "system" or "systems" (say software, platform, app, ERP, product). No em or en dashes. "Infoloop" with a capital I. No exclamation marks. Product names: OpsDeck (attendance), GarageZone (garage management), LoopIQ (learning and testing).
6. **Headings say what the section is about** (sentence case). One outcome in the H1, one `[[highlight]]` in the closing CTA H2, nowhere else.
7. **"We run"** appears once or twice (results and status), not in every paragraph.
8. **Screens** only if cleared; otherwise the drawn tile is used and that is fine.

## Lengths at a glance

| Field | Length |
| --- | --- |
| title (H1) | ≤ 80 chars |
| lede | 25 to 50 words |
| card.title / card.blurb | ≤ 60 chars / ≤ 160 chars |
| metrics | 3 or 4, value ≤ 8 chars, label ≤ 60 chars |
| intro.sub / intro.paragraphs | ≤ 12 words / 1 to 2 paragraphs of 25 to 60 words |
| situation (challenge intro) | 1 paragraph, 25 to 60 words |
| challenges | 4 to 6 bullets, ≤ 30 words each; challengeClose ≤ 25 words |
| approach | 1 to 2 paragraphs of 40 to 90 words |
| built | 4 to 6 steps: title ≤ 6 words, body ≤ 35 words |
| resultsSub | one or two sentences, ≤ 45 words |
| quote | ≤ 40 words |
| tech | 3 to 8 plain names |
| cta.h2 / cta.lede / cta.button.label | ≤ 90 chars / ≤ 45 words / 2 to 5 words, service-specific |
| seo.title / seo.description | ≤ 60 chars / 110 to 158 chars |

## Filled example (live on the site)

- **slug:** manufacturing-erp-predictive-maintenance
- **client:** A global industrial machinery manufacturer · **named:** no
- **industry / industryKey:** Manufacturing / manufacturing
- **services / serviceKeys:** Custom software development, Legacy modernization / custom-software, modernization
- **tags:** ERP and manufacturing · **tile:** erp
- **title:** $1.2M saved a year with predictive maintenance and a multi-plant ERP
- **lede:** A machinery maker was losing $1.8M a year to machines stopping without warning and three plants that could not see each other. We put all three plants on one ERP and gave them warning before things broke.
- **card:** Multi-plant ERP for a machinery maker / Predictive maintenance and one ERP across three plants cut unplanned downtime 72% and saved a global machinery manufacturer $1.2M a year. / $1.2M / saved a year
- **metrics:** -72% unplanned downtime · $1.2M saved each year · 98% order fulfilment accuracy
- **meta:** Manufacturing · Custom software development, Legacy modernization · IoT sensors, Predictive analytics, Cloud ERP, Multi-plant integration · Results measured within six months · Live, run by Infoloop
- **intro:** The vision: one ERP for three plants, and warning before things break / This manufacturer builds machinery for construction, mining and agriculture. It runs three plants, serves 1,200+ B2B clients and turns over $350M+ a year. / The aim was simple to say and hard to do: one ERP holding orders, stock, jobs and suppliers in one place instead of five, put in without stopping a single shift, with warning before a machine fails instead of a scramble after it stops.
- **situation, challenges, challengeClose, approach, built (steps), results, tech, note, links, cta:** see `src/content/work.ts` for the full text of this case.

## Template (copy once per case)

```yaml
slug:                     # url slug, e.g. brightlane-auto-group-garagezone
client:                   # "Brightlane Auto Group" or "A three-plant manufacturer"
named:                    # yes / no (written permission?)
industry:                 # e.g. Manufacturing
industryKey:              # manufacturing | automotive | retail | financial-services | saas | staffing (tell us if a new one is needed, e.g. healthcare, biorenewables)
services:                 # 1 to 3 plain phrases, e.g. "Custom ERP", "Predictive maintenance"
serviceKeys:              # ai | custom-software | ecommerce | web | products | modernization
tags:                     # eyebrow, e.g. "ERP and manufacturing"
tile:                     # erp | attendance | shopify | copilot | garage | webflow | lms  (or supply a cover screenshot)
cover:                    # optional screenshot file + alt text (needs permission)
featured:                 # yes / no

title:                    # H1, outcome first, <= 80 chars
lede:                     # 1 to 2 sentences

card:
  title:                  # <= 60 chars
  blurb:                  # one sentence, <= 160 chars
  metric:                 # e.g. "$1.2M"
  metricLabel:            # e.g. "saved a year"

metrics:                  # 3 or 4, measured only
  - value:
    label:
  - value:
    label:
  - value:
    label:

meta:
  industry:
  services: []            # same as above or the longer list
  stack: []               # plain names
  timeline:               # e.g. "11 weeks to all nine branches" (blank if none)
  status: Live, run by Infoloop

intro:                    # INTRODUCTION (7Span "Product Vision")
  sub:                    # one line, e.g. "The vision: payday as a file, not a week of chasing hours"
  paragraphs:             # 1 to 2 paragraphs: who the client is, what they set out to do
    - |

situation:                # THE CHALLENGE, one intro paragraph
  - |
challenges:               # THE CHALLENGE, 4 to 6 bullet points
  -
  -
  -
  -
challengeClose:           # one closing line, e.g. "Payday was a week of chasing hours. It needed to become a file."

approach:                 # OUR APPROACH, 1 to 3 paragraphs
  - |

built:                    # OUR APPROACH steps, 4 to 6 (title + one or two sentences)
  - h3:
    body:
  - h3:
    body:
  - h3:
    body:
  - h3:
    body:

gallery:                  # optional: 2 to 4 screenshots with captions

resultsSub:               # THE RESULTS, one or two sentences under the heading (numbers come from metrics)

quote:
  text:                   # approved in writing, or leave empty
  name:                   # optional
  role:                   # e.g. "Operations Director, Brightlane Auto Group"

tech: []                  # 3 to 8 plain names
note:                     # disclosure line, e.g. "Client identified on request under NDA. Figures are this engagement's measured outcomes."

links:                    # 1 to 3 pages behind the build
  - label:
    href:

cta:
  h2:                     # industry-specific question, one [[highlight]]
  lede:                   # what to bring to the call
  button:
    label:                # names the service, e.g. "Rebuild my Shopify store"
    href: /contact

datePublished:            # YYYY-MM-DD

seo:
  title:                  # <= 60 chars incl. " | Infoloop"
  description:            # 110 to 158 chars
```

What we do with it: we edit for voice and rules (without changing any number), place it in `web/src/content/work.ts` (or the CMS), and add its slug to the redirects if it replaces an older page.
