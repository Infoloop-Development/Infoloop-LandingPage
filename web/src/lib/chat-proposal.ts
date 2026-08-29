export type ProposalDisplay = {
  projectTitle: string;
  features: { key: string; name: string; description?: string }[];
  stack: string;
  platform: "web" | "mobile";
};

/** Server-built proposal copy — no prices, no timelines. Features include short descriptions. */
export function buildProposalMessage(p: ProposalDisplay): string {
  const lines = [
    `Here is a scoped plan for **${p.projectTitle}**.`,
    "",
    "**Suggested features**",
    ...p.features.map((f) =>
      f.description ? `- **${f.name}**: ${f.description}` : `- **${f.name}**`,
    ),
    "",
    "**Tech stack**",
    `- ${p.stack}`,
    "",
    "I can put together a rough cost estimate for this scope next.",
  ];
  return lines.join("\n");
}

export const LEAD_CAPTURE_PROMPT =
  "To generate your estimate, please share your **full name**, **mobile number**, and **email** in the form below. We will show your rough pricing breakdown right after.";

/** Shown once contact details already exist for this chat session. */
export const LEAD_ALREADY_ON_FILE =
  "We already have your contact details from earlier in this chat. Our team will call you on those details. No need to share them again.";

/** Strip accidental dollar amounts from model text during proposal phase. */
export function stripPricingFromText(text: string): string {
  return text
    .replace(/\$[\d,]+(?:\.\d{2})?/g, "")
    .replace(/roughly \$[\d,]+/gi, "")
    .replace(/approximately \d+ months?/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
