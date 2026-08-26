/**
 * Loads the migrated page content from /content.
 *
 * Each page is a pair of files:
 *   content/pages/<slug>.json  — title, description, canonical, OG/Twitter,
 *                                JSON-LD, breadcrumbs and layout flags
 *   content/pages/<slug>.html  — the page body, with <!--@MARKER@--> holes
 *                                where interactive React components mount
 *
 * URLs inside both files are stored as {{TOKENS}} and resolved from .env.
 */
import fs from "node:fs";
import path from "node:path";
import { interpolate } from "./env";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");

export const routes = JSON.parse(
  fs.readFileSync(path.join(CONTENT_DIR, "routes.json"), "utf8")
);

/** Turns URL segments into the slug used for content filenames. */
function slugFor(segments = []) {
  return segments.length === 0 ? "index" : segments.join("__");
}

export function getRoutes() {
  return routes;
}

/** Returns { meta, html } for a route, or null when the route is unknown. */
export function getPage(segments = []) {
  const slug = slugFor(segments);
  const metaPath = path.join(PAGES_DIR, slug + ".json");
  const htmlPath = path.join(PAGES_DIR, slug + ".html");
  if (!fs.existsSync(metaPath)) return null;

  const meta = interpolate(JSON.parse(fs.readFileSync(metaPath, "utf8")));
  const html = interpolate(fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, "utf8") : "");
  return { meta, html };
}
