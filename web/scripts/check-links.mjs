#!/usr/bin/env node
/**
 * Link and metadata check over a built site. Runs at the end of `npm run build`.
 *
 *   node scripts/check-links.mjs dist/client            # links strict, metadata warns
 *   node scripts/check-links.mjs dist/client --strict   # metadata failures also fail
 *
 * The one thing that must never ship again is an internal link that does not
 * resolve: the developer build once carried 37 "/work.html"-style links as a
 * workaround for a hosting bug, and every one of them would 404 on the fixed
 * host. So a dead internal link, or any internal href ending in ".html",
 * fails the build. Legacy 301 sources from redirects.mjs count as valid.
 *
 * Title/description length and the single-<h1> rule are reported as warnings
 * by default so an editor's long CMS title cannot block a deploy; pass
 * --strict to enforce them in CI.
 */
import fs from "node:fs";
import path from "node:path";
import { LEGACY_REDIRECTS } from "../redirects.mjs";

const root = process.argv[2] ?? "dist/client";
const strict = process.argv.includes("--strict");
if (!fs.existsSync(root)) {
  console.error(`No such directory: ${root}`);
  process.exit(2);
}

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".html")) files.push(p);
  }
})(root);

/** dist/client/work/index.html -> /work ; dist/client/404.html -> /404 */
const routeOf = (f) => {
  const rel = "/" + path.relative(root, f).split(path.sep).join("/");
  return rel.replace(/\/index\.html$/, "").replace(/\.html$/, "") || "/";
};
const routes = new Set(files.map(routeOf));
routes.add("/");
for (const from of Object.keys(LEGACY_REDIRECTS)) routes.add(from);

/** Assets and non-page targets are not routes and are not checked here. */
const SKIP = /^\/(_astro|assets|downloads|brand|fonts|chat|api)\b|\.(xml|txt|zip|svg|png|jpe?g|webp|avif|ico|pdf|json|webmanifest|css|js|mjs|map)$/;

const errors = [];
const warnings = [];
let linkCount = 0;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeOf(file);
  const noindex = /content="noindex/.test(html);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warnings.push(`${route}: ${h1} <h1> elements, expected exactly 1`);

  if (!noindex) {
    const title = (html.match(/<title>([^<]*)<\/title>/) || [, ""])[1];
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [, ""])[1];
    if (title.length < 30 || title.length > 60) warnings.push(`${route}: title is ${title.length} chars, want 30 to 60`);
    if (desc.length < 110 || desc.length > 158) warnings.push(`${route}: description is ${desc.length} chars, want 110 to 158`);
    if (!/<link rel="canonical"/.test(html)) errors.push(`${route}: no canonical link`);
  }

  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const raw = m[1];
    const href = raw.replace(/\/$/, "") || "/";
    linkCount++;
    if (/\.html$/.test(raw)) { errors.push(`${route}: link to ${raw} uses a .html extension; the site is extensionless`); continue; }
    if (SKIP.test(href)) continue;
    if (!routes.has(href)) errors.push(`${route}: link to ${href} which does not exist`);
  }
}

console.log(`Checked ${files.length} pages and ${linkCount} internal links in ${root}`);
if (warnings.length) {
  console.log(`\n${warnings.length} metadata warning${warnings.length === 1 ? "" : "s"}${strict ? " (strict: failing)" : ""}:`);
  for (const w of warnings) console.log("  " + w);
}
if (errors.length) {
  console.error(`\n${errors.length} link problem${errors.length === 1 ? "" : "s"}:`);
  for (const e of errors) console.error("  " + e);
}
if (errors.length || (strict && warnings.length)) process.exit(1);
console.log(errors.length || warnings.length ? "\nLinks OK." : "No problems found.");
