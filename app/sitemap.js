import fs from "node:fs";
import path from "node:path";
import { getRoutes, getPage } from "@/lib/content";
import { siteOrigin } from "@/lib/env";

const PAGES_DIR = path.join(process.cwd(), "content", "pages");

/**
 * Generates /sitemap.xml from the real route list, so it can never drift out of
 * sync with the site again. Every URL is built from SITE_URL in .env.
 *
 * lastModified used to be a single build-time timestamp shared by all 45 URLs —
 * accurate for nothing and misleading for everything. Now it's real per-page
 * data: blog posts use their own dateModified from the BlogPosting JSON-LD
 * (the same date already shown on /blog/), and every other page falls back to
 * its content file's mtime on disk, so editing a page's copy also bumps its
 * sitemap date.
 */
function lastModifiedFor(route) {
  const page = getPage(route.segments);
  const blogPosting = (page?.meta?.jsonLd || []).find(
    (node) => node["@type"] === "BlogPosting"
  );
  if (blogPosting?.dateModified) return new Date(blogPosting.dateModified);

  try {
    return fs.statSync(path.join(PAGES_DIR, route.slug + ".json")).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap() {
  const priorityFor = (route) => {
    if (route === "/") return 1.0;
    if (route === "/games/" || route === "/blog/") return 0.9;
    if (route.startsWith("/games/")) return 0.8;
    if (route.startsWith("/blog/")) return 0.7;
    return 0.5;
  };

  return getRoutes().map((route) => ({
    url: siteOrigin + route.route,
    lastModified: lastModifiedFor(route),
    changeFrequency: route.route.startsWith("/blog/") ? "monthly" : "weekly",
    priority: priorityFor(route.route),
  }));
}
