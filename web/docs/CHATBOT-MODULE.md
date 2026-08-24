# Site chatbot (Groq)

Floating **Infoloop assistant** on every page that uses `Site.astro`. Answers only about Infoloop (services, products, process, published price ranges, hire, contact). Off-topic questions get a short refusal and a link to `/contact`.

## Stack

| Piece | Where |
| --- | --- |
| UI | `web/src/components/Chatbot.tsx` (`client:idle` from `Site.astro`) |
| API | `POST /api/chat` → `web/src/pages/api/chat.ts` (`prerender = false`) |
| Knowledge + system prompt | `web/src/content/chat-knowledge.ts` |
| Provider | [Groq](https://console.groq.com) OpenAI-compatible Chat Completions |

Default model: `llama-3.3-70b-versatile` (override with `GROQ_MODEL`).

## Environment

Set in Netlify (same host as `/api/contact`). **Must be present at build time** — Astro inlines `import.meta.env` into the function, same as `CONTACT_WEBHOOK_URL`.

| Variable | Required | Notes |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes for live chat | Free key from Groq console |
| `GROQ_MODEL` | No | Defaults to `llama-3.3-70b-versatile` |

Without the key the widget still renders; the API returns 503 with a contact fallback.

Also add `GROQ_API_KEY` to local `web/.env` when testing `astro dev`.

## Behaviour guards

- Server: max 800 chars per message, last 8 turns of history, ~25s timeout, low temperature, 500 max tokens
- Client: 20 user messages per page session, suggestion chips on first open
- System prompt: Infoloop-only; no invented certifications or unpublished facts

Edit facts in `chat-knowledge.ts` when offerings or price guidance change, then rebuild.

## Hosting note

`/api/chat` needs Astro SSR / Netlify Functions. A pure static host (no functions) will not run the chat API. Use the same Netlify site that already runs `/api/contact`.

## Analytics

Optional events via `trackEvent`: `chat_opened`, `chat_message`, `chat_cta_click`.
