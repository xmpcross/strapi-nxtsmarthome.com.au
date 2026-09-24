import type { TopProduct } from '@/lib/products';
import { featureItems, isFeatureSpec } from '@/lib/feature-specs';

/**
 * "Highlights" strip above the Description: the most useful specifications as
 * a row of flat grey tiles, each a label over a bold value.
 *
 * Driven entirely by real specification data from the Google Shopping
 * catalogue. A product with no specs renders nothing rather than showing empty
 * tiles or invented values.
 *
 * Below the tiles, the feature-type specs (lib/feature-specs.ts) as a Features
 * list, which used to be its own section in ProductAccordion. They are kept out
 * of the tiles so nothing shows twice.
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

  const tiles = [...specs]
    .filter((s) => s.value.length <= 40 && !isFeatureSpec(s.name))
    .sort((a, b) => rank(a.name) - rank(b.name))
    .slice(0, 6);
  const features = specs.filter((s) => isFeatureSpec(s.name));

  if (!tiles.length && !features.length) return null;

  return (
    <section className="rounded-[8px] bg-white p-5 dark:bg-slate-800 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-[#1d252c] dark:text-white">Highlights</h2>

      {tiles.length ? (
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((spec) => (
          <li
            key={spec.name}
            className="flex items-center justify-between gap-3 rounded-[8px] bg-[#f5f5f5] px-4 py-3 dark:bg-slate-900/60"
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
      ) : null}

      {features.length ? (
        <div className={tiles.length ? 'mt-6 border-t border-[#e8e8e8] pt-5 dark:border-slate-700/70' : ''}>
          <h3 className="mb-3 text-base font-bold text-[#1d252c] dark:text-white">Features</h3>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {features.map((spec) => {
              const items = featureItems(spec.value);
              return (
                <li key={spec.name}>
                  <h4 className="text-sm font-bold text-[#1d252c] dark:text-white">{spec.name}</h4>
                  {items.length > 1 ? (
                    <ul className="mt-1.5 space-y-1">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-[#55555a] dark:text-slate-300">
                          <span className="text-primary-600" aria-hidden="true">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-[#55555a] dark:text-slate-300">{spec.value}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
