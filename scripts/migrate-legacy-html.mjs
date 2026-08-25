#!/usr/bin/env node
/**
 * ONE-TIME MIGRATION — kept for provenance and re-runs.
 *
 * Reads the original static site (now in legacy/) and regenerates the content
 * layer in content/: one .json of metadata plus one .html body per route.
 *
 * While reading, it rewrites every hardcoded URL into a {{TOKEN}}
 * (SITE_URL, IFRAME_LINK, DYNAMIC_RESOURCE, LOGO_URL, SUPPORT_EMAIL,
 * API_BASE_URL) which lib/env.js resolves from .env at render time — that is
 * what makes the whole site configurable from one file.
 *
 * Interactive chrome (breadcrumbs, game iframe, game grid) is replaced with
 * <!--@MARKER@--> comments that components/PageContent.jsx fills with React
 * components, preserving the original source order of every page.
 *
 * Usage:  node scripts/migrate-legacy-html.mjs
 * Requires cheerio:  npm i -D cheerio
 */
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const ROOT = process.cwd();
const SRC = process.env.LEGACY_DIR || path.join(ROOT, "legacy");
const APP = process.env.OUT_APP || ROOT;
const CONTENT = path.join(APP, "content", "pages");
fs.rmSync(CONTENT, { recursive: true, force: true });
fs.mkdirSync(CONTENT, { recursive: true });

const TOKENS = [
  [/https:\/\/mindhack-in\.github\.io\/mindhack\.in\.dynamic\/logo\.png/g, "{{LOGO_URL}}"],
  [/https:\/\/mindhack-in\.github\.io\/mindhack\.in\.dynamic\/dynamic\//g, "{{DYNAMIC_RESOURCE}}"],
  [/https:\/\/mindhack-in\.github\.io\/mindhack\.in\.frontend\/iframes\//g, "{{IFRAME_LINK}}"],
  [/https:\/\/mindhack-in-backend-137262061877\.asia-south1\.run\.app/g, "{{API_BASE_URL}}"],
  [/support@mindhack\.in/g, "{{SUPPORT_EMAIL}}"],
  [/https:\/\/mindhack\.in\//g, "{{SITE_URL}}"],
  [/https:\/\/mindhack\.in/g, "{{SITE_URL}}"],
];
const tok = (s) => (typeof s === "string" ? TOKENS.reduce((a, [re, t]) => a.replace(re, t), s) : s);
const renameUrls = (s) =>
  typeof s === "string"
    ? s.replace(/games\/air-force-mission\/demon-skies\.html/g, "games/air-force-mission/demon-skies/")
    : s;
const tokDeep = (v) =>
  typeof v === "string" ? renameUrls(tok(v))
  : Array.isArray(v) ? v.map(tokDeep)
  : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, tokDeep(x)]))
  : v;

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (["node_modules", ".git", ".vscode", ".claude", "legacy"].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

// The one page that lived at a .html URL is normalised to a directory URL,
// consistent with every other game. next.config.mjs 301-redirects the old path.
const ROUTE_OVERRIDES = {
  "/games/air-force-mission/demon-skies.html": "/games/air-force-mission/demon-skies/",
};

const pages = [];
for (const f of walk(SRC).sort()) {
  const rel = path.relative(SRC, f);
  if (rel === "404.html") continue; // replaced by app/not-found.jsx
  let route;
  if (rel === "index.html") route = "/";
  else if (rel.endsWith("/index.html")) route = "/" + rel.slice(0, -"/index.html".length) + "/";
  else route = "/" + rel;
  const originalRoute = route;
  if (ROUTE_OVERRIDES[route]) route = ROUTE_OVERRIDES[route];

  const $ = cheerio.load(fs.readFileSync(f, "utf8"), { decodeEntities: false });

  // ---- breadcrumbs -> data, replaced by marker
  let breadcrumbs = null;
  const bc = $(".breadcrumb-nav").first();
  if (bc.length) {
    breadcrumbs = bc.find(".breadcrumb-item").map((_, li) => {
      const a = $(li).find("a").first();
      return { label: $(li).text().trim(), href: a.length ? tok(a.attr("href")) : null };
    }).get();
    bc.replaceWith("<!--@BREADCRUMBS@-->");
  }

  // ---- game iframe -> data, replaced by marker
  let gameFrame = null;
  const ifr = $("#game-link-iframe").first();
  if (ifr.length) {
    const section = ifr.closest("section");
    gameFrame = { title: ifr.attr("title") || null, iframeStyle: section.attr("style") || null };
    (section.length ? section : ifr).replaceWith("<!--@GAMEFRAME@-->");
  }

  // ---- games grid -> marker (only the grid itself; the surrounding section,
  // its heading and any copy stay in the prose exactly where they were)
  let gameGrid = null;
  const grid = $("#games-grid").first();
  if (grid.length) {
    gameGrid = { gridClass: grid.attr("class") || "games-grid" };
    grid.replaceWith("<!--@GAMEGRID@-->");
  }

  const pc = $(".page-content");
  const bodyHtml = renameUrls(tok((pc.html() ?? "").replace(/\n{3,}/g, "\n\n").trim()));

  const cfg = (() => {
    const s = $("script:not([src])").map((_, el) => $(el).html()).get().find((x) => x && x.includes("window.pageConfig"));
    if (!s) return {};
    const m = s.match(/window\.pageConfig\s*=\s*(\{[\s\S]*?\})\s*;?/);
    try { return m ? eval("(" + m[1] + ")") : {}; } catch { return {}; }
  })();

  const og = {}, tw = {};
  $('meta[property^="og:"]').each((_, el) => { og[$(el).attr("property").slice(3)] = renameUrls(tok($(el).attr("content"))); });
  $('meta[name^="twitter:"]').each((_, el) => { tw[$(el).attr("name").slice(8)] = renameUrls(tok($(el).attr("content"))); });

  const meta = {
    route,
    title: $("head title").text().trim() || null,
    description: $('meta[name="description"]').attr("content")?.trim() || null,
    canonical: renameUrls(tok($('link[rel="canonical"]').attr("href") || `{{SITE_URL}}${route.replace(/^\//, "")}`)),
    og, twitter: tw,
    jsonLd: $('script[type="application/ld+json"]').map((_, el) => {
      try { return tokDeep(JSON.parse($(el).contents().text())); } catch { return null; }
    }).get().filter(Boolean),
    pageType: cfg.pageType ?? null,
    gameLink: cfg.gameLink ? tok(cfg.gameLink) : null,
    // Rubik's Cube variant pages (2X2..7X7) all embed the same iframe app and
    // tell it which cube size to render via postMessage after load — see
    // GameFrame.jsx. Everything else leaves this null.
    size: cfg.size ?? null,
    excludeGame: cfg.name ?? null,
    pageContentClass: pc.attr("class") || "page-content",
    breadcrumbs, gameFrame, gameGrid,
  };

  const slug = route === "/" ? "index" : route.replace(/^\/|\/$/g, "").replace(/\//g, "__");
  fs.writeFileSync(path.join(CONTENT, slug + ".json"), JSON.stringify(meta, null, 2));
  fs.writeFileSync(path.join(CONTENT, slug + ".html"), bodyHtml);
  pages.push({ route, slug, segments: route === "/" ? [] : route.replace(/^\/|\/$/g, "").split("/") });
}

fs.writeFileSync(path.join(APP, "content", "routes.json"), JSON.stringify(pages, null, 2));
console.log("routes written:", pages.length);
console.log(pages.map(p => p.route).join("\n"));
