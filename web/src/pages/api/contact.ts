import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Lead intake for the contact page form (Netlify function via the adapter).
 * Validates, drops honeypot hits, then delivers to CONTACT_WEBHOOK_URL
 * (Zapier / Make / Slack / HubSpot webhook). In production a missing webhook
 * is an error, never a silent 200; in development the lead is logged.
 */
type Lead = {
  name?: string; email?: string; company?: string; interest?: string; message?: string;
  phone?: string; country?: string; lookingFor?: string; budget?: string; timeline?: string; source?: string; type?: string;
  website?: string; submitted_from?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string;
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });


/**
 * Attio delivery. Optional and ADDITIVE: the webhook above stays the primary
 * path, and an Attio failure never fails the lead, because losing an enquiry
 * because a CRM was down is worse than a missing CRM record.
 *
 * This upserts a Person on email so repeat enquiries do not create duplicates.
 * ATTIO_API_KEY comes from Attio > Settings > Developers > API keys and needs
 * record read and write scope on the objects below.
 *
 * IMPORTANT FOR WHOEVER WIRES THIS UP: the attribute slugs below are Attio's
 * defaults for the standard People object (name, email_addresses). If your
 * workspace renames or adds required attributes, this payload has to match, or
 * Attio returns 400. Confirm against
 * GET https://api.attio.com/v2/objects/people/attributes before you rely on it.
 */
async function sendToAttio(lead: Record<string, string>) {
  const key = import.meta.env.ATTIO_API_KEY as string | undefined;
  if (!key) return;
  const res = await fetch(
    "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{ email_address: lead.email }],
            name: [{ full_name: lead.name }],
            description: [{ value: attioNote(lead) }],
          },
        },
      }),
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!res.ok) throw new Error(`Attio responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

/** The enquiry as one readable block, so nothing is lost if a field is unmapped. */
function attioNote(l: Record<string, string>) {
  return [
    l.company && `Company: ${l.company}`,
    l.phone && `Phone: ${l.phone}`,
    l.country && `Country: ${l.country}`,
    l.interest && `Interest: ${l.interest}`,
    l.looking_for && `Looking for: ${l.looking_for}`,
    l.budget && `Budget: ${l.budget}`,
    l.timeline && `Timeline: ${l.timeline}`,
    l.source && `Heard about us: ${l.source}`,
    l.submitted_from && `Page: ${l.submitted_from}`,
    (l.utm_source || l.utm_medium || l.utm_campaign) &&
      `UTM: ${[l.utm_source, l.utm_medium, l.utm_campaign].filter(Boolean).join(" / ")}`,
    l.message && `\nMessage:\n${l.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return json({ error: "Invalid request." }, 400);
  const body = raw as Lead;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  if (str(body.website, 10) !== "") return json({ ok: true });
  const name = str(body.name, 200);
  const email = str(body.email, 254);
  if (name.length < 2) return json({ error: "Please add your name." }, 422);
  if (!EMAIL_RE.test(email)) return json({ error: "Please use a valid work email." }, 422);
  const lead = {
    name, email,
    company: str(body.company, 200), interest: str(body.interest, 120), message: str(body.message, 4000),
    phone: str(body.phone, 40), country: str(body.country, 80), looking_for: str(body.lookingFor, 120), budget: str(body.budget, 60), timeline: str(body.timeline, 60), source: str(body.source, 200),
    type: str(body.type, 20) || "project",
    submitted_from: str(body.submitted_from, 200) || "/",
    utm_source: str(body.utm_source, 100), utm_medium: str(body.utm_medium, 100), utm_campaign: str(body.utm_campaign, 100),
    received_at: new Date().toISOString(),
    user_agent: request.headers.get("user-agent") ?? "",
  };
  const webhook = import.meta.env.CONTACT_WEBHOOK_URL as string | undefined;
  if (!webhook && import.meta.env.PROD) {
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; lead not delivered", lead);
    return json({ error: "We could not send that. Please email hi@infoloop.co." }, 503);
  }
  if (webhook) {
    try {
      const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook delivery failed", err, lead);
      return json({ error: "We could not send that. Please email hi@infoloop.co." }, 502);
    }
  } else {
    console.info("[contact] lead received (no CONTACT_WEBHOOK_URL set)", lead);
  }

  // Never fatal: the lead is already delivered by this point.
  try {
    await sendToAttio(lead as unknown as Record<string, string>);
  } catch (err) {
    console.error("[contact] Attio delivery failed (lead was still delivered)", err);
  }

  return json({ ok: true });
};
