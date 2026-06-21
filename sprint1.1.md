# Sprint 1.1: Pending SEO Optimization Tasks (MindHack.in)

This document contains the remaining pending items from the original `sprint1.md` roadmap. These tasks focus on E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals, legal page infrastructure, and technical crawler configurations for AI search engines (GEO).

---

## 📋 Remaining Pending Tasks

### Phase 4: E-E-A-T & Legal Pages Setup

- [ ] **Item 4.1: Create E-E-A-T Static Pages**
  - **Locations:**
    - [NEW] `/about/index.html` (About Us page, detailing the mission of browser-based brain games)
    - [NEW] `/privacy/index.html` (Standard casual gaming privacy policy)
    - [NEW] `/terms/index.html` (Standard casual gaming terms of service)
    - [NEW] `/contact/index.html` (Contact Us page with contact options or a styled form)
  - **Task:** Create standard, high-quality, professional pages styled with the dark cyber-theme of MindHack.in.

- [ ] **Item 4.2: Implement Dynamically Injected Global Footer**
  - **Location:** [utility/js/base.js](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/utility/js/base.js) & [utility/css/template.css](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/utility/css/template.css)
  - **Task:** Write a script in `base.js` to dynamically append a styled, modern footer containing the legal and navigation links (About Us, Privacy Policy, Terms of Service, Contact Us) at the bottom of the `.page-content` container. This avoids manual copy-pasting of HTML across all game files.

---

### Phase 5: Technical Crawling & Indexing Updates

- [ ] **Item 5.1: Robots.txt AI/GEO Bot Optimization**
  - **Location:** [robots.txt](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/robots.txt)
  - **Task:** Update the robots.txt file to explicitly list and allow AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot`, `Bingbot`) to scrape and index the site's pages.

- [ ] **Item 5.2: Sitemap XML Synchronization**
  - **Location:** [sitemap.xml](file:///c:/Users/mindh/Documents/mindhack.in/3.0/main-website/MindHack.in/sitemap.xml)
  - **Task:** Add the 4 new E-E-A-T pages (`/about/`, `/privacy/`, `/terms/`, and `/contact/`) to the sitemap file.
