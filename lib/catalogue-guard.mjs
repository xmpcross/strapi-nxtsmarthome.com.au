/**
 * Is a Google Shopping listing actually a smart home product? Shared by the
 * catalogue importers (scripts/import-category-products.mjs,
 * scripts/fetch-top-products.mjs) and the thin-content audit, so an import and
 * the audit that checks it agree.
 *
 * Why it exists: the query "Thread border router Australia" (Hubs & Platforms)
 * returned Bunnings woodworking routers and trimmers, and the importer took
 * any result with a title, price, image and AU retailer. Six power tools were
 * published as smart home hubs until they were removed (24 Sep 2026).
 *
 * Plain JS, no imports: the importers run under plain Node.
 */

// Power-tool and workshop terms. "trim router", "plunge router" and
// "corded router" are covered by the router rule below as well.
const TOOL_TERMS =
  /\b(trim(?:mer)?|plunge|corded router|router (?:table|bits?)|wood(?:work(?:ing)?)?|timber|drill|saw|sander|grinder|nail ?gun|jigsaw|planer|chisel|brushless trim)\b/i;

// "router" is only a networking router with one of these alongside it.
const NETWORK_SIGNAL = /wi-?fi|mesh|modem|thread|border|matter|zigbee|z-?wave|network|nbn|ethernet|\b[45]g\b|lte|gateway/i;

// Power-tool brands: rejected in Hubs & Platforms only. Bosch also makes smart
// thermostats (climate), so the brand rule is not global.
const TOOL_BRANDS = /\b(ryobi|ozito|makita|dewalt|milwaukee|metabo|festool|einhell|aeg|black\s*\+?\s*decker|stanley|bosch (?:pof|gof|gkf|professional))\b/i;

/**
 * Reason the listing is not a smart home product, or '' if it passes.
 * @param {string} title   listing title (brand + name)
 * @param {string} category catalogue category slug
 */
export function offTopicReason(title, category) {
  const t = String(title ?? '');
  if (/\brouter\b/i.test(t) && !NETWORK_SIGNAL.test(t)) return 'router that is not a networking router';
  if (TOOL_TERMS.test(t) && !NETWORK_SIGNAL.test(t)) return 'power tool / workshop term';
  if (category === 'hubs-and-platforms' && TOOL_BRANDS.test(t)) return 'power-tool brand in Hubs & Platforms';
  return '';
}
