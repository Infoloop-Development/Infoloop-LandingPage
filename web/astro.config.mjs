// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

/**
 * Infoloop site. Astro with React islands + Tailwind. Pages prerender as
 * static HTML; /api/chat and /api/contact are on-demand (prerender=false)
 * via the Node standalone adapter for Render Web Service.
 */
export default defineConfig({
  site: "https://infoloop.co",
  // Clean URLs without a trailing slash so sitemap, canonicals and JSON-LD agree
  // (/work, /work/<slug>).
  trailingSlash: "never",
  build: { format: "file" },
  adapter: node({ mode: "standalone" }),
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
