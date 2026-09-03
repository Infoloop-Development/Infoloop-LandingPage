/**
 * Analytics config for the static build. Prefer CMS global `analytics`
 * (editors paste IDs in Payload). Environment variables still work as a
 * fallback when CMS fields are empty.
 */
import { normalize } from "@/lib/cms";

export type AnalyticsConfig = {
  ga4Id: string;
  gtmId: string;
  gscVerification: string;
  bingVerification: string;
  ahrefsVerification: string;
  plausibleDomain: string;
  clarityId: string;
  linkedinPartnerId: string;
  posthogKey: string;
  posthogHost: string;
  privacyDisclosed: boolean;
  consentRequired: boolean;
};

const EMPTY: AnalyticsConfig = {
  ga4Id: "",
  gtmId: "",
  gscVerification: "",
  bingVerification: "",
  ahrefsVerification: "",
  plausibleDomain: "",
  clarityId: "",
  linkedinPartnerId: "",
  posthogKey: "",
  posthogHost: "https://eu.i.posthog.com",
  privacyDisclosed: false,
  consentRequired: true,
};

function envFlag(name: string): string {
  // Render/Node injects secrets on process.env; Vite may not mirror non-PUBLIC_ keys onto import.meta.env.
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[name];
  const fromProcess = typeof process !== "undefined" ? process.env[name] : undefined;
  return String(fromMeta ?? fromProcess ?? "").trim();
}

function fromEnv(): AnalyticsConfig {
  const env = import.meta.env;
  return {
    ga4Id: String(env.PUBLIC_GA4_ID ?? ""),
    gtmId: String(env.PUBLIC_GTM_ID ?? ""),
    gscVerification: String(env.PUBLIC_GSC_VERIFICATION ?? ""),
    bingVerification: String(env.PUBLIC_BING_VERIFICATION ?? ""),
    ahrefsVerification: String(env.PUBLIC_AHREFS_VERIFICATION ?? ""),
    plausibleDomain: String(env.PUBLIC_PLAUSIBLE_DOMAIN ?? ""),
    clarityId: String(env.PUBLIC_CLARITY_ID ?? ""),
    linkedinPartnerId: String(env.PUBLIC_LINKEDIN_PARTNER_ID ?? ""),
    posthogKey: String(env.PUBLIC_POSTHOG_KEY ?? ""),
    posthogHost: String(env.PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com"),
    privacyDisclosed: envFlag("TRACKING_DISCLOSED") === "true",
    consentRequired: env.PUBLIC_CONSENT_REQUIRED !== "false",
  };
}

type CmsAnalytics = {
  google?: { ga4Id?: string; gtmId?: string; gscVerification?: string };
  other?: {
    plausibleDomain?: string;
    bingVerification?: string;
    ahrefsVerification?: string;
    clarityId?: string;
    linkedinPartnerId?: string;
    posthogKey?: string;
    posthogHost?: string;
  };
  compliance?: { privacyDisclosed?: boolean; consentRequired?: boolean };
};

function pick(cms: string | undefined, env: string): string {
  const c = (cms ?? "").trim();
  if (c) return c;
  return (env ?? "").trim();
}

export function anyTracker(c: AnalyticsConfig): boolean {
  return Boolean(c.plausibleDomain || c.ga4Id || c.gtmId || c.posthogKey || c.clarityId || c.linkedinPartnerId);
}

export function cookieTrackers(c: AnalyticsConfig): boolean {
  return Boolean(c.ga4Id || c.gtmId || c.posthogKey || c.clarityId || c.linkedinPartnerId);
}

async function fetchCmsAnalytics(): Promise<CmsAnalytics | null> {
  const base = import.meta.env.PAYLOAD_URL as string | undefined;
  if (!base) return null;
  const token = import.meta.env.PAYLOAD_TOKEN as string | undefined;
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/globals/analytics?depth=0`, {
      headers: token ? { Authorization: `users API-Key ${token}` } : {},
    });
    if (!res.ok) {
      console.warn(`[cms] globals/analytics responded ${res.status}; using env/local analytics`);
      return null;
    }
    return (normalize(await res.json()) ?? null) as CmsAnalytics | null;
  } catch (err) {
    console.warn("[cms] globals/analytics failed; using env/local analytics", err);
    return null;
  }
}

/** CMS values win when set; otherwise env. Disclosure is true if either side says so. */
export async function getAnalytics(): Promise<AnalyticsConfig> {
  const env = fromEnv();
  const raw = await fetchCmsAnalytics();
  const g = raw?.google;
  const o = raw?.other;
  const c = raw?.compliance;
  return {
    ...EMPTY,
    ga4Id: pick(g?.ga4Id, env.ga4Id),
    gtmId: pick(g?.gtmId, env.gtmId),
    gscVerification: pick(g?.gscVerification, env.gscVerification),
    bingVerification: pick(o?.bingVerification, env.bingVerification),
    ahrefsVerification: pick(o?.ahrefsVerification, env.ahrefsVerification),
    plausibleDomain: pick(o?.plausibleDomain, env.plausibleDomain),
    clarityId: pick(o?.clarityId, env.clarityId),
    linkedinPartnerId: pick(o?.linkedinPartnerId, env.linkedinPartnerId),
    posthogKey: pick(o?.posthogKey, env.posthogKey),
    posthogHost: pick(o?.posthogHost, env.posthogHost) || "https://eu.i.posthog.com",
    privacyDisclosed: Boolean(c?.privacyDisclosed || env.privacyDisclosed),
    consentRequired: c?.consentRequired !== undefined ? Boolean(c.consentRequired) : env.consentRequired,
  };
}
