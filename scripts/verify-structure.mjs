/**
 * Release gate: compares the rendered pages against the original static site.
 *
 * Checks text parity (content loss), head metadata, JSON-LD, and — the one that
 * matters most — the DOM skeleton, which catches nesting corruption that a text
 * diff sails straight past.
 */
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const OLD = process.env.LEGACY_DIR || "./legacy";
const NEW = process.env.BUILD_DIR || "./.next/server/app";
if (!fs.existsSync(OLD)) {
  console.error(
    `Reference site not found at ${OLD}.\n` +
    `This check diffs the build against the pre-migration static site. Point it at that\n` +
    `directory with LEGACY_DIR=... , or skip it if legacy/ has been deleted.`
  );
  process.exit(0);
}

if (!fs.existsSync(NEW)) {
  console.error(`No build output at ${NEW}. Run "npm run build" first.`);
  process.exit(1);
}

const RENAMED = { "/games/air-force-mission/demon-skies.html": "/games/air-force-mission/demon-skies/" };
// Grids the original built in the browser: empty in the old HTML by design.
const CLIENT_BUILT = new Set(["/games/match-the-card/", "/games/sliding-puzzle/", "/games/rubiks-cube-scramble/", "/contact/"]);

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const routeOf = (rel) =>
  rel === "index.html" ? "/" : rel.endsWith("/index.html") ? "/" + rel.slice(0, -11) + "/" : "/" + rel;

const newFileFor = (route) => {
  const r = RENAMED[route] || route;
  return path.join(NEW, (r === "/" ? "index" : r.replace(/^\/|\/$/g, "")) + ".html");
};

// structural fingerprint: tag + first class, nested, ignoring injected chrome
function skeleton($, root, depth = 0, out = []) {
  $(root).children().each((_, c) => {
    const t = c.tagName;
    if (["script", "style", "noscript", "svg", "path", "i", "br"].includes(t)) return;
    const cls = ($(c).attr("class") || "").split(" ")[0];
    out.push("  ".repeat(depth) + t + (cls ? "." + cls : ""));
    if (depth < 6) skeleton($, c, depth + 1, out);
  });
  return out;
}

const rows = [];
let fail = 0;

for (const f of walk(OLD).sort()) {
  const rel = path.relative(OLD, f);
  const route = routeOf(rel);
  if (route === "/404.html") continue; // deliberately replaced by app/not-found

  const nf = newFileFor(route);
  if (!fs.existsSync(nf)) { rows.push({ route, result: "MISSING" }); fail++; continue; }

  const $o = cheerio.load(fs.readFileSync(f, "utf8"));
  const $n = cheerio.load(fs.readFileSync(nf, "utf8"));

  const issues = [];
  const t = ($) => $("head title").text().trim();
  const d = ($) => ($('meta[name="description"]').attr("content") || "").trim();
  if (t($o) !== t($n)) issues.push("title");
  if (d($o) !== d($n)) issues.push("desc");

  const ld = ($) => $('script[type="application/ld+json"]').map((_, el) => {
    try { return JSON.parse($(el).contents().text())["@type"]; } catch { return "?"; }
  }).get().sort().join(",");
  if (ld($o) !== ld($n)) issues.push(`ld ${ld($o)} -> ${ld($n)}`);

  // strip the parts that legitimately differ (server-rendered vs client-built)
  const strip = ($) => {
    $(".site-footer, .sidebar, .auth-overlay, .exit-game-btn, .breadcrumb-nav").remove();
    $("#games-grid, #inner-games-grid").empty();
    $("#contact-form").remove();
    return $(".page-content").first();
  };
  const so = skeleton($o, strip($o)).join("\n");
  const sn = skeleton($n, strip($n)).join("\n");
  if (so !== sn) {
    issues.push("STRUCTURE");
    if (process.env.SHOW_DIFF) {
      console.log(`\n--- ${route} OLD ---\n${so}\n--- NEW ---\n${sn}`);
    }
  }

  const text = ($) => { const e = strip($); e.find("script,style").remove(); return e.text().replace(/\s+/g, " ").trim(); };
  const ot = text($o), nt = text($n);
  if (ot !== nt && !CLIENT_BUILT.has(route)) issues.push(`text ${ot.length}->${nt.length}`);

  if (issues.length) fail++;
  rows.push({ route, result: issues.length ? issues.join(" | ") : "ok" });
}

const bad = rows.filter((r) => r.result !== "ok");
console.table(bad.length ? bad : rows.slice(0, 5));
console.log(`\npages: ${rows.length}   passing: ${rows.length - fail}   failing: ${fail}`);
process.exit(fail ? 1 : 0);
