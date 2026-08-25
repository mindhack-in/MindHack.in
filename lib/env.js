/**
 * Single source of truth for every configurable value on the site.
 *
 * All values come from the environment (.env locally, project settings on
 * Vercel/Netlify). Nothing here is hardcoded, and no other module should read
 * `process.env` directly — import `env` instead.
 *
 * This module is server-only. Client components receive the same values
 * through <EnvProvider> in app/layout.jsx, so a browser bundle never needs a
 * NEXT_PUBLIC_ prefix and secrets are never accidentally shipped.
 */

const DEFAULTS = {
  SITE_URL: "http://localhost:3000/",
  IFRAME_LINK: "",
  DYNAMIC_RESOURCE: "",
  LOGO_URL: "",
  SUPPORT_EMAIL: "",
  API_BASE_URL: "",
  CONTACT_FORM_ENDPOINT: "",
  GA_MEASUREMENT_ID: "",
  SITE_NAME: "MindHack",
  SITE_LOCALE: "en_IN",
};

// Keys the site cannot render correctly without.
const REQUIRED = ["SITE_URL", "IFRAME_LINK", "DYNAMIC_RESOURCE", "LOGO_URL", "SUPPORT_EMAIL"];

function withTrailingSlash(value) {
  return value.endsWith("/") ? value : value + "/";
}

function read() {
  const resolved = {};
  for (const key of Object.keys(DEFAULTS)) {
    const value = process.env[key];
    resolved[key] = value === undefined || value === "" ? DEFAULTS[key] : value.trim();
  }

  const missing = REQUIRED.filter((key) => !resolved[key]);
  if (missing.length) {
    const message =
      `Missing required environment variables: ${missing.join(", ")}. ` +
      `Copy .env.example to .env and fill them in (or set them in your hosting provider).`;
    // Fail loudly at build time; warn (but keep rendering) in development.
    if (process.env.NODE_ENV === "production") throw new Error(message);
    console.warn("[env] " + message);
  }

  resolved.SITE_URL = withTrailingSlash(resolved.SITE_URL);
  resolved.DYNAMIC_RESOURCE = resolved.DYNAMIC_RESOURCE ? withTrailingSlash(resolved.DYNAMIC_RESOURCE) : "";
  resolved.IFRAME_LINK = resolved.IFRAME_LINK ? withTrailingSlash(resolved.IFRAME_LINK) : "";
  resolved.API_BASE_URL = resolved.API_BASE_URL.replace(/\/$/, "");
  return resolved;
}

export const env = read();

/** Origin without the trailing slash — handy for metadataBase and canonicals. */
export const siteOrigin = env.SITE_URL.replace(/\/$/, "");

/**
 * Values safe to hand to client components. Keep this list explicit: anything
 * added here is visible in the browser.
 */
export const contactFormConfigured =
  Boolean(env.CONTACT_FORM_ENDPOINT) && !/YOUR_FORM_ID/i.test(env.CONTACT_FORM_ENDPOINT);

export const publicEnv = {
  siteUrl: env.SITE_URL,
  iframeLink: env.IFRAME_LINK,
  dynamicResource: env.DYNAMIC_RESOURCE,
  logoUrl: env.LOGO_URL,
  supportEmail: env.SUPPORT_EMAIL,
  apiBaseUrl: env.API_BASE_URL,
  contactFormEndpoint: env.CONTACT_FORM_ENDPOINT,
  contactFormConfigured,
  siteName: env.SITE_NAME,
};

/**
 * Replaces {{TOKEN}} placeholders in migrated content with live env values.
 * The migration rewrote every hardcoded https://mindhack.in/ and asset-host URL
 * into a token, so changing .env changes every link, image and schema URL.
 */
export function interpolate(value) {
  if (typeof value === "string") {
    return value.replace(/\{\{(\w+)\}\}/g, (match, key) =>
      key in env ? env[key] : match
    );
  }
  if (Array.isArray(value)) return value.map(interpolate);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, interpolate(v)]));
  }
  return value;
}

/** Builds an absolute site URL from a root-relative path. */
export function absoluteUrl(pathname = "/") {
  return siteOrigin + (pathname.startsWith("/") ? pathname : "/" + pathname);
}

/** Builds an asset URL on the external media host. */
export function assetUrl(relativePath = "") {
  return env.DYNAMIC_RESOURCE + relativePath.replace(/^\//, "");
}
