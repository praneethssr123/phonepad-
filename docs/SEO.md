# PhonePad Website — SEO Documentation

## Goals

Rank for app-discovery queries around the brand (`phonepad app`, `phonepad
ios`) and support intent (`phonepad help`, `phonepad contact`), and get the
Google Play / App Store listing surfaced via rich metadata.

## Per-page metadata

Every page ships a unique title + description + canonical URL.

| Page            | `<title>`                                   | Meta description focus                                  |
|-----------------|---------------------------------------------|----------------------------------------------------------|
| `index.html`    | PhonePad — Phone Dialer & Keypad App        | Brand hero, download CTA, short value prop.              |
| `privacy.html`  | Privacy Policy — PhonePad                    | What data the app does/doesn't collect.                  |
| `terms.html`    | Terms of Use — PhonePad                      | Usage rules, liability, governing law.                   |
| `cookies.html`  | Cookies Policy — PhonePad                    | Cookie types, consent, how to change preferences.        |
| `support.html`  | Support — PhonePad                           | Contact channel, FAQ-style text, response expectation.   |

Rules applied everywhere:

- **Canonical URLs**: `<link rel="canonical" href="https://dreamteam-apps.pl/<page>">` — no duplicate-content risk between http/https or www/apex.
- **OpenGraph** (og:title, og:description, og:image = logo/app artwork, og:url, og:type) and **Twitter card** (`summary_large_image`) on all pages.
- **Favicon**: `images/favicon.svg`, referenced with `rel="icon"`.
- Language / dir on `<html>`: `en`.

## Structured data

`index.html` includes JSON-LD:

- `WebSite` — site name + URL.
- `SoftwareApplication` (type `MobileApplication`) — name, operatingSystem `iOS`,
  applicationCategory, offers (free), aggregate rating if reviews exist.

Add an `Organization` node if the developer entity gains its own brand page.

## Crawler directives

- `robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://dreamteam-apps.pl/sitemap.xml
  ```
- All pages are indexable (`<meta name="robots" content="index, follow">`) —
  no page needs `noindex`.

## Sitemap

`sitemap.xml` should list the 5 URLs with `lastmod` updated on deploy:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://dreamteam-apps.pl/</loc></url>
  <url><loc>https://dreamteam-apps.pl/privacy.html</loc></url>
  <url><loc>https://dreamteam-apps.pl/terms.html</loc></url>
  <url><loc>https://dreamteam-apps.pl/cookies.html</loc></url>
  <url><loc>https://dreamteam-apps.pl/support.html</loc></url>
</urlset>
```

Submit via Google Search Console after each content change.

## Internal linking

- Header logo → home on all pages.
- Footer legal nav (Privacy / Terms / Cookies) present site-wide — guarantees
  every policy page is ≤ 1 click from any URL, satisfying Google's quality
  expectations for E-A-T on legal texts.
- Support link in the footer points to `support.html`, not a raw mailto (keeps
  the crawlable page as the entry point; the mailto lives inside that page).

## Performance & Core Web Vitals

- Zero blocking third-party JS; only `consent.js` + `support.js` ship.
- Single CSS file, ~< 30 KB, no frameworks → excellent LCP/CLS/INP by default.
- SVG logo instead of PNG → negligible bytes, crisp on all DPIs.
- Cache-busting via `?v=` param lets HTML get long-units caching while still
  shipping asset updates safely.
- Google Fonts loaded async with `display=swap` (no FOIT, no render block).

## Accessibility (SEO-adjacent)

- One `<h1>` per page; policy sections use sequential `<h2>`/`<h3>`.
- All images (logo) have `alt` text.
- Contrast on the dark theme verified for body copy.

## Content rules going forward

- Never duplicate boilerplate long-hand across policy pages — link instead.
- Keep the operator identity identical in footer, Terms §"About", and Privacy
  §"Data controller" (currently: PhonePad App, Hyderabad, Telangana, India).
- When the app's data-collection changes, update `privacy.html` **and** the
  `SoftwareApplication` JSON-LD in the same commit.

## Post-deploy checklist

1. `curl -I https://dreamteam-apps.pl/` → 200, HTTPS enforced.
2. Fetch each page in Google Search Console "URL Inspection" → request indexing.
3. Validate JSON-LD (https://search.google.com/test/rich-results).
4. Validate OG rendering (Facebook Sharing Debugger / Twitter Card Validator).
5. Lighthouse run ≥ 90 on all four pillars.
