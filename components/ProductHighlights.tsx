import type { TopProduct } from '@/lib/products';

/**
 * "Highlights" strip above the Description: the most useful specifications as
 * a row of flat grey tiles, each a label over a bold value.
 *
 * Driven entirely by real specification data from the Google Shopping
 * catalogue. A product with no specs renders nothing rather than showing empty
 * tiles or invented values.
 */

/**
 * Which specs earn a tile, most interesting first. Google returns 15+ per
 * product and the strip only has room for a handful, so this picks the ones a
 * buyer actually compares on rather than the first few alphabetically.
 */
const PREFERRED_SPECS = [
  'brightness lumens', 'base size', 'base type', 'bulb color', 'technology type',
  'design shape', 'colour', 'color', 'wattage', 'power', 'voltage',
  'resolution', 'megapixels', 'field of view', 'battery life', 'battery',
  'connectivity', 'wireless technology', 'compatible with', 'works with',
  'suction power', 'run time', 'capacity', 'dust bin capacity',
  'screen size', 'display', 'speaker', 'audio', 'channels',
  'dimensions', 'weight', 'material', 'water resistance', 'ip rating',
];

function rank(name: string) {
  const n = name.toLowerCase();
  const i = PREFERRED_SPECS.findIndex((p) => n.includes(p));
  return i === -1 ? PREFERRED_SPECS.length : i;
}

export default function ProductHighlights({ product }: { product: TopProduct }) {
  const specs = product.specifications || [];
  if (!specs.length) return null;

  // "Highlighted Features" is a prose blob rather than a value — it reads badly
  // in a tile, so it is left to the Specifications tab.
  const tiles = [...specs]
    .filter((s) => s.value.length <= 40 && !/highlighted features/i.test(s.name))
    .sort((a, b) => rank(a.name) - rank(b.name))
    .slice(0, 6);

  if (!tiles.length) return null;

  return (
    <section className="rounded-[4px] bg-white p-5 dark:bg-slate-800 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-[#1d252c] dark:text-white">Highlights</h2>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((spec) => (
          <li
            key={spec.name}
            className="flex items-center justify-between gap-3 rounded-[6px] bg-[#f5f5f5] px-4 py-3 dark:bg-slate-900/60"
          >
            <span className="min-w-0">
              <span className="block truncate text-xs text-[#8a8a8f] dark:text-slate-400">
                {spec.name}
              </span>
              <span className="mt-0.5 block truncate text-sm font-bold text-[#1d252c] dark:text-white">
                {spec.value}
              </span>
            </span>
            <span className="shrink-0 text-lg leading-none text-[#8a8a8f] dark:text-slate-500" aria-hidden="true">
              ›
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
