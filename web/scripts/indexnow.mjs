#!/usr/bin/env node
/**
 * Push every URL in the sitemap to IndexNow.
 *
 * IndexNow is a submit protocol that Bing, Yandex, Seznam and Naver honour.
 * It matters here for two reasons beyond Bing's own share: ChatGPT's web
 * search runs on Bing's index, so this is the fastest route to being visible
 * to an answer engine, and unlike Google there is a real endpoint that accepts
 * a push rather than waiting for a crawl.
 *
 * Google is deliberately not here. It retired its sitemap ping endpoint in
 * June 2023 and offers no submit API, so the only route is Search Console.
 * Anything claiming to "submit to Google" is either using Search Console
 * credentials or doing nothing.
 *
 * Usage: node scripts/indexnow.mjs [--dry]
 * The key file must be live at https://infoloop.co/<key>.txt first.
 */
import fs from "node:fs";
import path from "node:path";

const HOST = "infoloop.co";
const dry = process.argv.includes("--dry");

const keyFile = fs.readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) { console.error("No IndexNow key file in public/. Expected <32-hex>.txt"); process.exit(1); }
const key = path.basename(keyFile, ".txt");

const liveKey = `https://${HOST}/${key}.txt`;
const check = await fetch(liveKey).catch(() => null);
if (!check || !check.ok) {
  console.error(`Key file is not live yet at ${liveKey} (status ${check?.status ?? "no response"}).`);
  console.error("Deploy first: IndexNow verifies ownership by reading it.");
  process.exit(1);
}
const served = (await check.text()).trim();
if (served !== key) { console.error(`Key file serves "${served}" but should serve "${key}".`); process.exit(1); }
console.log(`key verified at ${liveKey}`);

const sm = await (await fetch(`https://${HOST}/sitemap-0.xml`)).text();
const urlList = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`submitting ${urlList.length} URLs`);
if (dry) { console.log("(dry run, nothing sent)"); process.exit(0); }

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: liveKey, urlList }),
});
/* 200 accepted, 202 accepted but key still validating. Both are success. */
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
if (![200, 202].includes(res.status)) { console.error(await res.text()); process.exit(1); }
console.log("Accepted. Bing, Yandex, Seznam and Naver will crawl from this list.");
