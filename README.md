# MindHack.in

Free browser-based brain games and puzzles. Built with **Next.js 15** (App Router, React 19).

Every configurable value — the site URL, the asset hosts, the game iframe host, the
support email, the API endpoint, the analytics ID — is read from `.env`. Nothing is
hardcoded in the source.

---

## Quick start

```bash
cp .env.example .env     # then edit the values
npm install
npm run check:env        # confirms .env has everything
npm run dev              # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build (pre-renders all 43 pages) |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint with the Next.js rule set |
| `npm run check:env` | Prints each env key and fails if a required one is missing |
| `npm run verify` | Release gate: diffs the build against the pre-migration site (see below) |

---

## Configuration

All keys live in `.env` (git-ignored) and are documented in `.env.example`.

| Key | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | yes | Canonical base URL. Drives canonicals, Open Graph, JSON-LD, sitemap, robots. Must end with `/`. |
| `IFRAME_LINK` | yes | Host serving the playable game iframes |
| `DYNAMIC_RESOURCE` | yes | Host serving game artwork |
| `LOGO_URL` | yes | Site logo (sidebar, OG images, Organization schema) |
| `SUPPORT_EMAIL` | yes | Shown on contact, privacy and terms |
| `API_BASE_URL` | no | Backend for the login/signup modal |
| `CONTACT_FORM_ENDPOINT` | no | Contact form target. Blank or unset disables the form and shows the email fallback instead of dropping messages. |
| `GA_MEASUREMENT_ID` | no | Google Analytics 4 ID. Leave blank to disable analytics entirely. |
| `SITE_NAME`, `SITE_LOCALE` | no | Identity strings used in metadata |

**How it works.** `lib/env.js` is the only module that touches `process.env`. It
validates the required keys (hard failure on a production build, warning in dev) and
exports:

- `env` — the raw resolved values, for server components
- `publicEnv` — the explicit subset handed to client components via `<EnvProvider>`
- `interpolate()` — resolves `{{TOKEN}}` placeholders in the content layer

Because client components read config through React context rather than
`process.env`, no `NEXT_PUBLIC_` prefixes are needed and nothing leaks into the
browser bundle unless it is listed in `publicEnv`.

Switching environments is a one-line change:

```bash
SITE_URL=https://mindhack.in/          # production
SITE_URL=http://localhost:3000/        # local
```

Every canonical tag, OG URL, schema URL, sitemap entry and asset URL follows.

---

## Project structure

```
app/
  layout.jsx              Root layout: CSS, sidebar, auth modal, analytics
  [[...slug]]/page.jsx    Renders every content page; generateStaticParams
                          builds the route list from content/routes.json
  not-found.jsx           Real 404 (replaces the old meta-refresh redirect)
  sitemap.js              /sitemap.xml, generated from the route list
  robots.js               /robots.txt

components/
  EnvProvider.jsx         Passes .env config to client components
  Sidebar.jsx             Navigation, active-state from the current route
  AuthModal.jsx           Login / signup, posts to API_BASE_URL
  GameGrid.jsx            Game cards, server-rendered from data/games.js
  VariantGrid.jsx         Board sizes / card themes on the three hub pages
  GameFrame.jsx           Game iframe + "game mode" scroll locking
  ContactForm.jsx         Contact form with inline submit status
  Breadcrumbs.jsx         Breadcrumb trail
  PageContent.jsx         Parses body HTML, swaps markers for components
  Footer.jsx, JsonLd.jsx, Analytics.jsx, CurrentYear.jsx

content/
  routes.json             The canonical list of URLs
  pages/<slug>.json       Per-page title, description, canonical, OG/Twitter,
                          JSON-LD, breadcrumbs
  pages/<slug>.html       Per-page body copy

data/games.js             The game catalogue powering every game grid
data/variants.js          Board sizes and card themes for the hub pages
lib/env.js                Environment access and {{TOKEN}} resolution
lib/content.js            Loads a page from content/
lib/seo.js                Builds the Next.js Metadata object
styles/                   The original CSS, unchanged
public/                   favicon, background image
legacy/                   The previous static site, kept as the diff reference
scripts/
  check-env.mjs           Environment validator
  verify-structure.mjs    Release gate (npm run verify)
  migrate-legacy-html.mjs The one-time migration, kept for provenance
```

### How a page renders

`content/pages/<slug>.html` holds the editorial copy with `<!--@MARKER@-->`
comments where interactive chrome belongs. `PageContent.jsx` parses that HTML into
a real element tree and swaps each marker for its component **in place**, so the
surrounding nesting is preserved exactly as authored.

Available markers: `BREADCRUMBS`, `GAMEFRAME`, `GAMEGRID`, `VARIANTGRID`,
`CONTACTFORM`.

> Do not go back to splitting the HTML string on the markers. A marker nested
> inside a `<section>` leaves the opening tag unbalanced, the parser auto-closes
> it, and the content escapes its wrapper — silently, taking its CSS with it.
> `npm run verify` exists to catch exactly this.

### Verifying a release

```bash
npm run build
npm run verify
```

`verify` diffs every built page against the original static site in `legacy/`,
comparing titles, meta descriptions, JSON-LD types, body text **and the DOM
skeleton**. The structural check is the important one: a text-only diff passes
happily while the markup around it is broken.

### Editing content

- **Body copy on a page** → `content/pages/<slug>.html`
- **Title, description, schema** → `content/pages/<slug>.json`
- **Game cards** → `data/games.js`
- **Shared chrome** → `components/`

Slugs mirror the URL with `__` for `/`, e.g. `/games/sudoku/` →
`games__sudoku`. The home page is `index`.

### Adding a page

1. Add an entry to `content/routes.json` (`route`, `slug`, `segments`).
2. Create the matching `.json` and `.html` in `content/pages/`.

The route builds automatically — no new file under `app/` is needed.

---

## Deploying to Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new). The framework
   is detected automatically; no build settings to change.
2. Under **Settings → Environment Variables**, add every key from `.env.example`.
   Set `SITE_URL=https://mindhack.in/` for Production.
3. Under **Settings → Domains**, add `mindhack.in` and point the DNS record at
   Vercel. Remove the GitHub Pages A/CNAME records once it resolves.

Netlify works the same way (`npm run build`, publish directory `.next`, with
`@netlify/plugin-nextjs`).

> The old `CNAME` file has moved to `legacy/` — it is a GitHub Pages mechanism and
> has no effect on Vercel or Netlify.

---

## What changed in the migration

**Preserved exactly.** All 43 pages, at the same URLs. Titles, meta descriptions,
canonicals, Open Graph and Twitter tags, and all 60+ JSON-LD blocks
(`WebSite`, `WebPage`, `Game`, `SoftwareApplication`, `BlogPosting`, `FAQPage`,
`BreadcrumbList`) carried over verbatim. Body copy was compared character by
character after the build: identical on every page.

**Improved.**

- Game grids are server-rendered. They used to be built by client-side JavaScript,
  so crawlers saw an empty `<div>` and none of the internal links.
- The three hub pages (match-the-card, sliding-puzzle, rubiks-cube-scramble) built
  their variant grids from page-local scripts using `<button>` + `window.location`.
  Those 24 variant pages had **no crawlable inbound links at all**. They are now
  server-rendered anchors from `data/variants.js`.
- The sliding-puzzle cards shipped copy-pasted descriptions that described 2048,
  Flappy Bird and Pac-Man. Corrected.
- The contact form no longer silently drops messages when
  `CONTACT_FORM_ENDPOINT` is unset — it disables itself and shows the email
  fallback.
- JSON-LD is escaped so a `</script>` in any content string cannot break out of
  the script element.
- `sitemap.xml` and `robots.txt` are generated from the real route list, so they
  cannot drift out of sync with the site again.
- The 404 page returns a real 404 with navigation, instead of a `meta refresh`
  bounce to the home page.
- `utility/js/constants.js` and its codegen step are gone. Next.js reads `.env`
  natively, so there is no generated file to keep in sync.
- `/games/air-force-mission/demon-skies.html` is now
  `/games/air-force-mission/demon-skies/`, consistent with every other game page.
  The old path 301-redirects (see `next.config.mjs`).
- Analytics only loads when `GA_MEASUREMENT_ID` is set, and uses `next/script`
  rather than a synchronous DOM insertion.

**Worth knowing.**

- `trailingSlash: true` is set in `next.config.mjs` — this keeps URLs in the
  `/games/sudoku/` shape the site already ranks for. Don't remove it without
  setting up redirects.
- `eslint` and `eslint-config-next` are pinned to the 8.x / 15.x line. The
  current defaults (ESLint 9 + config v16) are not compatible with `next lint` on
  Next 15 and fail with a "circular structure" error.
- `legacy/` is the reference `npm run verify` diffs against. Keep it until you are
  confident in the new build; deleting it makes `verify` skip rather than fail.

## Known issues, not fixed

- The match-the-card variant cards use the theme name as both the heading and the
  description ("Fruits" / "Flip and pair the fruits cards from memory"). Thin, but
  rewriting ten cards of marketing copy is a content decision, not a bug fix.
- `CONTACT_FORM_ENDPOINT` has never been configured, so the contact form has
  never delivered a message. Create a form at your provider and set the key.
