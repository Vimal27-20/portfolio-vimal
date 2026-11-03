# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Vimal Kumar's UX portfolio: Vite 5 + React 18 + TypeScript + React Router, plain CSS, no test suite or linter. Project history, inventory and open items are in `docs/PROJECT.md`.

## Commands

- `npm run dev`: dev server at http://localhost:5173/portfolio-vimal/
- `npm run build`: `tsc` type-check, then `vite build` into `dist/` (this is the only correctness check)
- A PostToolUse hook (`.claude/hooks/typecheck.mjs`, wired in `.claude/settings.local.json`) runs `tsc --noEmit` after every .ts/.tsx edit and feeds errors back
- `npm run preview`: serve the production build (needed to see the CSP meta tags, which apply only to builds)

## Deploy

Pushing to `main` publishes the site to GitHub Pages at https://vimal27-20.github.io/portfolio-vimal/ (`.github/workflows/deploy.yml`). Because of that, `vite.config.ts` sets `base: "/portfolio-vimal/"` and the router uses `basename={import.meta.env.BASE_URL}`. Reference public assets with relative paths (`img/x.webp`, not `/img/x.webp`). The workflow copies `index.html` to `404.html` so that deep links like `/work/vise` load the SPA.

The production build injects a strict CSP (`script-src 'self'`, no external hosts except Google Fonts). Inline scripts and third-party embeds will break on the live site even when they work in dev.

## Architecture

- `src/data/projects.ts` is the source of truth for the work section. The array order is the display order. `categoryOf()` maps each slug to a category.
- `src/data/network.ts` lays projects out as a transit map: categories become lines and projects become stations, placed by slug in `PLACES`. A new project needs an entry there too. `destination()` decides what a card opens: the in-site case study if `caseStudy` is set, otherwise the external `link` (Behance).
- Case studies live in `src/pages/casestudy/`. Each one is a page built from `CaseStudyLayout`, `Section` and `Figure` in `layout.tsx`, and styled by `casestudy.css`. To add one:
  1. create the page
  2. register its slug in `LOADERS` in `index.tsx`
  3. set `caseStudy: "/work/<slug>"` on the project

  Each case study is lazy-loaded as its own chunk. `app.tsx` preloads them all when the browser goes idle, so the quick-view image morph (a view transition) still works on click. Keep that preload when you change routing.
- Styles load in this order: `globals.css` (tokens and the base "Nothing" look), then `nothing.css` (page components), then `glass.css` (Apple-style frosted and motion touches on top).
- `dotfield.tsx` and `portraitdots.tsx` draw canvas dot-matrix art. Guard against zero-size layouts before calling `getImageData`.

## Content rules

- `PRODUCT.md` (audience, positioning, voice) and `DESIGN.md` (visual system) are the briefs. Read them before changing copy or visuals.
- Never fabricate research, user data, quotes or metrics in case studies. Use only the work and images Vimal supplied (`public/img/`), and don't add invented design screens.
- Case-study copy is short and story-led for hiring managers: problem → research → gap → process → solution.
- Ship images as WebP around 1400px wide, not large PNGs.
