---
name: NXT Smart Home
description: Independent Australian smart-home guides, set in Inter on quiet neutral grounds with one indigo accent, dark theme by default.
colors:
  primary: "#5955d1"
  primary-deep: "#514dcc"
  primary-bright: "#9895ff"
  primary-ring: "#7b77e4"
  primary-wash: "#f1f0ff"
  ink: "rgb(17, 24, 39)"
  night-ground: "rgb(17, 24, 39)"
  paper: "#ffffff"
  footer-ground-dark: "#0a0a0a"
  footer-ground-light: "rgb(249, 250, 251)"
  body-text: "rgb(55, 65, 81)"
  body-text-dark: "rgb(209, 213, 219)"
  meta-text: "rgb(75, 85, 99)"
  meta-text-dark: "rgb(156, 163, 175)"
  rule: "rgb(229, 231, 235)"
  rule-dark: "rgb(31, 41, 55)"
  control-edge: "rgb(209, 213, 219)"
  control-edge-dark: "rgb(55, 65, 81)"
  card-dark: "#222324"
  card-edge-dark: "#313131"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 2.25rem + 0.75rem, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  headline-section:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.375
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  numeral:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "\"tnum\""
  wordmark:
    fontFamily: "Urbanist, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
rounded:
  all: "8px"
spacing:
  row: "16px"
  row-compact: "14px"
  stack: "20px"
  column-gap: "48px"
  column-gap-wide: "64px"
  section: "80px"
  section-wide: "96px"
  gutter: "16px"
  gutter-2xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.all}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-outline:
    textColor: "{colors.body-text}"
    rounded: "{rounded.all}"
    padding: "10px 20px"
  filter-toggle:
    textColor: "{colors.body-text}"
    typography: "{typography.label}"
    rounded: "{rounded.all}"
    padding: "4px 12px"
  filter-toggle-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.all}"
    padding: "4px 12px"
  text-link:
    textColor: "{colors.primary}"
    typography: "{typography.label}"
  ruled-row:
    padding: "16px 0"
  post-card-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.all}"
    padding: "24px"
---

# Design System: NXT Smart Home

## Overview

**Creative North Star: "The Plain-Spoken Reference Shelf"**

NXT Smart Home is an Australian guide publication, and its visual system behaves like a well-kept reference shelf: Inter on quiet neutral grounds, one indigo accent, and every corner cut to the same 8px. The theme is dark by default (a near-navy charcoal ground), with a full light theme the reader can choose; both are first-class and every colour decision exists in pairs.

Density is moderate and editorial. Pages lead with a plain heading, a reading-measure intro and then the content; ornament is limited to the category 3D icons, the logo, and photography on article covers. The newest surface, the topic category page, shows where the system is heading: hairline-ruled rows instead of card shells, indigo numerals and dates as the only colour in a list, tabular figures for counts and dates, and a single thumbnail per ranked pick.

The older homepage and archive surfaces still carry the template it grew from (notched post cards with a detached arrow button, a soft tinted lift on article grids). Those are incumbent and stay; new surfaces default to the ruled-row language.

**Key Characteristics:**
- Dark theme by default, light theme equal in care; every colour has a light and a dark assignment.
- One accent: indigo, used for links, numerals, dates, the primary button and focus rings.
- Inter for everything readable; Urbanist only for the wordmark and its footer labels.
- 8px corners on everything, including anything authored as fully round.
- Hairline rules and tonal grounds carry structure; shadows are rare.
- Motion is colour transitions and a small arrow nudge; reduced motion is always honoured.

## Colors

A neutral grey-navy field with a single indigo voice, tuned in light and dark pairs.

### Primary
- **Guide Indigo** (primary): the light-theme accent. Inline links, the primary button, ranked numerals and "New" dates, hover colour for row titles.
- **Deep Indigo** (primary-deep): hover state of the primary button and of links in light theme.
- **Bright Indigo** (primary-bright): the dark-theme accent; every place Guide Indigo appears in light theme uses this on the dark ground, because Guide Indigo is too dim against it.
- **Ring Indigo** (primary-ring): the 2px focus outline on links and toggles across the new surfaces.
- **Indigo Wash** (primary-wash): the palest step of the ramp; tinted fills in light theme only.

The full ramp is `--color-primary-50` to `-900` in `app/globals.css`; `--color-brand-*` carries the same values plus a `brand-950` (#232159) and is what the post-card utilities reference.

### Neutral
- **Ink** (ink): headings and titles in light theme, and the pressed filter toggle's fill.
- **Night Ground** (night-ground): the dark-theme page ground (the same value as Ink; the themes swap it from text to surface).
- **Paper** (paper): light-theme page ground and dark-theme headings and titles.
- **Footer Ground** (footer-ground-dark / footer-ground-light): the footer sits a step darker (dark) or a step greyer (light) than the page, so the page ends without a border.
- **Body Text** (body-text / body-text-dark): paragraphs and one-line descriptions.
- **Meta Text** (meta-text / meta-text-dark): breadcrumbs, type and read-time lines, counts.
- **Rule** (rule / rule-dark): the 1px hairlines between rows and around sections; also the global default border colour.
- **Control Edge** (control-edge / control-edge-dark): outline of unpressed toggles and outline buttons.
- **Card Surface** (card-dark / card-edge-dark): the dark-theme post-card fill and border used by the homepage card system.

The `--color-slate-*` ramp is an older parallel neutral that drives the light-theme post-card variables; the page frame and all new surfaces use the neutral ramp.

### Named Rules
**The One Voice Rule.** Indigo is the only accent on a page. In a list it marks exactly one thing per row (the numeral, the date, or the hovered title), never two.

**The Paired Theme Rule.** Nothing ships with only a light value. Every text, rule and surface colour is written as a light and dark pair, and dark is the default the reader first sees.

## Typography

**Display Font:** Inter (self-hosted variable, with ui-sans-serif, system-ui)
**Body Font:** Inter
**Label/Mono Font:** Urbanist 700 for the logo wordmark only

**Character:** One sturdy grotesque at varied weights does all the work; hierarchy comes from size and weight, never from a second display face.

### Hierarchy
- **Display** (700, 2.25rem to 3rem, 1.1, tight tracking): page H1s. Every h1 to h6 renders at 700 through a global unlayered rule, so a heavier weight utility on a heading has no effect.
- **Headline** (700, 1.5rem, tight tracking): section headings inside a page ("Start with these", "New", "Every … guide"). The homepage and All Topics section headings run larger (2rem, 1.2).
- **Title** (700, 1.125rem, snug): row and card titles; compact list titles drop to 1rem at 600.
- **Body** (400, 1rem to 1.125rem, 1.625): intros and overviews, held to a 68ch measure.
- **Label** (400, 0.875rem): meta lines ("Explained · 7 min read"), counts and toggles; breadcrumbs at 0.75rem / 600.
- **Numeral** (900, 1.875rem to 2.25rem, line-height 1, tabular): ranked-list numbers in indigo.

### Named Rules
**The Tabular Figures Rule.** Counts, dates, read times and ranked numerals set with tabular figures so columns of numbers align.

**The Sentence Case Rule.** Headings, section labels and meta lines are sentence case; the uppercase tracked style belongs to the wordmark's tagline and footer column labels, and does not move into page content.

## Layout

A centred container (Tailwind container, 1rem side padding rising to 8rem at 1536px and up; `--container-site` 81rem, `--container-prose` 46rem for articles). Body copy and intros hold to 68ch.

Topic pages split two-thirds / one-third at 1024px (48px gap, 64px at large sizes) and stack below it, ranked picks first. Major sections are separated by space, 80px rising to 96px, with a ruled top edge where a section is a closing call to action. Rows inside lists are 16px top and bottom (14px in the compact full index). The homepage post grids step 3 → 2 → 1 columns at 1024px and 700px, with the compact list alternating 9/12-of-21 column spans row by row.

On phones the topic intro shows its first sentence only so the first pick reaches the first viewport; thumbnails hide below 640px.

## Elevation & Depth

Mostly flat. Depth comes from tonal grounds (page, footer, card surface) and 1px rules, not from shadow. Shadows exist in the older template surfaces and in floating UI.

### Shadow Vocabulary
- **Tinted lift** (`box-shadow: 0 8px 32px 0 rgba(35, 33, 89, 0.07)`, black in dark theme): resting lift under article-grid cards on /articles.
- **Soft float** (`box-shadow: rgba(17,17,26,0.1) 0 4px 16px, rgba(17,17,26,0.05) 0 8px 32px`): popovers and floating panels.
- **Arrow float** (`box-shadow: 0 4px 12px rgba(0,0,0,0.08)`, 0.4 in dark): the detached arrow button on notched cards.

### Named Rules
**The Rules Before Shells Rule.** New list surfaces separate items with hairline rules and space; a card shell is for a single standalone object (a post card, a product box), not for every row of an index.

## Shapes

One radius: 8px, on every rounded element, by a site-wide decision (24 Sep 2026). The theme maps every `rounded-*` step to 8px, and `rounded-full` is forced to 8px too, so pills, avatars and "circular" buttons all render as 8px squircles. Borders are 1px. The signature silhouette of the homepage cards is a concave notch in the bottom-right corner (a real radial-gradient mask) holding a detached square arrow button.

### Named Rules
**The Eight Pixel Rule.** Nothing on the site is rounder or sharper than 8px; do not author a radius, author `rounded`.

## Components

### Buttons
Solid and quiet.
- **Shape:** gentle 8px corners.
- **Primary:** Guide Indigo fill, white bold 0.875rem label, 10px × 20px, optional 16px north-east arrow icon after the label.
- **Hover / Focus:** fill deepens to Deep Indigo; 2px Ring Indigo outline offset 2px on keyboard focus.
- **Outline:** transparent with a Control Edge border and Body Text label; border and label go to Ink (white in dark) on hover.

### Chips (filter toggles)
- **Style:** 1px Control Edge border, 0.875rem / 500 label, 4px × 12px, count after the label at 70% opacity in tabular figures.
- **State:** pressed (`aria-pressed`) inverts to an Ink fill with white text (white fill, near-black text in dark). Filtering only hides rows, so the list never jumps or reflows above.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** white with a slate-200 edge (light); Card Surface #222324 with #313131 edge (dark).
- **Shadow Strategy:** flat at rest; see Elevation for the tinted lift on /articles.
- **Border:** 1px.
- **Internal Padding:** 24px (18px below 700px), extra bottom room where a detached arrow sits.

### Navigation
Header on the page ground with a bottom rule: logo left, Home / Topics / Guides / Products / Latest as 600-weight 0.875rem to 15px text links (chevrons for dropdowns) that take a neutral-100 / neutral-800 fill on hover, theme toggle and search icons right. The footer runs four link columns under Urbanist uppercase column labels on the darker footer ground.

### Ruled List Row (signature)
The topic page's building block. A link spanning the whole row between 1px rules: optional indigo tabular numeral, a bold title, a one-line reason, a meta line (type · read time), and on the ranked list a 112px 4:3 thumbnail. Hover turns the title indigo and underlines it (4px offset); focus draws the Ring Indigo outline around the row. The "New" feed variant leads with an indigo tabular date.

### Detached Arrow Card (incumbent)
Homepage post cards: notched bottom-right corner, 44 to 48px square arrow button in the notch; on hover the arrow nudges up-right (3px, -3px, -8deg) over 200ms, static under reduced motion.

## Do's and Don'ts

### Do:
- **Do** write every colour as a light and dark pair, and check the dark theme first; it is the default.
- **Do** use Guide Indigo in light theme and Bright Indigo in dark for the same role.
- **Do** separate list items with 1px Rule hairlines and 16px row padding on new index surfaces.
- **Do** set counts, dates, numerals and read times in tabular figures.
- **Do** give every link and control a 2px indigo focus outline with a 2px offset.
- **Do** hold intro and overview copy to 68ch.
- **Do** keep motion to 200ms colour transitions and the arrow nudge, both disabled or reduced under `prefers-reduced-motion`.

### Don't:
- **Don't** author a radius other than the 8px token, and don't expect `rounded-full` to produce a circle.
- **Don't** add a second accent hue; the teal secondary and orange accent ramps in the theme are unused and should stay that way.
- **Don't** put a pill, kicker or uppercase tracked label above a heading in page content.
- **Don't** show star ratings, scores or "tested" badges in any component.
- **Don't** use a weight utility to make a heading heavier; headings render at 700 site-wide.
