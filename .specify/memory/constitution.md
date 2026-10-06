<!--
Sync Impact Report
- Version: (template) → 1.0.0
- Added principles: I–VI (all new)
- Added sections: Stack & Constraints, Workflow & Quality Gates
- Templates checked: plan-template.md ✅ (Constitution Check reads gates below), spec-template.md ✅, tasks-template.md ✅
- Deferred: none
-->

# Vimal Kumar Portfolio Constitution

## Core Principles

### I. Spec Before Code
Every user-visible change (new case study, new section, behaviour change) starts as a
numbered feature in `specs/NNN-short-name/` with `spec.md` → `plan.md` → `tasks.md`.
Small copy or typo fixes are exempt. Code that ships without a spec gets a baseline
spec written afterwards.

### II. Honest Content (NON-NEGOTIABLE)
The portfolio never invents metrics, testimonials, clients or results. Placeholder or
unconfirmed content is marked `[NEEDS CLARIFICATION]` in the spec and must be resolved
or removed before release. Unfinished work is labelled as such on the page (e.g. the
"In progress" badge and blur veil used for VISE). Third-party brands are credited and
concept work carries a "not affiliated" disclaimer.

### III. Base-Path Safety
The site is served from a sub-path on GitHub Pages (`/portfolio-vimal/`). Every asset
URL MUST be built from `import.meta.env.BASE_URL`; every internal link MUST go through
React Router (`<Link>` / `navigate`) so the `basename` applies. Direct visits and
refreshes on `/work/<slug>` MUST load the app (SPA fallback via `404.html`).

### IV. Concise, Story-Led Case Studies
Case studies are visuals first, one idea per line. A section earns its place by
answering one reader question. Every case study is registered in
`src/pages/casestudy/index.tsx`, uses `CaseStudyLayout`, and is linked from its
project entry in `src/data/projects.ts` via `caseStudy: "/work/<slug>"`.

### V. Accessible & Responsive by Default
Every page is checked at 390 px and 1440 px with no horizontal scroll. Images have
meaningful `alt` text; interactive elements are keyboard reachable with visible focus;
motion respects `prefers-reduced-motion`; colour is never the only signal.

### VI. Simplicity
No new runtime dependency without a written reason in `plan.md` (Complexity
Tracking). Prefer existing components (`Figure`, `Section`, `ScrollFrame`, `WipVeil`)
and the existing CSS files over new abstractions.

## Stack & Constraints

- React 18, TypeScript (strict), Vite 5, react-router-dom 7, react-icons.
- Deployed by GitHub Actions to GitHub Pages on push to `main`.
- Case-study images are WebP in `public/img/<slug>/`; cover images 1440×900.
- Source files use the existing line endings (CRLF in `src/`); don't reformat
  untouched files.

## Workflow & Quality Gates

1. `/speckit-specify` → `/speckit-clarify` (if anything is unclear) → `/speckit-plan`
   → `/speckit-tasks` → `/speckit-implement` → `/speckit-converge`.
2. Gates before merging to `main`:
   - `npx tsc --noEmit` passes.
   - `npm run build` passes.
   - Visual check at 390 px and 1440 px; deep link to the new route works after refresh.
   - No unresolved `[NEEDS CLARIFICATION]` markers in the shipped spec.
   - Spec status updated to `Implemented`.

## Governance

This constitution overrides ad-hoc preferences for this repository. Amendments are
made by editing this file with a version bump (MAJOR: principle removed or redefined;
MINOR: principle or section added; PATCH: wording) and a note in the Sync Impact
Report. `/speckit-plan` must list any violations under Complexity Tracking with a
justification.

**Version**: 1.0.0 | **Ratified**: 2026-10-06 | **Last Amended**: 2026-10-06
