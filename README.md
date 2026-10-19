# PhonePad Website

Static website for the **PhonePad** iOS app — a phone dialer / keypad app.
Hosted at https://dreamteam-apps.pl.

## Pages

| File            | Purpose                  |
|-----------------|--------------------------|
| `index.html`    | Landing page             |
| `privacy.html`  | Privacy Policy           |
| `terms.html`    | Terms of Use             |
| `cookies.html`  | Cookies Policy           |
| `support.html`  | Support / contact form   |

## How to start locally

Requirements: any machine with **Python 3** (or any static file server).

```bash
# 1. Clone the repo
git clone https://github.com/praneethssr123/phonepad-.git
cd phonepad-

# 2. Serve the site (from the repo root)
python3 -m http.server 8123
```

Then open **http://127.0.0.1:8123** in your browser.

There is **no build step** — the repo is the site. You can also just double-click
any `.html` file, but a local server is recommended so the cookie-consent
storage and paths behave exactly as in production.

Alternative servers, if you prefer:

```bash
npx serve .          # Node.js
php -S 127.0.0.1:8123  # PHP
```

## Project structure

```
├── index.html / *.html     # 5 static pages sharing one header/footer shell
├── assets/css/style.css    # single shared stylesheet
├── assets/js/consent.js    # GDPR cookie-consent banner (localStorage)
├── assets/js/support.js    # support form validation + mailto handler
├── images/                 # logo.svg, favicon.svg, footer icons
├── docs/ARCHITECTURE.md    # how the site is built
└── docs/SEO.md             # SEO docs & post-deploy checklist
```

## Making changes

- Edit the HTML/CSS/JS directly — no frameworks, no dependencies.
- **Cache busting:** after changing `style.css`, `consent.js`, or `support.js`,
  bump the `?v=` query param in every HTML file that references it
  (current stamp: `20261019_8`), then commit both in the same change.
- Legal/contact info lives in the footer of every page — keep the operator
  identity identical across Privacy, Terms, and the footer
  (currently: PhonePad App, Hyderabad, Telangana, India).

## Deploy

The site is plain static files: point any static host (or the existing
`dreamteam-apps.pl` hosting) at `main` and serve the root. Push to `main` →
the change is live.

## Contact

- Email: thribhuvan.d@outlook.com
- X (Twitter): https://x.com/iamthribhuvan
