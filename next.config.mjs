/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve the original URL shape (/games/sudoku/) so existing rankings and
  // backlinks keep resolving without redirects.
  trailingSlash: true,
  reactStrictMode: true,

  // Hide the dev-only "Static route" indicator badge that Next.js overlays
  // in the bottom-left corner — it was sitting on top of the sidebar's
  // Login / signup button.
  devIndicators: {
    appIsrStatus: false,
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
