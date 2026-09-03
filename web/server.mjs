#!/usr/bin/env node
/**
 * Production server for Render (and any plain Node host).
 *
 *   npm start   ->   node ./server.mjs
 *
 * Why this exists: the site used to run on Netlify, where netlify.toml added
 * the security headers and told the CDN to cache hashed assets for a year.
 * Render does not read netlify.toml, and @astrojs/node's built-in server
 * serves /_astro/* with "max-age=0", so both were silently lost in the move.
 *
 * This wraps the adapter's own request handler (static files + the two API
 * routes + the legacy 301s) and sets those headers first. `send`, which the
 * adapter uses for static files, only writes Cache-Control when none is set,
 * so the immutable value below wins for hashed assets.
 *
 * `node ./dist/server/entry.mjs` still works as a fallback start command; it
 * just serves without these headers. ASTRO_NODE_AUTOSTART is a documented
 * @astrojs/node switch that stops the entry module from opening its own port
 * when it is imported here.
 */
process.env.ASTRO_NODE_AUTOSTART = "disabled";

import http from "node:http";

const { handler } = await import("./dist/server/entry.mjs");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4321);

/** Same values netlify.toml carried; applied to every response. */
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const server = http.createServer((req, res) => {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  // Astro fingerprints everything under /_astro/, so it can be cached forever.
  if (req.url && req.url.startsWith("/_astro/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  }
  handler(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`[infoloop] listening on http://${HOST}:${PORT}`);
});

for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => server.close(() => process.exit(0)));
}
