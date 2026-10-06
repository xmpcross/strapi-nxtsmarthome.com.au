#!/usr/bin/env node
/**
 * Resolve [VERIFY] tags in drafts/products/*.md (from gemini-product-drafts.mjs).
 *
 * CLAUDE.md rule 6 allows three resolutions: confirm the claim against the
 * official source, remove it, or rewrite it to point readers to that source.
 * This does the third. Only the tagged sentences (or tagged pros/cons items)
 * are sent to Gemini and replaced; every other word of the draft is untouched.
 *
 * Gemini, not Anthropic: same owner-approved exception as gemini-product-drafts.mjs.
 *
 *   node --env-file=.env.local scripts/gemini-resolve-verify.mjs            dry run: show before/after
 *   node --env-file=.env.local scripts/gemini-resolve-verify.mjs --write
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'drafts', 'products');
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const PRICE = { input: 0.75, output: 3.75 };
const WRITE = process.argv.includes('--write');
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('GEMINI_API_KEY not set (run with --env-file=.env.local)');
  process.exit(1);
}

const PROMPT = `You edit an independent Australian smart-home site. Each sentence below was flagged [VERIFY] because it states a legal, safety, privacy or tenancy point as settled fact.
Rewrite each one so it no longer states the law or a rule as settled. Instead, point readers to the authoritative source, for example:
- fixed wiring or hardwired installs: "check with a licensed electrician and your state or territory's electrical safety regulator"
- privacy and recording audio or video: "check the OAIC's guidance and your state's surveillance laws"
- renting: "check your lease and your state or territory's tenancy authority, and get the landlord's written consent where it is required"
Rules: keep any product facts and their attribution exactly as given; add no new facts, figures or claims; remove the [VERIFY] tag; Australian English; keep each rewrite about the same length; plain and factual, no hype.
Return a JSON array of strings, the same length and order as the input.`;

let cost = 0;

async function rewrite(product, sentences) {
  const body = {
    contents: [{ role: 'user', parts: [{ text: `${PROMPT}\n\nProduct: ${product}\n\nInput:\n${JSON.stringify(sentences, null, 2)}` }] }],
    generationConfig: { responseMimeType: 'application/json', responseSchema: { type: 'ARRAY', items: { type: 'STRING' } } },
  };
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify(body),
    });
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 5000 * 2 ** attempt));
      continue;
    }
    const json = await res.json();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
    const u = json.usageMetadata ?? {};
    cost += (((u.promptTokenCount ?? 0) * PRICE.input) + ((u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0)) * PRICE.output) / 1e6;
    const out = JSON.parse((json.candidates?.[0]?.content?.parts ?? []).map((x) => x.text ?? '').join(''));
    if (!Array.isArray(out) || out.length !== sentences.length) throw new Error('wrong number of rewrites');
    if (out.some((s) => /\[VERIFY/i.test(s))) throw new Error('rewrite still tagged');
    return out;
  }
  throw new Error('gave up after repeated 429/5xx');
}

/** Tagged units in a draft: whole YAML list items, or single sentences of the body. */
function taggedUnits(text) {
  const units = [];
  const [, front, ...rest] = text.split(/^---$/m);
  for (const line of front.split('\n')) {
    const m = line.match(/^(\s+- )'(.*)'$/);
    if (m && /\[VERIFY/i.test(m[2])) units.push({ kind: 'yaml', raw: line, prefix: m[1], text: m[2].replace(/''/g, "'") });
  }
  const bodyText = rest.join('---');
  for (const para of bodyText.split('\n')) {
    for (const sentence of para.split(/(?<=[.!?\]])\s+(?=[A-Z(])/)) {
      if (/\[VERIFY/i.test(sentence)) units.push({ kind: 'body', raw: sentence, text: sentence });
    }
  }
  return units;
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
let changed = 0;
let failed = 0;
for (const f of files) {
  const file = path.join(DIR, f);
  let text = fs.readFileSync(file, 'utf8');
  const units = taggedUnits(text);
  if (!units.length) continue;
  const name = (text.match(/^name: '(.*)'$/m) || [])[1] || f;
  try {
    const out = await rewrite(name, units.map((u) => u.text));
    units.forEach((u, i) => {
      const replacement = u.kind === 'yaml' ? `${u.prefix}'${out[i].replace(/'/g, "''")}'` : out[i];
      text = text.replace(u.raw, replacement);
      console.log(`\n${f}\n  - ${u.text}\n  + ${out[i]}`);
    });
    if (/\[VERIFY/i.test(text)) throw new Error('tag left after replacement');
    if (WRITE) fs.writeFileSync(file, text);
    changed++;
  } catch (err) {
    failed++;
    console.log(`\n${f}\n  FAILED: ${err.message}`);
  }
}
console.log(`\n${changed} drafts ${WRITE ? 'rewritten' : 'would change'}, ${failed} failed; cost ≈ US$${cost.toFixed(2)}`);
