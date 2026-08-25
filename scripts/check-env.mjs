#!/usr/bin/env node
/**
 * Verifies .env has everything the site needs. Run with: npm run check:env
 * Useful before a deploy, and as a CI step.
 */
import fs from "node:fs";
import path from "node:path";

const REQUIRED = ["SITE_URL", "IFRAME_LINK", "DYNAMIC_RESOURCE", "LOGO_URL", "SUPPORT_EMAIL"];
const OPTIONAL = ["API_BASE_URL", "GA_MEASUREMENT_ID", "SITE_NAME", "SITE_LOCALE"];

const envPath = path.join(process.cwd(), ".env");
const values = { ...process.env };

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!values[key]) values[key] = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  }
} else {
  console.warn("No .env file found — relying on the process environment.\n");
}

const missing = REQUIRED.filter((key) => !values[key]);
for (const key of [...REQUIRED, ...OPTIONAL]) {
  const value = values[key];
  const status = value ? "ok  " : REQUIRED.includes(key) ? "MISS" : "--  ";
  console.log(`[${status}] ${key.padEnd(18)} ${value || ""}`);
}

if (values.SITE_URL && !values.SITE_URL.endsWith("/")) {
  console.warn("\nWarning: SITE_URL should end with a trailing slash.");
}

if (missing.length) {
  console.error(`\nMissing required keys: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("\nEnvironment looks good.");
