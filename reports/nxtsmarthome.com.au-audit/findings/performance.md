# Performance and Images audit - nxtsmarthome.com.au (6 Oct 2026)

**Data type: LAB only.** Lighthouse 13.5.0 (local Chromium 1243, headless, default simulated throttling: mobile = Slow 4G + 4x CPU; desktop preset). One run per page/form factor. No CrUX/field data (no Google API credentials), so the 75th-percentile CWV pass/fail cannot be stated. Note: Lighthouse simulated LCP (5-7 s mobile) is far above the observed LCP subparts (~0.2 s total, TTFB ~45 ms), so mobile lab numbers are pessimistic; real users on typical connections are likely better. Validate in CrUX/Search Console.

## Scores
- **Performance: 74/100** (Lighthouse desktop 94-98, mobile 64-71; TTFB, CLS and DOM size are excellent, mobile LCP/TBT and render-blocking CSS/JS drag it down)
- **Images: 58/100** (alt text and dimensions mostly good; no optimisation pipeline, oversized JPEG covers, uncached CMS images, no fetchpriority on LCP)

## Measured (lab)
| Page | Mobile perf | LCP | FCP | TBT | CLS | Desktop perf | Desktop LCP | Requests (m) | Transfer (m) |
|---|---|---|---|---|---|---|---|---|---|
| Home | 64 | 7.3 s | 2.2 s | 390 ms | 0 | 96 | 1.3 s | 67 | 2.1 MB |
| /all-topics/ | 64 | 7.0 s | 2.2 s | 400 ms | 0 | 94 | 1.7 s | 69 | 1.9 MB |
| Article (best-smart-home-platform-australia) | 71 | 5.4 s | 2.2 s | 290 ms | 0 | 96 | 1.3 s | 56 | 1.3 MB |
| Product (arlo-ultra-2-4k-spotlight-camera) | 64 | 5.2 s | 2.1 s | 560 ms | 0 | 98 | 1.1 s | 53 | 1.3 MB |

- curl TTFB: home 57 ms (Cloudflare, `cf-cache-status: DYNAMIC`, HTML 552 KB uncompressed-size as downloaded); Lighthouse observed TTFB 35-50 ms. Good (<0.8 s).
- CLS 0 on all four pages. DOM 706-1070 elements (under 1,500). Fonts: self-hosted via next/font, no font-display issue flagged.
- LCP elements: home = first article card image (cms.fxnstudio.com JPEG); article = hero image; product = product webp; /all-topics = hero paragraph text (not the Lottie, which loads client-side only and `ssr:false`).
- Observed LCP subparts (mobile home): TTFB 46 ms, load delay 15 ms, load duration 35 ms, render delay 120 ms.
- Third parties on every page (mobile): Google gtag 174 KB (60-95 ms main thread), VigLink 30 KB (52-102 ms), Sovrn commerce-js 51 KB + loader, Geniuslink 6 KB, Ahrefs analytics 3 KB. AdSense script was NOT present at test time.
- JS: unused JS est. 250-400 KB per page; 12 KiB legacy polyfills (chunk 1255); main thread 2.5-4.2 s under 4x CPU. Lottie banner: `lottie-react` dynamic import plus 123 KB `/data/smart-home-banner.json`; /all-topics main-thread 4.2 s, bootup 2.0 s, unused JS 396 KiB (worst page).

## Findings
| # | Sev | Finding | Fix |
|---|---|---|---|
| 1 | High | Render-blocking: one 127 KB CSS (`_next/static/css/6abd...css`, ~130 KB), a 1 KB CSS and `/js/ga-init.js`; Lighthouse est. 0.9-1.1 s savings. Main reason mobile FCP is 2.2 s. | Purge/split Tailwind CSS (check safelist/content globs; 127 KB is large), enable `experimental.inlineCss` or `optimizeCss`, load `ga-init.js` async/defer or inline. |
| 2 | High | `images.unoptimized: true`: all `next/image` output is raw files, no srcset/AVIF/WebP, `nextimg` count 0. Cover JPEGs 1024x768 shown at ~570x285 (wasted 70-145 KB each); est. image savings 653 KiB (home), 595 KiB (/all-topics), 169 KiB (article). | Pre-generate responsive WebP/AVIF variants at build (sharp) or put Cloudflare Image Resizing/Polish in front; add `sizes`; serve ~600 px wide covers on mobile. |
| 3 | High | Home LCP image (`cms.fxnstudio.com/uploads/...jpg`, 183 KB) has no `fetchpriority=high`/preload (Lighthouse lcp-discovery fails). Same for article hero and product image. Cross-origin host also costs an extra connection. | Add `priority`/`fetchPriority="high"` to the first card/hero/product image; `preconnect` to cms.fxnstudio.com; ideally mirror covers to the main origin. |
| 4 | Medium | CMS images have `Cache-Control: max-age=0` (nginx, not behind Cloudflare cache); local `/images/*` only `max-age=14400` (4 h), so 369 KiB (/all-topics) and 56 KiB (home) flagged. | Long immutable cache (1 year) for hashed uploads and `/images/`; proxy uploads through Cloudflare. |
| 5 | Medium | `/images/category-3d/*.png` are 256x256 PNG (60-70 KB each, 8+ on /all-topics) displayed at 40x40. About 70 KB wasted each. | Resize to 80x80 (2x) WebP/SVG: ~2 KB each. Large PNGs >300 KB also exist in `public/images/products/` (lifx, homepod-mini, ring doorbell etc.); product pages use `-sq500.webp` so check those PNG originals are not referenced. |
| 6 | Medium | Mobile TBT 290-560 ms: gtag + VigLink + Sovrn + Geniuslink loaded eagerly on every page; product page prefetches `/products/?_rsc` (79 KB) and category RSC payloads (77 KB). | Defer affiliate/analytics scripts to idle/after interaction (or `strategy="lazyOnload"`); consolidate VigLink/Sovrn/Geniuslink (three link-monetisation tools); set `prefetch={false}` on bulk links. |
| 7 | Medium | /all-topics Lottie: lottie-web chunk plus 123 KB JSON, 4.2 s main thread (mobile lab). Hero LCP is text so it does not hurt LCP, but it hurts TBT/INP. | Load Lottie on idle / IntersectionObserver, or `prefers-reduced-motion` and mobile fallback to a static image; minify JSON (dotLottie). |
| 8 | Low | 4 font files preloaded on every page (two ~75 KB variable woff2: Inter + Urbanist, plus italic/other). | Preload only Inter roman (and logo font if above fold); subset. |
| 9 | Low | Images: `<img>` without width/height 20-43 per page (home 43/43 lack explicit attrs, rendered via `fill` with sized parents, so CLS is 0 in practice). Alt text present everywhere; 8 empty-alt images on /all-topics and article are decorative icons/avatars (acceptable). 36/43 images lazy on home, 12/28 on /all-topics. | Add width/height or aspect-ratio containers for non-fill images; give avatar (`my_Photo_Copy` 44 px but 94 KB file) a small variant. |
| 10 | Low | Article `/articles/<slug>/` 301s to `/<category>/<slug>/` (one redirect hop for old URL form). Also `/products/aqara-hub-m3/` 404s though `content/products/aqara-hub-m3.md` exists (not in catalogue). | Link internally to canonical URLs; check product file publication (not a perf issue). |

## What is good
Server response (TTFB ~50 ms), CLS 0, DOM size, self-hosted fonts with no FOIT flag, immutable caching of `_next/static`, lazy loading used widely, alt text complete (0 missing), correct non-lazy LCP image, existing images in WebP for products.

## Priority order (expected impact)
1 Image pipeline + responsive sizes (#2, #3, #5): -0.6 MB mobile transfer, largest LCP/Speed Index gain. 2 CSS size/inlining (#1): -0.9 s FCP/LCP lab. 3 Third-party deferral (#6, #7): cuts TBT. 4 Cache headers (#4).

Screenshots: `/opt/projects/nxtsmarthome.com.au/reports/nxtsmarthome.com.au-audit/screenshots/homepage-desktop.png`, `homepage-mobile.png`. Raw Lighthouse JSON kept in the session scratchpad (not in repo).
