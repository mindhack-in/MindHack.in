import { notFound } from "next/navigation";
import { getPage, getRoutes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { env } from "@/lib/env";
import { PageContent } from "@/components/PageContent";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";

/**
 * One route handler for every content page on the site.
 *
 * The URL list comes from content/routes.json, produced by the migration, so
 * every original URL (including /games/air-force-mission/demon-skies.html)
 * still resolves at exactly the same path.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getRoutes().map((route) => ({
    slug: route.segments.length ? route.segments : undefined,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug || []);
  if (!page) return {};
  return buildMetadata(page.meta);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = getPage(slug || []);
  if (!page) notFound();

  const { meta, html } = page;

  return (
    <div className={meta.pageContentClass || "page-content"}>
      <JsonLd blocks={meta.jsonLd} />
      <PageContent meta={meta} html={html} />
      <Footer siteName={`${env.SITE_NAME}.in`} />
    </div>
  );
}
