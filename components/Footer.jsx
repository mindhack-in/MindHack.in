import Link from "next/link";
import { CurrentYear } from "./CurrentYear";

const LINKS = [
  { href: "/about/", label: "About Us" },
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms of Service" },
  { href: "/contact/", label: "Contact Us" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

/** Site footer, previously appended by base.js at runtime. */
export function Footer({ siteName = "MindHack.in" }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-links">
          {LINKS.map((link, i) => (
            <span key={link.href}>
              {i > 0 ? <span className="footer-separator">|</span> : null}
              {link.href.endsWith(".xml") ? (
                <a href={link.href} className="footer-link">{link.label}</a>
              ) : (
                <Link href={link.href} className="footer-link">{link.label}</Link>
              )}
            </span>
          ))}
        </div>
        <div className="footer-copyright">
          &copy; <CurrentYear /> {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
