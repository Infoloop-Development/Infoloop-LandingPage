import type { ChatFeature } from "@/content/chat-features";

export type BuildPlatform = "web" | "mobile";

export type BuildFlow = {
  step: "clarify" | "discovery" | "review";
  projectTitle: string;
  /** Set only after the visitor confirms (or clearly stated it). */
  platform?: BuildPlatform | null;
  flutterOnly?: boolean;
  brief?: string;
  userFeatureKeys?: string[];
  suggestedFeatureKeys?: string[];
};

const BUILD_INTENT_RE =
  /\b(can you|could you|would you|do you|we want|we need|i want|i need|looking to|looking for|help (me )?(build|make|create|develop)|build|make|create|develop|design)\b.{0,100}\b(app|application|platform|website|web app|mobile app|store|shop|marketplace|software|system|portal)\b/i;

const BUILD_INTENT_LOOSE_RE =
  /\b(i need|we need|i want|we want|looking for).{0,120}\b(app|software|system|platform|portal)\b|\b(packaging|manufacturing|plant|factory|warehouse|retail).{0,80}\b(app|software|system|mobile)\b/i;

const SUGGEST_RE =
  /\b(suggest features|suggest some features|you suggest|recommend features|propose features|what features|feature suggestions|suggest for me|suggest something)\b/i;

const USER_ONLY_RE = /\b(only my features|my features only|just my features|what i listed|only what i|without (your )?suggestions|skip (your )?suggestions)\b/i;

const MERGED_RE =
  /\b(include (your )?suggestions|add (your )?suggestions|with suggestions|your suggestions too|both|all of them|merged|full scope|everything)\b/i;

const PLATFORM_MOBILE_RE = /\b(mobile app|phone app|ios|android|react native|flutter)\b/i;
const PLATFORM_WEB_RE = /\b(web app|website|web site|browser app|next\.?js)\b/i;
const PLATFORM_BOTH_RE = /\b(both|web and mobile|mobile and web|ios and android and web)\b/i;

export function isBuildIntentMessage(text: string): boolean {
  return BUILD_INTENT_RE.test(text) || BUILD_INTENT_LOOSE_RE.test(text);
}

export function isSuggestFeaturesRequest(text: string): boolean {
  return SUGGEST_RE.test(text);
}

export function isUserOnlyScopeChoice(text: string): boolean {
  return USER_ONLY_RE.test(text);
}

export function isMergedScopeChoice(text: string): boolean {
  return MERGED_RE.test(text);
}

export function parsePlatformChoice(text: string): BuildPlatform | "both" | null {
  if (PLATFORM_BOTH_RE.test(text) || /\bboth\b/i.test(text.trim())) return "both";
  if (/\b(mobile|ios|android|phone)\b/i.test(text) && !/\bweb\b/i.test(text)) return "mobile";
  if (/\b(web|website)\b/i.test(text) && !/\bmobile\b/i.test(text)) return "web";
  if (PLATFORM_MOBILE_RE.test(text) && PLATFORM_WEB_RE.test(text)) return "both";
  if (PLATFORM_MOBILE_RE.test(text)) return "mobile";
  if (PLATFORM_WEB_RE.test(text)) return "web";
  return null;
}

/** Only set platform when the visitor clearly said it. Never default to mobile. */
export function inferExplicitPlatform(message: string): BuildPlatform | null {
  if (PLATFORM_BOTH_RE.test(message)) return "mobile"; // primary track; web admin still common
  const mobile = PLATFORM_MOBILE_RE.test(message);
  const web = PLATFORM_WEB_RE.test(message);
  if (mobile && web) return "mobile";
  if (mobile) return "mobile";
  if (web) return "web";
  return null;
}

function titleCaseWords(s: string): string {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Heuristic short title from messy free text.
 * Never returns the raw message title-cased.
 */
export function heuristicProjectTitle(message: string): string {
  const lower = message.toLowerCase();
  const industry =
    lower.match(
      /\b(packaging|manufacturing|healthcare|retail|ecommerce|e-?commerce|logistics|warehouse|garage|education|saas|fashion|clothing|food|restaurant|hotel|real estate|fintech|insurance)\b/,
    )?.[1] || "";

  const domain =
    lower.match(/\b(plant|factory|shop|store|marketplace|clinic|school|gym|salon)\b/)?.[1] || "";

  const parts: string[] = [];
  if (industry) parts.push(titleCaseWords(industry));
  if (domain && domain !== industry) parts.push(titleCaseWords(domain));

  if (parts.length) {
    return `${parts.join(" ")} Software Project`.slice(0, 80);
  }

  if (/\bclothes?\b|\bfashion\b|\bapparel\b/i.test(message)) {
    return "Clothes Shopping Software";
  }

  return "Custom Software Project";
}

export type NamedProject = {
  projectTitle: string;
  brief: string;
  platform: BuildPlatform | null;
  flutterOnly: boolean;
};

/** Use Groq to understand the visitor message and invent a short project name. */
export async function nameProjectFromMessage(
  message: string,
  groqChat: (body: Record<string, unknown>) => Promise<{
    res: Response;
    data: { choices?: { message?: { content?: string | null } }[] };
  }>,
  model: string,
): Promise<NamedProject> {
  const flutterOnly = /\bflutter\b/i.test(message) && !/\breact native\b/i.test(message);
  const explicitPlatform = inferExplicitPlatform(message);
  const fallbackTitle = heuristicProjectTitle(message);

  const { res, data } = await groqChat({
    model,
    temperature: 0.2,
    max_tokens: 180,
    messages: [
      {
        role: "system",
        content: `You name software projects for Infoloop sales. From the visitor message, return ONLY JSON:
{"projectTitle":"3 to 6 word title","brief":"one short sentence of what they need","platform":"web"|"mobile"|null}
Rules:
- projectTitle must be a clean product name (e.g. "Packaging Plant Ops Project"), NEVER a copy of their full message, and do not append Mobile App / Web App yet (platform is asked next).
- platform may be hinted in JSON but we still ask the visitor; prefer null unless extremely clear.
- No markdown. No em dashes.`,
      },
      { role: "user", content: message },
    ],
  });

  if (!res.ok) {
    return {
      projectTitle: fallbackTitle,
      brief: "They asked Infoloop to build software for their business.",
      platform: explicitPlatform,
      flutterOnly,
    };
  }

  const raw = data.choices?.[0]?.message?.content?.trim() || "";
  try {
    const parsed = JSON.parse(raw.replace(/```json?\s*|\s*```/g, "")) as {
      projectTitle?: string;
      brief?: string;
      platform?: string | null;
    };
    let title = typeof parsed.projectTitle === "string" ? parsed.projectTitle.trim() : "";
    // Reject titles that are basically the raw message
    if (!title || title.length > 70 || title.split(/\s+/).length > 10 || /i am in|i have a|can you that/i.test(title)) {
      title = fallbackTitle;
    }
    const brief =
      typeof parsed.brief === "string" && parsed.brief.trim()
        ? parsed.brief.trim().slice(0, 200)
        : "They asked Infoloop to build software for their business.";
    let platform: BuildPlatform | null = explicitPlatform;
    if (!platform) {
      if (parsed.platform === "web" || parsed.platform === "mobile") platform = parsed.platform;
      else platform = null;
    }
    return { projectTitle: title.slice(0, 80), brief, platform, flutterOnly };
  } catch {
    return {
      projectTitle: fallbackTitle,
      brief: "They asked Infoloop to build software for their business.",
      platform: explicitPlatform,
      flutterOnly,
    };
  }
}

export function buildClarifyMessage(projectTitle: string, brief: string): string {
  return [
    `Got it. It sounds like you need **${projectTitle}**.`,
    "",
    brief,
    "",
    "Before we map features, which product should we scope first?",
    "",
    "- **Mobile app** (iOS / Android)",
    "- **Web app** (browser)",
    "- **Both** (mobile + web)",
    "",
    "Tap a button below, or type your choice. We will not assume mobile unless you say so.",
  ].join("\n");
}

export function buildDiscoveryMessage(projectTitle: string, platform: BuildPlatform): string {
  const platformLabel = platform === "mobile" ? "mobile app" : "web app";
  const titled =
    platform === "mobile" && !/mobile|app$/i.test(projectTitle)
      ? projectTitle.replace(/\s*Software Project$/i, " Mobile App")
      : platform === "web" && !/web|platform|site$/i.test(projectTitle)
        ? projectTitle.replace(/\s*Software Project$/i, " Web Platform")
        : projectTitle;
  return [
    `Great. We will scope **${titled}** as a **${platformLabel}**.`,
    "",
    "Do you already have specific features in mind?",
    "",
    "- Type the features you want in some detail (for example: plant staff login, machine downtime logging, inventory by SKU, supervisor alerts), **or**",
    "- Tap **Suggest features for me** and I will propose a deeper starter set for this kind of project.",
  ].join("\n");
}

/** Refine title after platform is chosen. */
export function titleForPlatform(projectTitle: string, platform: BuildPlatform): string {
  const base = projectTitle
    .replace(/\s*Mobile App$/i, "")
    .replace(/\s*Web Platform$/i, "")
    .replace(/\s*Software Project$/i, "")
    .trim();
  if (platform === "mobile") return `${base} Mobile App`.slice(0, 80);
  return `${base} Web Platform`.slice(0, 80);
}

function featureLine(f: { name: string; description?: string }): string {
  return f.description ? `- **${f.name}**: ${f.description}` : `- **${f.name}**`;
}

export function buildReviewMessage(
  projectTitle: string,
  userFeatures: { key: string; name: string; description?: string }[],
  extraFeatures: { key: string; name: string; description?: string }[],
): string {
  const lines = [`Thanks for sharing those. **${projectTitle}** is a strong fit for us.`];

  if (userFeatures.length) {
    lines.push("", "**What you mentioned**", ...userFeatures.map(featureLine));
  }

  if (extraFeatures.length) {
    lines.push(
      "",
      "**We would also suggest adding**",
      ...extraFeatures.map(featureLine),
      "",
      "These usually cover operations, admin, and things teams forget early.",
    );
  } else {
    lines.push("", "Your list already covers a solid first scope.");
  }

  lines.push(
    "",
    "For a rough estimate, should we proceed with:",
    "- **Only the features you listed**, or",
    "- **Your features plus our suggestions**?",
  );

  return lines.join("\n");
}

export function mergeFeatureKeys(userKeys: string[], suggestedKeys: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of [...userKeys, ...suggestedKeys]) {
    if (!seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
}

/** Match visitor free-text to catalog keys via keyword overlap. */
export function matchFeaturesFromText(message: string, catalog: ChatFeature[]): string[] {
  const lower = message.toLowerCase();
  const matched: string[] = [];

  for (const f of catalog) {
    const terms = [
      f.key.replace(/-/g, " "),
      f.name.toLowerCase(),
      ...(f.tags?.map((t) => t.toLowerCase()) ?? []),
    ];
    if (terms.some((t) => t.length > 2 && lower.includes(t))) {
      matched.push(f.key);
    }
  }

  const shortcuts: [RegExp, string][] = [
    [/\b(login|sign up|signup|auth|accounts?|staff access)\b/i, "user-auth"],
    [/\b(catalog|product list|browse|search|inventory|sku)\b/i, "product-catalog"],
    [/\b(cart|checkout|basket)\b/i, "shopping-cart-checkout"],
    [/\b(payment|pay|stripe|gateway)\b/i, "payments"],
    [/\b(order|tracking|shipment|downtime)\b/i, "order-tracking"],
    [/\b(admin|dashboard|back[- ]?office|supervisor)\b/i, "admin-dashboard"],
    [/\b(push|notification|alert)\b/i, "push-notifications"],
    [/\b(upload|media|images?|photos?|document)\b/i, "file-uploads"],
    [/\b(analytics|report|metrics)\b/i, "analytics-basic"],
    [/\b(integrat|erp|crm|api)\b/i, "api-integrations"],
    [/\b(booking|calendar|schedule)\b/i, "booking-calendar"],
    [/\b(message|chat|support thread)\b/i, "messaging"],
  ];

  for (const [re, key] of shortcuts) {
    if (re.test(message) && catalog.some((f) => f.key === key) && !matched.includes(key)) {
      matched.push(key);
    }
  }

  return matched.slice(0, 12);
}

export async function extractUserFeatureKeys(
  message: string,
  catalog: ChatFeature[],
  groqChat: (body: Record<string, unknown>) => Promise<{
    res: Response;
    data: { choices?: { message?: { content?: string | null } }[] };
  }>,
  model: string,
): Promise<string[]> {
  const heuristic = matchFeaturesFromText(message, catalog);
  if (heuristic.length >= 2) return heuristic;

  const keys = catalog.map((f) => f.key).join(", ");
  const { res, data } = await groqChat({
    model,
    temperature: 0,
    max_tokens: 120,
    messages: [
      {
        role: "system",
        content: `Return ONLY a JSON array of catalog feature keys the visitor mentioned. Use only keys from: ${keys}. If none, return [].`,
      },
      { role: "user", content: message },
    ],
  });

  if (!res.ok) return heuristic;

  const raw = data.choices?.[0]?.message?.content?.trim() || "[]";
  try {
    const parsed = JSON.parse(raw.replace(/```json?\s*|\s*```/g, "")) as unknown;
    if (Array.isArray(parsed)) {
      const valid = parsed.map(String).filter((k) => catalog.some((f) => f.key === k));
      return valid.length ? valid : heuristic;
    }
  } catch {
    /* fall through */
  }
  return heuristic;
}
