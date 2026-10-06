# Structured data audit - nxtsmarthome.com.au (2026-10-06)

**Score: 72/100**

## Detection (live pages, all JSON-LD, 0 microdata/RDFa)
| Page type | Blocks |
|---|---|
| Every page (layout) | Organization + WebSite (@graph, SearchAction) |
| Home | CollectionPage |
| Articles (all 4 categories sampled) | Article, BreadcrumbList, FAQPage, ItemList (when products) |
| /articles/, /about/, /authors/, /categories/* (some) | only the global graph (no BreadcrumbList, no page type) |
| /categories/<slug>/ | BreadcrumbList |
| /products/ | FAQPage |
| /products/<slug>/ | Product (AggregateOffer), BreadcrumbList |
| /authors/<slug>/ | BreadcrumbList, Person |

Source: lib/seo.ts, components/JsonLd.tsx.

## What works
- @context https://schema.org everywhere; JSON-LD only; `<` escaped.
- Article: headline, description, url, absolute image, ISO dates, author Person with profile URL (Organization for team byline), publisher via @id, mainEntityOfPage.
- BreadcrumbList valid and matches visible hierarchy.
- Product: no Review, no aggregateRating emitted on sampled pages. aggregateRating is gated to 20+ displayed retailer reviews (lib/review-sources.ts). Compliant with the no-fabricated-testing rule.
- Sitemap: 117 URLs, identical to sitemap-urls.txt; excludes /search/, paginated /articles/page/N/ and noindex pages; matches robots.txt.

## Findings
| # | Sev | Finding | Evidence | Fix |
|---|---|---|---|---|
| 1 | High | Product `image` is a relative path | `"image":"/images/products/arlo-...-sq500.webp"` (productJsonLd uses `product.image` without `abs()`) | Wrap in `abs()`; Merchant/Product snippets need absolute URLs |
| 2 | High | Offer URLs are retailer search pages and availability is hard-coded InStock | `amazon.com.au/s?k=Smart%20Dimmer...`, `harveynorman.../catalogsearch/result/?q=...` | Only emit Offer when a real product URL exists and stock is verified; otherwise omit `availability` or drop offers. Price shown on search pages is a mismatch risk against Google merchant policy |
| 3 | High | `Review` type is wired for articles with `type: review` and would emit `reviewRating` from product.rating | lib/seo.ts articleJsonLd. No content currently has type review (types: buying-guide, comparison, explainer, how-to, pillar, roundup), so nothing emitted today | Guard: never emit Review/Rating unless a tested flag is true; safer to remove the branch and use Article (rule 5, /how-we-test) |
| 4 | Medium | ItemList of Product (roundups) lacks offers/review and Google requires a rich result type; Product nested in ItemList without offers is ineligible and adds no benefit | buying-guides article | Use ItemList of ListItem with `url`/`name` only (no nested Product), or point item to /products/<slug>/ URLs |
| 5 | Medium | FAQPage on all articles and /products/ | Present on every sampled article | Google retired FAQ rich results (7 May 2026). Info only: no SERP benefit; keep only if matches visible FAQ, no removal urgency |
| 6 | Medium | Author Person is thin and not linked into the graph; no `sameAs`, `image`; Organization has no `logo`, only one sameAs (Facebook) | Person block lacks jobTitle on sampled page | Add logo (ImageObject), sameAs for authors, `@id` for Person and reference from Article.author |
| 7 | Medium | Sitemap lastmod is inaccurate | 25 URLs share `2026-10-05T21:34:04.713Z` (static pages, categories, authors, /products/ use "newest article date" or `new Date()`); front-matter dates are 2026-08 while live Article datePublished is 2026-10-05T21:34:04Z for some articles (date appears build/ingest-stamped, not real publish date) | Use true per-page modified dates; ensure Strapi `publishedAt`/`updatedAt` not overwritten on import; do not bump dateModified without content change |
| 8 | Low | Only 12 product pages in sitemap while products are 199+ (only "indexable" ones listed) | sitemap-urls.txt: 12 /products/ | Confirm intent; non-listed product pages are indexable by robots meta? Check product page noindex consistency (sampled products are `index, follow` - verify each is in sitemap or noindex) |
| 9 | Low | Missing page-level types | /about/, /articles/, /authors/, /how-we-test/ carry only global graph, no BreadcrumbList | Add AboutPage/CollectionPage/ProfilePage + breadcrumbs |
| 10 | Low | Sitemap `changefreq`/`priority` ignored by Google | all entries | Optional removal |
| 11 | Info | Organization email only, no logo/contactPoint; WebSite SearchAction is no longer a Google feature but harmless | | Add logo |
| 12 | Info | Article `/articles/page/N/` returns 200 but is excluded from sitemap (correct) | | none |

Sitemap includes non-indexable URLs? Sampled: no. Missing routes: none significant besides noted product subset. /sitemap/ (HTML) is listed - fine.

## Recommended JSON-LD

Organization with logo (replace layout node):
```json
{"@type":"Organization","@id":"https://nxtsmarthome.com.au/#organisation","name":"NXT Smart Home","url":"https://nxtsmarthome.com.au/","logo":{"@type":"ImageObject","url":"https://nxtsmarthome.com.au/images/logo-512.png","width":512,"height":512},"email":"hello@nxtsmarthome.com.au","sameAs":["https://www.facebook.com/nxtsmarthome/"]}
```
Author profile page (ProfilePage, replaces bare Person):
```json
{"@context":"https://schema.org","@type":"ProfilePage","mainEntity":{"@type":"Person","@id":"https://nxtsmarthome.com.au/authors/kritin-curtis/#person","name":"Kritin Curtis","url":"https://nxtsmarthome.com.au/authors/kritin-curtis/","worksFor":{"@id":"https://nxtsmarthome.com.au/#organisation"},"sameAs":[]}}
```
Fixed Product image / offers (only with real, verified retailer URLs; no rating):
```json
{"@context":"https://schema.org","@type":"Product","name":"Tapo P110 Smart Plug","image":["https://nxtsmarthome.com.au/images/products/tp-link-tapo-p110-smart-plug-with-energy-monitoring-sq500.webp"],"brand":{"@type":"Brand","name":"TP-Link"},"offers":{"@type":"Offer","priceCurrency":"AUD","price":"20.61","url":"<verified product page URL>","availability":"https://schema.org/InStock","priceValidUntil":"2026-12-31"}}
```
Category/listing pages: add `CollectionPage` with `BreadcrumbList` (home already has CollectionPage).
