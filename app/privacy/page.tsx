import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How NXT Smart Home handles your data, what our affiliate partners collect, and your rights under the Privacy Act 1988.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Privacy policy
      </h1>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p>
          This policy explains what {site.name} (&quot;we&quot;) collects when you visit{' '}
          {site.domain}, and what our commercial partners collect. We handle personal
          information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy
          Principles.
        </p>

        <h2>What we collect directly</h2>
        <p>
          This site is a static website. We do not run user accounts, we do not have a login,
          and we do not ask you to submit personal information to read anything. We do not sell
          personal information.
        </p>
        <p>
          Our web server keeps standard access logs — IP address, timestamp, requested URL,
          referrer and browser user agent — for security and troubleshooting. These are not used
          to build a profile of you.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting analytics to understand which articles are useful. Where
          analytics is enabled, it is configured to avoid collecting personally identifying
          information wherever the provider allows it.
        </p>

        <h2>Affiliate links and third-party cookies</h2>
        <p>
          This is the part that matters most on a site like ours. When you click an outbound
          link to a retailer, the affiliate network handling that link will typically set a
          cookie in your browser so the retailer can attribute a resulting purchase to us. That
          cookie is set by the network and the retailer — not by us — and is governed by their
          privacy policies, not this one.
        </p>
        <p>
          The networks we work with are listed on our{' '}
          <Link href="/affiliate-disclosure/">affiliate disclosure</Link> page. Some of them,
          and some retailers, are based overseas, which means data associated with your click
          may be processed outside Australia.
        </p>
        <p>
          We never receive your name, address, payment details or order contents from a
          retailer. What we see is aggregate: a click happened, and sometimes that a sale
          occurred and what commission resulted.
        </p>
        <p>
          You can block third-party cookies in your browser settings. Doing so does not stop you
          buying anything — it only stops the purchase being attributed to us.
        </p>

        <h2>Embedded content</h2>
        <p>
          Articles may embed content from other sites, such as video. Embedded content behaves
          exactly as if you had visited that other site, and those sites may collect data about
          you and use cookies.
        </p>

        <h2>Children</h2>
        <p>
          This site is intended for a general adult audience. We do not knowingly collect
          personal information from children.
        </p>

        <h2>Your rights</h2>
        <p>
          Under the Australian Privacy Principles you can ask what personal information we hold
          about you, ask us to correct it, and complain if you believe we have mishandled it.
          Given how little we collect, the answer is usually &quot;nothing beyond server
          logs&quot; — but you are entitled to ask. Contact us at{' '}
          <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>.
        </p>
        <p>
          If you are not satisfied with our response, you can escalate a privacy complaint to
          the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We update this policy when what we do changes — for example, when we join a new
          affiliate network or add analytics. Material changes will be reflected here.
        </p>
      </div>
    </div>
  );
}
