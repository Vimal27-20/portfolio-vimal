---
name: Vimal Kumar Portfolio
description: The portfolio as a transit network. Lines are categories, projects are stations, the career is a route.
colors:
  enterprise-blue: "#0a5fb4"
  mobile-red: "#c8241c"
  web-green: "#0d7d48"
  iot-amber: "#e39a00"
  now-amber: "#f2b705"
  now-amber-hover: "#ffc81f"
  sign-black: "#121417"
  sign-black-hover: "#2a2f35"
  board-row-active: "#1e2227"
  board-rule: "#2c3137"
  board-label: "#9aa3ab"
  on-sign-muted: "#c9cdc8"
  station-ground: "#eceeea"
  enamel-panel: "#fbfbf9"
  ink-secondary: "#3b4046"
  ink-tertiary: "#5f666d"
  hairline: "#c9cdc8"
typography:
  display:
    fontFamily: "Barlow Semi Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(46px, 7vw, 96px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Barlow Semi Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(40px, 5.4vw, 72px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Barlow Semi Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(27px, 2.4vw, 34px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Semi Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
  wayfinding:
    fontFamily: "Barlow Semi Condensed, Barlow, Arial Narrow, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
    fontFeature: "tnum"
rounded:
  edge: "2px"
  badge: "4px"
  sign: "6px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "36px"
  section: "104px"
  section-mobile: "72px"
  gutter: "32px"
  gutter-mobile: "18px"
components:
  button-sign:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.enamel-panel}"
    typography: "{typography.wayfinding}"
    rounded: "{rounded.sign}"
    padding: "0 20px"
    height: "48px"
  button-sign-hover:
    backgroundColor: "{colors.sign-black-hover}"
  button-now:
    backgroundColor: "{colors.now-amber}"
    textColor: "{colors.sign-black}"
    typography: "{typography.wayfinding}"
    rounded: "{rounded.sign}"
    padding: "0 20px"
    height: "48px"
  button-now-hover:
    backgroundColor: "{colors.now-amber-hover}"
  button-ghost:
    textColor: "{colors.sign-black}"
    typography: "{typography.wayfinding}"
    rounded: "{rounded.sign}"
    padding: "0 20px"
    height: "48px"
  route-badge:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.enamel-panel}"
    rounded: "{rounded.badge}"
    padding: "0 8px"
    height: "26px"
  line-key-filter:
    textColor: "{colors.sign-black}"
    rounded: "{rounded.badge}"
    padding: "0 12px"
    height: "38px"
  line-key-filter-active:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.enamel-panel}"
  station-bar:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.enamel-panel}"
    height: "64px"
  departure-board:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.enamel-panel}"
    rounded: "{rounded.sign}"
    padding: "20px 22px 6px"
  platform-sign:
    backgroundColor: "{colors.enamel-panel}"
    textColor: "{colors.sign-black}"
    rounded: "{rounded.sign}"
---

# Design System: Vimal Kumar Portfolio

## Overview

**Creative North Star: "The Line"**

The site is a wayfinding system. Work is drawn as a transit network: each category is a coloured line, each project a station with a fixed code, the career a single route that ends at a terminus. Everything a visitor reads is borrowed from transport signage: black enamel sign panels with white condensed lettering, route badges, circular station roundels, a departure board. The ground is pale washed concrete, so the black signs and the four line colours carry all the structure.

The system is dense where a map should be dense and calm where a sign should be calm. Hierarchy comes from scale and from the black-sign / pale-ground contrast, never from colour alone. One continuous line weight draws the network, the journey route and the rail that runs down the home page from the map to the amber buffer stop at the terminus. Motion snaps in whole steps with a slight overshoot, the way a split-flap or a sign panel changes, and collapses to instant under reduced motion.

The world refuses the portfolio default of an intro hero over a grid of equal project cards: work is located on a map, not tiled.

**Key Characteristics:**
- Pale enamel ground, black enamel sign panels, white Barlow Semi Condensed lettering.
- Four functional line colours, each meaning exactly one project category.
- Amber is reserved for "you are here", now and in-progress states, always on or beside black.
- One continuous stroke weight (6px) for every line, rail and rule that means "route".
- Facts render as departure-board rows; icons are Phosphor line icons.
- Small enamel radii; flat signs; motion in whole snapping steps.

## Colors

A neutral concrete-and-enamel base with four saturated transit line colours and one signal amber; colour is functional, never decorative.

### Primary
- **Sign Black** (sign-black): the system's heading and action surface. Station-name bar, departure board, terminus, case-study station sign, primary buttons, active filters, active stations, the page rail. Also the primary text colour.

### Secondary (the four lines)
- **Enterprise Blue** (enterprise-blue): the Enterprise line. Also the focus-ring colour (3px outline, 3px offset), the one place it appears outside its line; focus is a browser state, not decoration.
- **Mobile Red** (mobile-red): the Mobile line.
- **Web Green** (web-green): the Web line.
- **IoT Amber** (iot-amber): the IoT line. Fills and strokes only; never text on a light ground. Badges on this line take sign-black text.

### Tertiary
- **Now Amber** (now-amber): "you are here". The map's current-station ring, the résumé and copy-email buttons, selection highlight, current-role dot on the journey, case-study progress bar, in-progress status, the terminus buffer stop, values on the departure board. Hover deepens to now-amber-hover.

### Neutral
- **Station Ground** (station-ground): page background.
- **Enamel Panel** (enamel-panel): light sign surfaces such as the map panel, platform sign, case-study meta cells, notes; also the white of lettering on black.
- **Ink Secondary** (ink-secondary): descriptions and lede text.
- **Ink Tertiary** (ink-tertiary): secondary text, dates, counts, labels on light ground (at least 4.5:1 on ground).
- **Hairline** (hairline): 1px rules and resting borders on light surfaces; doubles as muted text on black (on-sign-muted).
- **Board tones** (board-row-active, board-rule, board-label): row hover, row dividers and column labels inside black panels.

### Named Rules
**The One Meaning Rule.** A line colour only ever means its line. A case study's accent is its station's line colour, set once on the page and used for the station sign's foot stripe. No colour is used for decoration, emphasis or variety.

**The Amber Is Now Rule.** Now Amber marks the present and the primary action, nothing else. It sits on black or as a fill with black text, never as text on the pale ground.

## Typography

**Display Font:** Barlow Semi Condensed (with Barlow, Arial Narrow, sans-serif), weights 600 and 700, self-hosted.
**Body Font:** Atkinson Hyperlegible (with Segoe UI, system-ui, sans-serif), weights 400 and 700, self-hosted.

**Character:** Highway-sign lettering for anything that names, labels or directs; a legibility face built for low-vision readers for anything that is read at length.

### Hierarchy
- **Display** (700, clamp(46px, 7vw, 96px), 1.05, -0.02em): the terminus title only.
- **Headline** (700, clamp(40px, 5.4vw, 72px), 1.05, -0.02em): section titles, set on a full-width 6px ink rule (4px on mobile), with an optional 17px body-face aside.
- **Page opener** (700, clamp(32px, 3.6vw, 50px)): the network introduction line above the map.
- **Title** (700, clamp(27px, 2.4vw, 34px)): platform-sign project name; journey roles (25px) and timetable rows (23px) sit just below.
- **Quote** (600, clamp(21px, 2.1vw, 27px), 1.32, max 46ch): client notices.
- **Body** (400, 17px / 16px under 760px, 1.6): all running text; descriptions at 15-16px in ink-secondary.
- **Wayfinding** (600-700, 14-21px, line-height 1): nav, buttons, badges, station codes, board names, filter keys. Codes and numbers use tabular figures.
- **Label** (600, 13px, 0.06-0.08em, uppercase): column heads on the departure board and fact labels on the platform sign. Labels name a column of data; they never sit above a heading.

### Named Rules
**The Sign Face Rule.** Anything that names, labels or directs is set in Barlow Semi Condensed; anything read as a sentence is Atkinson Hyperlegible. Headings are always 700 with balanced wrapping.

**The Tabular Code Rule.** Station codes, years, counts and board values use tabular numerals so they align like a timetable.

## Layout

A single 1240px column with 32px gutters (18px under 760px). Sections stack at 104px top padding (72px on mobile), each opening on its ruled headline. The opening is a two-column grid: the network map (about 1.6fr) beside a sticky platform sign (min 330px, sticky 84px from the top under the 64px station bar). The departure board spans full width beneath.

A continuous 6px ink rail (4px on mobile) runs in the left gutter from the map's line key, down past the board, through every section, and stops at the terminus on an amber buffer stop. The journey route branches off this rail rather than running beside it.

Rhythm uses 8 / 12 / 24 / 36px steps for gaps inside components. Lists of facts (toolkit timetable, client notices) are ruled rows with fixed label columns (220px for the timetable, 260px for notice attribution) that collapse to one column under 760px.

Breakpoints: 1000px (map and platform sign stack; journey goes to three columns; rail re-routes), 760px (map becomes a horizontal strip of station chips; board rows become grid cards; journey goes vertical with the route as a left spine), 460px (station bar drops the name and the résumé label).

## Elevation & Depth

Flat. Depth comes from the black-sign / pale-ground contrast and 1px hairline borders, not from shadows. Signs, panels, the board and buttons carry no shadow at rest or on hover.

### Shadow Vocabulary
- **Figure lift** (`box-shadow: 0 10px 28px rgba(18, 20, 23, .10), 0 0 0 1px var(--rule)`): case-study screenshots and scroll frames only, so product imagery reads as a mounted print.
- **Pager hover** (`box-shadow: 0 12px 28px rgba(18, 20, 23, .10)`): case-study next/previous cards on hover only.

### Named Rules
**The Enamel Rule.** Signs are flat enamel. No shadow on any sign, panel, badge or button; the only soft shadow belongs to product screenshots.

## Shapes

Small enamel radii: 6px for signs, panels, buttons and cards; 4px for badges, filter keys, nav hits and images inside panels; 2px for focus rings and the buffer stop. Stations, journey stops, toolkit bullets and progress dots are rings: a 50% circle with a thick ink or line-colour stroke and a panel or ink fill. Line ends and joins are rounded.

**The One Stroke Rule.** Every mark that means a route (network lines, journey route, page rail, section-title rules, station ring borders, case-study spine, note top borders) uses the single line weight (6px; 4px on mobile). Hairlines (1px) are for dividing content, never for drawing routes.

## Components

### Buttons
Sign-panel buttons: decisive and blocky.
- **Shape:** 6px radius, 48px tall, 2px border matching the fill.
- **Primary (sign):** Sign Black with white Barlow 700 17px; hover to sign-black-hover.
- **Now:** Now Amber with black text; used for the single primary action in a context (résumé, copy email).
- **Ghost:** transparent with black border and text; hover fills black. On black panels a light variant uses a white border and fills white on hover.
- **States:** icon nudges 3px right on hover with the step easing; active presses 1px down; disabled at 45% opacity.

### Route Badges
Line-colour chips carrying a station code or line name: 26px tall, min 34px wide, 4px radius, Barlow 700 14px, tabular figures, white text (black on the IoT line).

### Line Key Filters
The map's legend doubles as filters: 38px tall, 1.5px hairline border, 4px radius, a 24 x 7px swatch of the line colour, the line name and a station count. Hover darkens the border; pressed fills black with white text. Filtering dims non-matching lines and stations to 14% opacity.

### Navigation (Station-Name Bar)
A sticky black bar, 64px (58px mobile): logo, name and "UX Engineer" sub-line, Barlow 600 18px nav links on a 4px-radius hit area that fills sign-black-hover on hover, and the amber résumé button.

### Network Map
SVG in a 1000 x 600 viewBox on the enamel panel. Lines are 11-unit rounded strokes leaving one central interchange ring; stations are panel-filled rings in their line colour with the code centred. Hover fills pale amber; active station fills black with a white code; the "you are here" ring is a 7-unit Now Amber circle that steps between stations. Under 760px the map is replaced by a scrollable strip of 44px station chips.

### Platform Sign
The calm panel beside the map: a black sign header (line badge, line name, year or "You are here"), a 2:1 contained image of whole devices (never cropped), title, description, a two-column fact list with uppercase labels, the primary link and previous/next 44px arrow buttons. Each change steps in as a new panel (16px rise, step easing).

### Departure Board
A black panel table: uppercase grey column heads, 13px-padded rows divided by board-rule, Barlow 700 20px station names, amber "go" links. Hover or active row tints board-row-active. On mobile, rows become two-column grid cards. Case-study facts use the same board (amber tabular value, label beside it), never big-number tiles.

### Journey Route
A horizontal 6px ink route with 28px stops: work stops filled ink, education stops panel-filled, the current role ringed in Now Amber with a "Now" tag. Collapses to three columns, then a vertical spine.

### Case-Study Station Sign
Every case study opens on a black sign showing the station code badge, line name and year (or "Now · in progress" in amber), with the station's line colour run along its foot as a 6px stripe. This sign replaces any label above the title. The table of contents marks the active section as a small black sign with an amber number, never a coloured edge.

### Terminus
The end of the line: a large black sign with the display title, the email as an amber underlined link, availability status with an amber dot, the Now and light buttons, and social links that turn amber on hover. The page rail stops at it on an amber buffer stop.

## Do's and Don'ts

### Do:
- **Do** give every project a station: a line, a fixed code and a place on the route.
- **Do** use line colours only to mean their line; a case study's accent is its station's line colour.
- **Do** keep Now Amber for the present and the primary action, on black or as a fill with black text.
- **Do** draw every route mark at the single stroke weight (6px, 4px on mobile).
- **Do** render facts and metrics as departure-board rows with tabular figures.
- **Do** open case studies on the station sign.
- **Do** use Phosphor line icons (react-icons/pi) at 16-18px beside sign lettering.
- **Do** animate in whole steps with the step easing (cubic-bezier(.34, 1.56, .64, 1)) and honour reduced motion.

### Don't:
- **Don't** set IoT Amber or Now Amber as text on the pale ground.
- **Don't** use colour alone for hierarchy; scale and the black sign carry it.
- **Don't** put a kicker or eyebrow label above a heading.
- **Don't** use coloured side-tab borders to mark state or emphasis.
- **Don't** use text glyphs as icons.
- **Don't** render statistics as big-number tiles.
- **Don't** add shadows to signs, panels, badges or buttons.
- **Don't** lay work out as an intro hero over a grid of equal project cards.
