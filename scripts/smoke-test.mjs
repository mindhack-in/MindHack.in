#!/usr/bin/env node
/**
 * Post-deploy smoke test: hits the pages that actually matter on the *live*
 * site and fails loudly if any of them come back broken.
 *
 * This exists because of a real incident: automated clients (including,
 * possibly, Googlebot) saw 404s on / and /sitemap.xml on two separate dates,
 * while a real browser saw 200 the whole time — and nothing was watching for
 * it. A status-only check isn't enough either: /games/ once returned 200
 * with an empty shell (no h1, no content) after a bad deploy, which is a
 * silent failure from a "just check the status code" test. So every page
 * here is checked for status 200 *and* a non-empty <h1> *and* a
 * <meta name="description">.
 *
 * Deliberately fetches bare URLs with no cache-busting query params — a
 * param-based check would have passed straight through the exact outage
 * this script exists to catch, since the cached/edge response only broke
 * for the plain URL.
 *
 * Usage:
 *   node scripts/smoke-test.mjs                  # checks SITE_URL from .env
 *   SITE_URL=https://mindhack.in/ node scripts/smoke-test.mjs
 *   npm run smoke-test
 */
import fs from "node:fs";
import path from "node:path";

function loadSiteUrlFromEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return undefined;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq).trim() === "SITE_URL") {
      return trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return undefined;
}

const SITE_URL = (process.env.SITE_URL || loadSiteUrlFromEnvFile() || "").replace(/\/$/, "");
if (!SITE_URL) {
  console.error("No SITE_URL found (checked process.env and .env). Set SITE_URL and retry.");
  process.exit(1);
}

// Bare paths only — no ?bust= params. That's the entire point of this test.
const PATHS_REQUIRING_CONTENT = ["/", "/games/", "/blog/", "/games/sudoku/", "/games/2048/"];
const PATHS_STATUS_ONLY = ["/sitemap.xml"];

function extract(tag, html) {
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  const desc = /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i.exec(html);
  return { h1: h1 ? h1[1].replace(/<[^>]+>/g, "").trim() : "", description: desc ? desc[1].trim() : "" };
}

async function checkPage(pathname, { requireContent }) {
  const url = SITE_URL + pathname;
  const issues = [];
  let status;
  let html = "";

  try {
    const res = await fetch(url, { redirect: "manual" });
    status = res.status;
    if (status !== 200) issues.push(`status ${status} (expected 200)`);
    html = await res.text();
  } catch (err) {
    return { pathname, url, ok: false, issues: [`request failed: ${err.message}`] };
  }

  if (requireContent && status === 200) {
    const { h1, description } = extract("h1", html);
    if (!h1) issues.push("empty or missing <h1>");
    if (!description) issues.push('empty or missing <meta name="description">');
  }

  return { pathname, url, ok: issues.length === 0, issues, status };
}

const results = [];
for (const p of PATHS_REQUIRING_CONTENT) results.push(await checkPage(p, { requireContent: true }));
for (const p of PATHS_STATUS_ONLY) results.push(await checkPage(p, { requireContent: false }));

console.table(
  results.map((r) => ({
    path: r.pathname,
    status: r.status ?? "ERR",
    result: r.ok ? "ok" : r.issues.join(" | "),
  }))
);

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} pages passed.`);
if (failed.length) {
  console.error(`\nFAILED: ${failed.map((r) => r.pathname).join(", ")}`);
  process.exit(1);
}
console.log("Smoke test passed.");
