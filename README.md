# awfoto-website

Portfolio site for **Andrew Williams — AW Design & Foto**, a professional sports
media photographer & videographer. Built with Vite + React 19, deployed via
GitHub → Cloudflare Pages.

Bold black + electric-teal athletic editorial design, bilingual English/German
accents (Über Mich · Glaube · Bereit Für Den Sieg).

## Sections

Navbar → Hero → Most Recent → Sports Media (101) → Videography (202) →
Photography (303) → About Me / My Faith → Get in Touch → Footer.

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
  components/   Navbar · Logo · Hero · MostRecent · Showcase · Photography ·
                About · Contact · Footer · Reveal (scroll-in) · icons
  styles/       one CSS file per component + common.css
  data/         siteData.js — nav, socials, recent work, photography list
  App.jsx       composes the page
  main.jsx      entry point
public/         images + assets served at root
```

## Editing content

All copy/links/images live in **`src/data/siteData.js`** (nav, socials, recent
work cards, photography grid). Section imagery is referenced by path from
`public/`. The two `Showcase` banners (Sports Media / Videography) are configured
in `src/App.jsx`.

### Contact form

`src/components/Contact.jsx` currently composes an email via the visitor's mail
client (`mailto:`). To capture submissions server-side, point it at a Formspree
endpoint or a Cloudflare Pages Function. Update `CONTACT_EMAIL` there.

## Fonts

Anton (display), Archivo (headings/UI), Barlow (body), Playfair Display
(numerals/italics), UnifrakturCook (German fraktur) — loaded from Google Fonts.

## Deployment — Cloudflare Pages

Connect this GitHub repo in the Cloudflare Pages dashboard:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Pushes to `main` build and deploy automatically. No workflow file required.
