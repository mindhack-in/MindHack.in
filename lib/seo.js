/**
 * Converts a migrated page's metadata into a Next.js Metadata object, so the
 * original <title>, canonical, Open Graph and Twitter tags survive the port —
 * only now every URL is derived from SITE_URL in .env.
 */
import { env, siteOrigin } from "./env";

export function buildMetadata(meta) {
  const canonical = meta.canonical || siteOrigin + meta.route;
  const og = meta.og || {};
  const twitter = meta.twitter || {};

  return {
    metadataBase: new URL(siteOrigin),
    title: meta.title || env.SITE_NAME,
    description: meta.description || undefined,
    alternates: { canonical },
    openGraph: {
      type: og.type || "website",
      url: og.url || canonical,
      title: og.title || meta.title || undefined,
      description: og.description || meta.description || undefined,
      siteName: env.SITE_NAME,
      locale: env.SITE_LOCALE,
      images: og.image ? [{ url: og.image }] : [{ url: env.LOGO_URL }],
    },
    twitter: {
      card: twitter.card || "summary_large_image",
      title: twitter.title || meta.title || undefined,
      description: twitter.description || meta.description || undefined,
      images: twitter.image ? [twitter.image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}
