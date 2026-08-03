import type { Metadata } from 'next';
import Link from 'next/link';
import { configuredNetworks } from '@/lib/affiliate';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'How NXT Smart Home makes money, which affiliate programmes we participate in, and what that does and does not influence.',
  alternates: { canonical: '/affiliate-disclosure/' },
};

export default function AffiliateDisclosurePage() {
  const networks = configuredNetworks();

  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Affiliate disclosure
      </h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
        Last updated: this page reflects the programmes active on the site right now.
      </p>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <h2>The short version</h2>
        <p>
          {site.name} is free to read and reader-supported. Many of the links to retailers on
          this site are affiliate links. If you click one and buy something, we may receive a
          small commission from the retailer. <strong>You never pay more</strong> — the
          commission comes out of the retailer&apos;s margin, not your pocket.
        </p>

        <h2>What this does and does not influence</h2>
        <p>It does not influence:</p>
        <ul>
          <li>Which products we recommend, or the order we rank them in.</li>
          <li>The score or verdict we give a product.</li>
          <li>Whether we tell you a product is a poor buy — we say so when it is.</li>
        </ul>
        <p>It does influence:</p>
        <ul>
          <li>
            Which retailers we link to. Where several stock the same product, we link to ones
            we have a commercial relationship with, provided the price is competitive.
          </li>
          <li>
            Which product categories we can afford to cover in depth, since commission funds
            the research time.
          </li>
        </ul>
        <p>
          If we ever recommend something we earn nothing from — which happens regularly — we
          still recommend it. A product being un-monetisable is not a reason to leave it out.
        </p>

        <h2>Programmes we participate in</h2>
        {networks.length > 0 ? (
          <>
            <p>We currently participate in:</p>
            <ul>
              {networks.map((network) => (
                <li key={network}>{network}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            We are in the process of joining affiliate programmes. Until they are approved and
            active, outbound links on this site are ordinary, untracked links.
          </p>
        )}
        <p>
          Programmes are added and removed over time. This list is generated from the site&apos;s
          live configuration, so it stays accurate rather than drifting out of date.
        </p>

        <h2>How we mark commercial links</h2>
        <p>
          Every affiliate link on this site carries <code>rel=&quot;sponsored nofollow&quot;</code>{' '}
          so search engines can identify it as a paid link, and opens in a new tab. Articles that
          contain affiliate links carry a visible disclosure above the article body — not buried
          in the footer.
        </p>

        <h2>Prices and availability</h2>
        <p>
          Prices shown on this site are indicative and were accurate at the time of writing.
          Australian retail pricing moves constantly, and we do not have a live price feed.
          Always confirm the current price on the retailer&apos;s own site before you buy.
        </p>

        <h2>Your rights under Australian law</h2>
        <p>
          Buying through an affiliate link does not change your consumer rights. Your purchase
          contract is with the retailer, not with us. Goods sold in Australia come with
          guarantees under the Australian Consumer Law that cannot be excluded — including
          the right to a repair, replacement or refund for a major failure. If something goes
          wrong with a purchase, deal with the retailer; we are not a party to the transaction
          and cannot process returns.
        </p>
        <p>
          Be aware that some overseas retailers ship to Australia as parallel imports. These can
          be cheaper but may not carry local manufacturer warranty support. We flag this in
          articles where it applies.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, or you think we have got a recommendation wrong,{' '}
          <Link href="/contact/">get in touch</Link>. We would rather correct an article than
          leave bad advice standing.
        </p>
      </div>
    </div>
  );
}
