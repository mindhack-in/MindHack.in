import { getRoutes } from "@/lib/content";
import { siteOrigin } from "@/lib/env";

/**
 * Generates /sitemap.xml from the real route list, so it can never drift out of
 * sync with the site again. Every URL is built from SITE_URL in .env.
 */
export default function sitemap() {
  const now = new Date();

  const priorityFor = (route) => {
    if (route === "/") return 1.0;
    if (route === "/games/" || route === "/blog/") return 0.9;
    if (route.startsWith("/games/")) return 0.8;
    if (route.startsWith("/blog/")) return 0.7;
    return 0.5;
  };

  return getRoutes().map((route) => ({
    url: siteOrigin + route.route,
    lastModified: now,
    changeFrequency: route.route.startsWith("/blog/") ? "monthly" : "weekly",
    priority: priorityFor(route.route),
  }));
}
