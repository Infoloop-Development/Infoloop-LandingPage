import { LOCAL_CHAT_FEATURES, type ChatFeature } from "@/content/chat-features";

type PayloadDoc = {
  key?: string;
  name?: string;
  description?: string;
  complexity?: string;
  platforms?: string[];
  tags?: string[];
  active?: boolean;
};

/**
 * Active chat features from Payload `chat-features`, else local catalog.
 * Cached briefly in-process for serverless warm invocations.
 */
let cache: { at: number; features: ChatFeature[] } | null = null;
const TTL_MS = 60_000;

export async function getChatFeatures(): Promise<ChatFeature[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.features;

  const base = (import.meta.env.PAYLOAD_URL as string | undefined)?.replace(/\/$/, "");
  const token = import.meta.env.PAYLOAD_TOKEN as string | undefined;

  if (base) {
    try {
      const res = await fetch(`${base}/api/chat-features?limit=200&where[active][equals]=true&sort=sortOrder`, {
        headers: token ? { Authorization: `users API-Key ${token}` } : {},
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const data = (await res.json()) as { docs?: PayloadDoc[] };
        const docs = Array.isArray(data.docs) ? data.docs : [];
        const mapped: ChatFeature[] = docs
          .filter((d) => d.key && d.name && d.complexity)
          .map((d) => ({
            key: String(d.key),
            name: String(d.name),
            description: String(d.description || ""),
            complexity: (["simple", "medium", "complex"].includes(String(d.complexity))
              ? d.complexity
              : "medium") as ChatFeature["complexity"],
            platforms: (Array.isArray(d.platforms) ? d.platforms : ["web"]).filter((p): p is ChatFeature["platforms"][number] =>
              p === "web" || p === "mobile" || p === "backend",
            ),
            tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
          }));
        if (mapped.length) {
          cache = { at: Date.now(), features: mapped };
          return mapped;
        }
      }
    } catch (err) {
      console.warn("[chat-features] Payload fetch failed; using local catalog", err);
    }
  }

  cache = { at: Date.now(), features: LOCAL_CHAT_FEATURES };
  return LOCAL_CHAT_FEATURES;
}

export function featuresByKeys(catalog: ChatFeature[], keys: string[]): ChatFeature[] {
  const map = new Map(catalog.map((f) => [f.key, f]));
  const out: ChatFeature[] = [];
  for (const key of keys) {
    const f = map.get(key);
    if (f) out.push(f);
  }
  return out;
}
