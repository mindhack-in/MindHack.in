import Link from "next/link";
import { env } from "@/lib/env";

export const metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: true },
};

/**
 * Replaces the old 404.html, which used a meta-refresh redirect to the home
 * page. A real 404 with a link is better for crawlers and for humans.
 */
export default function NotFound() {
  return (
    <div className="page-content">
      <section id="contentSection" style={{ textAlign: "center", paddingTop: "80px" }}>
        <img
          src={env.LOGO_URL}
          alt={`${env.SITE_NAME} Logo`}
          style={{ maxWidth: "180px", marginBottom: "24px" }}
        />
        <h1>Page not found</h1>
        <p>The page you were looking for doesn&apos;t exist or has moved.</p>
        <p style={{ marginTop: "24px" }}>
          <Link href="/" className="play-btn">Back to home</Link>{" "}
          <Link href="/games/" className="play-btn">Browse all games</Link>
        </p>
      </section>
    </div>
  );
}
