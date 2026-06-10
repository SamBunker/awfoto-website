# awfoto-website

Portfolio site for **Andrew Williams — AW Design & Foto**, a professional sports
media photographer & videographer. Built with Vite + React 19, deployed via
GitHub → Cloudflare Pages.

Bold black + electric-teal athletic editorial design, bilingual English/German
accents (Über Mich · Glaube · Bereit Für Den Sieg).

## Sections (home)

Navbar → Hero → Most Recent → Sports Media (101) → Videography (202) →
Photography (303) → About Me / My Faith → Get in Touch → Footer.

## Pages & routing

Client-side routing via `react-router-dom`:

| Route | Page |
| --- | --- |
| `/` | Home (landing) |
| `/sports-media`, `/videography`, `/photography` | Category listing |
| `/:category/:slug` | Post / article / gallery detail |
| `/archive` | Combined feed of all posts (filterable) |
| `*` | 404 |

`public/_redirects` (`/* /index.html 200`) gives Cloudflare Pages the SPA
fallback so deep links resolve.

## Content (CMS) — file-based Markdown

Posts are Markdown files in `src/content/<category>/<slug>.md`, loaded at build
time via Vite `import.meta.glob` and rendered with `marked`. The filename is the
URL slug; the folder is the category. Add a post by dropping in a new `.md`:

```markdown
---
title: Game Day Recap
date: 2025-05-01
excerpt: One-line summary shown on cards and the post lede.
cover: /some-image.jpg
tags: [Recap, Volleyball]
featured: true
video: https://www.youtube.com/embed/VIDEO_ID   # videography only
images:                                          # photography galleries
  - /photography-1.jpg
  - /photography-2.jpg
---

Markdown body. Supports headings, **bold**, _italics_, lists, > quotes, links.
```

- **Sports Media / Videography** → article layout (video embed if `video` is set).
- **Photography** → gallery layout with a click-to-open lightbox (from `images`).
- Categories/numerals/blurbs live in `src/content/categories.js`.
- Images go in `public/` and are referenced by absolute path (`/name.jpg`).

## Development

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Project structure

```
src/
  pages/        Home · CategoryPage · PostPage · ArchivePage · NotFound
  components/    Layout · Navbar · Logo · Hero · MostRecent · Showcase ·
                Photography · About · Contact · Footer · PostCard · Lightbox ·
                Reveal · ScrollToTop · icons
  content/      Markdown posts by category + loader.js + categories.js
  styles/       one CSS file per component/page + common.css
  data/         siteData.js — nav, socials, home photography teaser list
  App.jsx       router + routes
  main.jsx      entry point
public/         images + assets served at root, _redirects (SPA fallback)
```

## Editing content

All copy/links/images live in **`src/data/siteData.js`** (nav, socials, recent
work cards, photography grid). Section imagery is referenced by path from
`public/`. The two `Showcase` banners (Sports Media / Videography) are configured
in `src/App.jsx`.

### Contact form (SendGrid via Cloudflare Pages Function)

The form (`src/components/Contact.jsx`) POSTs JSON to `/api/contact`, handled by
the Pages Function at `functions/api/contact.js`, which relays the message
through the SendGrid v3 API. Includes validation, a honeypot field, and
success/error states.

**Setup:**

1. In SendGrid, create an API key with **Mail Send** permission and verify a
   sender (Single Sender or authenticated domain).
2. In the Cloudflare Pages dashboard → **Settings → Environment variables**, add:

   | Variable | Notes |
   | --- | --- |
   | `SENDGRID_API_KEY` | mark as **Secret** |
   | `CONTACT_TO` | inbox that receives submissions |
   | `CONTACT_FROM` | a SendGrid **verified** sender address |
   | `CONTACT_TO_NAME` | optional |
   | `CONTACT_FROM_NAME` | optional (default "AW Design & Foto") |

3. Redeploy so the Function picks up the variables.

**Local testing:** copy `.dev.vars.example` → `.dev.vars`, fill in values, then
`npm run pages:dev` (builds and serves via `wrangler pages dev`, which runs the
Function locally). The plain `npm run dev` (Vite) does **not** run Functions, so
the form will get a 405 there — use `pages:dev` to test email end to end.

## Fonts

Anton (display), Archivo (headings/UI), Barlow (body), Playfair Display
(numerals/italics), UnifrakturCook (German fraktur) — loaded from Google Fonts.

## Deployment — Cloudflare Pages

Connect this GitHub repo in the Cloudflare Pages dashboard:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Pushes to `main` build and deploy automatically. No workflow file required.
