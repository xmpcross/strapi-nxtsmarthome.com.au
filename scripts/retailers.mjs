/**
 * Australian retailers used when scaffolding a product file.
 *
 * These are search URLs, not product URLs — they always resolve to something
 * useful even when a model is renamed or restocked, and they can be swapped for
 * a direct product link later without touching anything else.
 *
 * None of these carry affiliate tracking yet. lib/affiliate.ts treats unknown
 * hostnames as `direct` and returns them unchanged, so the links work today and
 * Sovrn's script will monetise them client-side where a programme exists. When
 * you are approved with Commission Factory (JB Hi-Fi, Bunnings, The Good Guys and
 * Kogan all run through it in Australia) the URLs get wrapped by adding those
 * hosts to the network detection in lib/affiliate.ts — the product files stay
 * exactly as they are.
 *
 * Every pattern below was checked to return HTTP 200 for a real query.
 * Kogan is deliberately absent: it returns 403 to non-browser requests, so its
 * search pattern could not be verified.
 *
 * `primary: true` retailers render as full buttons; the rest render as a compact
 * secondary line, so a product with seven stockists does not become a wall of
 * buttons.
 */
export const RETAILERS = [
  { name: 'Amazon AU',     primary: true,  search: (q) => `https://www.amazon.com.au/s?k=${q}` },
  { name: 'eBay AU',       primary: true,  search: (q) => `https://www.ebay.com.au/sch/i.html?_nkw=${q}` },
  { name: 'JB Hi-Fi',      primary: false, search: (q) => `https://www.jbhifi.com.au/search?query=${q}` },
  { name: 'The Good Guys', primary: false, search: (q) => `https://www.thegoodguys.com.au/SearchDisplay?searchTerm=${q}` },
  { name: 'Officeworks',   primary: false, search: (q) => `https://www.officeworks.com.au/shop/officeworks/search?q=${q}` },
  { name: 'Bunnings',      primary: false, search: (q) => `https://www.bunnings.com.au/search/products?q=${q}` },
  { name: 'Harvey Norman', primary: false, search: (q) => `https://www.harveynorman.com.au/catalogsearch/result/?q=${q}` },
];

/** YAML block for a product's `retailers:` list. */
export function retailerYaml(label) {
  const q = encodeURIComponent(label);
  return RETAILERS.map(
    (r) => `  - name: ${r.name}\n    url: ${r.search(q)}${r.primary ? '\n    primary: true' : ''}`,
  ).join('\n');
}
