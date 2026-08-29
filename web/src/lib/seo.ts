/**
 * Absolute URL for OG / social images. Relative Payload media paths
 * (`/api/media/file/...`) are prefixed with PAYLOAD_URL when set.
 */
export function absoluteAssetUrl(src: string | undefined | null, siteOrigin: string): string {
  const fallback = new URL("/og.png", siteOrigin).toString();
  if (!src || !src.trim()) return fallback;
  const s = src.trim();
  if (/^https?:\/\//i.test(s)) return s;
  const cms = (import.meta.env.PAYLOAD_URL as string | undefined)?.replace(/\/$/, "");
  if (s.startsWith("/") && cms) return `${cms}${s}`;
  try {
    return new URL(s, siteOrigin).toString();
  } catch {
    return fallback;
  }
}

export type SeoImage = { url: string; alt?: string };

/** Flatten Payload upload on seo.image to { url, alt }. */
export function flattenSeoImage(seo: Record<string, unknown> | undefined): void {
  if (!seo || typeof seo !== "object") return;
  const img = seo.image;
  if (img && typeof img === "object" && !Array.isArray(img) && typeof (img as { url?: unknown }).url === "string") {
    const o = img as { url: string; alt?: string };
    seo.image = { url: o.url, alt: o.alt };
  } else if (img !== undefined) {
    delete seo.image;
  }
}
