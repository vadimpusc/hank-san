# Filmmaker Portfolio (Svelte non-Kit)

A clean, premium, SEO-first filmmaker portfolio.

## Pages (real static routes)
- `/` Selected Work + Demo Reel + Stills
- `/about/`
- `/narrative/`
- `/commercial/`
- `/music-videos/`
- `/contact/`

## Content management (JSON)
All work is managed by separate JSON files:
- `src/data/narrative.json`
- `src/data/commercial.json`
- `src/data/musicVideos.json`

Other content:
- `src/data/site.json` (name, contact, socials, demo reel)
- `src/data/photos.json` (stills gallery)
- `src/data/credits.json` (credits list)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## SEO checklist (do this before launch)
1. Replace `https://example.com` with your real domain in:
   - `index.html`
   - `about/index.html`
   - `narrative/index.html`
   - `commercial/index.html`
   - `music-videos/index.html`
   - `contact/index.html`
   - `public/robots.txt`
   - `public/sitemap.xml`
   - `src/data/site.json` (`baseUrl`)

2. Replace the placeholder social links in `src/data/site.json`.

3. Replace `public/og.jpg` with a real OpenGraph image.

4. Replace `public/placeholders/*` thumbnails with real stills.

## Notes
- Desktop layout uses a left sidebar and content on the right.
- iPad and smaller uses a hamburger menu.
- Video embeds are privacy-friendly for YouTube via `youtube-nocookie.com`.
- JSON-LD is included on every page.
