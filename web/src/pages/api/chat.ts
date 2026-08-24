import type { APIRoute } from "astro";
import { CHAT_SYSTEM } from "@/content/chat-knowledge";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

type Msg = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE = 800;
const MAX_HISTORY = 8;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
/** Fast, strong default on Groq’s free tier; override with GROQ_MODEL. */
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/**
 * Infoloop site chatbot → Groq (OpenAI-compatible). Key stays server-side.
 * Set GROQ_API_KEY in the host env (Netlify). Optional GROQ_MODEL.
 */
export const POST: APIRoute = async ({ request }) => {
  const key = (import.meta.env.GROQ_API_KEY as string | undefined)?.trim();
  if (!key) {
    return json(
      {
        error:
          "Chat is not configured yet. Please use the contact form at /contact or email hi@infoloop.co.",
      },
      503,
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = (await request.json()) as { message?: unknown; history?: unknown };
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE) {
    return json({ error: "Please send a short message (under 800 characters)." }, 400);
  }

  const history: Msg[] = [];
  if (Array.isArray(body.history)) {
    for (const row of body.history.slice(-MAX_HISTORY)) {
      if (!row || typeof row !== "object") continue;
      const role = (row as Msg).role;
      const content = typeof (row as Msg).content === "string" ? (row as Msg).content.trim() : "";
      if ((role === "user" || role === "assistant") && content && content.length <= MAX_MESSAGE) {
        history.push({ role, content });
      }
    }
  }

  const model = ((import.meta.env.GROQ_MODEL as string | undefined) || DEFAULT_MODEL).trim();

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 500,
        messages: [{ role: "system", content: CHAT_SYSTEM }, ...history, { role: "user", content: message }],
      }),
      signal: AbortSignal.timeout(25000),
    });

    const data = (await res.json().catch(() => ({}))) as {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string };
    };

    if (!res.ok) {
      console.error("Groq error", res.status, data?.error?.message);
      return json(
        {
          error:
            res.status === 429
              ? "The assistant is busy right now. Try again in a moment, or contact us at /contact."
              : "The assistant could not reply. Please try again or use /contact.",
        },
        502,
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return json({ error: "Empty reply. Please try again or use /contact." }, 502);

    return json({ reply });
  } catch (err) {
    console.error("Chat failed", err);
    return json({ error: "The assistant is temporarily unavailable. Please use /contact." }, 502);
  }
};
