---
name: Vimal Kumar Portfolio
description: The work presented the way Nothing presents a product. A black stage with a dot grid, grey shop floors, white product surfaces, a serif voice, mono labels, one red light for what is live.
colors:
  live-red: "#d71921"
  red-ink: "#b3121a"
  stage: "#000000"
  floor: "#f2f2f2"
  white: "#ffffff"
  pill-grey: "#c8c8c8"
  graphite: "#1d1d1d"
  ink: "#000000"
  ink-2: "#2b2b2b"
  ink-3: "#5c5c5c"
  hair: "#dcdcdc"
  hover-grey: "#e2e2e2"
  on-stage: "#ffffff"
  on-stage-2: "#a8a8a8"
typography:
  display:
    fontFamily: "Doto Variable, Geist Mono Variable, monospace"
    fontSize: "clamp(64px, 11vw, 168px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0.02em"
    fontVariation: "\"ROND\" 100"
  dot-menu:
    fontFamily: "Doto Variable, Geist Mono Variable, monospace"
    fontSize: "clamp(30px, 4.4vw, 56px)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "0.02em"
    fontVariation: "\"ROND\" 100"
  headline:
    fontFamily: "Newsreader Variable, Georgia, serif"
    fontSize: "clamp(40px, 5.2vw, 76px)"
    fontWeight: 450
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  section-title:
    fontFamily: "Newsreader Variable, Georgia, serif"
    fontSize: "clamp(36px, 4.4vw, 60px)"
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader Variable, Georgia, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-reading:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
  label-sm:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  btn: "4px"
  pill: "6px"
  dock: "8px"
  card: "16px"
  sheet: "20px"
  widget: "24px"
spacing:
  xs: "6px"
  sm: "16px"
  md: "32px"
  lg: "44px"
  section: "128px"
  section-mobile: "88px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0 16px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0 16px"
    height: "42px"
  button-white-hover:
    backgroundColor: "{colors.hover-grey}"
  icon-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.btn}"
    size: "40px"
  filter-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0 14px"
    height: "36px"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  tag:
    backgroundColor: "{colors.floor}"
    textColor: "{colors.ink}"
    rounded: "{rounded.btn}"
    padding: "5px 10px"
  nav-pill:
    backgroundColor: "{colors.pill-grey}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 6px"
    height: "48px"
    width: "576px"
  product-card-image:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "16px"
  widget:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.widget}"
    padding: "22px"
  widget-black:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.widget}"
    padding: "22px"
  quick-view-sheet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    width: "1080px"
  contact-field:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.pill}"
    padding: "6px 6px 6px 18px"
  chapter-dock:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.dock}"
    padding: "6px"
  chapter-dock-button:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.btn}"
    size: "38px"
---

# Design System: Vimal Kumar Portfolio

## Overview

**Creative North Star: "The Product Stage"**

The work is shown the way Nothing shows a phone: lit on a black stage, set down on light grey shop floors, held on white product surfaces you can pick up and inspect. Projects are products, not tiles in a portfolio grid. Each one is an image shown whole on a white field, opened into a quick-view sheet, then read chapter by chapter as a product page.

The voice has three registers that never trade places. A warm editorial serif (Newsreader, standing in for NType82) makes the statements. Geist Mono in small uppercase names, labels and buttons ("SEE THE WORK >"). Round dot-matrix type (Doto with ROND 100, standing in for Ndot) lights names, numerals and the big menu. Geist carries the reading. Colour is refused: everything is black, white and grey, and one red dot blinks only where something is live.

Motion is quick and exact. Dots respond to the pointer, sheets slide up, the quick-view image morphs into the case-study cover, displays step rather than glide. Under reduced motion every animation collapses to its end state and the dot word is simply on.

**Key Characteristics:**
- Black stage (hero, contact, footer, menu, case-study header) alternating with light grey floor sections.
- White product surfaces with soft radii: 16px cards, 24px widgets, 20px sheets; 4px square-shouldered controls.
- Serif statements, mono uppercase labels, dot-matrix names and numerals.
- A sparse stage dot grid with a dense lit word in it.
- One red light, for live things only.
- Flat: no shadows anywhere except the chapter dock's lift; no glass.

## Colors

A strictly achromatic product palette, black stage to white surface, with a single red signal lamp.

### Primary
- **Live Red** (live-red): the blinking 8px dot of the live indicator, in project cards, the journey's current row, the availability line, the "now building" widget and case-study status. Nothing else is red.
- **Red Ink** (red-ink): the text form of the live signal on white or floor ("NOW" in the journey, a status chip's label), where Live Red would be too light for small type.

### Neutral
- **Stage Black** (stage): hero, menu, contact block, footer, black widgets, case-study header, the chapter dock and the next-project pager.
- **Shop Floor** (floor): the page ground for every light section; also the quick view's image well and tag fills.
- **Product White** (white): cards, widgets, the quick-view sheet, filter chips, icon buttons, reader panels and figures.
- **Pill Grey** (pill-grey): the floating nav pill only.
- **Graphite** (graphite): raised controls on black: the contact field, the reader's back button, dock buttons, quote-pager buttons, the in-progress note.
- **Ink / Ink 2 / Ink 3** (ink, ink-2, ink-3): primary text and solid buttons; reading text and the button hover; secondary text, meta and counts (at least 5.6:1 on white and floor).
- **Hairline** (hair): 1px dividers in spec lists, the quick-view bar, the work rail track.
- **Hover Grey** (hover-grey): hover fill for white chips and icon buttons.
- **On Stage / On Stage 2** (on-stage, on-stage-2): text on black; secondary text on black (at least 8:1).

### Named Rules
**The One Red Light Rule.** Red appears only as the live indicator and its ink. Never as an accent, link, hover, border, focus ring or decoration. If nothing is live, the screen has no red.

**The Achromatic Rule.** Interface colour is black, white and grey. Colour enters only through project screenshots and the VK logo, which is an existing identity asset and is exempt.

## Typography

**Display Font:** Doto (round dot-matrix, `"ROND" 100`, weight 700, uppercase), falling back to Geist Mono
**Headline Font:** Newsreader (optical sizing on), falling back to Georgia
**Body Font:** Geist, falling back to system-ui
**Label/Mono Font:** Geist Mono, falling back to ui-monospace

**Character:** A soft editorial serif against an engineered mono and lit dots: the serif speaks, the mono labels, the dots name. Geist stays neutral underneath so the reading never competes.

### Hierarchy
- **Display** (dots, 700, clamp(64px, 11vw, 168px), 0.9): the project name on the case-study stage.
- **Dot Menu** (dots, 700, clamp(30px, 4.4vw, 56px), 0.95): the full-screen menu and footer link list. Dots also set the nav name, journey years (30px), the Dublin clock (clamp(56px, 6vw, 92px)) and reader stat numerals (44px).
- **Headline** (serif, 450, clamp(40px, 5.2vw, 76px), 1.02): the hero statement; the contact title runs larger (clamp(48px, 7vw, 104px)).
- **Section Title** (serif, 450, clamp(36px, 4.4vw, 60px), 1.05): home section heads, centred, with a muted line of copy below.
- **Title** (serif, 400, 24px, 1.12): card titles, widget statements (26px), reader sub-heads; chapter headings run clamp(30px, 3vw, 44px) at 1.08; quotes clamp(24px, 2.4vw, 34px) at 1.25.
- **Body** (Geist, 400, 17px / 16px under 760px, 1.55): all interface copy; ledes cap at 44 to 48ch.
- **Body Reading** (Geist, 400, 18px / 17px mobile, 1.7): case-study paragraphs, capped at 66ch.
- **Label** (Geist Mono, 500, 13px, 0.04em, uppercase): buttons, chips, text links, meta. **Label Small** (12px) for card meta, fact terms, widget labels, crumbs, the dock.

### Named Rules
**The Three Voices Rule.** Serif for statements, mono uppercase for labels, buttons and data, dots for names and numerals. A role never borrows another voice.

**The Meta Below Rule.** Nothing sits above a heading. Category, year, role and counts go below the title in mono; a section opens straight on its heading.

## Layout

A centred container of 1320px with 32px side padding (16px under 760px). Home sections stack at 128px intervals (88px on mobile) with centred heads 44px above their content. The hero is a full-bleed black stage at least `calc(100svh - 64px)` tall with its copy anchored to the bottom, leaving the top of the work peeking.

The work is a horizontal product row, not a grid: snap-scrolling columns of clamp(280px, 26vw, 380px) (74vw on mobile) at 16px gaps, aligned to the container's edge, draggable, with a 2px progress rail below. Widgets sit in a four-column bento (two columns under 1080px) with 240px minimum rows; the quote widget spans 2 by 2. The journey is a two-column split with a sticky head, collapsing under 1080px.

The case-study reader bleeds a black stage across the top, with the cover standing on the line where black meets floor. Chapters run as a 300px sticky heading column beside a reading column, collapsing to one column under 980px. Breakpoints: 760px, 980px (reader), 1080px.

## Elevation & Depth

Flat. Depth comes from ground changes (black stage, grey floor, white surface) and from scrims behind modal sheets (black at 72% for the quick view, 92% for the lightbox). Outline buttons draw their 1px edge as an inset stroke, which is a border, not elevation.

### Shadow Vocabulary
- **Dock lift** (`box-shadow: 0 10px 30px -10px rgba(0, 0, 0, .45)`): the chapter dock only, because it floats over reading content.

### Named Rules
**The One Lift Rule.** No shadows except the dock's lift. Cards, widgets, sheets, figures and buttons sit flat on their ground.

**The No Glass Rule.** No backdrop blur, frosted panels or translucent surfaces. Surfaces are opaque.

## Shapes

Two families of corner. Controls are square-shouldered: buttons, chips, tags and icon buttons at 4px, the nav pill and contact field at 6px, the dock at 8px. Product surfaces are soft: cards and reader panels at 16px, the quick-view sheet at 20px (18px top corners as a bottom sheet on mobile), widgets at 24px (20px on mobile). Dots are true circles everywhere: the live lamp, pager dots, list bullets, the dot field and the round glyph display. Active pager and dock dots stretch into a 3px-radius bar.

Project images are never cropped: `object-fit: contain` inside a padded white field.

## Components

### Buttons
Small, square-shouldered, mono caps with a trailing chevron or arrow that nudges 3px on hover.
- **Shape:** gently squared (4px), 42px tall, 16px side padding.
- **Primary:** ink fill, white label; hover to ink-2.
- **White:** on black grounds (hero, contact field); hover to a light grey.
- **Line / Line Dark:** transparent with a 1px inset stroke (ink, or white at 50% on black); hover fills solid.
- **Text link:** mono caps, underlined with a 0.3em offset, thickening to 2px on hover ("QUICK VIEW +").
- **Disabled:** 45% opacity, inert.

### Chips
- **Filter:** white, 36px, mono caps with a muted count; pressed state is solid ink with white text.
- **Tag:** floor-grey fill, 4px, 13px Geist, in the quick view.

### Cards / Containers
- **Product card:** an unboxed column: a 4:3 white image field (16px radius, 16px padding, image contained, 1.04 scale on hover over 0.7s), then serif title, muted role, mono meta and a text link. The whole column is one button that opens the quick view.
- **Widget:** white or black, 24px radius, 22px padding, mono label, content pushed to the foot. Signatures: a round 25 by 25 glyph-matrix display scrolling a 5 by 7 font in 90ms steps; the Dublin clock in dots; a quote carousel with pager dots.
- **Spec list:** facts as rows between a top ink rule and hairline dividers (quick-view facts, journey stops, reader stats with dot numerals).

### Inputs / Fields
- **Contact field:** a graphite bar (6px) holding the address in 17px Geist Mono and a white Copy button; stacks vertically on mobile. Copy feedback is announced politely.
- **Focus (global):** a 2px ink outline at 3px offset, turning white on every black ground.

### Navigation
- **Nav pill:** a floating pill-grey bar (576px max, 48px, 44px on mobile) 8px from the top: menu button, logo with the name in dots, résumé download.
- **Menu:** a native `<dialog>` filling the screen in black, the dot-matrix link list centred; hovering one link dims the rest to 35%.
- **Footer:** the same dot-matrix list on black, then a mono line with copyright and Dublin time.

### Quick View
A native `<dialog>` sheet in white (1080px max, 20px radius) that rises 24px on open; a bottom sheet on mobile with its call to action pinned. A bar carries a mono "01 / 07" count and previous, next and close icon buttons. The image sits contained in a floor well and carries the shared `cover` view-transition name, so opening the case study morphs it into the cover (0.5s).

### Chapter Dock
The reader's floating black control, hidden until chapters are on screen: previous and next graphite buttons, a row of chapter dots (the current one a 16px bar) and a mono chapter label. The arrow keys step chapters too.

### Dot Field
The hero canvas: a sparse grid of faint dots (one in every seven by seven) across black, with VIMAL rasterised into dense white dots that switch on in a stepped scatter over the first second. A lens follows the pointer, swelling dots and revealing the fine grid beneath.

## Do's and Don'ts

### Do:
- **Do** keep red to the live indicator and its ink (#d71921 dot, #b3121a text).
- **Do** set every label, button, chip, count and data point in Geist Mono uppercase at 12 to 13px with 0.04em tracking.
- **Do** put meta (category, year, role, status) below the title it describes.
- **Do** show project images whole, contained on white fields with padding.
- **Do** keep the stage grid sparse and the lit word dense.
- **Do** build dialogs (menu, quick view) on native `<dialog>` with a black scrim and Escape to dismiss.
- **Do** turn the focus ring white on black grounds and keep it ink everywhere else.
- **Do** honour reduced motion: end states only, the dot word simply on, the glyph display holding still.

### Don't:
- **Don't** put an eyebrow, kicker or label above a heading.
- **Don't** use glass, backdrop blur or translucent panels.
- **Don't** add shadows; the dock's lift is the only one.
- **Don't** introduce interface colour, gradients or a second accent.
- **Don't** crop project screenshots with `object-fit: cover` or tight frames.
- **Don't** set display text in a system face; the dots are Doto with ROND 100, statements are Newsreader.
- **Don't** lay the work out as a card grid; it is a row of products.
