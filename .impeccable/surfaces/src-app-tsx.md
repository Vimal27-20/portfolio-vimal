---
version: 1
slug: "src-app-tsx"
primary_target: "src/app.tsx"
related_targets: ["src/components/hero.tsx","src/components/dotfield.tsx","src/components/work.tsx","src/components/quickview.tsx","src/components/widgets.tsx","src/pages/casestudy/layout.tsx"]
---

# Portfolio home + case studies (Nothing.tech version)

Scope: whole site on branch design/nothing-tech (home `/`, case studies `/work/:slug`). Visitor mode: Experience (the work leads).
Audience and job: recruiters and hiring managers in Ireland skimming for a UX Engineer; success is opening a project, then a résumé download or contact. Constraints: facts from PRODUCT.md; VK logo kept; no invented metrics; no skills section (user removed it); crisp; accessible (contrast, focus, reduced motion, keyboard).
Pinned by the user: inspiration from ie.nothing.tech; showcase widgets; projects easy to open and view; case studies read in a different, built-in way; much more interactive.
Memorable moment: the hero's dot field spells VIMAL in lit dots that swell under the cursor; picking a project opens a quick view, and its image morphs into the case study.
Unresolved: none.

## Direction contract

THESIS: The portfolio is presented the way Nothing presents a product: a black stage with a dot grid, an editorial serif voice, dot-matrix labels, and the work shown like products you can pick up and inspect. It refuses card-grid portfolios, glass, and colour.

OWN-WORLD: Black stage and light grey (#f2f2f2) shop floors, white product surfaces with soft radii; Newsreader serif for statements (NType82 stand-in), Geist for reading, Geist Mono uppercase for labels and links ("VIEW >"), Doto round dots for names, numerals and the footer menu (Ndot stand-in). A floating grey pill nav. Red #d71921 only for what is live. Motion is quick and exact: dots respond, sheets slide, images morph between views.

STORY: Visitor lands on the dot-field hero, drags through the work carousel, opens any project in a quick view, reads a case study chapter by chapter with the dock, glances at the widget showcase (now building, Dublin time, availability, current role, client quotes), opens journey rows, and ends at the black contact block and dot-matrix footer.

FIRST VIEWPORT: Floating grey pill nav (menu, VIMAL KUMAR in dots, résumé). Black stage with the interactive dot field spelling VIMAL; serif headline "UX Engineer who designs and builds." centred below; a white mono button to the work; the top of the work section peeks at the bottom edge.

FORM: Nothing product site, user-pinned (reference ie.nothing.tech), no roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
