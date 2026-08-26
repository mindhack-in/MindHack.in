import "@/styles/font.css";
import "@/styles/template.css";
import "@/styles/home.css";
import "@/styles/games.css";
import "@/styles/auth.css";
import "@/styles/contact.css";

import { env, publicEnv, siteOrigin } from "@/lib/env";
import { EnvProvider } from "@/components/EnvProvider";
import { AuthModalProvider } from "@/components/AuthModal";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

export const metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: `${env.SITE_NAME} — Free Online Brain Games & Puzzles`,
    template: "%s",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <EnvProvider value={publicEnv}>
          <AuthModalProvider>
            <div className="layout">
              <Sidebar />
              {children}
            </div>
          </AuthModalProvider>
        </EnvProvider>
        <Analytics measurementId={env.GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}

