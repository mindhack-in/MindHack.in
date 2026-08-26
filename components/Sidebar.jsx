"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useEnv } from "./EnvProvider";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "fa-home", match: (p) => p === "/" },
  { href: "/games/", label: "Games", icon: "fa-gamepad", match: (p) => p.startsWith("/games") },
  { href: "/blog/", label: "Blog", icon: "fa-newspaper", match: (p) => p.startsWith("/blog") },
];

/** Left navigation. Logo comes from LOGO_URL in .env. */
export function Sidebar() {
  const { logoUrl, siteName } = useEnv();
  const pathname = usePathname() || "/";
  const [expanded, setExpanded] = useState(false);

  // The sidebar lives in the root layout, so it never unmounts between page
  // navigations — without this the mobile menu stayed open (looking like the
  // close button "didn't work") after tapping a nav link.
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <div className={"sidebar" + (expanded ? " active" : "")} id="sidebar">
      <div>
        <div className="sidebar-header">
          <div className="logo">
            <img src={logoUrl} alt={`${siteName} Logo`} />
          </div>
          <button
            type="button"
            className="icon-btn"
            id="sidebar-toggle"
            onClick={() => setExpanded((value) => !value)}
            aria-label={expanded ? "Close navigation" : "Open navigation"}
            aria-expanded={expanded}
            aria-controls="nav"
          >
            <i className={`fas ${expanded ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
          </button>
        </div>

        <div className="nav" id="nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={"nav-item" + (item.match(pathname) ? " active" : "")}
              onClick={() => setExpanded(false)}
            >
              <i className={`fas ${item.icon}`} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
