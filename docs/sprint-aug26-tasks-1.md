# Sprint Plan: Remaining / Not Done Items (verified 2026-08-03)

Cross-checked every task in `docs/sprint-aug26-tasks.md` against current file state, live site fetches, and what tools are actually available in this session — rather than trusting the tracker's own status labels, since two items (#4, #5) turned out to be marked open despite being done weeks ago (now corrected in that file). This list only includes items confirmed still outstanding.

Grouped by what's actually blocking each one, not just by sprint number, since that's the more useful way to see what to do next.

---

## Group A: Blocked on the same root cause — the deployment gap

All of these trace back to one unresolved problem: production isn't reliably serving the fixes already sitting in this repo. Nothing in this group can be verified or closed out until Sprint 0's deployment issue is fixed.

| Sprint | # | Task | Status |
|---|---|------|--------|
| 0 | 1 | Confirm which branch GitHub Pages actually builds from | Not done — requires GitHub repo Settings access I don't have in this session |
| 0 | 2 | Redeploy so `/games/2048/` and `/games/sliding-puzzle/` go live with the already-fixed source | Not done — reconfirmed broken again as of 2026-08-03 |
| 0 | 3 | Diagnose and fix `/about/` returning empty in production | Not done |
| 0 | 6 | Sync `robots.txt` between repo and production | Decision made (keep the repo's explicit per-bot version), but the file still isn't live — same deploy gap |
| 2 | 13 | Sliding Puzzle's 8 size-variant anchors | Re-verified broken again 2026-08-03 — this is purely a symptom of #2, not separate work |
| 4 | 17 | Re-verify Sliding Puzzle grammar fixes are live | Can't verify until #2 is resolved |
| 5 | 23 | Re-confirm `/games/2048/` and `/games/sliding-puzzle/` schema is live | Can't verify until #2 is resolved |

**One fix here (#1-3) likely closes five other line items automatically.** This is still the highest-leverage thing outstanding.

---

## Group B: Needs your action, not mine

I don't have accounts, dashboard access, or the ability to post externally, so these can't move forward from my side.

| Sprint | # | Task | What's needed |
|---|---|------|----------------|
| 1 | 7 | Verify GA4 is collecting real data | The tracking code is confirmed installed (`G-9RC3CF2CZ3`) — someone with access needs to check the GA4 dashboard for actual traffic |
| 1 | 8 | Verify/re-verify Google Search Console; submit sitemap; request indexing | Requires Search Console account access |
| 1 | 9 | Register on Bing Webmaster Tools | Requires account creation |
| 1 | 10 | Set up a monthly LLM-visibility check | Manual recurring task (ask ChatGPT/Perplexity/Claude directly, log results) |
| 3 | 14 | Finish wiring up the Contact form | Page is built — sign up at formspree.io, point a form at `contact@mindhack.in`, and swap `YOUR_FORM_ID` in `contact/index.html` for the real ID |
| 5 | 22 | Run every schema-bearing page through Google's Rich Results Test | External tool, needs to be run against the live (not local) site |
| 6 | 25 | Add explicit `width`/`height` to all `<img>` tags | Blocked since our last exchange — needs a connected Chrome browser extension so I can read real image dimensions rather than guess and risk distorting them |
| 6 | 27 | Run Lighthouse/PageSpeed Insights for real Core Web Vitals numbers | The PSI API timed out from this sandbox — needs to be run from a real browser against the live site |
| 7 | 28 | Submit the Rubik's Cube timer to r/Cubers and SpeedSolving.com | Requires a Reddit/forum account and an actual human post |
| 7 | 29 | Submit to gaming directories (itch.io, Crazy Games, Poki) | Requires account creation and submission review on each platform |
| 7 | 30 | Outreach to Indian ed-tech/gaming blogs | Requires actual outreach relationships |
| 7 | 31 | Evaluate a Google Business Profile | Judgment call on whether it's worth it for a non-physical-location site — your call |

---

## Group C: Open work I can still do directly

Nothing external blocking these — just haven't gotten to them yet.

| Sprint | # | Task | Notes |
|---|---|------|-------|
| 2 | 11 | Rebuild "Other games you will love" as static, server-rendered links | Still an empty `<div id="games-grid"></div>` on every game page — the single biggest remaining internal-linking gap |
| 4 | 18 | Add citations for "studies show" claims on the homepage and 2048 page | The new blog post on brain-training research exists now — this task is literally linking those two pages' existing claims back to it, or replacing the claims with sourced ones |
| 4 | 19 | Vary page structure across game pages | Every game page still follows the same "Intro → What is X → Benefits → Features → FAQ" skeleton |
| 4 | 20 | Add a visible last-updated date / author attribution to existing game pages | The new blog posts already have this — the original game pages (Sudoku, 2048, etc.) still don't |
| 6 | 26 | Add `preconnect` hints for `mindhack-in.github.io` and `cdnjs.cloudflare.com` | Small, quick, no blockers |

---

## Everything else is confirmed done

Sprint 3 (Contact/Privacy/Terms pages), Sprint 5 item #21 (FAQPage schema), Sprint 6 item #24 (lazy-loading), Sprint 8 (blog + internal links), and Sprint 0 items #4-5 (Demon Strikes metadata/canonical — corrected in the main tracker, these were actually finished earlier but had been left marked open by mistake) are all verified complete as of 2026-08-03.
