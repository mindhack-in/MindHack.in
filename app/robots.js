import { siteOrigin } from "@/lib/env";

/** Generates /robots.txt, pointing at the generated sitemap. */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
