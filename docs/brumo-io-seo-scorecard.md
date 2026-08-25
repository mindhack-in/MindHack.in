# SEO Scorecard: brumo.io

**Date:** 2026-08-06
**Assessed by:** SEO Scorer Agent
**Site Type:** Client-side rendered SPA (likely React/Vite — internal build name `ig-automation-fe` suggests an Instagram automation product)
**Pages Sampled:** `/`, `/pricing`, `/login`, `/about`, `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/manifest.json`

**Context flag:** This is a pre-launch/very new site with zero search footprint (confirmed — see Section 5 and 10). Scores below are evidence-based per the rubric, but the report distinguishes **"expected for day one"** (off-page authority, backlinks) from **"avoidable regardless of age"** (missing title tags, no robots.txt) — the latter is what should get fixed before any launch push.

**Methodology note:** No JS-rendering tool (headless browser) was available in this session — `list_connected_browsers` returned empty, and direct `curl` access to brumo.io is blocked by this sandbox's network allowlist. All findings below are based on the raw HTML/response actually delivered to a non-JS-executing client (i.e., what a basic crawler, social-media unfurler, or `curl` sees) plus public search-index signals. This is a legitimate and important thing to test — it's exactly what unrendered crawlers and every social platform's link-preview bot will see — but it cannot speak to what the page looks like *after* JavaScript executes. That gap is flagged per-category below.

---

## Overall Score: 16/100 — Critical

## Score Breakdown

| # | Category | Score | Weight | Weighted | Grade |
|---|----------|-------|--------|----------|-------|
| 1 | On-Page SEO | 5 | 15% | 0.75 | Critical |
| 2 | Content Quality & Relevance | 10 | 15% | 1.50 | Critical |
| 3 | Technical SEO & Crawlability | 3 | 15% | 0.45 | Critical |
| 4 | Site Architecture & Internal Linking | 5 | 10% | 0.50 | Critical |
| 5 | Off-Page SEO & Authority | 15 | 15% | 2.25 | Critical (expected at this stage) |
| 6 | Core Web Vitals & Performance | 45 | 10% | 4.50 | Below Average (unverified) |
| 7 | Mobile & UX | 40 | 8% | 3.20 | Below Average (partially verified) |
| 8 | Structured Data & Rich Results | 0 | 5% | 0.00 | Critical |
| 9 | Security & Trust | 60 | 4% | 2.40 | Adequate |
| 10 | Indexation, Analytics & Local SEO | 10 | 3% | 0.30 | Critical (expected at this stage) |
| | **Composite** | | **100%** | **15.85 → 16** | **Critical** |

---

## Detailed Findings

### 1. On-Page SEO — 5/100 (Critical)

**Strengths:**
- The viewport meta tag is present and correctly configured (`width=device-width, initial-scale=1.0`) on every page tested.

**Weaknesses:**
- Every single URL tested (`/`, `/pricing`, `/login`, `/about`) returns the **identical** `<title>ig-automation-fe</title>` — an internal build/project name, not a branded, keyword-relevant title. No page has a unique title.
- **Zero `<meta name="description">` tags found anywhere.** Every route's raw HTML contains only the viewport tag and the generic title.
- No H1 or heading structure is present in the static HTML on any route — headings, if they exist, are injected client-side and invisible to any client that doesn't execute JavaScript.
- No visible URL-slug strategy can be assessed yet since `/pricing`, `/login`, `/about` all serve the same document (see Section 3).

**Score Justification:** Zero differentiated titles, zero meta descriptions, across every page sampled. This is the cheapest, fastest fix available and isn't excused by the site being new — it costs nothing to ship a real title/description on day one.

---

### 2. Content Quality & Relevance — 10/100 (Critical, low-confidence)

**Strengths:**
- N/A — no assessable content in the delivered HTML.

**Weaknesses:**
- The raw document delivered for every route contains no body text, no product description, no value proposition — nothing a search engine's initial fetch would see as content.

**Score Justification:** Cannot rule out that the *rendered* app (post-JavaScript) has strong content — that's outside what this session can verify. But from an SEO standpoint, content that only exists after client-side JS execution is a real risk: it depends entirely on Googlebot successfully rendering the page in its (delayed, budget-limited) second rendering pass. Scored low to reflect that current risk, not to claim the product copy itself is bad. **Recommend verifying with Google Search Console's URL Inspection tool (Live Test → "View Crawled Page") once GSC is set up**, to see exactly what Googlebot's renderer captures.

---

### 3. Technical SEO & Crawlability — 3/100 (Critical)

**Strengths:**
- HTTPS resolves cleanly with no certificate errors on every route tested.

**Weaknesses:**
- **`/robots.txt` does not exist as a real file.** Requesting it returns `Content-Type: text/html` and the same SPA shell (`title: ig-automation-fe`) as every other route — there is no robots directive being served at all.
- **`/sitemap.xml` has the same problem** — it 200s with the SPA's HTML shell instead of XML, meaning there is no machine-readable sitemap for search engines to consume.
- The SPA's catch-all routing serves the identical document for `/`, `/pricing`, `/login`, `/about`, and even for `/favicon.ico` and `/manifest.json` — static-asset requests that should 404 or serve real files are instead being swallowed by the app shell. This wastes crawl budget and signals to crawlers that the site may be one giant duplicate page.
- No canonical tags are present in the static HTML (though this can't be fully ruled out for client-injected canonicals without a rendering tool).

**Score Justification:** No valid robots.txt, no valid sitemap, and no route differentiation at the HTTP level. This is close to the technical floor — before any content or backlink work matters, crawlers need something to actually crawl.

---

### 4. Site Architecture & Internal Linking — 5/100 (Critical, low-confidence)

**Strengths:**
- N/A

**Weaknesses:**
- No `<a href>` elements are present in the raw HTML of any sampled route — navigation and internal links are rendered client-side only, invisible to a non-JS crawler pass.
- Because every URL returns the same document, there's no way to verify from source whether pages like `/pricing` or `/login` are even reachable via on-page links versus only by direct URL entry.

**Score Justification:** Same rendering caveat as Section 2 applies — the app may have a perfectly sensible nav once rendered. But as delivered, there is no crawlable link graph at all.

---

### 5. Off-Page SEO & Authority — 15/100 (Critical — but expected for a pre-launch site)

**Strengths:**
- No spam or toxic link exposure (unsurprising — there's no link profile yet at all).

**Weaknesses:**
- Zero backlinks, zero brand mentions, and no presence found on Twitter/X, Product Hunt, GitHub, LinkedIn, or any review/directory site (checked via web search).
- `site:brumo.io` returns **no indexed pages whatsoever** — the domain has no search-engine footprint at all yet.

**Score Justification:** Scored per the rubric, but this is the one category where the score should **not** trigger urgency. A brand-new, unlaunched product having zero backlinks and zero mentions is completely normal — there's nothing to fix here yet, only things to plan for a launch (Product Hunt, initial outreach, founder posts) once the on-page/technical basics in Sections 1 and 3 are fixed.

---

### 6. Core Web Vitals & Performance — 45/100 (Below Average, unverified)

**Strengths:**
- The initial document is extremely small (just the shell), which typically means a fast Time-to-First-Byte.

**Weaknesses:**
- Could not run Lighthouse or PageSpeed Insights from this session (no browser connected, sandbox network allowlist blocks direct requests to brumo.io). LCP, INP, and CLS are **not independently verified**.
- A fully client-side-rendered app with no visible content in the initial HTML commonly produces a poor Largest Contentful Paint, since the browser must download and execute the JS bundle before anything meaningful paints — this is a real risk pattern for this architecture, not a confirmed measurement.

**Score Justification:** Scored as a caveated mid-range estimate rather than a confirmed number, per the pattern risk of unoptimized CSR apps. **Treat this score as provisional — run PageSpeed Insights (pagespeed.web.dev) against the live URL for real numbers before acting on this section.**

---

### 7. Mobile & UX — 40/100 (Below Average, partially verified)

**Strengths:**
- Correct viewport meta tag confirmed on every route, which is the single most important mobile-rendering signal and it's done right.

**Weaknesses:**
- Tap target sizing, layout stability, and interstitials cannot be assessed without rendering the page.

**Score Justification:** One clear pass (viewport), everything else unverified — scored below the midpoint to reflect that "unverified" isn't the same as "acceptable," but the one thing that is confirmed is genuinely correct.

---

### 8. Structured Data & Rich Results — 0/100 (Critical)

**Strengths:**
- None found.

**Weaknesses:**
- No schema.org JSON-LD of any kind on any tested route.
- **No Open Graph or Twitter Card tags at all.** This is a real, confirmable finding (not a rendering-dependent one — social platforms' unfurlers don't execute JS): sharing a brumo.io link on Twitter, LinkedIn, or in an Instagram DM right now will produce a bare link with no title, description, or preview image.

**Score Justification:** Straightforward zero — nothing found, and unlike the content/architecture sections, this one doesn't have a "maybe it's rendered client-side" excuse, since OG/Twitter tags must be in the initial HTML `<head>` to work at all.

---

### 9. Security & Trust — 60/100 (Adequate)

**Strengths:**
- HTTPS enforced cleanly across every route tested, no mixed-content or certificate issues observed.

**Weaknesses:**
- No privacy policy, terms of service, or contact information visible in the static HTML on any route (may exist behind a client-rendered route not discoverable without navigation).

**Score Justification:** HTTPS fundamentals are solid. Held back from a higher score only because trust-page transparency couldn't be confirmed — worth a quick manual check once the app is browsable.

---

### 10. Indexation, Analytics & Local SEO — 10/100 (Critical — expected at this stage)

**Strengths:**
- N/A

**Weaknesses:**
- Zero indexed pages found via `site:brumo.io`.
- No way to verify Search Console or analytics setup without dashboard access (not tested — no claim either way).
- Not a location-based business, so Google Business Profile/NAP is not applicable.

**Score Justification:** Like Section 5, near-zero here is the expected default for a site with no sitemap yet and no launch push — not a distinct problem to solve today, but the natural next step once Sections 1 and 3 are fixed.

---

## Top 5 Recommendations (Priority Order)

1. **Ship real `<title>` and `<meta name="description">` tags** for at least the marketing routes (`/`, `/pricing`, `/about`) — every route currently exposes the literal internal build name `ig-automation-fe` with no description. This is the single cheapest fix on this list and should happen before any other SEO work.
2. **Serve a real, valid `robots.txt` and `sitemap.xml` as static text/XML files**, not the SPA's HTML shell. Right now both return `Content-Type: text/html` with the app shell — search engines have no crawl directives and no page inventory to work from.
3. **Move marketing/landing pages to server-side rendering or prerendering** (e.g., Next.js, Vite's SSG plugin, or a prerender service like react-snap/Prerender.io) so the raw HTML delivered to crawlers and social unfurlers contains real content instead of an empty shell. The app portion (dashboard, login) can safely stay client-rendered — it's the public-facing marketing pages that need this.
4. **Add Open Graph and Twitter Card meta tags** to the `<head>` of the marketing pages. For a product built around Instagram/social automation, broken link previews when people share it on social platforms is a particularly direct hit to growth.
5. **Once #1-4 ship, set up Google Search Console and Bing Webmaster Tools**, submit the (now-real) sitemap, and request indexing. Right now there is nothing for either tool to meaningfully index.

---

## Risk Assessment

| Risk | Severity | Affected Area | Mitigation |
|------|----------|---------------|------------|
| Marketing pages render as an empty shell to non-JS crawlers | Critical | Technical / Content | Prerender or SSR the public marketing routes |
| No robots.txt / sitemap.xml served | Critical | Technical | Serve real static files at those paths, not the SPA fallback |
| Every route (including static asset paths like `/favicon.ico`, `/manifest.json`) returns identical content | High | Technical | Fix SPA routing/server config so only real app routes hit the JS fallback |
| No Open Graph/Twitter tags — broken social link previews | High | Structured Data | Add OG/Twitter meta tags to `<head>` |
| Generic, unbranded `<title>` publicly exposed on every page | Medium | On-Page | Replace with real, keyword-relevant titles per page |
| Zero search-engine indexation and zero backlinks | Low (expected pre-launch) | Off-Page / Indexation | Normal for now — revisit after #1-5 above ship and a launch push begins |

---

*Note on scope: this audit reflects what's observable from outside the app (raw HTTP responses and public search signals) in a session without headless-browser access. A follow-up pass with a connected browser (to run Lighthouse, inspect the rendered DOM, and check Search Console's rendered view) would sharpen Sections 2, 4, 6, and 7 considerably — everything else in this report is confirmed, not estimated.*
