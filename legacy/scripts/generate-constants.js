#!/usr/bin/env node
/**
 * Reads key=value pairs from .env (project root) and generates
 * utility/js/constants.js as an ES module.
 *
 * Usage:
 *   node scripts/generate-constants.js
 *   npm run build:env
 *
 * Do NOT hand-edit utility/js/constants.js — edit .env and regenerate instead.
 */
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(rootDir, ".env");
const outPath = path.join(rootDir, "utility", "js", "constants.js");

if (!fs.existsSync(envPath)) {
  console.error(
    `Missing .env file at ${envPath}. Copy .env.example to .env first.`
  );
  process.exit(1);
}

function parseEnv(content) {
  const result = {};
  content.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;
    const eq = line.indexOf("=");
    if (eq === -1) return;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  });
  return result;
}

const env = parseEnv(fs.readFileSync(envPath, "utf8"));

const required = [
  "SITE_URL",
  "IFRAME_LINK",
  "DYNAMIC_RESOURCE",
  "LOGO_URL",
  "SUPPORT_EMAIL",
];
const missing = required.filter((key) => !env[key]);
if (missing.length) {
  console.error(`Missing required keys in .env: ${missing.join(", ")}`);
  process.exit(1);
}

const output = `// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Generated from .env by scripts/generate-constants.js
// To change these values, edit .env and run: npm run build:env

export const url = "${env.SITE_URL}";
export const iframeLink = "${env.IFRAME_LINK}";
export const dynamicResource = "${env.DYNAMIC_RESOURCE}";
export const logoUrl = "${env.LOGO_URL}";
export const supportEmail = "${env.SUPPORT_EMAIL}";
`;

fs.writeFileSync(outPath, output);
console.log(`Generated ${path.relative(rootDir, outPath)} from .env`);
