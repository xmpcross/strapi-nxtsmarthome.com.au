---
version: 1
slug: "components-categoryview-tsx"
primary_target: "components/CategoryView.tsx"
related_targets: ["app/categories/[slug]/page.tsx"]
---

# Topic category page (default template)

Scope: the default category template in `components/CategoryView.tsx`, used by the topic categories (Security & Cameras, Lighting, Energy & Solar, Entertainment & Audio, Climate & Comfort, Hubs & Platforms, Robot Vacuums, Smart Door Locks). Buying Guides and Setup Guides keep their own template.
Visitor mode: Read.
Audience and job: an Australian reader who lands on a topic, usually from search or the Topics menu, and needs the right guide quickly. Returning readers want to see what's new.
Constraints: keep the site's visual system (Inter, neutral grounds, indigo primary, light and dark themes); WCAG 2.2 AA; no ratings or testing claims; nothing busy (user: "too busy" would feel wrong); real articles only.
Unresolved: essentials (and the empty-topic cross-topic match) are an editorial pick per topic in `lib/category-essentials.ts`; someone must keep them current.

## Direction contract

THESIS: Two doors into a topic: the few guides everyone should start with, and what has changed since you last looked. Refuses the newest-first card grid grouped by article type.

OWN-WORLD: The site's own system, set as a reference page rather than a card wall: hairline-ruled rows, indigo numerals for the ranked essentials, tabular dates, one small thumbnail per essential, no card shells, no pills above headings.

STORY: The reader sees in one viewport which 3–4 guides to read first and why, sees the newest additions with dates, then can scan every guide in a compact list and narrow it by type.

FIRST VIEWPORT: Breadcrumb; H1 with the category's 3D icon small beside it; one intro paragraph at reading measure; guide count and a quiet products link on one meta line. Below, a two-thirds "Start with these" ranked list (numeral, title, one-line why, type and read time, small thumbnail) beside a one-third dated "New" feed. On a 390px phone the intro shows its first sentence only and the first essential is the guide in view; the rest follow on scroll.

FORM: Essentials and new, #7 of 7 on the ranked list; seed key 6b26f9b3. Code-led. Signature interaction: the "Every guide" list filters by article type through toggle buttons with counts (aria-pressed), instant with no layout jump. Motion: none beyond colour transitions on hover and focus; reduced motion is unaffected.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
