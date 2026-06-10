# awfoto-website

Photography portfolio for **AW Foto**. Built with Vite + React 19, deployed via
GitHub → Cloudflare Pages.

## Development

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Project structure

```
src/
  components/   UI sections (Navbar, Hero, Gallery, About, Contact, Footer)
  styles/       one CSS file per component + common.css
  data/         galleryData.js — placeholder gallery content
  App.jsx       composes the page
  main.jsx      entry point
public/         static assets served at root (favicon, images)
```

## Adding photos

Drop images into `src/assets/images/` (imported) or `public/img/` (referenced by
path), then update the `src` fields in `src/data/galleryData.js`.

## Deployment — Cloudflare Pages

Connect this GitHub repo in the Cloudflare Pages dashboard:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Pushes to `main` build and deploy automatically. No workflow file required.
