import type { ChatFeature, FeatureComplexity } from "@/content/chat-features";

/** Base developer-hours by complexity. LLM never sees or invents these totals. */
export const COMPLEXITY_HOURS: Record<FeatureComplexity, number> = {
  simple: 16,
  medium: 40,
  complex: 80,
};

export const ESTIMATE_BUFFER = 1.3;
export const HOURLY_RATE_USD = 10;
export const MILESTONE_RATE_USD = 15;
export const HOURS_PER_MONTH = 160;

export const ESTIMATE_DISCLAIMER =
  "This is an Info Loop trained AI model — the estimate above is a rough, automatically generated approximation to give you a starting idea, not a binding quote, and final scope/pricing will be confirmed in a live consultation.";

/** Scrub model text but keep the mandated disclaimer line intact. */
export function scrubReplyKeepDisclaimer(text: string) {
  const parts = text.split(ESTIMATE_DISCLAIMER);
  const scrub = (s: string) => s.replace(/\u2014/g, " - ").replace(/\u2013/g, "-");
  if (parts.length === 1) return scrub(text);
  return parts.map((p, i) => (i < parts.length - 1 ? scrub(p) + ESTIMATE_DISCLAIMER : scrub(p))).join("");
}

export type PublicEstimate = {
  hourlyTotal: number;
  milestoneTotal: number;
  months: number;
  stack: string;
  features: { key: string; name: string; description?: string }[];
};

/** Sum catalog hours, apply 30% buffer, price and timeline. Never expose raw hours. */
export function computeEstimate(
  selected: ChatFeature[],
  stack: string,
): PublicEstimate & { /** internal only - do not return to clients in API JSON for display */ _bufferedHours: number } {
  const base = selected.reduce((sum, f) => sum + (COMPLEXITY_HOURS[f.complexity] ?? COMPLEXITY_HOURS.medium), 0);
  const buffered = Math.ceil(base * ESTIMATE_BUFFER);
  const hourlyTotal = Math.round(buffered * HOURLY_RATE_USD);
  const milestoneTotal = Math.round(buffered * MILESTONE_RATE_USD);
  const months = Math.max(1, Math.ceil(buffered / HOURS_PER_MONTH));
  return {
    hourlyTotal,
    milestoneTotal,
    months,
    stack,
    features: selected.map((f) => ({ key: f.key, name: f.name, description: f.description })),
    _bufferedHours: buffered,
  };
}

export function formatEstimateReply(est: PublicEstimate): string {
  return estimateTranscriptText(undefined, est);
}

/** Plain-text estimate for tickets / transcript (UI uses ChatEstimateCard). */
export function estimateTranscriptText(projectTitle: string | undefined, est: PublicEstimate, ticketId?: string) {
  const z = est.months;
  const monthLabel = z === 1 ? "month" : "months";
  const featureLines =
    est.features?.length > 0
      ? ["Features included:", ...est.features.map((f) => `- ${f.name}`)]
      : [];
  return [
    projectTitle ? `Rough estimate for ${projectTitle}:` : "Rough estimate:",
    `Hourly basis: $${est.hourlyTotal.toLocaleString("en-US")}`,
    `Milestone basis: $${est.milestoneTotal.toLocaleString("en-US")}`,
    `Timeline: ~${z} ${monthLabel}`,
    ...featureLines,
    est.stack ? `Stack: ${est.stack}` : "",
    ticketId ? `Reference: ${ticketId}` : "",
    ESTIMATE_DISCLAIMER,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Reply when visitor asks which features the estimate covers. */
export function estimateFeaturesReply(
  projectTitle: string | undefined,
  features: { name: string; description?: string }[],
): string {
  if (!features.length) {
    return "I do not have a saved feature list for that estimate in this chat window. Ask me to regenerate the estimate or describe the features you want included.";
  }
  const title = projectTitle ? ` for **${projectTitle}**` : "";
  return [
    `The rough estimate${title} is based on these features:`,
    "",
    ...features.map((f) => (f.description ? `- **${f.name}**: ${f.description}` : `- **${f.name}**`)),
    "",
    "If you want to add or remove anything, tell me and we can recalculate.",
  ].join("\n");
}

export function stackForPlatform(platform: "web" | "mobile", preferFlutter = false): string {
  if (platform === "mobile") {
    return preferFlutter
      ? "Flutter (as you requested), with a Node.js API"
      : "React Native (recommended), with a Node.js API. We can use Flutter instead if you insist.";
  }
  return "React JS, Next JS, and Node JS";
}
