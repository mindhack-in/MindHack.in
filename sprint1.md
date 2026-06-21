# Sprint 1: SEO Optimization Roadmap (MindHack.in)

This roadmap contains the item-by-item backlog generated from `seo-scorecard.md`. We will pick each item one-by-one to achieve a perfect foundational SEO setup and GenAI search optimization (GEO).

---

## 📋 Task Breakdown & Status

### Phase 1: On-Page Corrections (Title, Meta, Canonical, Headings & Grammar)

- [ ] **Item 1.1: Homepage Meta Description Tuning**
  - **Location:** [index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/index.html)
  - **Task:** Shorten meta description from 168 to 151 characters to fit standard SERP limits.
  - **Recommended Content:** `"Play free brain games and puzzles online — no download needed. Mindhack.in offers memory, logic, and brain training challenges for mobile and desktop."`

- [ ] **Item 1.2: Homepage H2 Subheading Keyword Optimization**
  - **Location:** [index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/index.html)
  - **Task:** Make the 4 generic subheadings keyword-rich for SEO.
  - **Recommended Fixes:**
    - "Fast Gameplay" -> "No Download Brain Games"
    - "Brain Training" -> "Brain Training Puzzles Online"
    - "Competitive Challenges" -> "Play Free on Any Device"
    - "Play Anywhere" -> "Fast Browser Games"

- [ ] **Item 1.3: Games Hub (/games/) Missing Metadata & Tags**
  - **Location:** [games/index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/games/index.html)
  - **Task:** Add missing canonical link, ensure title and meta descriptions are present and correct.
  - **Recommended Fixes:**
    - Title: `Free Online Brain Games — Sudoku, 2048, Puzzles & More | Mindhack.in`
    - Meta Description: `Browse Mindhack.in's full library of free browser games. Play Sudoku, 2048, Rubik's Cube timer, Sliding Puzzle and more — no download, no login.`
    - Canonical: `<link rel="canonical" href="https://mindhack.in/games/" />`
    - H1: Ensure `<h1>All Free Online Brain Games & Puzzles</h1>` is present.

- [ ] **Item 1.4: 2048 Game Page Title Tag Optimization**
  - **Location:** [games/2048/index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/games/2048/index.html)
  - **Task:** Extend title tag from 30 characters to include target keywords.
  - **Recommended Title:** `Play 2048 Game Online Free — No Download | Mindhack.in`

- [ ] **Item 1.5: 2048 Game Page Meta Description Typo**
  - **Location:** [games/2048/index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/games/2048/index.html)
  - **Task:** Correct the capitalization typo `"COmbine"` in the description.
  - **Recommended Content:** `"Play 2048 free online at Mindhack.in. Combine numbered tiles to reach 2048 — no download needed. A fun, addictive brain game for all ages."`

- [ ] **Item 1.6: Rubik's Cube Page Heading Fix**
  - **Location:** [games/rubiks-cube-scramble/index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/games/rubiks-cube-scramble/index.html)
  - **Task:** Fix the cut-off H2 heading.
  - **Recommended Fix:** Change `<h2>Master Your Cubing Skills with MindHack.in's </h2>` to `<h2>Master Your Cubing Skills with MindHack.in's Free Timer</h2>`

- [ ] **Item 1.7: Rubik's Cube Page Copy Grammar Corrections**
  - **Location:** [games/rubiks-cube-scramble/index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/games/rubiks-cube-scramble/index.html)
  - **Task:** Correct 4 grammar/spelling issues on the Rubik's page:
    - `"To help you sharp your evaluate mind"` -> `"To help you sharpen your mind and track your progress"`
    - `"who wants to sharp your mind"` -> `"who wants to sharpen their mind"`
    - `"You solve time appears instantly"` -> `"Your solve time appears instantly"`
    - `"Our online tool is Connects with all devices"` -> `"Our online tool works across all devices"`

- [ ] **Item 1.8: Social Sharing Preview Tags (OG / Twitter Cards)**
  - **Locations:** `index.html`, `games/index.html`, `games/sudoku/index.html`, `games/2048/index.html`, `games/rubiks-cube-scramble/index.html` (and other sub-pages)
  - **Task:** Add Open Graph (`og:title`, `og:description`, `og:image`) and Twitter Card tags to the `<head>` of all major pages.

---

### Phase 2: Schema Markup & Structured Data

- [ ] **Item 2.1: Homepage WebSite & FAQPage Schema Alignment**
  - **Location:** [index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/index.html)
  - **Task:** Refine existing schemas and add `WebSite` potentialAction properties for sitelinks search.

- [ ] **Item 2.2: 2048 Game Schema Implementation**
  - **Location:** [games/2048/index.html](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/games/2048/index.html)
  - **Task:** Add `Game` or `SoftwareApplication` JSON-LD schema markup block.

- [ ] **Item 2.3: BreadcrumbList Schema on Inner Game Pages**
  - **Locations:** All game sub-folders (`games/sudoku/index.html`, `games/2048/index.html`, etc.)
  - **Task:** Add or verify BreadcrumbList schema to trace hierarchical pathways (`Home` > `Games` > `[Game Name]`).

---

### Phase 3: Crawlability & Internal Linking (UX/JS Optimization)

- [ ] **Item 3.1: Anchor Link Crawlability in Dynamic Grid**
  - **Location:** [utility/js/games.js](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/utility/js/games.js)
  - **Task:** Convert the dynamically generated game links from `<button class="play-btn">` click handlers to real HTML anchor tags (`<a class="play-btn" href="...">`) to allow search engines to crawl through the games grid.

- [ ] **Item 3.2: Descriptive Anchor Text Optimization**
  - **Locations:** `index.html`, `games/index.html`, and `utility/js/games.js`
  - **Task:** Change generic `"Play now"` link texts to keyword-rich alternatives:
    - `"Play Sudoku Free"`
    - `"Play 2048 Online"`
    - `"Use Rubik's Timer"`
    - `"Play Sliding Puzzle"`
    - `"Play Flappy Bird"`
    - `"Play Pacman"`
    - `"Play Demon Strikes"`
    - `"Play Match the Cards"`

- [ ] **Item 3.3: Image Alt Text Audit**
  - **Locations:** `index.html` and `games/index.html`
  - **Task:** Ensure descriptive `alt` tags are defined for every game thumbnail/image.

---

### Phase 4: E-E-A-T & Legal Pages Setup

- [ ] **Item 4.1: Create E-E-A-T Static Pages**
  - **Locations:**
    - [NEW] `/about/index.html` (About Us)
    - [NEW] `/privacy/index.html` (Privacy Policy)
    - [NEW] `/terms/index.html` (Terms of Service)
    - [NEW] `/contact/index.html` (Contact Us)
  - **Task:** Write standard, high-quality, professional pages matching the dark cyber-theme.

- [ ] **Item 4.2: Implement Dynamically Injected Global Footer**
  - **Location:** [utility/js/base.js](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/utility/js/base.js) & [utility/css/template.css](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/utility/css/template.css)
  - **Task:** Dynamically inject a unified, styled modern footer containing the legal links to avoid duplicating HTML code across all 30+ game page files.

---

### Phase 5: Technical Crawling & Indexing Updates

- [ ] **Item 5.1: Robots.txt AI/GEO Bot Optimization**
  - **Location:** [robots.txt](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/robots.txt)
  - **Task:** Add specific instructions allowing AI bots (ClaudeBot, GPTBot, PerplexityBot).

- [ ] **Item 5.2: Sitemap XML Synchronization**
  - **Location:** [sitemap.xml](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/sitemap.xml)
  - **Task:** Add the new legal pages (/about/, /privacy/, /terms/, /contact/) to sitemap.xml.
