/**
 * Geniuslink short links for retailers the Quick Build proxy refuses.
 *
 * lib/affiliate.ts routes Amazon and eBay through Proxy.ashx. Every other
 * retailer needs a short link created through the Geniuslink API, which
 * scripts/geniuslink-shortlinks.mjs does, recording each one in
 * data/geniuslink-links.json (raw retailer URL -> https://geni.us/xxxx).
 *
 * Server-only: the map is read from disk and applied where product data is
 * loaded (lib/products.ts), so client components receive the geni.us URL and
 * the map never ships to the browser. affiliateUrl() leaves geni.us links alone.
 * A URL with no entry stays a plain retailer link. No TSID, no swap: with
 * Geniuslink off, every link stays plain.
 */
import fs from 'node:fs';
import path from 'node:path';
import { GENIUSLINK_ENABLED } from './affiliate';

let map: Record<string, string> | null = null;

function links(): Record<string, string> {
  if (map) return map;
  try {
    map = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'geniuslink-links.json'), 'utf8'));
  } catch {
    // Missing, or caught mid-write by the script: plain links this time, and
    // not cached, so the next call reads it again.
    return {};
  }
  return map!;
}

/** Retailer list with each mapped URL replaced by its geni.us short link. */
export function withShortLinks<T extends { url: string }>(retailers: T[]): T[];
export function withShortLinks<T extends { url: string }>(retailers: T[] | undefined): T[] | undefined;
export function withShortLinks<T extends { url: string }>(retailers: T[] | undefined): T[] | undefined {
  if (!GENIUSLINK_ENABLED || !Array.isArray(retailers)) return retailers;
  const m = links();
  return retailers.map((r) => (typeof r.url === 'string' && m[r.url] ? { ...r, url: m[r.url] } : r));
}
