// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { LEGACY_REDIRECTS } from "./redirects.mjs";

/**
 * Infoloop site. Astro with React islands + Tailwind. Pages prerender as
 * static HTML; /api/chat and /api/contact are on-demand (prerender=false)
 * via the Node standalone adapter for Render Web Service.
 *
 * Start the site with `npm start` (server.mjs), not `node dist/server/entry.mjs`:
 * server.mjs adds the security headers and long-lived asset caching that
 * netlify.toml used to provide and that Render does not read.
 */
export default defineConfig({
  site: "https://infoloop.co",
  // Clean URLs without a trailing slash so sitemap, canonicals and JSON-LD agree
  // (/work, /work/<slug>).
  trailingSlash: "never",
  /*
   * "directory" (work/index.html), NOT "file" (work.html). The Node adapter's
   * static handler treats a request whose path is an existing directory as a
   * request for <dir>/index.html and never falls back to <dir>.html. With
   * "file" output, work.html sits next to the work/ folder that holds the case
   * studies, so /work, /blog and /products all 404'd while /about worked.
   * Every emitted URL stays extensionless, so nothing else changes.
   */
  build: { format: "directory" },
  adapter: node({ mode: "standalone" }),
  // Old-site URLs. Served as real 301s by the Node adapter (verified), not as
  // meta-refresh pages. Keep the list in redirects.mjs so it survives a host change.
  redirects: LEGACY_REDIRECTS,
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
