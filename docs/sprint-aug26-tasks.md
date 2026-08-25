# Sprint Plan: mindhack.in SEO — August 2026

Derived from `docs/sprint-aug26.md` (SEO Scorecard, 2026-08-02, composite 47/100). Ordered so that nothing later in the list gets wasted: deployment and the one content bug come first because they block verification of everything else; analytics comes second because every later sprint needs a way to prove it worked.

This plan supersedes `mindhack-seo-sprint-tasks-updated.csv` for open items — closed items from that tracker aren't repeated here except where this audit found them not actually live (flagged below).

---

## Sprint 0 — Deployment & Critical Bugs (this week)

Nothing else in this plan matters if fixes don't reach production. Do this first.

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 1 | Confirm which branch GitHub Pages actually builds from (repo Settings → Pages) | 15 min | Critical | `main` is a much older, structurally different codebase (`header.html`/`footer.html`/`config.js`) last touched via a `v2` PR merge and has never received the current `mindhack3.1` work. If Pages is building from anywhere other than `mindhack3.1`, that's the root cause of items 2–3 below. |
| 2 | Redeploy / trigger a clean build and verify `/games/2048/` and `/games/sliding-puzzle/` go live with the already-fixed source (title, meta, grammar corrections) | 1 hr | Critical | Confirmed live on 2026-08-02 **and reconfirmed 2026-08-03** that these two pages still serve pre-fix content despite the repo already having the fix — this is re-publishing existing work, not new work. Still unresolved as of the latest check. |
| 3 | Diagnose and fix `/about/` returning empty in production | 1-3 hrs | Critical | File has been committed and pushed since 2026-06-22 and is in the sitemap, but returns near-empty response on 3 separate fetch attempts including a direct `/about/index.html` request. Check Pages build logs / Actions for a silent failure on this path. |
| 4 | ~~Rewrite~~ **Done** - `games/air-force-mission/demon-skies.html` title, meta description, and H1 | — | High | Tracker corrected 2026-08-03: this was completed earlier but never marked done here. Title is now "Demon Strikes - Free Online Space Shooter Game \| Mindhack.in," meta description describes the actual game, H1 reads "Free Demon Strikes Space Shooter Game." |
| 5 | ~~Fix~~ **Done** - canonical on the same page now matches the sitemap's `.../demon-skies.html` | — | Medium | Tracker corrected 2026-08-03: also completed earlier but not marked. Verified live in source. |
| 6 | Re-verify `robots.txt` — decide whether to keep production's simplified `Allow: /` wildcard or push the repo's per-bot version, and make the two match | 15 min | Low | Functionally equivalent today; just resolve the drift. |

---

## Sprint 1 — Analytics & Measurement Foundation

Every task after this sprint is currently unverifiable without these two things.

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 7 | ~~Install~~ Verify GA4 is collecting real data | 30 min | Critical | Corrected 2026-08-03: GA4 was already installed site-wide via `utility/js/base.js` (ID `G-9RC3CF2CZ3`) — the earlier "zero analytics" finding was a false negative from only checking HTML files. Just confirm it's reporting real traffic in the GA dashboard. |
| 8 | Verify/re-verify Google Search Console property; submit sitemap; request indexing for all 30 URLs once Sprint 0 lands | 1 hr | Critical | `site:mindhack.in` currently returns only 4 of 30 sitemap URLs, and two of those show stale, pre-fix titles in Google's own cache — Search Console's Coverage and URL Inspection tools will confirm this directly instead of relying on manual cache-busted fetches. |
| 9 | Register on Bing Webmaster Tools; submit sitemap | 30 min | Medium | Carried from prior backlog, still not done. |
| 10 | Set up a monthly manual LLM-visibility check (ask ChatGPT/Perplexity/Claude "best free sudoku/rubik's timer site") and log results | 1 hr/mo | Medium | Carried from prior backlog. Low cost, gives an early read on GEO progress. |

---

## Sprint 2 — Internal Linking Fix

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 11 | Rebuild the "Other games you will love" module as static, server-rendered `<a>` links instead of the current empty `<div id="games-grid"></div>` populated by client-side JS | 4-6 hrs | High | Confirmed empty in HTML source on every single game page (sudoku, 2048, Rubik's Cube, Sliding Puzzle). This is the site's only cross-game linking mechanism and currently passes zero link equity to crawlers. |
| 12 | ~~Add~~ Fix footer navigation | 15 min (done) | Medium | Corrected 2026-08-03: a footer already exists site-wide via `base.js`, with About/Privacy/Terms/Contact links — it was invisible to static HTML review because it's injected at runtime. A Sitemap link (`/sitemap.xml`) has been added to it. No social profiles exist anywhere to link (confirmed — no Instagram/X/YouTube/Facebook/Discord references found in source); add them here once accounts exist. The three legal links are still dead site-wide until Sprint 3 ships. |
| 13 | ~~Re-verify~~ **Still broken as of 2026-08-03** — Sliding Puzzle's 8 size-variant anchors | — | Low | Local source is already correct (`games/sliding-puzzle/index.html:114-149` reads "Play 3x3 Sliding Puzzle," "Play 4x4 Sliding Puzzle," etc.), but a fresh cache-busted fetch of `/games/sliding-puzzle/` today still returns generic "Play now" for all 8 links, plus the same unfixed grammar errors ("How do We play," "sharpens of short-term memory," "having problem to solve"). This is not a content task — it's the same Sprint 0 deployment gap (item #2) confirmed still unresolved. No further work needed here beyond fixing the deploy. |

---

## Sprint 3 — Trust & Legal Pages

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 14 | ~~Create~~ **Built 2026-08-03** - Contact page at `/contact/` | 5 min remaining | High | Page is built (`contact/index.html`) with a real form (not just mailto) plus a `mailto:contact@mindhack.in` fallback, and added to `sitemap.xml`. **One manual step left before it actually delivers messages:** sign up at formspree.io, create a form pointed at `contact@mindhack.in`, and swap `YOUR_FORM_ID` in the form's `action` attribute for the real ID Formspree gives you. Until then, the form will show an error and visitors will need the mailto link. |
| 15 | ~~Create~~ **Built 2026-08-03** - Privacy Policy page at `/privacy/` | — | Critical | Plain-language policy covering the three real data flows found in the codebase: optional account signup (username/email/password via the login system in `base.js`), the new contact form (Formspree), and GA4 analytics (cookie-based, `G-9RC3CF2CZ3`). Includes a children's-privacy section given the site's own FAQ says it's for "all age groups... from kids to adults." Footer already links here (see #12) and it's added to `sitemap.xml`. **This has not been reviewed by a lawyer** — recommend a quick pass by one before treating it as final, especially given the mixed-age audience and that mindhack.in serves Indian users (DPDP Act 2023 considerations). |
| 16 | ~~Create~~ **Built 2026-08-03** - Terms of Service page at `/terms/` | — | Medium | Covers optional accounts, acceptable use (no scraping/abuse), ownership of the games/branding, as-is/no-warranty language, and a plain-language liability section. Footer already links here (see #12) and it's added to `sitemap.xml`. Same caveat as the Privacy Policy: **not lawyer-reviewed** - fine as a good-faith draft, worth a real review before leaning on it for anything contentious. |

---

## Sprint 4 — Content Fixes

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 17 | After Sprint 0 redeploy, re-verify Sliding Puzzle grammar fixes ("How do We play," "sharpens of short-term memory," "having problem to solve") are actually live | 15 min | Medium | Likely resolves automatically once deployment is fixed — confirm, don't assume. |
| 18 | Add source citations (or soften the claim) for "studies show"/"research shows" statements on the homepage and 2048 page | 2 hrs | Medium | Repeated unlinked research claims are an E-E-A-T gap. |
| 19 | Vary the page structure across game pages so each reads as distinct content rather than the same "Intro → What is X → Benefits → Features → FAQ" template reworded | 4-6 hrs | Medium | Every game page currently follows an identical skeleton. |
| 20 | Add a visible last-updated date and/or author attribution to content pages | 2 hrs | Low-Medium | No dates or bylines exist anywhere currently. |

---

## Sprint 5 — Structured Data Completion

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 21 | ~~Add~~ **Done 2026-08-03** - `FAQPage` JSON-LD on Flappy Bird, Pac-Man, and all 11 Match the Cards pages | — | Medium | Correction to the original task framing: only Flappy Bird and the Match the Cards hub page actually had visible FAQ content already (schema added matching that content verbatim). Pac-Man and all 10 Match the Cards category pages (animals, fruits, etc.) had *no* FAQ content at all — adding schema without matching visible text would violate Google's structured data guidelines and risks rich-result eligibility being disabled sitewide. Wrote genuine, short FAQ content for all 11 of those pages first (3 Q&As each, following the site's existing FAQ style), then added matching schema. 17 of 36 HTML files now carry `FAQPage` schema. |
| 22 | Run every page with schema through Google's Rich Results Test and keep a record of the results | 1-2 hrs | Medium | No evidence this validation has actually happened despite being marked complete previously. |
| 23 | Re-confirm `/games/2048/` and `/games/sliding-puzzle/` schema is live post-redeploy | 15 min | Low | Bundle with Sprint 0 verification. |

---

## Sprint 6 — Performance

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 24 | ~~Add~~ **Done 2026-08-03** - `loading="lazy"` on below-the-fold `<img>` tags | — | High | Added to 14 images across `index.html`, `games/index.html`, and `games/match-the-card/index.html` — the only 3 files with image grids deep enough to have a "below the fold." Left the first row (first 3, matching the 3-column grid CSS) and the 404 page's logo eager, since lazy-loading a likely-LCP image is a known anti-pattern. Most other pages render games via canvas/JS with no `<img>` tags at all. |
| 25 | Add explicit `width`/`height` attributes to all `<img>` tags to prevent layout shift | 3 hrs | High | Only the homepage (1 of 36 files) currently declares image dimensions. |
| 26 | Add `preconnect` hints for `mindhack-in.github.io` (image host) and `cdnjs.cloudflare.com` (Font Awesome) | 30 min | Medium | Both are cross-origin dependencies loaded on every page with no connection warm-up. |
| 27 | Once GA4 (Sprint 1) has real traffic data, run Lighthouse/PageSpeed Insights against production and replace this report's static-analysis performance score with measured LCP/INP/CLS | 4 hrs | High | A live PSI check timed out during this audit — this needs to be run directly against the browser, not estimated from source alone. |

---

## Sprint 7 — Off-Page & Authority

The lowest-scoring, highest-weighted category (12/100) and the one no amount of further on-page work will fix.

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 28 | Submit the Rubik's Cube timer to r/Cubers and SpeedSolving.com forums | 2 hrs | High | Genuinely useful, WCA-style tool with real link-earning potential — just needs to be shared where cubers already are. |
| 29 | Submit the site to gaming directories (itch.io, Crazy Games, Poki) | 4 hrs | Medium | No directory presence found anywhere currently. |
| 30 | Outreach to Indian ed-tech and gaming blogs for mentions/guest posts | Ongoing | High | Zero external mentions found anywhere on the web for this domain. |
| 31 | Evaluate whether a Google Business Profile is worth claiming | 30 min | Low | This is a web platform, not a physical-location business — lower priority than the prior tracker implied; only pursue if there's a genuine local/brand-entity reason to. |

---

## Sprint 8 — Content Expansion (only after Sprints 0–2 land)

Deprioritized until indexation and internal linking are fixed — new articles are wasted effort if Google still can't reliably crawl/index the site.

| # | Task | Effort | Impact | Notes |
|---|------|--------|--------|-------|
| 32 | ~~Build~~ **Built 2026-08-03** - `/blog/` hub + 4 articles, pulled forward ahead of the original sequencing | — | High | Published: "How to Play Sudoku for Beginners," "How to Get Faster at Rubik's Cube," "Best Free Online Brain Games for Students in India," and "What Brain Training Games Actually Do, According to Research" (this one is real, cited research — McGill/BrainHQ, a long-term dementia-risk study, and a review on video games and cognition — and it's honest about where the evidence is thin, which directly fixes the uncited "studies show" claims flagged elsewhere in the audit). Each links contextually to the relevant game page. Added to `sitemap.xml`. Bonus find while wiring this up: the homepage's "View all games →" and "View all Articles →" weren't links at all — just plain `<div>` text with no `href`. Both are now real anchors pointing to `/games/` and `/blog/`. |
| 33 | ~~Add~~ **Done 2026-08-03** - internal links from each game page to its most relevant blog post | — | Medium | Added to all 32 game HTML files: Sudoku → the beginner's guide; Rubik's Cube main + all 6 size variants → the CFOP guide; 2048, Sliding Puzzle (main + 8 sizes), and Match the Cards (main + 10 categories) → the "best free brain games" roundup, since that's the post that actually covers them. Flappy Bird, Pac-Man, and Demon Strikes link to the blog hub generally (`/blog/`) rather than a specific post — none of the four articles cover arcade/reflex games, and forcing a link to an ill-fitting post would be the same kind of low-quality linking flagged elsewhere in the audit. Bonus fixes made in passing while editing these exact lines: an unfilled "[audience]" template placeholder on the Match the Cards hub page, and two copy-paste iframe `title` attributes that said "2048 Game" on the Pac-Man and all 8 Sliding Puzzle pages. |

---

## Suggested Cadence

Sprint 0 and Sprint 1 are the only truly time-boxed items — everything downstream compounds in value once deployment is reliable and analytics exist to prove it. Sprints 2–6 can run in parallel across a 2-3 week window. Sprint 7 is ongoing and should start as soon as Sprint 0 is confirmed live, since off-page results take the longest to compound. Sprint 8 is deliberately last.
