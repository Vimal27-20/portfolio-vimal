---
name: Vimal Kumar Portfolio
description: The work presented the way Nothing presents a product, under an Apple glass layer. A black stage with a dot grid and a black-and-white portrait, grey shop floors, white product surfaces, frosted glass on whatever floats, a serif voice, mono labels, one red light for what is live.
colors:
  live-red: "#d71921"
  red-ink: "#b3121a"
  stage: "#000000"
  wallpaper-black: "#0d0d0d"
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
  glass-light: "rgba(255, 255, 255, 0.72)"
  glass-dark: "rgba(18, 18, 18, 0.55)"
  pill-frost: "rgba(228, 228, 228, 0.8)"
  pill-smoke: "rgba(30, 30, 30, 0.55)"
  island-black: "rgba(0, 0, 0, 0.86)"
  widget-glass: "rgba(255, 255, 255, 0.11)"
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
    fontSize: "clamp(38px, min(4.6vw, 8vh), 68px)"
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
  tag: "8px"
  btn: "10px"
  control: "12px"
  dock-btn: "14px"
  card: "16px"
  pill: "18px"
  island: "19px"
  dock: "20px"
  widget: "24px"
  sheet: "26px"
  field: "6px"
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
    rounded: "{rounded.control}"
    size: "40px"
  filter-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "36px"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  nav-pill-light:
    backgroundColor: "{colors.pill-frost}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 6px"
    height: "48px"
    width: "576px"
  nav-pill-dark:
    backgroundColor: "{colors.pill-smoke}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.pill}"
    padding: "0 6px"
    height: "48px"
    width: "576px"
  nav-island:
    backgroundColor: "{colors.island-black}"
    textColor: "{colors.on-stage}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.island}"
    height: "38px"
    width: "210px"
  product-card-image:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "16px"
  widget:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.widget}"
    padding: "22px"
  widget-glass:
    backgroundColor: "{colors.widget-glass}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.widget}"
    padding: "22px"
  quick-view-sheet:
    backgroundColor: "{colors.glass-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    width: "1080px"
  tag:
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "5px 10px"
  contact-field:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.field}"
    padding: "6px 6px 6px 18px"
  chapter-dock:
    backgroundColor: "{colors.glass-dark}"
    textColor: "{colors.on-stage}"
    rounded: "{rounded.dock}"
    padding: "6px"
  chapter-dock-button:
    textColor: "{colors.on-stage}"
    rounded: "{rounded.dock-btn}"
    size: "38px"
---

# Design System: Vimal Kumar Portfolio

## Overview

**Creative North Star: "The Product Stage, Under Glass"**

The work is shown the way Nothing shows a phone: lit on a black stage, set down on light grey shop floors, held on white product surfaces you can pick up and inspect. Projects are products, not tiles in a portfolio grid. Each one is an image shown whole on a white field, opened into a quick-view sheet, then read chapter by chapter as a product page. Over that structure sits a layer taken from Apple's iOS, iPadOS and visionOS: frosted glass on everything that floats, a nav pill that settles into a Dynamic-Island capsule, spring motion on whatever you press, and an iPadOS pointer that outlines the control under it.

The voice has three registers that never trade places. A warm editorial serif (Newsreader, standing in for NType82) makes the statements. Geist Mono in small uppercase names, labels and buttons ("SEE THE WORK >"). Round dot-matrix type (Doto with ROND 100, standing in for Ndot) lights names, numerals and the big menu. Geist carries the reading. Colour is still refused. Everything is black, white, grey or glass tinted by what lies beneath it, and one red dot blinks only where something is live. The hero is a black-and-white portrait of Vimal over the sparse stage grid. It leans toward the pointer the way a visionOS window does, and a soft light follows the pointer across it.

Motion is quick and exact, with a small overshoot. Controls give under a press and spring back. The pill morphs into the island along the same spring, sheets rise with a slight bounce, and the quick-view image morphs into the case-study cover. Displays and the live lamp step rather than glide. Under reduced motion every animation collapses to its end state, the portrait stops leaning and the system cursor stays. Under reduced transparency every glass surface turns opaque.

**Key Characteristics:**
- Black stage (hero, contact, footer, case-study header) alternating with light grey floor sections; #now is a blurred-portrait lock-screen wallpaper.
- White product surfaces with soft radii: 16px cards, 24px widgets. Glass sheets at 26px, glass pill at 18px, controls at 10 to 14px.
- Frosted glass only on what floats: the pill and island, the menu, the quick-view sheet, the chapter dock, and the widgets lying on their wallpaper.
- Serif statements, mono uppercase labels, dot-matrix names and numerals.
- A black-and-white portrait over a sparse stage dot grid, with a lens that reveals the fine grid under the pointer.
- One red light, for live things only.
- No visible scrollbar anywhere, and no substitute indicator.

## Colors

A strictly achromatic product palette, black stage to white surface, with translucent glass that borrows its tone from the ground beneath and a single red signal lamp.

### Primary
- **Live Red** (live-red): the blinking 8px dot of the live indicator, in project cards, the journey's current row, the availability widget, the "now building" widget, case-study status and the open item of a progress list. Nothing else is red.
- **Red Ink** (red-ink): the text form of the live signal on white or floor ("NOW" in the journey, a status chip's label), where Live Red would be too light for small type.

### Neutral
- **Stage Black** (stage): hero, contact block, footer, black widgets, case-study header, the next-project pager, and the opaque fallback for the menu and dock.
- **Wallpaper Black** (wallpaper-black): the #now section ground, which closes over the blurred-portrait wallpaper at its top and bottom edges.
- **Shop Floor** (floor): the page ground for every light section.
- **Product White** (white): cards, light widgets, filter chips, icon buttons, reader panels, figures, and the quick view's opaque fallback.
- **Pill Grey** (pill-grey): the nav pill's opaque fallback under reduced transparency.
- **Graphite** (graphite): raised controls on black: the contact field, the reader's back button, the in-progress note, and the #now widgets' opaque fallback.
- **Ink / Ink 2 / Ink 3** (ink, ink-2, ink-3): primary text and solid buttons; reading text and the button hover; secondary text, meta and counts (at least 5.6:1 on white and floor).
- **Hairline** (hair): 1px dividers in spec lists and the work rail track.
- **Hover Grey** (hover-grey): hover fill for white chips, icon buttons and white buttons.
- **On Stage / On Stage 2** (on-stage, on-stage-2): text on black; secondary text on black (at least 8:1).

### Glass
- **Light Glass** (glass-light): the quick-view sheet, frosted over the floor and the page beneath.
- **Dark Glass** (glass-dark): the chapter dock, floating over the reader.
- **Pill Frost / Pill Smoke** (pill-frost, pill-smoke): the nav pill's two tones: frost over the floors, smoke over the black stages and the wallpaper.
- **Island Black** (island-black): the collapsed Dynamic-Island capsule.
- **Widget Glass** (widget-glass): the light widgets on the #now wallpaper. The black and quote widgets there drop to black at 38%.

### Named Rules
**The One Red Light Rule.** Red appears only as the live indicator and its ink. Never as an accent, link, hover, border, focus ring, glass tint or decoration. If nothing is live, the screen has no red.

**The Achromatic Rule.** Interface colour is black, white and grey. Colour enters only through project screenshots and the VK logo, which is an existing identity asset and is exempt.

**The Borrowed Tone Rule.** Glass takes the tone of what is beneath it: dark glass over the black stages and the wallpaper, light frost over the #f2f2f2 floors. The pill checks the ground under its centre line as the page scrolls and switches tone to match.

## Typography

**Display Font:** Doto (round dot-matrix, `"ROND" 100`, weight 700, uppercase), falling back to Geist Mono
**Headline Font:** Newsreader (optical sizing on), falling back to Georgia
**Body Font:** Geist, falling back to system-ui
**Label/Mono Font:** Geist Mono, falling back to ui-monospace

**Character:** A soft editorial serif against an engineered mono and lit dots: the serif speaks, the mono labels, the dots name. Geist stays neutral underneath so the reading never competes.

### Hierarchy
- **Display** (dots, 700, clamp(64px, 11vw, 168px), 0.9): the project name on the case-study stage.
- **Dot Menu** (dots, 700, clamp(30px, 4.4vw, 56px), 0.95): the menu and footer link list. Dots also set the nav name (21px, 16px on mobile, weight 900), journey years (30px), the Dublin clock (clamp(56px, 6vw, 92px)) and reader stat numerals (44px).
- **Headline** (serif, 450, clamp(38px, min(4.6vw, 8vh), 68px), 1.02): the hero statement, held to 15ch so the portrait keeps its room. The contact title runs larger (clamp(48px, 7vw, 104px)).
- **Section Title** (serif, 450, clamp(36px, 4.4vw, 60px), 1.05): home section heads, centred, with a muted line of copy below.
- **Title** (serif, 400, 24px, 1.12): card titles, widget statements (26px), reader sub-heads. Chapter headings run clamp(30px, 3vw, 44px) at 1.08 and quotes clamp(24px, 2.4vw, 34px) at 1.25.
- **Body** (Geist, 400, 17px / 16px under 760px, 1.55): all interface copy; ledes cap at 44 to 48ch.
- **Body Reading** (Geist, 400, 18px / 17px mobile, 1.7): case-study paragraphs, capped at 66ch.
- **Label** (Geist Mono, 500, 13px, 0.04em, uppercase): buttons, chips, text links, meta. **Label Small** (12px) for card meta, fact terms, crumbs, the dock, credits terms and the island's section name.

### Named Rules
**The Three Voices Rule.** Serif for statements, mono uppercase for labels, buttons and data, dots for names and numerals. A role never borrows another voice.

**The Meta Below Rule.** Nothing sits above a heading. Category, year, role and counts go below the title in mono; a section opens straight on its heading.

## Layout

A centred container of 1320px with 32px side padding (16px under 760px). Home sections stack at 128px intervals (88px on mobile) with centred heads 44px above their content.

The hero is a full-bleed black stage at least `max(700px, calc(100svh - 64px))` tall (`max(600px, 92svh)` on mobile), set as a column. The portrait takes all the room between the pill (70px top padding, 64px on mobile) and the headline. Its frame is as tall as that space allows but never wider than the screen, so the matted shoulders are never cropped. The headline, lede and button sit at the foot.

The work is a horizontal product row, not a grid: snap-scrolling columns of clamp(280px, 26vw, 380px) (74vw on mobile) at 16px gaps, aligned to the container's edge, draggable, with a 2px progress rail below. Widgets sit in a four-column bento (two columns under 1080px) with 240px minimum rows; the quote widget spans 2 by 2. #now pads 112px above and 120px below (80px and 88px on mobile) so the wallpaper has room to open and close. The journey is a two-column split with a sticky head, collapsing under 1080px.

The case-study reader bleeds a black stage across the top, with the cover standing on the line where black meets floor. Chapters run as a 300px sticky heading column beside a reading column, collapsing to one column under 980px. Breakpoints: 760px, 980px (reader), 1080px. Input breakpoints also count. `(hover: none)` keeps the island's controls exposed, and `(pointer: fine)` is the only case that gets the custom pointer.

### Named Rules
**The No Scrollbar Rule.** The page shows no scrollbar at all (`scrollbar-width: none` and a hidden WebKit scrollbar on html and body), and nothing stands in for one: no progress thumb, no scroll hint. The user asked for this. Horizontal rows hide theirs too. The work rail and the case-study reading bar measure content, so they are not scroll indicators.

## Elevation & Depth

The page is flat. Floating things are lifted. Grounds still carry the structure (black stage, grey floor, white surface), and cards, figures and floor widgets sit flat on them. Anything that floats above the page is made of glass: a backdrop blur of 28px at 170% saturation, a translucent tint taken from its ground, a hairline glass edge drawn as two inset strokes (a 0.5px rim and a 1px top highlight), and a soft drop shadow pushed well below it. The menu is a heavier frost (36px blur, 150% saturation, black at 66%). Dialogs dim the page behind them: black at 32% with a 10px blur for the quick view, 20% for the menu, and 92% for the reader's lightbox.

### Shadow Vocabulary
- **Glass edge** (`box-shadow: inset 0 0 0 .5px rgba(255,255,255,.45), inset 0 1px 0 rgba(255,255,255,.35)`): the rim of light glass (pill in frost, quick-view sheet).
- **Glass edge dark** (`box-shadow: inset 0 0 0 .5px rgba(255,255,255,.18), inset 0 1px 0 rgba(255,255,255,.14)`): the rim of dark glass (pill in smoke, island, dock, #now widgets).
- **Pill lift** (`0 10px 30px -14px rgba(0,0,0,.45)`, `.6` in smoke, `0 10px 30px -12px rgba(0,0,0,.55)` as the island): under the nav.
- **Sheet lift** (`0 40px 80px -30px rgba(0,0,0,.55)`): under the quick-view sheet.
- **Dock lift** (`0 14px 34px -14px rgba(0,0,0,.5)`): under the chapter dock.
- **Wallpaper widget lift** (`0 20px 40px -24px rgba(0,0,0,.6)`): under widgets lying on the #now wallpaper.
- **Pointer outline** (`inset 0 0 0 1px rgba(160,160,160,.75), 0 10px 24px -12px rgba(0,0,0,.45)`): the pointer hugging a control.

### Named Rules
**The Float Rule.** Glass is reserved for things that float: the pill and island, the menu, the quick-view sheet, the chapter dock, and the widgets on the #now wallpaper. Product cards, floor widgets, reader panels, figures and buttons are opaque and flat on their ground.

**The Glass Fallback Rule.** Under `prefers-reduced-transparency: reduce` every backdrop blur is removed and each glass surface turns opaque: the pill to Pill Grey, the menu and dock to Stage Black, the quick view to Product White, the #now widgets to Graphite.

## Shapes

Corners are soft and continuous, as in Apple's system UI. Controls sit at 10 to 14px: buttons at 10px, filter chips, icon buttons and pill buttons at 12px, dock buttons and the menu close at 14px, quick-view tags at 8px. Floating glass rounds further: the pill at 18px (16px on mobile), the island a full capsule (19px, or 20px on touch), the dock at 20px, and the quick-view sheet at 26px (22px top corners as a bottom sheet on mobile). Product surfaces keep their Nothing radii: cards and reader panels at 16px, widgets at 24px (20px on mobile). Dots are true circles everywhere: the live lamp, pager dots, list bullets, the dot field, the round glyph display and the free pointer. Active pager and dock dots stretch into a 3px-radius bar. The phone sheet's grabber is a 38 by 5px bar at 3px.

Project images are never cropped: `object-fit: contain` inside a padded white field. The portrait is the exception. It is matted in the image itself, then faded out at the foot by a mask (solid to 70%, clear by 98%), so it is never cut by a geometric shape.

## Components

### Buttons
Mono caps with a trailing chevron or arrow that nudges 3px on hover, softened by the glass layer and sprung.
- **Shape:** softly rounded (10px), 42px tall, 16px side padding.
- **Primary:** ink fill, white label; hover to ink-2.
- **White:** on black grounds (hero, #now widgets, contact field); hover to Hover Grey.
- **Line / Line Dark:** transparent with a 1px inset stroke (ink, or white at 50% on black); hover fills solid.
- **Text link:** mono caps, underlined with a 0.3em offset, thickening to 2px on hover ("QUICK VIEW +").
- **Press:** every button, chip, icon button, pill button and dock button scales to 0.94 and springs back (0.45s spring). Under the custom pointer, buttons, chips and icon buttons lift on hover (`translateY(-1px) scale(1.03)`).
- **Disabled:** 45% opacity, inert.
- **Résumé download:** the arrow drops into its tray in four steps while a row of dots fills underneath in twelve, then it settles on a tick and the label reads "Saved".

### Chips
- **Filter:** white, 36px, 12px radius, mono caps with a muted count; pressed state is solid ink with white text.
- **Tag:** black at 5% on the glass sheet, 8px radius, 13px Geist, in the quick view.

### Cards / Containers
- **Product card:** an unboxed column: a 4:3 white image field (16px radius, 16px padding, image contained, 1.04 scale on hover over 0.7s), then serif title, muted role, mono meta and a text link. The whole column is one button that opens the quick view. It rises 4px on hover and gives to 0.98 on press.
- **Widget:** white or black, 24px radius, 22px padding, content pushed to the foot. Signatures: a round 25 by 25 glyph-matrix display scrolling a 5 by 7 font in 90ms steps; the Dublin clock in dots; a quote carousel with pager dots.
- **Spec list:** facts as rows between a top ink rule and hairline dividers (quick-view facts, journey stops, reader stats with dot numerals).

### Inputs / Fields
- **Contact field:** a graphite bar holding the address in 17px Geist Mono and a white Copy button; stacks vertically on mobile. Copy feedback is announced politely.
- **Focus (global):** a 2px ink outline at 3px offset, turning white on every black ground and inside #now.

### Navigation
- **Nav pill:** a floating glass bar (576px max, 48px, 44px on mobile) 10px from the top: menu button, logo with the name in dots, résumé download. Frost over floors, smoke over the black stages (the pill's Borrowed Tone).
- **Island:** once the page has scrolled past min(70% of the viewport, 560px), the pill springs (0.6s) into a black capsule, 210 by 38px (190 by 36px on mobile), naming the current section ("THE WORK", "RIGHT NOW") or the case study's title in Label Small beside a dim white dot. Hover or focus opens it back out. On touch screens (`hover: none`) the island widens to 270 by 40px and keeps the menu and résumé buttons visible and tappable on either side of the section name.
- **Menu:** a native `<dialog>` filling the screen in heavy black frost that clears in from no blur (0.45s). The dot-matrix links rise in a 30ms stagger on the spring, and hovering one link dims the rest to 35%.
- **Footer:** the same dot-matrix list on black, then the credits (Nothing OS and nothing.tech, Apple's iOS and visionOS, the type and icon sources, with a non-affiliation line), then a mono line with copyright and Dublin time.

### Pointer
After iPadOS, for a real mouse only. A soft 18px white dot (difference blend) glides after the mouse on a springy follow. It swells to 34px over a product card and shrinks to 14px on press. Over a control no larger than 360 by 120px it morphs into an outline that hugs the control at 5px out, matching its radius and leaning a little toward the pointer. The outline never fills or veils the control, and the control itself lifts. Running text (paragraphs, headings, list items, quotes, definitions, captions, code) keeps the system text cursor, and the soft pointer hides there. Touch input, reduced motion and any open dialog keep the system cursor.

### Quick View
A native `<dialog>` sheet in light glass (1080px max, 26px radius) that springs up 24px on open over a dimmed, blurred page. On mobile it becomes a bottom sheet with an iOS grabber, and pulling down on its top bar dismisses it once the drag passes 110px. Its call to action stays pinned on a near-solid fade. A bar carries a mono "01 / 07" count and previous, next and close icon buttons. The image sits contained in a translucent floor well and carries the shared `cover` view-transition name, so opening the case study morphs it into the cover (0.5s).

### Right Now Wallpaper
The #now section is a lock screen. The hero portrait, blurred 64px, darkened to 62% and scaled 1.1, fills the section as wallpaper and fades into Wallpaper Black at the top and bottom. The widgets lie on it in Widget Glass with dark glass edges, lift 3px on hover, and use white buttons and translucent white pager buttons.

### Chapter Dock
The reader's floating dark-glass control, hidden until chapters are on screen: previous and next buttons in white at 12% (22% on hover), a row of chapter dots (the current one a 16px bar) and a mono chapter label. The arrow keys step chapters too.

### Hero Portrait
A black-and-white photograph of Vimal (`public/img/vimal-bw.webp`, 708 by 671), drawn between the pill and the headline over the Dot Field. It fades in from a 18px blur at 0.96 scale (1.1s). With a mouse it leans toward the pointer in perspective (up to about 4.5 degrees on each axis, on the spring), and a soft white light at 22% follows the pointer across it in soft-light blend.
- **Provenance:** a user-supplied portrait photo (708 by 671). It was converted to grayscale with contrast 1.12 and brightness 1.04. The background was burned to #000 outside a hand-traced head-and-shoulders outline, which was feathered with a blur and eroded inward. The shoulders fall away along an oval below the face. It was rendered in a headless-Chrome canvas. The same file is the #now wallpaper. `public/img/vimal-portrait.webp` (the earlier 240px dot-portrait source) is not used on this branch.

### Dot Field
The hero canvas, grid only: a sparse grid of faint dots (about 90px apart) across the black stage. A lens follows a mouse pointer, swelling the dots and revealing the fine grid beneath. Touch input does not move the lens. The canvas can still light a word or a photo, but the hero passes neither.

## Do's and Don'ts

### Do:
- **Do** keep red to the live indicator and its ink (#d71921 dot, #b3121a text).
- **Do** set every label, button, chip, count and data point in Geist Mono uppercase at 12 to 13px with 0.04em tracking.
- **Do** put meta (category, year, role, status) below the title it describes.
- **Do** show project images whole, contained on white fields with padding.
- **Do** give glass the tone of its ground: dark over the black stages and the wallpaper, light frost over the floors.
- **Do** reserve glass, its edge and its lift for things that float.
- **Do** let a pressed control give to 0.94 and spring back on `cubic-bezier(.34, 1.36, .64, 1)`.
- **Do** have the pointer outline a control and let the control lift; keep the system text cursor over running text.
- **Do** keep the menu and résumé tappable in the island on touch screens.
- **Do** build dialogs (menu, quick view) on native `<dialog>` with a scrim and Escape to dismiss.
- **Do** turn the focus ring white on black grounds and on the wallpaper, and keep it ink everywhere else.
- **Do** honour reduced motion (end states only, no portrait lean, system cursor, glyph display holding still) and reduced transparency (opaque glass, no blur).

### Don't:
- **Don't** put an eyebrow, kicker or label above a heading.
- **Don't** show a scrollbar, or any substitute scroll indicator, on the page.
- **Don't** put glass on things that sit on the page: product cards, floor widgets, reader panels, figures, buttons.
- **Don't** let the pointer fill or veil a control, or replace the cursor for touch, reduced motion, open dialogs or running text.
- **Don't** add drop shadows to anything that does not float.
- **Don't** introduce interface colour, tinted glass or a second accent. The only gradients are fades into black or into glass.
- **Don't** crop project screenshots with `object-fit: cover` or tight frames.
- **Don't** set display text in a system face; the dots are Doto with ROND 100, statements are Newsreader.
- **Don't** lay the work out as a card grid; it is a row of products.
