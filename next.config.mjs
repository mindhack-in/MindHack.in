// Derived at build/start time from .env, so the CSP tracks wherever the
// iframes, artwork and login backend actually live instead of drifting out
// of sync the way the old plain-text values would have.
function originOf(url, fallback) {
  try {
    return new URL(url).origin;
  } catch {
    return fallback;
  }
}

const iframeOrigin = originOf(process.env.IFRAME_LINK, "https://mindhack-in.github.io");
const dynamicOrigin = originOf(process.env.DYNAMIC_RESOURCE, "https://mindhack-in.github.io");
const apiOrigin = originOf(process.env.API_BASE_URL, "");

// Next.js's own bootstrap script and the GA inline snippet in
// components/Analytics.jsx both render as inline <script> tags without a
// nonce, and the migrated page bodies lean on inline style="" throughout —
// so 'unsafe-inline' on script-src/style-src is a deliberate, pragmatic
// baseline here, not an oversight. It still blocks the thing that actually
// matters for a site embedding third-party iframes and offering account
// creation: arbitrary *other-origin* script, frame and connect endpoints.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdnjs.cloudflare.com`,
  `style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com`,
  "font-src 'self' https://cdnjs.cloudflare.com data:",
  `img-src 'self' data: ${dynamicOrigin}`,
  `frame-src 'self' ${iframeOrigin}`,
  `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com${apiOrigin ? " " + apiOrigin : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve the original URL shape (/games/sudoku/) so existing rankings and
  // backlinks keep resolving without redirects.
  trailingSlash: true,
  reactStrictMode: true,

  // next/image needs external hosts allowlisted before it will optimize
  // (resize/re-encode to WebP/AVIF) images served from them. Game artwork
  // and thumbnails all live on DYNAMIC_RESOURCE, currently GitHub Pages.
  images: {
    remotePatterns: dynamicOrigin
      ? [{ protocol: new URL(dynamicOrigin).protocol.replace(":", ""), hostname: new URL(dynamicOrigin).hostname }]
      : [],
  },

  // Hide the dev-only "Static route" indicator badge that Next.js overlays
  // in the bottom-left corner — it was sitting on top of the sidebar's
  // Login / signup button.
  devIndicators: {
    appIsrStatus: false,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        // The only page that used to live at a .html URL. Now a directory URL,
        // consistent with every other game, with the old path redirected.
        source: "/games/air-force-mission/demon-skies.html",
        destination: "/games/air-force-mission/demon-skies/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
