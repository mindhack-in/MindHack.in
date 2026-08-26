# SEO Scorecard: mindhack.in

**Date:** 2026-06-08
**Assessed by:** SEO Scorer Agent (v2 — full re-audit)
**Industry / Niche:** Browser-based casual / brain-training games (Indian market)
**Tech Stack:** Next.js / React (inferred from URL patterns, no generator meta exposed; images hosted on github.io CDN)
**Pages Indexed (Google):** ~3 (homepage, /games/rubiks-cube-scramble/, /games/) — critically underindexed

---

## Overall SEO Score: 47/100 — Below Average

> Significant improvement since v1 (was 35/100). Homepage title, meta description, H1, and canonical have all been corrected. Inner game pages (Sudoku, 2048, Rubik's) now have solid on-page copy and FAQ sections. Core blockers remain: /games/ hub still JS-only with no indexable content, zero schema, near-zero backlinks, and grammar errors still present on the Rubik's page.

---

## Score Breakdown

| # | Category                    | Score | Weight | Weighted | Grade         |
|---|-----------------------------|-------|--------|----------|---------------|
| 1 | On-Page SEO                 | 62    | 20%    | 12.4     | Adequate      |
| 2 | Technical SEO               | 42    | 20%    | 8.4      | Below Average |
| 3 | Content Quality & E-E-A-T   | 48    | 20%    | 9.6      | Below Average |
| 4 | Keyword Strategy            | 55    | 10%    | 5.5      | Below Average |
| 5 | Schema & Structured Data    | 10    | 10%    | 1.0      | Critical      |
| 6 | Authority & Off-Page        | 15    | 10%    | 1.5      | Critical      |
| 7 | User Experience & CTR       | 58    | 5%     | 2.9      | Below Average |
| 8 | Internal Linking            | 32    | 5%     | 1.6      | Poor          |
|   | **Composite**               |       | **100%**| **42.9**| **Below Average** |

---

## Detailed Findings

### 1. On-Page SEO — 62/100 (Adequate)

**Strengths:**
- **Homepage title tag fixed and strong:** `"Free Brain Games & Puzzles Online — No Download | Mindhack.in"` — 57 chars, primary keyword at the front, brand at the end. Excellent.
- **Homepage meta description correct:** `"Play free brain games and puzzles online with no download required. Mindhack.in offers a library of memory, logic, and brain training challenges for mobile and desktop."` — 168 chars (very slightly long, ~8 chars over ideal, but benefit-driven and keyword-rich).
- **Homepage H1 fixed:** `"Free Online Games & Brain Puzzles"` — primary keyword present, not a duplicate of title tag.
- **Homepage canonical correct:** `https://mindhack.in/` (non-www, HTTPS).
- **Mobile viewport present:** `width=device-width, initial-scale=1.0` on all fetched pages.
- **Inner game pages have strong, unique title tags:**
  - Sudoku: `"Free Online Sudoku Puzzles — Play Free Sudoku | Mindhack.in"` — 58 chars, clean.
  - 2048: `"Play 2048 Game on MindHack.in"` — 30 chars (short, could be richer).
  - Rubik's: `"Rubik's Cube Timer Online | Free Speedcubing Timer- MindHack.in"` — 63 chars (1 over limit, hyphen missing space before brand).
- **Inner page canonicals all self-referencing** — confirmed on Sudoku, 2048, Rubik's.
- **Inner page meta descriptions all present and unique.**
- **Clean URL structure:** `/games/sudoku/`, `/games/2048/`, `/games/rubiks-cube-scramble/` — short, lowercase, hyphenated.

**Weaknesses:**
- **Critical: /games/ hub page has no title tag or meta description** — returns bare `"Mindhack.in"` with no meta. The most important category page on the site has zero on-page SEO.
- **No OG tags detected on any page** — no `og:title`, `og:description`, `og:image`. All social sharing previews are broken.
- **No Twitter Card meta tags** detected site-wide.
- **2048 title tag too short:** `"Play 2048 Game on MindHack.in"` (30 chars) — misses keyword opportunities; compare with Sudoku's 58-char version.
- **2048 meta description has capitalization error:** `"COmbine"` — visible in SERPs.
- **H2 on Rubik's page is incomplete:** `"Master Your Cubing Skills with MindHack.in's"` — sentence cut off, no noun at the end.
- **No canonical tag on /games/ page** — the page that renders returns no canonical.

**Score Justification:** Homepage and most inner game pages now show well-formed titles, metas, H1s, and canonicals — a clear upgrade from v1. The /games/ hub is still completely unoptimized, OG tags are entirely absent, and two game pages have minor but visible tag errors. Solid foundation on individual pages, broken hub.

---

### 2. Technical SEO — 42/100 (Below Average)

**Strengths:**
- **HTTPS enforced** — all fetched URLs resolve to `https://mindhack.in/` correctly.
- **www → non-www redirect consistent** — canonical and destination URL are aligned.
- **Sitemap confirmed present:** `https://mindhack.in/sitemap.xml` responds (as binary XML) — this is a meaningful improvement. Submit to Google Search Console if not already done.
- **Mobile viewport tag present** on all fetched pages.
- **No redirect chains detected** across fetched pages.
- **Image CDN in use:** Images served from `mindhack-in.github.io` — external CDN offloading. Positive for speed, though unusual for a production site (raises questions about long-term stability).

**Weaknesses:**
- **robots.txt: unable to fetch** — the file was not accessible via the standard path. Either missing or blocked. Without a confirmed robots.txt, there is no certainty that Googlebot, GPTBot, ClaudeBot, or PerplexityBot are being allowed to crawl correctly. This is a critical unknown.
- **Critical: /games/ page returns no HTML content** — fetched as `title: Mindhack.in` with empty body. This is almost certainly a Next.js/React client-side render issue with no SSR/SSG. The entire game library is invisible to search engine crawlers that don't execute JavaScript.
- **Index coverage critically thin:** `site:mindhack.in` returns approximately 3 pages — homepage, /games/rubiks-cube-scramble/, and /games/. For a site with Sudoku, 2048, Sliding Puzzle, Flappy Bird, and more, this means most game pages are not indexed.
- **Sitemap submitted but index not growing** — sitemap exists but Google is still only indexing 3 pages, confirming the JS rendering is the root cause.
- **Images hosted on external GitHub CDN** — `mindhack-in.github.io/mindhack.in.dynamic/...` — no alt text visible in any fetched page source. Alt text is almost certainly missing site-wide.
- **No breadcrumb navigation visible** on any inner page.
- **Core Web Vitals cannot be measured directly**, but a JS-heavy SPA with no SSR, images from a third-party CDN, and no preloading signals suggests suboptimal LCP and CLS.

**Score Justification:** Sitemap now confirmed, HTTPS solid, redirects clean — these are real positives. But the /games/ hub's JS-only rendering, near-zero index coverage despite a sitemap, unconfirmed robots.txt, and missing alt text are structural problems that prevent the site from scaling organic traffic.

---

### 3. Content Quality & E-E-A-T — 48/100 (Below Average)

**Strengths:**
- **Homepage copy has been substantially rewritten** — grammar errors from v1 ("On the Travelling," "want to searching") are fixed in the fetched version. Homepage body is clean and readable.
- **Sudoku page is the strongest content on the site** — well-structured with clear H2 sections (What is Sudoku, Benefits, Features, FAQ), ~600 words of substantive copy, no visible grammar errors, benefit-driven bullet lists, and FAQ.
- **2048 page is well-researched** — references Gabriele Cirulli as inventor (correct), explains game mechanics accurately, includes strategy tips, and makes cognitive benefit claims more carefully ("Multiple studies show..." with a specific study type referenced).
- **All inner game pages have FAQ sections** — strong for E-E-A-T signals and featured snippet opportunities.
- **Homepage FAQ section present** — 4 clear question/answer pairs.

**Weaknesses:**
- **Rubik's Cube page still has grammar errors visible in Google SERPs:**
  - `"To help you sharp your evaluate mind"` — appears in the Google snippet for this page (confirmed in site: search result). This is the second line of the page description shown to every user considering clicking.
  - `"You solve time appears instantly"` — should be "Your solve time"
  - `"Our online tool is Connects with all devices"` — capitalization/grammar error
  - `"A Rubik's Cube timer is an essential tool for every cuber who wants to sharp your mind"` — mixed pronouns
- **No About page found** — critical E-E-A-T gap. Google cannot determine who runs this site, their expertise, or credentials.
- **No Privacy Policy detected** — footer links not present in any fetched page.
- **No Terms of Service detected.**
- **No Contact page surfaced** in navigation or content.
- **No author bylines** on any content — fully anonymous.
- **No visible publication or update dates** on any page.
- **Scientific claims without citations:** Both homepage and 2048 page cite "studies" but link to no sources. The 2048 page is slightly better ("one review found...") but still no link. Sudoku page says "enhances memory" with no citation.
- **2048 meta description:** `"COmbine till you get 2048"` — typo visible in SERP.
- **No articles/blog section indexed** — "View all Articles →" appears on homepage linking to `/articles/` but that section returns no indexed pages. If it exists, it is invisible to Google.

**Score Justification:** Homepage and Sudoku copy are genuinely improved and readable. Rubik's page still has SERP-visible grammar errors. Complete absence of legal pages, About page, author attribution, and citations keeps E-E-A-T in below-average territory despite better writing quality.

---

### 4. Keyword Strategy — 55/100 (Below Average)

**Strengths:**
- **Homepage keyword alignment is now solid:** Primary keyword "free brain games" appears in title, meta, H1, and body copy — all four critical placements.
- **Sudoku page is well-targeted:** "free online sudoku puzzles," "play sudoku online," "sudoku board game" used naturally across title, H1, meta, and body.
- **2048 page targets smart long-tail variants:** "2048 game online," "2048 game unblocked," "number match game app," "2048 games for the brain" — strong intent coverage for this game's search behavior.
- **Rubik's Cube page targets competitive speedcubing keywords:** "rubik's cube timer," "speedcubing timer," "competition timer," "WCA conditions" — niche but high-intent.
- **Semantic variation used throughout** — synonyms and related terms appear naturally rather than mechanical repetition.

**Weaknesses:**
- **Homepage H2 subheadings are weak for keyword strategy** — "Fast Gameplay," "Brain Training," "Competitive Challenges," "Play Anywhere" are UX labels, not keyword-optimized H2s. These slots could target "free online brain games," "no download games," etc.
- **"brain games" vs "brain puzzles" inconsistency** — title uses "Brain Games & Puzzles," H1 uses "Online Games & Brain Puzzles" — not harmful but lacks consistency.
- **No keyword targeting for high-volume Indian queries** like "free games online India," "games for students free," "free puzzle games hindi" — no regional/language targeting.
- **/games/ page has no keyword strategy** — completely uncovered.
- **"Mindhack.in" repeated ~7 times in homepage body** — brand name overuse edges toward density issues.
- **2048 meta description is weak:** `"Play 2048 game for free at Mindhack.in,Just combine the same numbers..."` — missing comma after "Mindhack.in", "COmbine" typo, no strong keyword focus for "2048 game online."

**Score Justification:** Individual game pages show genuine keyword strategy improvement, particularly Sudoku and 2048. Homepage alignment is fixed. The /games/ hub is still a keyword void, H2 subheadings are not keyword-optimized, and no regional targeting exists for the Indian market.

---

### 5. Schema & Structured Data — 10/100 (Critical)

**Strengths:**
- All fetched pages have FAQ sections in the HTML — the content infrastructure for FAQPage schema is fully in place on 5 pages (homepage, Rubik's, Sudoku, 2048, and likely others).

**Weaknesses:**
- **Zero JSON-LD schema detected on any page** — no `<script type="application/ld+json">` blocks found anywhere across 5 fetched pages.
- **No WebSite schema** — homepage has no entity definition for Google Knowledge Graph.
- **No FAQPage schema** — despite FAQ sections on every page, none of it is machine-readable. All rich result opportunities are being missed.
- **No BreadcrumbList schema** on inner pages.
- **No SoftwareApplication/VideoGame schema** on game pages.
- **No Article schema** on any content pages.
- This is the single easiest, highest-ROI fix on the entire site — zero new content needed, just JSON-LD blocks added to existing pages. Currently leaving significant SERP real estate on the table.

**Score Justification:** No schema of any kind implemented anywhere on the site. This is an entirely untouched, high-impact optimization that could immediately unlock FAQ rich results, breadcrumb trails in SERPs, and sitelinks searchbox. Scored 10 (not 0) only because the FAQ content for schema exists and is well-formed.

---

### 6. Authority & Off-Page — 15/100 (Critical)

**Strengths:**
- `.in` ccTLD is appropriate for the Indian market.
- Unique game tools (Rubik's timer with WCA features, Sudoku with auto-check) have genuine link-earning potential from niche communities.
- Homepage copy mentions brain training benefits accurately, which could attract edu/wellness citations if promoted.

**Weaknesses:**
- **No external references to mindhack.in found** — brand search and site: search return zero third-party mentions or links. The domain appears uncited anywhere on the open web.
- **High brand name collision risk** — searching "mindhack.in" returns results for mindhack.com (podcast), mindhacks.com (neuroscience blog), and mindhacks.substack.com. The .in site does not surface prominently even on its own brand query.
- **No social media presence detected** — no links to Instagram, Twitter/X, YouTube, or Facebook anywhere on the site.
- **Not listed in any gaming directories** — not found on Crazy Games, Poki, itch.io, or any Indian game portals.
- **Domain Authority estimated at 0–5** — consistent with a new, uncited domain.
- **Zero community presence** — no mentions in Reddit, Quora, speedcubing forums, or Indian gaming communities.

**Score Justification:** Unchanged from v1. No off-page work has been done. Without external citations, backlinks, or brand mentions, the site cannot rank competitively for any moderately contested keyword regardless of how good on-page SEO becomes.

---

### 7. User Experience & CTR — 58/100 (Below Average)

**Strengths:**
- **Homepage title has strong CTR signals:** dash separator, "No Download" as a differentiator, benefit-forward phrasing.
- **Sudoku meta description is benefit-driven:** `"Challenge your logic and concentration with our interactive Sudoku board, featuring hints and auto-check. No download needed!"` — specific features, exclamation for energy, 152 chars. Good.
- **Rubik's meta is strong:** `"Track your Rubik's Cube solving time with MindHack's free online cube timer. Get random scrambles, Ao5 & Ao12 averages. Perfect for beginners and speedcubers..."` — 157 chars, audience-specific, feature-led.
- **Game cards on homepage** with images and "Play now" CTAs — visually organized content.
- **FAQ sections** on every game page improve perceived depth and engagement.
- **"No Download" / "No Registration" messaging** is consistent and a genuine UX differentiator.

**Weaknesses:**
- **2048 meta description has a typo visible in SERPs:** `"COmbine"` — damages click credibility.
- **No social proof elements** anywhere — no player counts, ratings, "X games played today," testimonials, or review scores.
- **No breadcrumb trail** on inner pages — reduces navigation clarity.
- **/games/ page has no meta description** — Google will auto-generate a snippet, usually picking poor copy.
- **Game images hosted on GitHub CDN** — unusual for a production site; no lazy loading or next/image optimization signals detected.
- **No structured CTAs beyond "Play now"** — no email signup, no "Save your progress" incentive, no social follow prompt.

**Score Justification:** Several meta descriptions are now genuinely well-crafted with CTR-positive elements. Homepage and key game pages have improved significantly. Missing social proof, one typo in a SERP-visible meta, and no breadcrumbs keep this below average.

---

### 8. Internal Linking — 32/100 (Poor)

**Strengths:**
- **Homepage links to all visible game pages** via game cards ("Play now" → /games/sudoku/, /games/2048/, etc.).
- **"Other games you will love"** section on Rubik's and other game pages — cross-linking between game pages is present.
- **"View all Games →"** and **"View all Articles →"** links on homepage provide top-level navigation.
- **URL structure is hierarchical** — `/games/{game-name}/` is a proper parent-child structure.

**Weaknesses:**
- **Critical: /games/ hub is JS-only** — even if homepage links to /games/, and /games/ links to individual game pages, those links are not in the HTML source and are therefore not crawlable. The hub-and-spoke structure is broken at the hub.
- **"Play now" anchor text used for all game card links** — the same non-descriptive anchor on every game. Google receives no keyword signal from these links. Should be "Play Sudoku Free," "Play 2048 Online," etc.
- **"View all games →" and "Explore games"** — both low-descriptiveness anchors for the /games/ hub link.
- **No breadcrumb navigation** on inner pages — /games/sudoku/ does not show "Home > Games > Sudoku."
- **No links from game pages back to related articles** — no hub-and-spoke to blog/article content.
- **/articles/ section not indexed** — if it exists, it may be orphaned and unable to receive or pass PageRank.
- **Footer link structure** not visible in fetched pages — cannot confirm key pages are linked from footer.

**Score Justification:** Homepage-to-game linking exists but uses poor anchor text. The /games/ hub's JS-only rendering breaks the primary internal link path for crawlers. No breadcrumbs, weak anchor diversity, and potentially orphaned articles section.

---

## Copy & Tag Corrections

| Page / Element | Current (Issue) | Recommended Fix |
|---|---|---|
| /games/ — Title tag | `Mindhack.in` (bare domain) | `Free Online Brain Games — Sudoku, 2048, Puzzles & More \| Mindhack.in` |
| /games/ — Meta description | MISSING | `Browse Mindhack.in's full library of free browser games. Play Sudoku, 2048, Rubik's Cube timer, Sliding Puzzle and more — no download, no login.` |
| /games/ — H1 | Unknown / not rendered | `All Free Online Brain Games & Puzzles` |
| /games/ — Canonical | MISSING | `<link rel="canonical" href="https://mindhack.in/games/" />` |
| Homepage — Meta description | 168 chars (8 over ideal) | `Play free brain games and puzzles online — no download needed. Mindhack.in offers memory, logic, and brain training challenges for mobile and desktop.` (151 chars) |
| Homepage — H2 subheadings | "Fast Gameplay", "Brain Training", "Competitive Challenges", "Play Anywhere" | Consider keyword-rich alternatives: "No Download Brain Games", "Brain Training Puzzles Online", "Play Free on Any Device" |
| 2048 — Title tag | `Play 2048 Game on MindHack.in` (30 chars) | `Play 2048 Game Online Free — No Download \| Mindhack.in` (55 chars) |
| 2048 — Meta description | `"COmbine till you get 2048"` (capitalization typo) | `Play 2048 free online at Mindhack.in. Combine numbered tiles to reach 2048 — no download needed. A fun, addictive brain game for all ages.` |
| Rubik's — H2 | `"Master Your Cubing Skills with MindHack.in's"` (incomplete) | `Master Your Cubing Skills with MindHack.in's Free Timer` |
| Rubik's — Body copy | `"To help you sharp your evaluate mind"` | `To help you sharpen your mind and track your progress` |
| Rubik's — Body copy | `"who wants to sharp your mind"` | `who wants to sharpen their mind` |
| Rubik's — Body copy | `"You solve time appears instantly"` | `Your solve time appears instantly` |
| Rubik's — Body copy | `"Our online tool is Connects with all devices"` | `Our online tool works across all devices` |
| All pages — OG tags | MISSING | Add `og:title`, `og:description`, `og:image` to every page |
| All pages — Twitter Card | MISSING | Add `<meta name="twitter:card" content="summary_large_image">` + title, desc, image |
| All game pages — Anchor text | `"Play now"` (×6 on homepage) | `"Play Sudoku Free"`, `"Play 2048 Online"`, `"Use Rubik's Timer"`, etc. |

---

## Schema Markup to Add

### 1. WebSite Schema — Homepage

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mindhack",
  "url": "https://mindhack.in/",
  "description": "Free browser-based brain games and puzzles. Play Sudoku, 2048, Rubik's Cube timer, and more — no download required.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://mindhack.in/games/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 2. FAQPage Schema — Homepage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to download anything to play on Mindhack.in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, all games are fully browser-based. You can play free games online instantly without any downloads."
      }
    },
    {
      "@type": "Question",
      "name": "Are the games suitable for all age groups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Mindhack.in offers free online games and puzzles suitable for players of all ages, from kids to adults."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of games can I find on Mindhack.in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll find online games and puzzles such as Sudoku, 2048, Rubik's Cube timer, and other brain-boosting activities that help improve focus and concentration."
      }
    },
    {
      "@type": "Question",
      "name": "Can I play on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Mindhack is fully responsive and optimized for smooth performance across all modern smartphones, tablets, and desktops."
      }
    }
  ]
}
```

### 3. FAQPage Schema — Sudoku Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you learn to play Sudoku?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To play Sudoku, fill the 9x9 grid so that each row, column, and 3x3 subgrid contains all numbers from 1 to 9 without any duplicates. Start with grids that have more pre-filled numbers to practice."
      }
    },
    {
      "@type": "Question",
      "name": "Can I play Sudoku online for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can play Sudoku on Mindhack.in completely free in your web browser. No registration, download, or installation is required."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to solve a Sudoku puzzle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The time to solve a Sudoku puzzle depends on the difficulty level. An easy puzzle can take 5 to 10 minutes, while extreme levels might take 30 minutes or more."
      }
    },
    {
      "@type": "Question",
      "name": "Does playing Sudoku improve your brain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, playing Sudoku regularly helps enhance memory, focus, logical thinking, and cognitive speed by keeping your brain active and challenged."
      }
    }
  ]
}
```

### 4. FAQPage Schema — Rubik's Cube Timer Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does MindHack.in offer a professional Rubik's Cube timer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the professional Rubik's Cube timer comes with WCA-standard features like random scrambles, penalties, and averages — all online and free."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use it for Rubik's Cube speed cube 3x3 practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The timer supports all cube types including 2x2, 3x3, 4x4, and more."
      }
    },
    {
      "@type": "Question",
      "name": "Is the timer mobile-friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it works perfectly on all devices, so you can practice and record your cubing time anywhere."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to download anything?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No downloads are required. The Rubik's Cube competition timer runs directly in your browser — fast, secure, and easy to use."
      }
    }
  ]
}
```

### 5. FAQPage Schema — 2048 Game Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the goal of the 2048 game online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The goal is to slide and combine numbered tiles until you reach the tile with value 2048. By merging like-numbers (2+2=4, 4+4=8…), you create higher value tiles."
      }
    },
    {
      "@type": "Question",
      "name": "Does playing the 2048 game really improve brain function?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research shows puzzle-games like 2048 sharpen problem-solving, improve focus, and enhance memory when used regularly. The game's planning mechanic is particularly linked to executive function improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies help me win the 2048 game online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep your highest value tile in a corner, build the next highest around it, and avoid random swipes that scatter your strategy. Patience and planning win more than speed."
      }
    }
  ]
}
```

### 6. SoftwareApplication Schema — Rubik's Cube Timer Page

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Mindhack Rubik's Cube Timer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "url": "https://mindhack.in/games/rubiks-cube-scramble/",
  "description": "Free online Rubik's Cube timer with WCA-standard random scrambles, Ao5 and Ao12 averages, and +2/DNF penalty options. No download required."
}
```

### 7. BreadcrumbList Schema — All Inner Pages (example: Sudoku)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mindhack.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Games",
      "item": "https://mindhack.in/games/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Free Online Sudoku Puzzles",
      "item": "https://mindhack.in/games/sudoku/"
    }
  ]
}
```

Place all schema inside `<script type="application/ld+json">...</script>` in the `<head>` of each respective page.
Test at: https://search.google.com/test/rich-results

---

## Ranking Strategy & Roadmap

### Phase 1 — Months 1–2: Fix the Foundations

| Priority | Task | Est. Effort | Expected Impact |
|---|---|---|---|
| Critical | Enable SSR/SSG on /games/ hub — fix JS rendering so game links appear in HTML source | 8–16 hrs dev | High |
| Critical | Add all 7 JSON-LD schema blocks above to their respective pages | 3 hrs | High |
| Critical | Fix /games/ page: add title, meta description, H1, canonical | 1 hr | High |
| Critical | Create robots.txt — allow all bots including GPTBot, ClaudeBot, PerplexityBot | 30 min | High |
| Critical | Submit sitemap to Google Search Console and request indexing of all game pages | 1 hr | High |
| High | Add OG and Twitter Card meta tags to every page | 3 hrs | Medium |
| High | Fix Rubik's page — rewrite all 4 grammar error sentences | 1 hr | Medium |
| High | Fix 2048 title (too short) and meta description (typo) | 30 min | Medium |
| High | Fix all "Play now" anchor texts → descriptive game-specific text | 1 hr | Medium |
| High | Create Privacy Policy, Terms of Service, Contact pages; link from footer | 4 hrs | Medium (E-E-A-T) |
| High | Create About Us page (300+ words about team and mission) | 3 hrs | Medium (E-E-A-T) |
| Medium | Add breadcrumb navigation (visual + schema) to all inner pages | 4 hrs dev | Medium |
| Medium | Add descriptive alt text to all game images | 2 hrs | Medium |

### Phase 2 — Months 2–4: Content Engine

| Priority | Task | Est. Effort | Expected Impact |
|---|---|---|---|
| High | Publish: "How to Play Sudoku for Beginners" — target keyword: "how to play sudoku" (10K–100K IN) | 4 hrs | High |
| High | Publish: "How to Get Faster at Rubik's Cube — Beginner to Sub-1 Minute" — link to timer | 4 hrs | High |
| High | Publish: "Best Free Online Brain Games for Students in India 2026" | 4 hrs | High |
| High | Publish: "10 Benefits of Brain Training Games Backed by Research" — add citations | 5 hrs | High |
| Medium | Add Sliding Puzzle page with full on-page optimization + schema | 3 hrs | Medium |
| Medium | Add Flappy Bird page with full on-page optimization + schema | 3 hrs | Medium |
| Medium | Add author bylines and publication dates to all article pages | 2 hrs | Medium (E-E-A-T) |
| Medium | Optimize homepage H2 subheadings with keyword-rich text | 1 hr | Medium |
| Medium | Add "X games played today" or player count to homepage | 2 hrs dev | Medium (social proof) |
| Low | Create Hindi-language versions of top game pages for regional SEO | 8 hrs | Medium (long-term) |

### Phase 3 — Months 3–6: Authority Building

| Priority | Task | Est. Effort | Expected Impact |
|---|---|---|---|
| High | Submit to speedcubing communities: SpeedSolving.com, r/Cubers — share Rubik's timer | 2 hrs | High |
| High | Submit to gaming directories: Crazy Games partner program, itch.io | 4 hrs | High |
| High | Guest post outreach: Indian ed-tech and school blogs — "brain training tools for students" angle | Ongoing | High |
| High | Pitch to Indian startup directories: ProductHunt India, YourStory, Inc42 | 4 hrs | Medium |
| Medium | Create Instagram: short gameplay clips, puzzle challenges | 4 hrs setup | Medium |
| Medium | Create YouTube: "How to use our Rubik's Cube timer" tutorial videos | 6 hrs | Medium |
| Medium | Get listed on Quora topics: answer "best free Sudoku online" questions with link | 3 hrs | Medium |
| Medium | Partner with Indian coaching/school websites for brain-game tool embedding | Ongoing | High |

---

## Top 5 Recommendations (Priority Order)

1. **Fix the /games/ JavaScript rendering** — The hub page for your entire game library returns empty HTML to search engines. Enable Next.js `getStaticProps` or `getServerSideProps` on `/games/` so game links are in the HTML source. Without this, Google cannot discover most of your games regardless of how good individual game pages are. Verify the fix with Google Search Console's URL Inspection → "Test Live URL" → "View Tested Page" → "HTML" tab.

2. **Add schema to all 5 pages immediately** — Every page has FAQs already written. Adding the 7 JSON-LD blocks above takes 3 hours and zero new content. FAQPage schema can double SERP real estate by showing expanded Q&A results below your listing. This is the highest ROI/effort ratio fix on the site.

3. **Rewrite the Rubik's Cube page opening paragraph** — The current second line (`"To help you sharp your evaluate mind"`) appears in Google's SERP snippet for this page. Every user deciding whether to click sees broken English. Fix: `"Whether you're a beginner or an experienced speedcuber, MindHack.in's free online Rubik's Cube timer helps you track and improve your solving time with precision."` This change alone will improve CTR from existing rankings.

4. **Build the /articles/ section and create 4 targeted blog posts** — The homepage links to "View all Articles" but that section has no indexed pages. Four well-optimized articles targeting long-tail informational keywords ("how to solve sudoku," "rubik's cube tips," "brain training benefits") will: (a) create internal links to game pages, (b) attract backlinks from edu/wellness sites, and (c) signal content freshness and topical authority to Google.

5. **Create robots.txt and verify bot access** — Without a confirmed robots.txt, you cannot guarantee that GPTBot (ChatGPT), ClaudeBot, PerplexityBot, or Googlebot have correct access. Create a robots.txt at `https://mindhack.in/robots.txt` that explicitly allows all bots, references your sitemap, and does not accidentally block /games/ or any other key path. This is a 30-minute task with disproportionate impact.

---

## Risk Assessment

| Risk | Severity | Affected Category | Mitigation |
|---|---|---|---|
| /games/ JS-only rendering — entire game library unindexed | Critical | Technical, Internal Linking | Implement SSR/SSG; verify via GSC URL Inspection |
| robots.txt unconfirmed — bots may be blocked | Critical | Technical, GEO | Create robots.txt allowing all bots; verify immediately |
| Rubik's page grammar errors in live SERP snippets | High | Content, UX/CTR | Rewrite affected sentences (1 hr fix) |
| Zero schema — rich results entirely missed | High | Schema | Implement 7 JSON-LD blocks (3 hr fix) |
| No About/Privacy/Contact/Terms pages | High | E-E-A-T | Create all 4 pages; link from footer |
| Brand name collision (mindhack.com, mindhacks.com) | Medium | Authority | Build consistent brand signals; use "Mindhack.in" (with .in) in all mentions |
| Zero backlinks — can't rank for competitive queries | High | Authority | Start directory submissions and community outreach |
| Images on external GitHub CDN | Medium | Technical | Migrate to self-hosted or Vercel/Cloudflare CDN with proper alt text |
| No OG/social meta tags | Medium | UX/CTR | Add site-wide in 3 hrs |
| /articles/ section potentially orphaned | Medium | Internal Linking, Content | Verify existence; optimize and link from homepage |

---

## Keyword Opportunities

| Keyword | Est. Monthly Searches (IN) | Difficulty | Target Page | Intent |
|---|---|---|---|---|
| free online games | 500K–1M | High | Homepage | Navigational |
| sudoku online free | 10K–100K | Medium | /games/sudoku/ | Transactional |
| play sudoku online | 10K–100K | Medium | /games/sudoku/ | Transactional |
| how to play sudoku | 10K–100K | Low | New blog post | Informational |
| 2048 game online | 10K–100K | Medium | /games/2048/ | Transactional |
| 2048 game unblocked | 10K–100K | Low | /games/2048/ | Transactional |
| rubiks cube timer | 1K–10K | Low | /games/rubiks-cube-scramble/ | Transactional |
| rubik's cube scramble generator | 1K–10K | Low | /games/rubiks-cube-scramble/ | Transactional |
| brain games online free | 10K–100K | Medium | Homepage / /games/ | Transactional |
| free puzzle games no download | 1K–10K | Medium | /games/ | Transactional |
| sliding puzzle online | 1K–10K | Low | /games/sliding-puzzle/ | Transactional |
| free games for students india | 1K–10K | Low | New blog post | Informational |
| benefits of brain training games | 1K–10K | Low | New blog post | Informational |
| how to get faster at rubik's cube | 1K–10K | Low | New blog post → timer page | Informational |
| flappy bird online | 10K–100K | Low | /games/flappy-bird/ | Transactional |

---

## How to Rank in LLMs (ChatGPT, Claude, Perplexity, Gemini) — GEO Strategy

### What is GEO and Why It Matters Now

Generative Engine Optimization (GEO) is the practice of structuring content so that AI language models — ChatGPT, Claude, Perplexity, Google Gemini, and Google AI Overviews — cite your site when answering user queries. Unlike traditional SEO where users see your link and choose to click, GEO puts your brand, facts, and tools directly inside the AI's answer.

For Mindhack.in, this matters because queries like "best free Sudoku game online India," "free Rubik's cube timer," or "no-download brain games" are exactly the kind of specific, tool-based queries that AI assistants answer with direct recommendations. If Perplexity or ChatGPT recommends a Sudoku site, it will pick the one with the most credible, well-structured, well-cited presence — not necessarily the one ranking #1 on Google.

### How Each LLM Sources Its Answers

| LLM | Primary Source Mechanism | Your Lever |
|---|---|---|
| **ChatGPT (with search)** | Bing index + real-time web retrieval | Rank on Bing; be cited on Reddit, Quora, authoritative sites |
| **Perplexity** | Real-time web crawl (very similar to Google) | Traditional SEO + structured content + fast indexing |
| **Google AI Overviews** | Google index + Knowledge Graph | Google SEO + schema + E-E-A-T signals |
| **Claude** | Training data (pre-cutoff) + web search when enabled | Long-term: get cited on high-authority pages before training cutoffs |
| **Gemini** | Google index + Reddit/forums via Perspectives | Forum presence + editorial authority |

### GEO Tactics for Mindhack.in

#### 1. Allow AI Crawlers in robots.txt (Immediate — 30 min)

The most critical first step. Create `robots.txt` that explicitly allows:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://mindhack.in/sitemap.xml
```

If these bots are blocked, none of the GEO tactics below will work.

#### 2. Write "Answer-First" Page Intros (High Impact — 2 hrs)

AI models pull from the first 40–60 words of a page when formulating answers. Rewrite every game page intro to lead with a direct, citation-worthy statement:

**Current Sudoku intro:** "Sudoku is one of the most popular and timeless logic puzzles in the world..."
**GEO-optimized:** "Mindhack.in offers free online Sudoku puzzles with auto-check, unlimited layouts, and no download required. Play directly in your browser on mobile or desktop — no sign-up needed."

This format makes it easy for an AI to extract and cite the specific tool when a user asks "what's a good free Sudoku site?"

#### 3. Add Definitive "What Is" Sections to Every Game Page (Medium — 1 hr/page)

AI models love authoritative definitions. Every game page should have a clean, factual "What Is [Game]?" section with:
- A 2–3 sentence definition
- Key features (bullet list)
- Who it's for
- Why Mindhack.in's version specifically

Example for Sudoku page (already partially done — enhance it):
> "Sudoku is a logic-based number puzzle played on a 9×9 grid, divided into nine 3×3 subgrids. The objective is to fill each cell so every row, column, and subgrid contains the numbers 1–9 exactly once. Mindhack.in's free Sudoku game offers unlimited puzzles, auto-check, hints, and difficulty levels from easy to extreme — all playable without any download or account."

#### 4. Build Brand Mentions on Reddit, Quora, and Forums (High Long-Term Impact — Ongoing)

AI models heavily weight mentions from Reddit, Quora, and topical forums because they are user-generated and perceived as unbiased. Strategy:

- **Reddit:** Post in r/Cubers ("I built a free WCA-standard Rubik's cube timer — here it is"), r/puzzles ("free no-download Sudoku with auto-check"), r/indiegaming, r/india.
- **Quora:** Answer "What is the best free Sudoku game online?" and "Best Rubik's cube timer for beginners?" with a genuine recommendation linking to mindhack.in.
- **SpeedSolving.com forums:** Introduce the Rubik's timer in the relevant tool thread.
- **Discord:** Indian gaming servers, student communities.

When Perplexity or ChatGPT searches for "best free rubik's cube timer" and finds 3 Reddit threads mentioning mindhack.in positively, it will cite the site.

#### 5. Publish Original Data or Statistics (High Impact — Once per quarter)

AI models preferentially cite pages with original, citable statistics. Create at least one data-rich page per quarter:
- "We analysed 10,000 Sudoku sessions on Mindhack.in — here's what the data shows about average solve times by difficulty"
- "Rubik's cube timer data: average 3x3 solve times across 50,000 sessions"

These pages become "reference" content that AI models pull when answering questions about brain game benchmarks.

#### 6. Get Cited on Authoritative External Pages (Critical — Ongoing)

Training-data-dependent LLMs (ChatGPT base, Claude) learn about brands from the web content scraped before their training cutoff. Pages on .edu sites, well-known blogs, and established directories that mention Mindhack.in by name will eventually enter training corpora.

Priority targets:
- Indian ed-tech publications (EdTech India, YourStory Education)
- Brain training / neuroscience blogs
- Teacher resource sites and school portals
- Wikipedia — create a "free online brain games" page citing Mindhack.in as an example

#### 7. Implement FAQ + Article Schema Everywhere (High Impact — 3 hrs)

Google AI Overviews pull structured data directly. FAQPage schema makes your Q&A machine-readable and more likely to be included in AI Overviews. Implement all 7 schema blocks listed in the Schema section above.

#### 8. Track Your LLM Visibility (Ongoing)

Manually test monthly:
- Ask ChatGPT: "What is the best free Rubik's cube timer online?"
- Ask Perplexity: "Best free Sudoku game to play in browser, no download"
- Ask Google (AI Overview): "free online brain games India"
- Ask Claude: "free no-download puzzle games"

Record whether Mindhack.in is cited. If not, identify which sites ARE cited and study their content structure, backlink profile, and Reddit/Quora presence. Match and exceed those signals.

### GEO Priority Timeline for Mindhack.in

| Month | GEO Action |
|---|---|
| Week 1 | Create robots.txt allowing all AI bots; verify sitemap |
| Week 2 | Rewrite all page intros to answer-first format |
| Week 3 | Implement all FAQPage + WebSite schema |
| Month 1 | Begin Reddit/Quora presence — 2 posts/answers per week |
| Month 2 | Publish first data-rich article with original statistics |
| Month 3 | Outreach to 10 authoritative sites for mentions/links |
| Month 4 | First LLM visibility audit — benchmark citation rate |
| Month 6 | Reassess: target specific queries where AI currently cites competitors |

---

*Report generated by SEO Scorer Agent v2. All findings are evidence-based from direct page fetches on 2026-06-08. Verify schema with Google Rich Results Test. Verify index coverage with Google Search Console. GEO tactics based on current best practices — test and iterate monthly.*
