# SEO Scorecard: mindhack.in

**Date:** 2026-08-02
**Assessed by:** SEO Scorer Agent (`.claude/agents/seo-scorer.md`)
**Site Type:** Static HTML, browser-based casual/brain-training games (GitHub Pages + custom domain `mindhack.in`, working branch `mindhack3.1`)
**Pages Sampled:** Homepage, `/games/`, `/about/`, `/games/sudoku/`, `/games/2048/`, `/games/rubiks-cube-scramble/` (+ 5 size variants), `/games/sliding-puzzle/` (+ 8 size variants), `/games/flappy-bird/`, `/games/pacman/`, `/games/match-the-card/` (+ 9 category variants), `/games/air-force-mission/demon-skies.html`, plus `robots.txt` and `sitemap.xml` (36 HTML files total, live + source compared)
**Prior analysis incorporated:** `seo-scorecard.md` (2026-06-08 audit, scored 47/100) and `mindhack-seo-sprint-tasks-updated.csv` (74-item tracker, ~40 items marked "Complete"). This audit verifies those claims against current source and live site rather than re-discovering the same issues from scratch.

---

## Overall Score: 49/100 — Below Average

*(Revised 2026-08-03: corrected two false negatives from the original pass — a site-wide footer and GA4 tracking both exist but are injected via JavaScript, so they were invisible to static-HTML-only grepping. See the correction notes in Sections 4 and 10. Composite moved from 47 to 49; the overall picture is unchanged.)*

> Net score is effectively unchanged from the June audit (49 vs. 42.9), but the *composition* has shifted. On-page fundamentals, breadcrumbs, structured data, and (as corrected) analytics have genuinely improved and are confirmed live. What's holding the score down now is different: a real production deployment inconsistency (some already-fixed pages aren't live), a template bug that mixes three different games' metadata on one page, near-zero Google indexation despite good technical hygiene, zero off-page authority, and a site-wide footer whose legal-page links are all dead. The engineering work on individual pages is mostly done — it isn't reliably reaching users or Google yet, and a few of its own links point nowhere.

---

## Score Breakdown

| # | Category | Score | Weight | Weighted | Grade |
|---|----------|-------|--------|----------|-------|
| 1 | On-Page SEO | 68 | 15% | 10.2 | Adequate |
| 2 | Content Quality & Relevance | 54 | 15% | 8.1 | Below Average |
| 3 | Technical SEO & Crawlability | 42 | 15% | 6.3 | Below Average |
| 4 | Site Architecture & Internal Linking | 62 | 10% | 6.2 | Adequate |
| 5 | Off-Page SEO & Authority | 12 | 15% | 1.8 | Critical |
| 6 | Core Web Vitals & Performance | 40 | 10% | 4.0 | Below Average |
| 7 | Mobile & UX | 62 | 8% | 5.0 | Adequate |
| 8 | Structured Data & Rich Results | 68 | 5% | 3.4 | Adequate |
| 9 | Security & Trust | 45 | 4% | 1.8 | Below Average |
| 10 | Indexation, Analytics & Local SEO | 58 | 3% | 1.7 | Below Average |
| | **Composite** | | **100%** | **48.5 → 49** | **Below Average** |

---

## Detailed Findings

### 1. On-Page SEO — 68/100 (Adequate)

**Strengths:**
- Homepage, `/games/`, `/about/`, and every game page have unique, keyword-relevant `<title>`, meta description, and self-referencing canonical — confirmed in source across all 36 HTML files (`index.html:5-6`, `games/index.html:6-9`, `about/index.html:5-9`).
- OG and Twitter Card tags present and correct on homepage, `/games/`, `/about/`, `/games/sudoku/`, `/games/rubiks-cube-scramble/` — confirmed live via direct fetch (verified with cache-busting on 2026-08-02).
- Clean, hierarchical URL structure (`/games/sudoku/`, `/games/rubiks-cube-scramble/4X4/`) with no redirect chains observed.
- `/games/` hub, once bare with zero on-page tags in the June audit, now has a full title, meta description, H1, and canonical (`games/index.html:6-9`).

**Weaknesses:**
- **`games/air-force-mission/demon-skies.html` has metadata from three different games**: `<title>` says "Play Air force demon skies," the meta description is a verbatim copy of the 2048 page's description (including the "COmbine" typo — `demon-skies.html:10-11`), and the on-page `<h1>` reads "Free flappy bird online game" (`demon-skies.html:65`). This is a template copy-paste error, not a live-only glitch — confirmed identical in source and live fetch.
- **Canonical/sitemap mismatch on the same page**: the file is served at `.../demon-skies.html`, `sitemap.xml` lists `https://mindhack.in/games/air-force-mission/demon-skies.html`, but the in-page canonical points to `https://mindhack.in/games/air-force-mission/demon-skies/` (a trailing-slash directory URL that doesn't exist) — `demon-skies.html:7`. Google will likely ignore the canonical or treat it as broken.
- **`/games/2048/` and `/games/sliding-puzzle/` are live with the pre-fix, June-era on-page tags** despite the source file already containing the fix: live title is still "Play 2048 Game on MindHack.in" (30 chars, no keyword depth) and the meta description still contains "COmbine till you get 2048" — verified with three separate cache-busting query strings on 2026-08-02, ruling out a one-off cache hit. Local `games/2048/index.html:5-10` has the corrected 55-character title and clean description. See Technical SEO for the likely cause.

**Score Justification:** The underlying on-page engineering is genuinely strong and broad (title/meta/canonical/OG across the whole site), but two concrete, SERP-visible defects — the three-way metadata mix-up on the Demon Strikes page and the 2048/Sliding Puzzle deployment gap — are real, currently-live problems that a visitor or Google would see today.

---

### 2. Content Quality & Relevance — 54/100 (Below Average)

**Strengths:**
- `/about/` is a real, well-written E-E-A-T asset: founder narrative, "why we built this," clear approach section, and a Contact CTA (`about/index.html:257-306`). This closes a gap the June audit flagged as critical.
- Grammar errors on the Rubik's Cube page ("sharp your evaluate mind," "You solve time appears," "is Connects with all devices") are fixed in source **and confirmed live**: `games/rubiks-cube-scramble/index.html` now reads "sharpen your mind," "Your solve time appears instantly," "works across all devices."
- Every game page has a genuine FAQ section (4 Q&As), useful for both users and rich-result eligibility.

**Weaknesses:**
- **Sliding Puzzle page is live with unfixed grammar errors** the CSV marks "Complete": "How do We play a Sliding Puzzle" (capitalization), "sharpens of short-term memory," "having problem to solve," "Problem-Solving Skills Enhances" (reversed word order) — all confirmed live on 2026-08-02 with cache-busting.
- **No citations for health/cognitive claims.** Homepage ("Scientific studies show...") and the 2048 page ("Multiple studies show... one review found...") still make research claims with no linked source, on both the June-audited version and today's.
- **Every game page follows an identical template skeleton** (Intro → What is X → Benefits bullets → Features → Why X Remains Popular → FAQ), which reads as templated rather than distinct editorial content across pages — flagged already in the CSV (task 47) but still unaddressed.
- **No author byline or publication/update date** on any page — full anonymity remains an E-E-A-T gap.
- **No blog/articles section exists.** The homepage's "View all Articles" link target and four planned blog posts (CSV Sprint 6/10) have not been built; there is no `/blog/` or `/articles/` directory in the repo.

**Score Justification:** Real, verifiable improvement on the pages that made it live (About, Rubik's Cube), offset by a live page (Sliding Puzzle) still showing the exact errors marked "Complete," an entirely template-driven content structure, and zero citations for repeated health claims.

---

### 3. Technical SEO & Crawlability — 42/100 (Below Average)

**Strengths:**
- `robots.txt` is live, returns 200, explicitly allows all crawlers, and references the sitemap.
- `sitemap.xml` is live and lists 30 of the site's URLs with `lastmod` and `priority`, including all game size variants.
- HTTPS resolved cleanly on every URL fetched; no mixed-content references found in source (all image/CSS/JS references use `https://`).
- No redirect chains detected on any sampled URL.

**Weaknesses:**
- **`/about/` returns an effectively empty response in production** — confirmed three separate times (direct URL, cache-busted query string, and the explicit `/about/index.html` path) — despite the file existing in git since commit `b7d545e` (pushed to `origin/mindhack3.1` over a month ago) and being listed in `sitemap.xml` with `lastmod: 2026-06-22`. This is a real, current production defect, not a caching artifact.
- **`/games/2048/` and `/games/sliding-puzzle/` are serving stale, pre-fix HTML in production** while the local repository already contains the corrected files — confirmed with repeated cache-busting. By contrast, `/games/`, `/about/`'s sibling pages, `/games/sudoku/`, and `/games/rubiks-cube-scramble/` **are** serving the current, fixed source. This split (some fixed pages live, some not, one page dead) points to an inconsistent publish/deploy step rather than a browser- or tool-side cache — worth checking the GitHub Pages build source and whether `mindhack3.1` is actually the branch Pages deploys from (the repo's `main` branch is a structurally different, much older codebase with `header.html`/`footer.html`/`config.js` that has not been touched since a `v2` merge, and `mindhack3.1` has never been merged into it).
- **`robots.txt` live differs from the file in the repo**: production serves a simplified `User-agent: * / Allow: /`, while the repo's `robots.txt` additionally lists explicit `Allow: /` blocks for Googlebot, Bingbot, GPTBot, ClaudeBot, and PerplexityBot. Functionally equivalent today (the wildcard already allows everyone), but it's another instance of local ≠ live.
- **Google's own index (`site:mindhack.in`) returns only 4 URLs** — homepage, `/games/rubiks-cube-scramble/`, `/games/`, `/games/2048/` — against 30 sitemap entries. Worse, Google's cached snippets for `/games/` and `/games/2048/` still show the **old, pre-fix titles**, confirming Google has not recrawled these URLs since the fixes shipped.
- No `hreflang` tags anywhere in the codebase (0 matches) — not urgent for a single-locale site, but relevant if the Indian-market targeting work in the CSV (Sprint 9) proceeds.

**Score Justification:** The technical scaffolding (robots.txt, sitemap, HTTPS, breadcrumb schema) is in reasonable shape, but a genuinely broken page, an inconsistent deploy across already-fixed pages, and a severely thin Google index together represent the site's biggest bottleneck to organic growth right now.

---

### 4. Site Architecture & Internal Linking — 62/100 (Adequate)

**Strengths:**
- Visual + schema breadcrumbs (`Home > Games > [Page]`) are implemented across `/games/`, `/about/`, every Rubik's Cube size variant, Sudoku, and Match the Cards — a genuine fix versus the June audit's "no breadcrumbs anywhere" finding.
- Homepage game-card anchor text is now descriptive ("Play Sudoku Free," "Play 2048 Online," "Play Cube Free") rather than repeated "Play now" — confirmed live.
- Clean parent/child URL hierarchy throughout (`/games/{game}/`, `/games/{game}/{variant}/`).

**Weaknesses:**
- **The "Other games you will love" cross-linking module is empty HTML on every single game page.** Source confirms it renders as `<div class="games-grid" id="games-grid"></div>` with no static content (`games/sudoku/index.html:159`, and identical on 2048, Rubik's Cube, and Sliding Puzzle). It depends entirely on client-side JS to populate, so it passes zero link equity to crawlers and, per the live text fetches, appears to render empty even in a rendered view. The CSV marks this "Complete" (task 6) — it isn't.
- **Correction (2026-08-03):** the original audit missed this because it only inspected static HTML source — a site-wide footer is in fact injected on every page at runtime via `utility/js/base.js` (styled in `template.css:184-236`), with links to About Us, Privacy Policy, Terms of Service, and Contact Us. **However, three of those four links are dead on every single page site-wide** — `/privacy/`, `/terms/`, and `/contact/` don't exist yet (Sprint 3). This is a broader version of the "About page links to a dead `/contact/`" finding below: it's not one dead link on one page, it's three dead links repeated on all ~36 pages. A Sitemap link (`/sitemap.xml`) has now been added to this footer.
- `/games/sliding-puzzle/` still uses generic "Play now" anchor text for all 8 size variants rather than the "Play 3x3 Sliding Puzzle" style differentiation the CSV claims was completed (task 22).

**Score Justification:** The skeleton (URL hierarchy, breadcrumbs, and now a confirmed site-wide footer) is solid, but the one component specifically designed to cross-link every game to every other game is confirmed non-functional site-wide, and the footer's legal links are dead on every page until Sprint 3 ships — both significant, easily fixed losses of internal link equity and user trust.

---

### 5. Off-Page SEO & Authority — 12/100 (Critical)

**Strengths:**
- `.in` ccTLD fits the Indian-market positioning.
- Distinct, genuinely useful tools (WCA-style Rubik's timer, multi-size Sliding Puzzle) have real link-earning potential in niche communities if promoted.

**Weaknesses:**
- A `site:mindhack.in` search returns only the site's own pages — no third-party citations, guest mentions, or backlinks found anywhere on the open web.
- Targeted searches for `"mindhack.in" free games sudoku rubik's cube` and `mindhack.in backlinks OR reddit OR reviews` returned zero results referencing the site — no Reddit threads, no forum mentions, no directory listings, no reviews.
- No social media presence detected in source (no Instagram/X/YouTube/Facebook links anywhere in the templates).
- Domain Authority is effectively unmeasurable/zero given the complete absence of external signals.

**Score Justification:** Identical to the June finding — no off-page work has shipped. This is now the single largest drag on the composite score and cannot be fixed by further on-page engineering.

---

### 6. Core Web Vitals & Performance — 40/100 (Below Average)

**Strengths:**
- No render-blocking inline scripts observed in the `<head>` beyond a single Font Awesome CSS import.
- Game logic is modular (`type="module"` scripts), which allows for reasonable code-splitting.

**Weaknesses:**
- **All game thumbnail and hero images are hosted on a separate origin** (`mindhack-in.github.io/mindhack.in.dynamic/...`), forcing an extra DNS lookup + TLS handshake per image with no `preconnect` hint in any page's `<head>`.
- **Zero images site-wide use `loading="lazy"`** (0 matches across all 36 HTML files) — every image, including below-the-fold thumbnails, loads eagerly.
- **Only 1 of 36 HTML files declares image `width`/`height` attributes** (the homepage) — the rest are exposed to layout shift (CLS) as images load.
- Font Awesome is pulled from `cdnjs.cloudflare.com` on every page with no `preconnect`/`preload`.
- **No real-world performance data exists** — no Search Console, no PageSpeed Insights history, no RUM. A live PageSpeed Insights API call from this session timed out, so this score is based on static-analysis signals only, not a measured LCP/INP/CLS. Running Lighthouse or PSI directly against production (CSV task 51, currently Backlog) is the natural next step to replace this estimate with real numbers.

**Score Justification:** Nothing catastrophic was found, but nearly every classic performance anti-pattern (no lazy-loading, no image dimensions, cross-origin images with no preconnect) is present simultaneously, and there is no instrumentation in place to know the real user impact.

---

### 7. Mobile & UX — 62/100 (Adequate)

**Strengths:**
- `width=device-width, initial-scale=1.0` viewport tag confirmed present on every sampled page.
- The About page's CSS includes an explicit mobile breakpoint (`@media (max-width: 900px)`) collapsing a two-column grid to one column — genuine responsive-design evidence.
- No intrusive interstitials or popups observed in any fetched page.
- FAQ accordions and card-based game listings are mobile-friendly UI patterns.

**Weaknesses:**
- The empty "Other games you will love" section (see Architecture) is not just an SEO problem — it's a visibly broken UI element for real visitors on every game page.
- No social proof (player counts, testimonials, "X games played today") anywhere on the site.
- Tap-target sizing and true on-device responsiveness could not be verified without a rendered/visual pass — this score is based on source-level signals only.

**Score Justification:** Foundational mobile UX (viewport, responsive CSS, no interstitials) is in place, but the broken cross-linking widget is a user-facing defect, not just a crawler-facing one, and social proof remains entirely absent.

---

### 8. Structured Data & Rich Results — 68/100 (Adequate)

**Strengths:**
- `WebSite` schema with `SearchAction` and `Organization`/publisher data is live on the homepage (`index.html:35-60`).
- `BreadcrumbList` JSON-LD is present on 35 of 36 HTML files site-wide — a near-complete rollout.
- `FAQPage` and/or `SoftwareApplication` schema confirmed in source on the highest-value pages: homepage, `/games/sudoku/`, `/games/2048/`, `/games/sliding-puzzle/`, and every Rubik's Cube Timer size variant.
- This is a dramatic improvement over the June audit's 10/100 "zero schema anywhere" finding — genuinely one of the sprint's clearest wins.

**Weaknesses:**
- `/games/flappy-bird/`, `/games/pacman/`, and all `/games/match-the-card/` variants only carry `BreadcrumbList` — despite each having a visible FAQ section in the HTML, none have `FAQPage` markup, leaving rich-result opportunities on the table for those pages.
- No evidence was found that the CSV's "validate all schema via Google Rich Results Test" step (task 16, marked Complete) actually happened — no output, screenshot, or report of a validation pass exists in the repo.
- Given the deployment inconsistency found in Technical SEO, schema on `/games/2048/` and `/games/sliding-puzzle/` specifically should be re-verified live once those pages are confirmed redeployed.

**Score Justification:** Breadth and quality of the schema rollout on priority pages is genuinely strong; the score is held back only by incomplete coverage on secondary pages and unverified rich-result validation.

---

### 9. Security & Trust — 45/100 (Below Average)

**Strengths:**
- HTTPS is enforced consistently — every URL fetched resolved to `https://`, with no mixed-content references in source.
- No malware/blacklist signals encountered during this audit.

**Weaknesses:**
- **No Privacy Policy, Terms of Service, or Contact page exist** in the repository (confirmed via directory search — no `privacy`, `terms`, or `contact` paths found anywhere). The About page links to `/contact/` directly (`about/index.html:303`), and — per the 2026-08-03 correction in Site Architecture — the site-wide footer injected by `base.js` also links to `/privacy/`, `/terms/`, and `/contact/` on every single page. All three are dead links, repeated site-wide, not a one-off.
- **This is more urgent than the original note implied.** GA4 is confirmed live and collecting visitor data site-wide (see Indexation & Analytics correction) with no Privacy Policy in place to disclose it, on a site whose own FAQ states the games are "suitable for all age groups... from kids to adults." Building the Privacy Policy page should move up alongside the Sprint 0 deployment fixes rather than waiting for Sprint 3.

**Score Justification:** Core transport security is solid, but the complete absence of legal/trust pages — including a link to a Contact page that doesn't exist — is a real gap for a public site, not just an SEO nicety.

---

### 10. Indexation, Analytics & Local SEO — 58/100 (Below Average)

**Strengths:**
- Sitemap is comprehensive and mostly accurate (29 of 30 URLs check out; the Demon Strikes entry has the canonical mismatch noted above).

**Weaknesses:**
- **Correction (2026-08-03):** the original audit's "zero analytics" finding was a false negative — it only grepped `.html` files. GA4 is in fact installed site-wide via `gtag.js` (measurement ID `G-9RC3CF2CZ3`), injected on every page through `utility/js/base.js:294-302`. This is a real, functioning positive that should have been caught the first time.
- What's still unverified: whether GA4 is actually collecting meaningful data (no dashboard access during this audit), and whether Google Search Console is verified/connected — neither could be confirmed from source alone. AdSense/ad monetization is still absent, consistent with the CSV's Sprint 8 items remaining "Backlog."
- Google index coverage is critically thin (4 of 30 sitemap URLs, per `site:mindhack.in`) — see Technical SEO.
- Google Business Profile / local NAP consistency isn't directly applicable (this is a web-based game platform, not a physical-location business), so that CSV item (task 73) is lower priority than the CSV currently implies.

**Score Justification (revised 2026-08-03):** GA4 is confirmed live site-wide, which removes the single biggest gap this category originally flagged. Score raised from 30 to 58. It remains capped in "Below Average" territory because Search Console verification, real GA4 data, and Bing Webmaster Tools registration are all still unconfirmed, and Google's own index coverage remains critically thin regardless of analytics being in place.

---

## Top 5 Recommendations (Priority Order)

1. **Confirm and fix the production deployment gap.** `/games/2048/` and `/games/sliding-puzzle/` are live with pre-fix content that already exists, corrected, in the repository; `/about/` returns empty in production despite being pushed over a month ago. Check whether GitHub Pages is actually building from the `mindhack3.1` branch (the repo's `main` branch is a much older, structurally different codebase last touched via a `v2` merge and has never received `mindhack3.1`'s commits), check the Pages build/Actions logs for failures, and force a clean rebuild. This is zero new content work — it's making already-finished work actually reach users and Google.

2. **Fix `games/air-force-mission/demon-skies.html`.** This single file currently shows the title "Play Air force demon skies," a meta description copy-pasted from the 2048 page (including the "COmbine" typo), and an `<h1>` that reads "Free flappy bird online game" (`demon-skies.html:6-11,65`). Rewrite all three to describe the actual game, and fix the canonical (`.../demon-skies/`) to match the real, sitemap-listed URL (`.../demon-skies.html`).

3. **Rebuild the "Other games you will love" module as static, crawlable HTML.** It currently renders as an empty `<div id="games-grid"></div>` on every game page (`games/sudoku/index.html:159` and identical elsewhere), so it passes zero internal link equity today despite being the site's primary cross-linking mechanism between games. Populate it server-side/at build time with real `<a>` tags, not client-side JS.

4. **Verify Google Search Console, today.** *(Revised 2026-08-03: GA4 turned out to already be installed site-wide via `base.js` — that part of this recommendation is done.)* What's still missing is Search Console. It would surface the `/games/2048/`, `/games/sliding-puzzle/`, and `/about/` problems directly via its Coverage and URL Inspection reports rather than requiring manual cache-busted fetches, and it's the fastest way to confirm whether GA4 is actually collecting real traffic data.

5. **Start off-page outreach now that the on-page foundation is real.** Off-page authority (12/100) is the single lowest-scoring, highest-weighted category and hasn't moved since June. The Rubik's Cube timer and multi-size Sliding Puzzle are genuinely link-earning tools — submit to r/Cubers and SpeedSolving.com (CSV task 33, already "Todo") and to gaming directories. No further on-page work will move the needle on this category.

---

## Risk Assessment

| Risk | Severity | Affected Area | Mitigation |
|---|---|---|---|
| Deployment inconsistency — fixed pages not reliably live | Critical | Technical, On-Page | Audit GitHub Pages build source/branch; force rebuild; verify each URL post-deploy |
| `/about/` returns empty in production | Critical | Technical, Trust | Diagnose why a pushed, sitemapped file 404s/empties on the live host |
| Demon Strikes page has wrong title/meta/H1 (mixed with 2048 and Flappy Bird content) | High | On-Page, Content | Rewrite metadata and H1 for this page specifically; fix canonical |
| Search Console unverified; GA4 data uninspected — no confirmed visibility into real traffic or index status | High | Indexation | Verify Search Console this week; confirm GA4 (`G-9RC3CF2CZ3`) is collecting real data |
| Footer's Privacy/Terms/Contact links are dead site-wide (not just on the About page) | Medium | Trust, Internal Linking | Build the three pages (Sprint 3); footer already links to them from every page |
| "Other games you will love" empty on every game page | High | Internal Linking, UX | Convert to static server-rendered links |
| Google indexing only 4 of 30 sitemap URLs | High | Technical, Off-Page | Request indexing via Search Console once deployment gap is fixed |
| Zero backlinks/mentions anywhere on the web | High | Off-Page | Begin community/directory outreach (see Recommendation 5) |
| No Privacy Policy/Terms/Contact page; About page links to a dead `/contact/` | Medium | Trust | Build the three pages; fix the dead link |
| No lazy-loading or image dimensions site-wide | Medium | Performance | Add `loading="lazy"` and `width`/`height` to all `<img>` tags |
| Health/cognitive claims ("studies show") have no citations | Medium | Content, E-E-A-T | Add source links or soften unverifiable claims |

---

*This audit incorporates and verifies findings from `seo-scorecard.md` (2026-06-08) and `mindhack-seo-sprint-tasks-updated.csv`. Where the CSV marked an item "Complete," this report checked it directly against both the repository source and the live production site as of 2026-08-02; discrepancies are called out explicitly above. Core Web Vitals are based on static-analysis signals only — a live Lighthouse/PageSpeed Insights run is recommended to replace the Performance score with measured data.*
