'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import type { TopProduct } from '@/lib/products';

/**
 * Product detail panels, matching the nxt.deals PDP: stacked accordion sections
 * inside a single white card, first section open by default.
 *
 * The reference opens Specifications and Additional Info in an off-canvas
 * "side peek" panel. That is not reproduced here — a side peek hides content
 * behind an interaction on a static export, and this site needs the
 * specifications crawlable. Every panel renders inline instead.
 */

type SectionKey = 'description' | 'features' | 'specifications' | 'additional';

/**
 * Specification names that describe what a product *does* rather than what it
 * measures. These get promoted out of the Specifications sheet into Features,
 * where a comma-separated value reads far better as a bullet list.
 */
const FEATURE_SPEC_PATTERN =
  /feature|highlight|function|capabilit|support|included|control method|assistant|automation/i;

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-auto text-xl leading-none text-[#55555a] transition-transform duration-200 dark:text-slate-400 ${
        open ? 'rotate-90' : ''
      }`}
    >
      ›
    </span>
  );
}

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <dt className="border-b border-[#e0e0e0] py-1.5 text-sm font-semibold text-[#1d252c] dark:border-slate-700 dark:text-slate-200">
        {label}
      </dt>
      <dd className="border-b border-[#e0e0e0] py-1.5 text-sm text-[#55555a] dark:border-slate-700 dark:text-slate-300">
        {value}
      </dd>
    </>
  );
}

/** Wide label column, value alongside, hairline rule under each row. */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#e8e8e8] py-3.5 last:border-0 dark:border-slate-700/70 sm:flex-row sm:gap-6">
      <dt className="w-full font-bold text-[#1d252c] dark:text-white sm:w-52 sm:shrink-0">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-[#55555a] dark:text-slate-300">{value}</dd>
    </div>
  );
}

export default function ProductAccordion({ product }: { product: TopProduct }) {
  const [open, setOpen] = useState<SectionKey | null>('description');
  const baseId = useId();

  const retailerNames = (product.retailers || []).map((r) => r.name);

  /*
   * Manufacturer specs carry the page. Only two derived rows are worth keeping
   * alongside them — brand and model — because they name the thing being
   * specced. Category, product type, SKU and dates belong to Additional Info,
   * and the seeded `priceAud` is deliberately absent: it came from the original
   * generator and is not a real RRP, so the verified retailer prices in the
   * sidebar are the only prices this page states.
   */
  const specs: Array<{ label: string; value: React.ReactNode }> = [];
  if (product.brand) specs.push({ label: 'Brand', value: product.brand });
  specs.push({ label: 'Model', value: product.name });
  if (product.rating) {
    specs.push({
      label: 'Rating',
      value: `★ ${product.rating.toFixed(1)} / 5.0${
        product.reviewCount ? ` from ${product.reviewCount.toLocaleString('en-AU')} reviews` : ''
      }`,
    });
  }

  const updated = product.updatedAt
    ? new Date(product.updatedAt).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const allSpecs = product.specifications || [];
  const featureSpecs = allSpecs.filter((s) => FEATURE_SPEC_PATTERN.test(s.name));
  // Anything promoted into Features is not repeated in Specifications.
  const detailSpecs = allSpecs.filter((s) => !FEATURE_SPEC_PATTERN.test(s.name));

  const sections: Array<{ key: SectionKey; title: string; body: React.ReactNode }> = [
    {
      key: 'description',
      title: 'Description',
      body: (
        <>
          {/*
            The manufacturer's own description from the catalogue is the real
            product copy. The generated sentence below is only a fallback for
            the products no description was returned for — it states nothing
            beyond what the record already holds.
          */}
          {product.description ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-[#55555a] dark:text-slate-300">
              {product.description}
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-[#55555a] dark:text-slate-300">
              The {product.brand ? `${product.brand} ` : ''}
              {product.name} sits in our {product.categoryName} category
              {product.subCategory ? ` under ${product.subCategory}` : ''}, and is sold in
              Australia through{' '}
              {retailerNames.length === 1
                ? retailerNames[0]
                : `${retailerNames.length} retailers including ${retailerNames.slice(0, 3).join(', ')}`}
              . Australian stock levels and pricing move independently of overseas listings, so
              confirm the current price with the retailer before you buy.
            </p>
          )}

          {product.bestFor ? (
            <p className="mt-4 border-t border-[#e8e8e8] pt-4 text-sm leading-relaxed text-[#55555a] dark:border-slate-700/70 dark:text-slate-300">
              <span className="font-bold text-[#1d252c] dark:text-white">Our verdict:</span>{' '}
              {product.bestFor}
            </p>
          ) : null}
        </>
      ),
    },
    {
      key: 'features',
      title: 'Features',
      body: (
        <ul className="space-y-4">
          {featureSpecs.map((spec) => {
            /* Values arrive as "Voice Control, Display Screen" — split so each
               capability is its own bullet rather than one run-on line. */
            const items = spec.value
              .split(/,(?![^(]*\))/)
              .map((v) => v.trim())
              .filter(Boolean);

            return (
              <li key={spec.name}>
                <h3 className="text-sm font-bold text-[#1d252c] dark:text-white">{spec.name}</h3>
                {items.length > 1 ? (
                  <ul className="mt-1.5 space-y-1">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-[#55555a] dark:text-slate-300"
                      >
                        <span className="text-emerald-600" aria-hidden="true">✓</span>
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
      ),
    },
    {
      key: 'specifications',
      title: 'Specifications',
      body: (
        <>
          <dl className="grid grid-cols-[minmax(8rem,12rem)_minmax(0,1fr)] gap-x-5 gap-y-2">
            {specs.map((spec) => (
              <SpecRow key={spec.label} label={spec.label} value={spec.value} />
            ))}
            {/* Manufacturer specifications from the Google Shopping catalogue.
                Feature-style entries live in the Features panel instead. */}
            {detailSpecs.map((spec) => (
              <SpecRow key={`mfr-${spec.name}`} label={spec.name} value={spec.value} />
            ))}
          </dl>
          {detailSpecs.length ? (
            <p className="mt-4 text-xs text-[#55555a] dark:text-slate-400">
              Specifications are sourced from the manufacturer listing. Confirm details on the
              retailer&apos;s product page before purchasing.
            </p>
          ) : (
            <p className="mt-4 text-xs text-[#55555a] dark:text-slate-400">
              Detailed hardware specifications are not published for this listing. Check the
              retailer&apos;s product page for dimensions, power requirements and connectivity
              before purchasing.
            </p>
          )}
        </>
      ),
    },
    {
      key: 'additional',
      title: 'Additional Info',
      body: (
        <>
          {/*
            Identifier sheet. GTIN and MPN render only when the catalogue
            actually supplies them — Google returns both as null for every
            product here, and a fabricated barcode is worse than a missing row.
          */}
          <dl className="text-sm">
            {product.brand ? <InfoRow label="Brand" value={product.brand} /> : null}
            {product.categoryName ? (
              <InfoRow
                label="Category"
                value={
                  <Link
                    href={`/products/category/${product.categorySlug}/`}
                    className="hover:text-[#0046be] hover:underline dark:hover:text-blue-400"
                  >
                    {product.categoryName}
                  </Link>
                }
              />
            ) : null}
            {product.subCategory ? (
              <InfoRow label="Product type" value={product.subCategory} />
            ) : null}
            <InfoRow label="SKU" value={product.id || product.slug} />
            {product.googleProductId ? (
              <InfoRow label="Catalogue ID" value={product.googleProductId} />
            ) : null}
            {product.gtin ? <InfoRow label="GTIN" value={product.gtin} /> : null}
            {product.mpn ? <InfoRow label="MPN" value={product.mpn} /> : null}
            {updated ? <InfoRow label="Last Updated" value={updated} /> : null}
          </dl>

          <p className="mt-4 text-xs text-[#55555a] dark:text-slate-400">
            Prices are indicative and in Australian dollars — confirm on the retailer&apos;s site.
            We may earn a commission from links on this page, at no extra cost to you.{' '}
            <Link href="/affiliate-disclosure/" className="text-[#0046be] underline dark:text-blue-400">
              Read our full disclosure
            </Link>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="rounded-[4px] bg-white px-5 pb-4 pt-2 dark:bg-slate-800">
      {/* A panel with nothing in it is worse than no panel — Features is
          dropped entirely for products the catalogue gave no feature data for. */}
      {sections
        .filter((section) => !(section.key === 'features' && featureSpecs.length === 0))
        .map((section, i) => {
        const isOpen = open === section.key;
        return (
          <div
            key={section.key}
            className={i === 0 ? '' : 'border-t border-[#e0e0e0] dark:border-slate-700'}
          >
            <h2>
              <button
                type="button"
                id={`${baseId}-h-${section.key}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-p-${section.key}`}
                onClick={() => setOpen(isOpen ? null : section.key)}
                className="flex w-full items-center py-4 text-left text-base font-bold text-[#1d252c] dark:text-white"
              >
                {section.title}
                <Chevron open={isOpen} />
              </button>
            </h2>
            {/*
              Panels stay in the DOM and collapse with CSS. This is a static
              export — a conditionally rendered panel never reaches the served
              HTML, so no crawler would ever see the specifications.
            */}
            <div
              id={`${baseId}-p-${section.key}`}
              role="region"
              aria-labelledby={`${baseId}-h-${section.key}`}
              className={isOpen ? 'pb-5' : 'hidden'}
            >
              {section.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
