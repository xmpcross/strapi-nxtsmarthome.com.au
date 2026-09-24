/**
 * Quick check of originalWordCount / isIndexableProduct (lib/products.ts) on
 * three products: a curated one, a fully rewritten one and a thin one.
 *
 *   node scripts/check-original-words.mts
 *
 * Runs the TypeScript directly (Node 22.18+/24 strips types). Exits 1 on a
 * failed expectation.
 */
import { getAllTopProducts, getAllProducts, isEmptyListing, isIndexableProduct, originalWordCount } from '../lib/products.ts';

const products = getAllTopProducts();
const bySlug = (s: string) => products.find((p) => p.slug === s);

const words = (t?: string) => String(t ?? '').split(/\s+/).filter(Boolean).length;
const strip = (h?: string) => String(h ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');

let failed = 0;
const expect = (label: string, ok: boolean) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`); if (!ok) failed += 1; };

// 1. A fully rewritten catalogue product: blurb + bestFor + our long description.
const echo = bySlug('amazon-echo-4th-gen-smart-speaker')!;
const echoExpected = words([echo.bestFor, echo.shortDescription, strip(echo.cmsDescriptionHtml)].join(' '));
expect(`echo: originalWordCount ${originalWordCount(echo)} == ${echoExpected} (bestFor + blurb + rewrite)`, originalWordCount(echo) === echoExpected);
expect('echo: not indexable (no curated file)', !isIndexableProduct(echo));

// 2. A product whose long description is the old template: only bestFor + blurb count.
const thin = products.find((p) => !(p as { descriptionRewrite?: { model?: string } }).descriptionRewrite?.model && p.cmsDescriptionHtml)!;
const thinExpected = words([thin.bestFor, thin.shortDescription].join(' '));
expect(`${thin.slug}: originalWordCount ${originalWordCount(thin)} == ${thinExpected} (template description not counted)`, originalWordCount(thin) === thinExpected);
expect(`${thin.slug}: isEmptyListing matches < 50`, isEmptyListing(thin) === (thinExpected < 50));

// 3. A curated file checked against the catalogue shape (no catalogue row shares its slug, so a stand-in row).
const curated = getAllProducts()[0];
const stand = { ...echo, slug: curated.slug, bestFor: curated.bestFor, shortDescription: '', cmsDescriptionHtml: '', descriptionRewrite: undefined } as typeof echo;
const note = (curated.note ?? '').replace(/<!--[\s\S]*?-->/g, ' ');
const curatedExpected = words([note, curated.bestFor, ...(curated.pros ?? []), ...(curated.cons ?? [])].join(' '));
expect(`${curated.slug} (curated): originalWordCount ${originalWordCount(stand)} == ${curatedExpected} (note + bestFor + pros + cons)`, originalWordCount(stand) === curatedExpected);
expect(`${curated.slug} (curated): not indexable (${(curated.pros ?? []).length} pros, ${(curated.cons ?? []).length} cons, ${curatedExpected} words)`, !isIndexableProduct(stand));

process.exit(failed ? 1 : 0);
