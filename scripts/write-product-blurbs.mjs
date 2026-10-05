#!/usr/bin/env node
// Write a short description and bestFor line for catalogue products that have none,
// using only the manufacturer description and specifications already in products.json.
//
//   node scripts/write-product-blurbs.mjs                # preview, nothing written
//   node scripts/write-product-blurbs.mjs --write        # apply to public/data/products.json
//   node scripts/write-product-blurbs.mjs --category robot-vacuums --limit 3
//
// Env: ANTHROPIC_API_KEY (taken from nxt-sourcing/.env.local when unset).
//
// Same approach as the 24 Sep 2026 rewrite (see descriptionRewrite on the older records):
// claims are attributed to the brand ("the brand says"), nothing that is not in the
// source text is added, and there is no fact check pass, so the output is previewed
// before it is written. Never writes prices, ratings, test results or reviews.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SOURCING = '/opt/strapi-cms-git/backend/nxt-sourcing';
if (!process.env.ANTHROPIC_API_KEY && existsSync(join(SOURCING, '.env.local'))) {
  for (const line of readFileSync(join(SOURCING, '.env.local'), 'utf8').split('\n')) {
    const m = line.match(/^ANTHROPIC_API_KEY\s*=\s*(.*)\s*$/);
    if (m) process.env.ANTHROPIC_API_KEY = m[1].replace(/^['"]|['"]$/g, '');
  }
}
const { askForJson } = await import(`${SOURCING}/scripts/lib/anthropic-chat.mjs`);

const PRODUCTS_JSON = join(ROOT, 'public/data/products.json');
const MODEL = 'claude-haiku-4-5-20251001';
const args = process.argv.slice(2);
const write = args.includes('--write');
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };
const category = flag('category', null);
const limit = Number(flag('limit', 999));
// --slugs <file.json>: regenerate for exactly these slugs even if they already have a (too short)
// short description. The previous text is kept in descriptionRewrite.previousShortDescription.
const slugsFile = flag('slugs', null);
const only = slugsFile ? new Set(JSON.parse(readFileSync(slugsFile, 'utf8'))) : null;

const SCHEMA = {
  type: 'object',
  properties: {
    shortDescription: { type: 'string' },
    bestFor: { type: 'string' },
  },
  required: ['shortDescription', 'bestFor'],
  additionalProperties: false,
};

const SYSTEM = `You write short product blurbs for an independent Australian smart-home affiliate site.
Rules, all strict:
- Use ONLY facts stated in the manufacturer description and the specifications you are given. Add nothing else: no prices, no ratings, no review or test claims, no comparisons with other products, no "we tested".
- Attribute capability claims to the brand ("the brand says", "according to the manufacturer", "it is listed with"). Do not state them as verified fact.
- Use a specification only where it does not contradict the description.
- Australian English (colour, optimise). Plain, neutral tone, no hype, no superlatives.
- shortDescription: 55 to 75 words, one paragraph, first sentence names the product and what it is.
- bestFor: one line, at most 16 words, who it suits, derived only from the stated features. No full stop.`;

const words = (s) => s.split(/\s+/).filter(Boolean).length;

const products = JSON.parse(readFileSync(PRODUCTS_JSON, 'utf8'));
const todo = products
  .filter((p) => (only ? only.has(p.slug) : !p.shortDescription) && (p.description || (p.specifications || []).length))
  .filter((p) => !category || p.categorySlug === category)
  .slice(0, limit);
console.log(`${todo.length} products without a short description${category ? ` in ${category}` : ''}`);

let ok = 0;
for (const p of todo) {
  const specs = (p.specifications || []).slice(0, 25).map((s) => `${s.name}: ${s.value}`).join('\n');
  const prompt = `Product: ${p.brand} ${p.name}\n\nManufacturer description:\n${(p.description || '(none)').slice(0, 3000)}\n\nSpecifications:\n${specs || '(none)'}`;
  try {
    const out = await askForJson({ system: SYSTEM, prompt, schema: SCHEMA, model: MODEL, maxTokens: 600 });
    const keptBestFor = only && p.bestFor ? p.bestFor : out.bestFor;
    const n = words(out.shortDescription) + words(keptBestFor);
    console.log(`\n• ${p.brand} ${p.name}  [${n} words]${p.shortDescription && only ? `\n  was: ${p.shortDescription}` : ''}\n  ${out.shortDescription}\n  bestFor: ${keptBestFor}`);
    if (n < 50) { console.log('  ✗ under 50 words, not applied'); continue; }
    if (write) {
      const previous = p.shortDescription;
      p.shortDescription = out.shortDescription.trim();
      p.bestFor = keptBestFor.trim().replace(/\.$/, '');
      p.descriptionRewrite = {
        ...(previous ? { previousShortDescription: previous } : {}),
        approach: 'Haiku 4.5 write from manufacturer description + specifications, claims attributed to the brand, previewed before writing, no fact check pass',
        model: 'claude-haiku-4-5',
        sources: ['manufacturer description', 'catalogue specifications'],
        date: new Date().toISOString().slice(0, 10),
      };
    }
    ok++;
  } catch (e) {
    console.log(`\n• ${p.brand} ${p.name}\n  ✗ ${e.message}`);
  }
}
if (write) {
  writeFileSync(PRODUCTS_JSON, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  console.log(`\n✅ wrote blurbs for ${ok} products`);
} else console.log(`\nPreview only (${ok} generated) — re-run with --write to apply.`);
