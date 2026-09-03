# Site chatbot (Groq)

Floating **Ivy** (Infoloop assistant) on every page that uses `Site.astro`. Answers Infoloop FAQs and, on build intent, proposes features, captures a lead, then returns a **server-computed** rough estimate and opens a **Sales Inquiry Ticket** in Payload.

## Stack

| Piece | Where |
| --- | --- |
| UI | `web/src/components/Chatbot.tsx` (`client:idle` from `Site.astro`) |
| Message formatting | `web/src/components/ChatMessageBody.tsx` |
| API | `POST /api/chat` → `web/src/pages/api/chat.ts` (`prerender = false`) |
| Knowledge + system prompt | `web/src/content/chat-knowledge.ts` (QuirkBees ~3yr builder persona on Infoloop site) |
| Feature catalog (local fallback) | `web/src/content/chat-features.ts` |
| Catalog fetch | `web/src/lib/chat-features.ts` → Payload `chat-features` |
| Estimate math | `web/src/lib/chat-estimate.ts` (hours never shown in UI) |
| Ticket create | `web/src/lib/chat-ticket.ts` → Payload `sales-inquiry-tickets` |
| CMS catalog | `cms/src/collections/ChatFeatures.ts` |
| CMS tickets + admin UI | `cms/src/collections/SalesInquiryTickets.ts`, `cms/src/components/tickets/*` |
| Provider | [Groq](https://console.groq.com) Chat Completions + tool calls |

Default model: `openai/gpt-oss-20b` (override with `GROQ_MODEL`).

## Environment

Set on the Render web service (same host as `/api/contact`). **Must be present at build time** — Astro inlines `import.meta.env` into the server bundle, so a changed variable needs a redeploy.

| Variable | Required | Notes |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes for live chat | Groq console |
| `GROQ_MODEL` | No | Defaults to `openai/gpt-oss-20b` |
| `PAYLOAD_URL` | For live catalog + tickets | CMS origin |
| `PAYLOAD_TOKEN` | For tickets (and private CMS reads) | Users API key that can **create** `sales-inquiry-tickets` |

Without `GROQ_API_KEY` the widget still renders; `/api/chat` returns 503. Without Payload, the local feature catalog is used and estimates still work, but tickets are skipped (logged).

## Build-intent + estimate flow

1. Visitor describes a project to build → model may call `select_project_features` (feature **keys** only from the catalog).
2. Reply: affirmative, suggested features, stack (web: React / Node / Next; mobile: **React Native** unless they insist on Flutter), offer of on-the-spot estimate.
3. UI shows a **mandatory** lead form (full name, mobile, email). Chat input stays locked until submitted.
4. `action: "estimate"` on the API: validates lead, sums catalog hours by complexity, applies **30% buffer**, computes:
   - hourly total at **$10/hr**
   - milestone total at **$15/hr**
   - months = `ceil(bufferedHours / 160)` (min 1)
5. Visible reply format (no raw hours):
   > On an hourly basis this would be roughly $X total, or on a milestone basis roughly $Y total, and the project would take approximately Z months to complete.
6. Fixed disclaimer (exact wording, including em dash):
   > This is an Info Loop trained AI model — the estimate above is a rough, automatically generated approximation to give you a starting idea, not a binding quote, and final scope/pricing will be confirmed in a live consultation.
7. Separate Groq call summarizes the transcript for sales; Payload ticket is created with status **Received** and initial `statusHistory`.

### Complexity → base hours (server only)

| Complexity | Hours |
| --- | --- |
| simple | 16 |
| medium | 40 |
| complex | 80 |

## CMS: Sales Inquiry Tickets

- List defaults: Ticket ID, Project Name, Status.
- Detail: ticket ID as title; contact fields; Description (AI summary); Estimation (hourly / milestone / months); collapsible Chat History bubbles; Status select with **reason modal** (`StatusWithReason`); Notes in the sidebar; Status timeline at the bottom.
- After schema changes: set `PAYLOAD_DATABASE_PUSH=true` once on the CMS host (or run migrations), grant editors the **Sales inquiry tickets** / **Chat feature catalog** categories as needed.

## Behaviour guards

- Server: max 800 chars per message, up to 40 history turns, ~25s timeout, tool-calls for feature pick.
- Client: 20 user messages per open panel; close/reload resets the thread.
- Model must not invent prices or hours; estimate numbers are computed only on the server after lead capture.

## Analytics

`chat_opened`, `chat_message`, `chat_cta_click`, `chat_lead`, `chat_estimate`.

## Ticket access tokens

Every action that names a ticket (`resume_load`, `resume_append`, `handoff_*`, and `estimate` on
an existing ticket) must carry the `ticketToken` the server issued with that ticket: an HMAC of
the ticket id keyed by `CHAT_TICKET_SECRET` (falls back to `PAYLOAD_TOKEN`). Without it the
server answers 403. Before this, ticket ids were sequential and unauthenticated, so any visitor
could read or rewrite any lead's quote by counting. `resume_lookup` still returns a prospect's
tickets (with tokens) for a matching email; proving mailbox ownership (an emailed code) is the
next step if that is a concern.

`/api/chat` also enforces a body cap of 64 KB and 40 requests per minute per client address.

## Hosting note

`/api/chat` is an on-demand route run by the Node adapter on the Render web service, the same
process that serves `/api/contact`. It does not work on a static host.
