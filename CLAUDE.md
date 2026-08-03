# nxtsmarthome.com.au — brand context and content rules

Read this before writing or editing any content, product file or copy on this site.

## Brand

Independent Australian smart-home blog: reviews, comparisons, buying guides, setup
tutorials, troubleshooting.

- **Market:** Australia, nationwide — homeowners and renters, all states and territories.
- **Authority:** new/small (~14 articles). Target lower-competition AU long-tail first.
- **Goals:** (1) organic traffic → affiliate revenue via AU retailers; (2) become a
  trusted AU smart-home authority.
- **Affiliate retailers:** Amazon AU, eBay AU, JB Hi-Fi, The Good Guys, Officeworks,
  Bunnings, Harvey Norman. (Configured in `scripts/retailers.mjs`.)
- **Audience:** beginners, upgraders, renters (removable/non-permanent devices),
  families (cameras/doorbells/locks), product-comparers, users of Apple Home /
  Google Home / Alexa / SmartThings / Home Assistant, and people troubleshooting
  Wi-Fi, compatibility and setup.
- **Differentiators:** deep AU localisation — retailers, pricing, electrical law,
  tenancy/renter rules, plugs and voltage, climate — plus an honest hands-on tone.
- **Competitors:** nestpath.com.au, smarthome.com.au, smartspaceinstallations.com/blog,
  techradar.com/au, choice.com.au.

## Hard rules

These apply to every output — articles, product files, meta descriptions, UI copy.

1. **Never promise or imply rankings.**
2. **No keyword stuffing.** Use the primary term naturally; support with synonyms
   and related entities.
3. **People-first, genuinely helpful content only.** A product entry with no verdict
   is thin affiliate content and must not be published — `scripts/link-products.mjs`
   enforces this by refusing to link any product with no `bestFor` or `pros`.
4. **Australian English throughout.** AUD pricing, AU retailers, AU standards and
   voltage. "Optimise", "colour", "centre", "analyse".
5. **Be honest about hands-on testing.** Never fabricate test results. Do not write a
   star `rating:` unless the device has genuinely been tested — an unearned rating
   implies testing that did not happen. Leave the field out otherwise.
6. **Flag legal and safety claims for human fact-check.** Electrical work, privacy and
   surveillance, tenancy. Never state law as settled without a `[VERIFY]` tag.
7. **Mark unverifiable figures** — search volume, price, spec — with `[VERIFY]`.

## Where the rules bite in this codebase

- `content/products/*.md` — `rating`, `pros`, `cons`, `bestFor` are editorial claims.
  Only write what can be stood behind. Prices are deliberately absent; buy buttons
  say "Check price at X" (see `lib/products.ts` for why).
- `/how-we-test` promises a testing methodology. Anything presented as tested must be
  consistent with that page, or the page becomes a liability.
- `content/articles/*.md` — front matter `category` uses the category **key**
  (`security`), not the URL slug (`security-and-cameras`). See `lib/site.ts`.
