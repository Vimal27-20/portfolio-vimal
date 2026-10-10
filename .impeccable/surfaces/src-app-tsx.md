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

## Glass OS layer (branch design/glass-os)

Pinned by the user on top of the Nothing.tech build: "some swift OS touch", "glassmorphism feel", profile photo in normal visibility in black and white, a different pointer animation inside the page, no visible scrollbar. Read as Apple iOS / iPadOS / visionOS touches (Swift is Apple's language).
Additions: frosted glass on everything that floats (pill nav, menu, quick view sheet, chapter dock, the Right now widgets on a blurred-portrait lock-screen wallpaper); the pill settles into a Dynamic-Island-style black capsule naming the current section after the hero; spring overshoot on press; an iPadOS-style pointer that morphs into an outline hugging controls while the control lifts (mouse only; the system cursor is kept for touch, reduced motion, open dialogs and running text); the pill takes a dark tone over dark sections and keeps menu and résumé tappable in the island on touch screens; the portrait is matted along a traced outline, not masked by a shape; no visible scrollbar at all (the user asked not to see one; no substitute indicator); the hero portrait is the black-and-white photo, masked into the stage, leaning toward the pointer with a moving soft light; iOS sheet grabber and pull-to-dismiss on the phone quick view.
Kept: the Nothing structure, type voices, achromatic palette with one red live light, dot-matrix menu and footer.

## Logo theme and Right now v2 (branch design/glass-os)

The user's words: "change the color theme… like in my logo"; "when opening project case studies the bug on font spacing fix it" (the island showed the case title and subtitle cut off); "the right now area… change the bg with plain black but need some particles around like galaxy interaction" (reference: a Nothing Glyph Matrix playground creator page); "instead of showing time as a widget put something useful like interactive 4 roll game option about finding color as a game with ux ui and another one with my design process how I am implementing the design methodology through AI UX and another 2 on your own".
Decisions: the accent is the VK logo green #a8f83a (sampled), with #3b6d0a ink for text on light grounds; it replaces the red live light and is used only for primary actions and live states (selected states are white). The island shows only the project name. Right now is plain #000 with a dot-pitched two-armed galaxy whose core sits in the head band; the pointer swirls nearby stars and a click or tap sends a ripple; widget glass is thin so the stars read through. Widgets: the VISE Glyph (lit dots in green), Find the odd colour (4 rounds, ends on WCAG 1.4.1), How I design with AI (6-step tablist; copy pending the user's confirmation), Hiring for… role matcher (real project data, opens quick view), Check a contrast (live WCAG ratio), Open to roles + résumé, client quotes. The clock and the freelance widget are removed.
