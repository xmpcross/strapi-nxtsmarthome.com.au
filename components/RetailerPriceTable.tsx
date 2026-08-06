import AffiliateLink from './AffiliateLink';
import type { TopProductRetailer } from '@/lib/products';

interface Props {
  productName: string;
  retailers: TopProductRetailer[];
  subId: string;
  pricesCheckedAt?: string;
}

const retailerLogoPresets: Array<{
  match: string;
  label: string;
  subLabel: string;
  background: string;
  accent: string;
  initial: string;
}> = [
  { match: 'amazon', label: 'Amazon', subLabel: 'AU', background: '#232f3e', accent: '#ff9900', initial: 'A' },
  { match: 'jb hi-fi', label: 'JB Hi-Fi', subLabel: 'Australia', background: '#0f172a', accent: '#f59e0b', initial: 'J' },
  { match: 'officeworks', label: 'Officeworks', subLabel: 'Retail', background: '#0f766e', accent: '#fef3c7', initial: 'O' },
  { match: 'harvey norman', label: 'Harvey Norman', subLabel: 'Home', background: '#1d4ed8', accent: '#bfdbfe', initial: 'H' },
  { match: 'the good guys', label: 'The Good Guys', subLabel: 'Home', background: '#7c3aed', accent: '#ede9fe', initial: 'G' },
  { match: 'bunnings', label: 'Bunnings', subLabel: 'Hardware', background: '#166534', accent: '#dcfce7', initial: 'B' },
  { match: 'binglee', label: 'Bing Lee', subLabel: 'Electronics', background: '#be123c', accent: '#ffe4e6', initial: 'L' },
  { match: 'kogan', label: 'Kogan', subLabel: 'Online', background: '#111827', accent: '#34d399', initial: 'K' },
];

/**
 * Real brand marks supplied in public/images/retailers. Anything without a file
 * here falls back to the generated tile further down. Amazon and eBay are
 * public-domain SVGs from Wikimedia Commons; the rest are supplied brand assets.
 */
const retailerSvgLogos: Array<{ match: string; src: string }> = [
  { match: 'jb hi-fi', src: '/images/retailers/jbhifi.png' },
  { match: 'jbhifi', src: '/images/retailers/jbhifi.png' },
  { match: 'good guys', src: '/images/retailers/thegoodguys.png' },
  { match: 'harvey norman', src: '/images/retailers/HarveyNorman.svg' },
  { match: 'officeworks', src: '/images/retailers/officeworks.png' },
  { match: 'bunnings', src: '/images/retailers/bunnings.png' },
  { match: 'kogan', src: '/images/retailers/kogan.png' },
  { match: 'scorptec', src: '/images/retailers/scorptec.png' },
  { match: 'mwave', src: '/images/retailers/mwave-logo.png' },
  { match: 'amazon', src: '/images/retailers/amazon-au.svg' },
  { match: 'ebay', src: '/images/retailers/ebay-au.svg' },
];

function getRetailerLogo(retailer: TopProductRetailer): string | null {
  if (retailer.logo) return retailer.logo;

  const normalized = retailer.name.toLowerCase();

  const realLogo = retailerSvgLogos.find((item) => normalized.includes(item.match));
  if (realLogo) return realLogo.src;

  const preset = retailerLogoPresets.find((item) => normalized.includes(item.match));
  if (!preset) return null;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="96" viewBox="0 0 240 96">
      <rect width="240" height="96" rx="16" fill="${preset.background}" />
      <rect x="16" y="16" width="64" height="64" rx="14" fill="${preset.accent}" />
      <text x="48" y="58" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="${preset.background}">${preset.initial}</text>
      <text x="96" y="40" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="white">${preset.label}</text>
      <text x="96" y="66" font-family="Arial, sans-serif" font-size="13" fill="#dbeafe">${preset.subLabel}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function RetailerPriceTable({
  productName,
  retailers,
  subId,
  pricesCheckedAt,
}: Props) {
  if (!retailers || retailers.length === 0) return null;

  // A price baked into a static build goes stale the moment a retailer runs a
  // sale, so it is always shown with the date it was checked.
  const checked = pricesCheckedAt
    ? new Date(pricesCheckedAt).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/80">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Where to Buy {productName} in Australia
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Compare stock availability and AUD pricing across verified Australian retailers.
          {checked ? ` Prices checked ${checked} — confirm on the retailer's site.` : ''}
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
        {retailers.map((retailer, idx) => (
          <div
            key={retailer.name + idx}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-slate-50/80 dark:hover:bg-slate-700/40"
          >
            <div className="flex items-center gap-3">
              {(() => {
                const logoUrl = getRetailerLogo(retailer);
                return logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={`${retailer.name} logo`}
                    className="h-10 w-24 rounded-lg border border-slate-200 bg-white object-contain p-2 shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    {idx + 1}
                  </span>
                );
              })()}
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {retailer.name}
                </span>
                {retailer.primary && (
                  <span className="ml-2 inline-block rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                    Official AU Stock
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {retailer.priceAud ? (
                <span className="font-bold text-slate-900 dark:text-white">
                  ${retailer.priceAud.toLocaleString('en-AU')} <span className="text-xs font-normal text-slate-500">AUD</span>
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Check Store Price
                </span>
              )}

              <AffiliateLink
                href={retailer.url}
                subId={subId}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700"
              >
                <span>View Deal</span>
                <span aria-hidden="true">→</span>
              </AffiliateLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
