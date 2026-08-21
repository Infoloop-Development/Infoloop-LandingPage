// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

/**
 * Infoloop site. Astro static output with React 19 islands (only the header
 * drawer, the hero panels and the reveal observer hydrate), Tailwind CSS 4
 * through the Vite plugin, sitemap from the built pages, and the Netlify
 * adapter so the one server endpoint (/api/contact) can run as a function.
 * Content comes from Payload CMS at build time via src/lib/cms.ts, with the
 * local content files as fallback.
 */
export default defineConfig({
  site: "https://infoloop.co",
  output: "static",
  // Clean URLs without a trailing slash so sitemap, canonicals and JSON-LD agree
  // (/work, /work/<slug>). Netlify serves /work from work.html.
  trailingSlash: "never",
  build: { format: "file" },
  adapter: netlify(),
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
