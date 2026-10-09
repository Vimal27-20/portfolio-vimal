---
name: Vimal Kumar Portfolio
description: The portfolio as a Nothing phone home screen. Monochrome widgets, dot-matrix type, one red light for what is live.
colors:
  nothing-red: "#d71921"
  red-ink: "#b3121a"
  paper: "#ebebe9"
  widget-white: "#ffffff"
  widget-black: "#000000"
  ink: "#000000"
  ink-2: "#2b2b2b"
  ink-3: "#5c5c5c"
  dim: "#8a8a8a"
  hair: "#d6d6d3"
  on-black-muted: "#c9c9c9"
typography:
  display:
    fontFamily: "Doto Variable, Space Mono, monospace"
    fontSize: "clamp(56px, 7.4vw, 112px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0"
    fontVariation: "\"ROND\" 100"
  headline:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "clamp(44px, 6vw, 84px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-read:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  badge: "6px"
  inner: "18px"
  widget: "28px"
  pill: "999px"
spacing:
  gap: "16px"
  gutter: "24px"
  gutter-mobile: "14px"
  widget-pad: "28px"
  section: "120px"
  section-mobile: "88px"
components:
  button-primary:
    backgroundColor: "{colors.widget-black}"
    textColor: "{colors.widget-white}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.widget-white}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.widget-black}"
    textColor: "{colors.widget-white}"
  button-white:
    backgroundColor: "{colors.widget-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  filter-chip:
    backgroundColor: "{colors.widget-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "42px"
  filter-chip-selected:
    backgroundColor: "{colors.widget-black}"
    textColor: "{colors.widget-white}"
  widget:
    backgroundColor: "{colors.widget-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.widget}"
    padding: "28px"
  widget-black:
    backgroundColor: "{colors.widget-black}"
    textColor: "{colors.widget-white}"
    rounded: "{rounded.widget}"
    padding: "28px"
  skill-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  badge:
    backgroundColor: "{colors.widget-black}"
    textColor: "{colors.widget-white}"
    typography: "{typography.label}"
    rounded: "{rounded.badge}"
    height: "22px"
    padding: "0 6px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-link-hover:
    backgroundColor: "{colors.widget-white}"
---

# Design System: Vimal Kumar Portfolio

## Overview

**Creative North Star: "The Home Screen"**

The site is a Nothing phone home screen. A light grey screen (the paper) holds widgets of exactly two materials, pure white and true black, with large rounded corners and no shadow. Display words and numerals are set in a dot-matrix face, reading text in a clean grotesk, and data in a monospace. One red light means something is live right now; nothing else is coloured.

Density is calm and widget-sized: everything that is not running text sits on a widget, widgets tile on a 16px gap, and sections breathe with 120px between them. Ornament is limited to what a dot display can make: dotted rules, dotted tracks, dot grids, and the round Glyph Matrix that scrolls what is being built now. Motion is digital: dots and widgets switch on in steps rather than gliding, floating or springing.

The world rejects colour-coded systems (every project category reads in the same black ink), glass and backdrop blur, drop shadows, and decoration that is not a dot or a hairline.

**Key Characteristics:**
- Light grey paper, white widgets, black widgets for emphasis, black ink.
- Doto dot-matrix (round dots) for display words and figures; Space Grotesk for reading; Space Mono uppercase for data.
- One red, reserved for live and now.
- Flat surfaces, large radii (28px widgets, 18px inner frames, pill controls).
- Dotted rules and dot grids as the only ornament.
- Stepped motion; full stillness under reduced motion.

## Colors

A monochrome screen with a single signal colour.

### Primary
- **Nothing Red** (`nothing-red`): the light that says live or now. The blinking `.live` dot, the current stop on the journey, in-progress status on case studies, the open item in progress lists, the active section dot in the case-study contents, the reading-progress bar, the focus ring, and the text caret.
- **Red Ink** (`red-ink`): the darker red that carries small live text on white (the "Building now" label, the case-study data line, the "In progress" status) so it holds contrast.

### Neutral
- **Paper** (`paper`): the screen behind the widgets; also the inner frame behind images and the fill of skill chips.
- **Widget White** (`widget-white`): the default widget material, filter chips, the white button on black.
- **Widget Black** (`widget-black`): the emphasis widget material (Glyph Matrix, current journey stop, first client note, contact widget, next-case pager) and the primary button.
- **Ink** (`ink`): headings and primary text.
- **Ink 2** (`ink-2`): body copy and descriptions; the hover state of black buttons.
- **Ink 3** (`ink-3`): secondary text, metadata and section intros (at least 5.6:1 on white and paper).
- **Dim** (`dim`): dotted rule dots and decorative marks only; never small text.
- **Hair** (`hair`): thin solid dividers inside widgets and inactive contents dots.
- **On-Black Muted** (`on-black-muted`): secondary text on black widgets.

### Named Rules
**The One Light Rule.** Red marks only what is live or current: the live light, the current journey stop, in-progress status, the progress bar, the focus ring. It is never a hover colour, a category colour, a highlight or decoration.

**The One Ink Rule.** Project categories (Mobile, Web, Enterprise, IoT) all read in the same black ink. Colour carries no category meaning.

## Typography

**Display Font:** Doto Variable, full axes with `ROND` 100 for round dots (stand-in for NDot), falling back to Space Mono
**Body Font:** Space Grotesk Variable (stand-in for Ntype), falling back to system-ui
**Label/Mono Font:** Space Mono 400/700

**Character:** A dot-matrix display face shouting short words and numbers over a quiet geometric grotesk; the mono is a small, tracked, uppercase readout.

### Hierarchy
- **Display** (Doto 700, uppercase, ROND 100, line-height 0.9): short display words and figures only. Hero word at `clamp(56px, 7.4vw, 112px)`; case-study title at `clamp(72px, 12vw, 176px)` and line-height 0.86; contact "Say hello" at `clamp(64px, 11vw, 168px)`; project name, Dublin clock, journey start years (52px) and case-study fact figures (44px) in the same face.
- **Headline** (Space Grotesk 500, `clamp(44px, 6vw, 84px)`, line-height 1.08, -0.025em): section titles. Case-study section headings run `clamp(34px, 4.4vw, 60px)` at line-height 1.02 and -0.04em, max 20ch.
- **Title** (Space Grotesk 500, 22px, -0.025em): tile titles (30px on case-study tiles), journey roles (21px), the hero second line at `clamp(30px, 3.4vw, 48px)`.
- **Body** (Space Grotesk 400, 17px / 1.55; 16px under 760px): page text. Case-study reading text is 18px / 1.7 in a 66ch column; ledes run 19-20px.
- **Label** (Space Mono 400, 13px, 0.06em, uppercase): dates, years, counts, codes and other data readouts. Badges use Space Mono 700 12px.

### Named Rules
**The Dots Are Display Rule.** Doto is for short words and numerals at display size. Never set sentences, body or controls in it.

**The Data-Only Mono Rule.** Space Mono marks data: dates, years, counts, codes. It is not a voice for headings, buttons or prose.

**The No Eyebrow Rule.** Headings stand alone. No small label line sits above a heading to introduce it.

## Layout

A 1320px container with 24px gutters (14px under 760px). Widgets tile on a 16px gap (10-12px on phones). Sections sit 120px apart (88px under 760px), each opened by a header row: a large title on the left and a short ink-3 intro (max 42ch) aligned to its baseline on the right.

The first viewport is a two-column home screen (1 : 1.08): headline, lede, actions and two square widgets (Glyph Matrix and Dublin time) on the left, the featured project widget on the right. It stacks to one column at 1080px.

The work grid is four columns on desktop, with case studies spanning two; it drops to two columns at 1080px and stays two-up on phones. The journey is five widgets along a horizontal dotted track that turns vertical at 1080px. Client notes are a 1.25 : 1 : 1 row that stacks at 1080px.

Case studies use a 220px contents list beside the reading column (64px gap, article max 980px). At 980px the contents list becomes a sticky horizontal row of pill links on paper. The status bar is 72px (60px on phones) and sticky; anchored targets carry an 88px scroll margin.

## Elevation & Depth

The system is flat. No widget, button, image frame or panel carries a drop shadow, and nothing uses glass or backdrop blur. Depth is the contrast between the paper and the two widget materials: white lifts off grey by tone, black widgets mark emphasis. Inset 1.5px strokes on outline buttons and the paper-coloured ring that knocks journey dots out of the track are strokes, not shadows.

### Named Rules
**The Flat Widget Rule.** Widgets are flat white or flat black. Depth comes from tone against the paper, never from shadow or blur.

## Shapes

Generous, phone-like rounding. Widgets use a 28px radius (22px on phone tiles); frames inside widgets (images, notes) use 18px (14px on phones); every control is a full pill (999px); badges are 6px. Dots are perfect circles: the live light (9px), journey stops (12px), contents markers (8px), list bullets (6px).

Ornament is dotted: rules are built from radial-gradient dots (1.2px dots on a 10px pitch at 35% ink for the standalone rule; 1px dim dots on an 8px pitch between rows inside widgets), the journey and case-study spine run on dotted tracks, and links are underlined with a 2px dotted line that turns solid on hover. Thin solid 1px hairlines appear only as dividers inside a widget, above a fact row or an attribution.

### Named Rules
**The Dot Or Hairline Rule.** The only ornament is a dot or a hairline. No gradients, textures, icons-as-decoration or colour blocks.

## Components

### Buttons
Solid, pill-shaped, quiet.
- **Shape:** full pill (999px), 48px tall (44px in the status bar), Space Grotesk 500 16px, icon gap 10px.
- **Primary:** black with white text, 0 22px padding.
- **Hover / Focus:** black lightens to ink-2; colour transitions at 0.2s. Focus is the global 2px red outline at 3px offset.
- **Outline:** transparent with a 1.5px inset black stroke; fills black with white text on hover.
- **On black widgets:** a white button (hover #d9d9d9) and a ghost button with a 1.5px 50% white inset stroke that fills white on hover.
- **Disabled:** 45% opacity, no pointer events.

### Chips
- **Filter chips:** white pill, 42px tall, 15px Space Grotesk 500, with the item count in Space Mono 12px ink-3. Hover goes to #dcdcd9; selected (`aria-pressed`) is black with white text and the count in on-black-muted.
- **Skill chips:** paper-filled pills, 6px 14px, 15px, wrapped in rows inside a white widget.

### Cards / Containers
- **Corner Style:** 28px widget radius; 18px for inner image frames.
- **Background:** white by default, black for the single emphasised item in a group.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** none; rows inside a widget are separated by dotted rules.
- **Internal Padding:** 28px for text widgets; 14-16px for image widgets so the inner frame sits close to the edge.
- **Project tile:** image frame (4:3, 16:10 on case-study tiles) on paper, title, a mono category and year line, role and duration, and a dotted-underline link at the bottom. Hover scales the image to 1.03.

### Navigation
- **Status bar:** sticky on paper, 72px. VK logo and name on the left; pill links (15px, white fill on hover) on the right, then the Dublin time in Doto 22px and the black résumé button. Under 760px the name and clock hide and the résumé button collapses to a 44px icon.
- **Case-study contents:** a white widget listing sections; each link has an 8px dot that turns red for the current section. Becomes a horizontal pill row under 980px, with the active pill black.

### Live Indicator
A 9px red circle before a short mono label, blinking to 25% opacity on a 1.4s stepped loop. Used for "Building now", the current journey stop, availability on the contact widget, and in-progress status.

### Glyph Matrix
The signature widget: a black square widget holding a round 25 x 25 dot display that scrolls a 5 x 7 pixel-font message one column every 90ms. Off dots sit at 16% white; dots near the pointer warm toward 76%. Under reduced motion it holds still on "VK".

### Journey Track
Five widgets on a dotted track, oldest first, each opening on its start year in Doto. A 12px ink dot marks each stop on the track; the current stop is a black widget with a red dot and the live light on its date.

### Contact Widget
A full-width black widget: "Say hello" in Doto, the email address as a 3px dotted-underline link, availability with the live light, white and ghost buttons, and social links above a #333 hairline.

## Do's and Don'ts

### Do:
- **Do** put everything that is not running text on a white widget (28px radius), and use a black widget for the one emphasised item in a group.
- **Do** keep red for live and now: the live light, the current stop, in-progress status, the progress bar and the focus ring.
- **Do** set short display words and figures in Doto with `ROND` 100; read in Space Grotesk; mark dates, years, counts and codes in Space Mono uppercase.
- **Do** separate rows with dotted rules and underline links with a 2px dotted line that turns solid on hover.
- **Do** animate in steps (`steps(6, end)`): widgets switch on, the live light blinks, the Glyph Matrix steps; stop all motion under `prefers-reduced-motion`.

### Don't:
- **Don't** use red for hover, emphasis, categories or decoration.
- **Don't** use glass, backdrop blur or translucent panels.
- **Don't** add drop shadows to widgets, buttons or images.
- **Don't** colour-code project categories; every category reads in black ink.
- **Don't** set prose, headings or button labels in Space Mono.
- **Don't** place an eyebrow or kicker label above a heading.
- **Don't** add ornament that is not a dot or a hairline, and don't make anything float, glide in or spring.
