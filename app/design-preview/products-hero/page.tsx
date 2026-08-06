import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTopProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products Hero — Design Preview | NXT Smart Home',
  robots: { index: false, follow: false },
};

const START_HERE = [
  {
    label: 'Smart Home for Beginners: How to Start Without Wasting Money',
    href: '/buying-guides/future-proof-smart-home-devices-australia',
  },
  {
    label: 'Which Smart Home Platform Should You Choose in Australia?',
    href: '/hubs-and-platforms/apple-homekit-vs-google-home-vs-alexa-australia',
  },
];

export default async function ProductsHeroPreview() {
  const products = await getAllTopProducts();

  return (
    <main className="mx-auto max-w-[1366px] px-4 py-8 sm:px-6">
      <div className="mb-6 rounded-lg bg-amber-50 p-4 border border-amber-200 text-amber-900 text-sm font-medium">
        🔍 <strong>Design Preview Page</strong> — This is a preview for <code className="bg-amber-100 px-1.5 py-0.5 rounded">/products/</code> header redesign. Not indexed by search engines.
      </div>

      {/* Clean 2-Column Hero Header matching uploaded design (Transparent background, no border, no padding around title) */}
      <div className="relative mb-10 text-slate-900 dark:text-white">
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Title, Eyebrow Badges & Description (No extra padding) */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                Australian Availability · Local Retailers
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 backdrop-blur-md">
                <span>🇦🇺</span>
                <span>240V &amp; AS/NZS Standards</span>
              </span>
            </div>

            {/* Title matching exact uploaded image typography */}
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-[1.15] text-slate-900 dark:text-white">
              Compare Smart Home <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400">
                Devices in Australia
              </span>
            </h1>

            {/* Description matching previous width */}
            <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed max-w-3xl font-normal dark:text-slate-300">
              Every device here is sold in Australia, runs on 240V power, and is stocked by at least one local retailer with Australian warranty support. We link you to the retailer to check the current price, because prices move daily. Order is based on what we&apos;d recommend, not on what pays us the most.
            </p>

            {/* Stat Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{products.length}+</span> Devices Catalogued
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-brand-600 dark:text-brand-400 font-bold text-sm">4</span> Major AU Retailers
              </div>
              <div className="flex items-center gap-2 rounded-[8px] border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">100%</span> Independent Testing
              </div>
            </div>
          </div>

          {/* Right Column: Real Transparent Product Showcase Grid */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-[8px] border border-slate-200/80 bg-gradient-to-b from-white/90 to-emerald-50/60 p-6 dark:border-slate-700/80 dark:bg-gradient-to-b dark:from-slate-800/80 dark:to-slate-900/90">
              <div className="absolute right-3 top-3 rounded-[8px] bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                AU STOCKS TESTED
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Product 1 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/reolink-argus-3-ultra-4k-solar-camera.png"
                      alt="Reolink 4K Solar"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Reolink 4K Solar</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Security &amp; Cameras</span>
                </div>

                {/* Product 2 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/aqara-smart-lock-u100-apple-homekey.png"
                      alt="Aqara HomeKey U100"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Aqara HomeKey U100</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Smart Locks</span>
                </div>

                {/* Product 3 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/google-nest-hub-2nd-gen-smart-display.png"
                      alt="Google Nest Hub"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Google Nest Hub</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Hubs &amp; Displays</span>
                </div>

                {/* Product 4 */}
                <div className="group flex flex-col items-center rounded-[8px] border border-slate-100 bg-white/90 p-3 text-center transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <img
                      src="/images/products/dreame-l10s-ultra-robot-vacuum-and-mop.png"
                      alt="Dreame L10s Ultra"
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 dark:text-white line-clamp-1">Dreame L10s Ultra</span>
                  <span className="text-[10px] text-emerald-600 font-semibold dark:text-emerald-400">Robot Vacuums</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text from uploaded image above starter guide cards with extra top padding */}
        <p className="relative z-10 mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
          New to this? Two things save the most money: picking your platform before you buy anything, and knowing which devices you can install yourself.
        </p>

        {/* 2-Column Split Start Here Cards wrapped in background color container matching uploaded image */}
        <div className="relative z-10 mt-4 rounded-[8px] bg-slate-100/80 p-3 sm:p-4 dark:bg-slate-900/60">
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {START_HERE.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[8px] border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {idx === 0 ? '🚀 Starter Guide' : '🧠 Platform Choice'}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-300">
                    Read →
                  </span>
                </div>
                <h3 className="mt-2 font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors dark:text-white dark:group-hover:text-emerald-300">
                  {item.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
