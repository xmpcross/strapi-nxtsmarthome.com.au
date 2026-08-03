import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cookie Information',
  description:
    'Which cookies NXT Smart Home actually uses, which come from our affiliate partners and CDN, and how to control them in your browser.',
  alternates: { canonical: '/cookies/' },
};

{
  /*
    [VERIFY] LEGAL — human review required. See CLAUDE.md rule 6.

    The factual content below was checked against what the built site actually
    loads on 3 August 2026:
      - the only third-party script is cdn.viglink.com (Sovrn Commerce)
      - no analytics of any kind is present (no GA/gtag/Plausible/Fathom)
      - no Facebook pixel — facebook.com appears only as a footer link
      - retailer domains appear only as outbound links, not scripts
      - Cloudflare fronts the site and may set its own security cookies
    If any of that changes — especially adding analytics — this page must be
    updated, and a consent banner may become necessary.
  */
}

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Cookie information
      </h1>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Last updated: 3 August 2026
      </p>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p>
          Cookies are small files a website asks your browser to store. This page sets out which
          ones are actually involved when you visit {site.domain} — not a generic list.
        </p>

        <h2>What we set ourselves</h2>
        <p>
          Nothing. {site.name} is a static website. There are no accounts, no logins and no
          server-side sessions, so we do not set any cookies of our own, and{' '}
          <strong>we do not run analytics</strong> — no Google Analytics, no tag manager, no
          alternative tracker.
        </p>

        <h2>Cookies that can come from others</h2>

        <h3>Content delivery and security</h3>
        <p>
          The site is served through a content delivery network, which may set a small number of
          strictly functional cookies to distinguish genuine visitors from automated traffic and
          to keep the site available. These are security and delivery cookies, not advertising
          ones.
        </p>

        <h3>Affiliate tracking</h3>
        <p>
          We take part in affiliate programmes, which is how the site is funded. Two things happen
          here:
        </p>
        <ul>
          <li>
            A commerce script from Sovrn runs on our pages so that outbound merchant links can be
            attributed. It may set a cookie to record which link you followed.
          </li>
          <li>
            When you click through to a retailer such as Amazon AU, eBay AU, JB Hi-Fi, The Good
            Guys, Officeworks, Bunnings or Harvey Norman,{' '}
            <strong>that retailer sets its own cookies on its own site</strong> so a resulting
            purchase can be credited to us. Those cookies are governed by the retailer&apos;s
            policies, not ours.
          </li>
        </ul>
        <p>
          Affiliate cookies record that a referral happened. They do not tell us who you are, and
          we never receive your name, address or payment details.
        </p>

        <h2>Controlling cookies</h2>
        <p>
          You can block or delete cookies in your browser settings — every major browser allows
          this, usually under Privacy or Site settings. Blocking cookies will not stop you reading
          anything here, because nothing on this site depends on them. It may mean a purchase is
          not credited to us, which costs us a commission and costs you nothing.
        </p>
        <p>
          Browser features such as tracking protection or Do Not Track, and most ad blockers, will
          also stop the affiliate script from loading.
        </p>

        <h2>If this changes</h2>
        <p>
          If we ever add analytics or advertising, we will update this page first and introduce a
          consent mechanism where one is required. The date at the top shows when this was last
          reviewed.
        </p>

        <h2>Related</h2>
        <p>
          See our <Link href="/privacy/">privacy policy</Link> for how personal information is
          handled, and our <Link href="/affiliate-disclosure/">affiliate disclosure</Link> for how
          the commercial side of the site works. Questions can go to{' '}
          <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>.
        </p>
      </div>
    </div>
  );
}
