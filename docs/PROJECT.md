# Portfolio: project record

How this portfolio was built, what exists today, and what is still open. Sources: git history (2026-10-04 → 2026-11-03), the code, `PRODUCT.md` and `DESIGN.md`. For commands and how to extend the site, see `CLAUDE.md`.

## Overview

- **What it is:** Vimal Kumar's UX Engineer portfolio. It's aimed at hiring managers for product design roles (UX, UI and UX engineering).
- **Live site:** https://vimal27-20.github.io/portfolio-vimal/. Every push to `main` deploys it through `.github/workflows/deploy.yml`.
- **Stack:** Vite 5, React 18, TypeScript, React Router 7, plain CSS, Fontsource fonts (Doto, Newsreader, Geist, Geist Mono) and react-icons. There is no backend, no test suite and no linter.

## Timeline

| Date | What happened | Commits / PRs |
|---|---|---|
| Oct 4–5 | First upload of the site. A custom domain (CNAME) was tried and then dropped. Deploys moved to GitHub Pages through GitHub Actions. | `e58b623`, `42568b0` |
| Oct 5–6 | UI revision branch: design skill added, project section updated, first VISE case study, resume v2 | PRs #1, #5, #6 |
| Oct 9 | Redesign explorations: "The Line" (transit wayfinding), "Glass Network" (3D glass map) and a Nothing dot-matrix home. The Nothing.tech direction (inspired by ie.nothing.tech) won and was merged, adding the dotted hero portrait and animated resume downloads. | `c131839` → `bc945a9` |
| Oct 10 | Glass OS layer (Apple-style glass and motion), logo-green theme, "Right now" widgets, VIMAL lit in bold dots in the hero, WCAG and CSP pass, revised resume | `e24070d` → `8300752` |
| Oct 20 | V.2: the VISE case study rewritten as a short, story-led page (problem → research → gap → process → solution, marked as still in progress) | PR #7 |
| Oct 29 | v.3: Assist Now case study (a concept new skin for ServiceNow, using only the original Behance images). Moved to 3rd place, and its card now opens the case study. | PR #8, `b4f23ce`, `a032035` |
| Nov 3 | Fixes and speed (details below) | `71f8a04` |

The Nov 3 commit (`71f8a04`):
- Fixed the invisible "Open in Figma" button in case-study headers.
- Converted images from PNG to WebP, cutting the home page download from about 7.8 MB to about 0.36 MB.
- Made case studies lazy-load, with a preload when the browser goes idle.
- Removed Dribbble, the Dublin clock and "Based in Ireland".
- Added quick links to the footer.
- Changed "Résumé" to "Resume".
- Added the line "Open to product design roles: UX, UI and UX engineering".
- Added guards in the canvas dot art so it no longer throws when the box has no size yet.

## What exists now

**Home page** (`src/app.tsx`, in order):
- **Hero:** a black stage with a dot field and VIMAL lit in dots (`hero.tsx`, `dotfield.tsx`).
- **Work:** a sideways product row with category filters (`work.tsx`). Each project opens in a quick-view sheet (`quickview.tsx`), which leads to the case study or to Behance. The categories also appear as a transit map (`src/data/network.ts`).
- **Right now:** widgets about current work and process (`widgets.tsx`, `glyph.tsx`).
- **Journey:** the career as a spec list, newest first (`journey.tsx`).
- **Terminus:** the contact block, with one press to copy the email address (`terminus.tsx`).
- **Footer:** a big dot-matrix menu, credits, and quick links (Resume, Top).
- **On every page:** the top pill navigation (`topsign.tsx`), the soft cursor (`pointer.tsx`) and scroll handling on route changes (`scrollmanager.tsx`).

**Projects**, in display order (from `src/data/projects.ts`):

| # | Project | Case study |
|---|---|---|
| 1 | VISE: Personal Finance | `/work/vise` |
| 2 | Flex Academy Landing Page | `/work/flex-academy` |
| 3 | Assist Now | `/work/assist-now` |
| 4 | Hybrid Work Experience Planner | Behance |
| 5 | Balanci | Behance |
| 6 | Remembering What Matters | `/work/mindful-moments` |
| 7 | Enhancing Gardening with Smart Tech | Behance |

**Visual system:** three stylesheets loaded in this order: `globals.css` (tokens and the Nothing base), `nothing.css` (components), then `glass.css` (glass and motion). `DESIGN.md` documents the system.

## Architecture

- Data flows from `projects.ts` to `network.ts` (categories become lines, projects become stations). `destination()` in `network.ts` decides what a card links to.
- The `/work/:slug` route is handled by `src/pages/casestudy/index.tsx`. It holds a registry of slugs, each loaded as its own chunk. `app.tsx` preloads them all when the browser is idle, so the quick-view image morph still plays.
- Case-study pages are built from `CaseStudyLayout`, `Section`, `Figure`, `ScrollFrame` and `WipVeil` in `layout.tsx`, and styled by `casestudy.css`.
- Hosting:
  - The base path is `/portfolio-vimal/`.
  - The deploy copies `index.html` to `404.html`, so deep links load the app.
  - The production build injects a strict CSP meta tag (`vite.config.ts`).
  - `netlify.toml` is an alternative host config that isn't currently used.

## Branches

- `main`: the deployed branch.
- `V.2`, `v.3`: release branches for the VISE rewrite and Assist Now. Both are merged.
- `v.4`: no commits beyond `main` yet.
- `origin/feat/UI-revision`: the early UI revision. Historical.

## Tooling in the repo

- `.claude/`: Claude Code project config, with the impeccable agents, design skills and `settings.local.json`.
- `.agents/skills/`: the same design skill set, shared with other agents.
- `.impeccable/`: state for the impeccable design workflow (briefs in `decision/`, review capture scripts, config).
- `.specify/`: Spec Kit scaffolding (templates, scripts, workflows).
- `.codex/hooks.json`: OpenAI Codex hook config.
- `graphify-out/`: a knowledge-graph report of the codebase, generated 2026-10-06.
- `docs/vise-case-study.md`: the working file behind the VISE page. It holds the research kit and evidence tags (Built, Hypothesis, Planned, Open issue, Validated).
- `PRODUCT.md`, `DESIGN.md`: the product and design briefs.

## Rules followed so far

- No made-up research, users, quotes or metrics. Case studies use only Vimal's own work and images.
- Case studies are short and story-led for hiring managers.

## Open items

- Assist Now duration: the card says 5 weeks, but the case study and Behance say 1 week.
- The Assist Now card thumbnail (`public/img/assist.webp`) still shows the old "UX redesign" text.
- The image list in `readme.md` is out of date.
