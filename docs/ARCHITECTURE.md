# PhonePad Website — Architecture

## Overview

Static, server-rendered-nothing website for the **PhonePad** iOS app, hosted at
`https://dreamteam-apps.pl`. Every page is a plain HTML document served as-is —
no build step, no framework, no backend. The only JavaScript is client-side
(consent banner + support form), and all styling comes from a single shared
stylesheet.

This keeps hosting trivial (any static host / CDN), the attack surface at zero,
and LCP terms excellent (first paint = pure HTML + one CSS file + system fonts
fallback).

## File tree

```
.
├── index.html                # Landing page (hero, app store CTA, footer)
├── privacy.html              # Privacy Policy
├── terms.html                # Terms of Use
├── cookies.html              # Cookies Policy
├── support.html              # Support / contact page with form
├── robots.txt                # Crawler directives + sitemap reference
├── docs/
│   ├── ARCHITECTURE.md       # This file
│   └── SEO.md                # SEO documentation & checklist
├── assets/
│   ├── css/
│   │   └── style.css         # Single shared stylesheet (one HTTP request)
│   └── js/
│       ├── consent.js        # GDPR cookie-consent banner logic
│       └── support.js        # Support form validation + mailto handler
└── images/
    ├── logo.svg              # PhonePad logo (header, footer, brand)
    └── favicon.svg           # Favicon (same artwork as logo)
```

## Page model

Every HTML page shares the same shell:

```
<body>
  <header> … logo / nav … </header>       ← logo.svg, links to other pages
  <main> … page content … </main>         ← hero / policy text / support form
  <footer> … brand, contact, legal links … </footer>
  <div id="cookie-banner"> … </div>       ← rendered by consent.js after load
</body>
```

- `index.html` additionally carries the app preview / hero section.
- Policy pages (`privacy`, `terms`, `cookies`) render long-form legal text.
- `support.html` contains the contact form; `assets/js/support.js` validates
  input and opens a `mailto:` to the support address (no backend needed).

## Styling

- **Single stylesheet**: `assets/css/style.css?v=<date-stamp>`.
- **Cache busting**: every page references the stylesheet and scripts with a
  `?v=` query parameter. On any CSS/JS change, bump the `v` value (current:
  `20261019_8`) so returning visitors fetch fresh assets immediately.
- Fonts are loaded from Google Fonts (oppins/Montserrat-style swaps) with
  `display=swap`; system fallbacks render first so text never blocks paint.

## JavaScript behaviour

| File            | Responsibility                                                                    |
|-----------------|-----------------------------------------------------------------------------------|
| `consent.js`    | Shows the consent banner; stores user choice in `localStorage`; gates any non-essential cookies/scripts behind explicit consent; exposes "reopen banner" hook. |
| `support.js`    | Validates the support form fields; builds a `mailto:` URL with the message; provides inline error states. |

No analytics, trackers, or third-party scripts run before consent.

## Data & privacy model

- **No backend, no database**: form submissions leave via the user's mail
  client (`mailto:`), so no message content is stored server-side.
- **Consent state** lives in the visitor's `localStorage` only.
- Legal pages document what the *app* collects (not the website), and the
  operator contact is the Hyderabad, India address shown in the footer.

## Deployment

1. Commit changes to `main`.
2. Static host (or the existing `dreamteam-apps.pl` hosting) pulls `main` and
   serves the files verbatim. No build/transpile step — the repo *is* the site.
3. After editing CSS/JS, bump the `?v=` stamp in all HTML files in the same
   commit so the cache-bust deploys atomically with the asset change.

## Conventions

- Semantic HTML5 (`header`, `main`, `section`, `footer`, `nav`).
- Descriptive `<title>` + `<meta name="description">` on every page (see
  `docs/SEO.md`).
- Valid SVG only for `logo.svg` / `favicon.svg` — no icon fonts.
- Responsive: single breakpoint at ≤ 768px collapses the layout to one column.
