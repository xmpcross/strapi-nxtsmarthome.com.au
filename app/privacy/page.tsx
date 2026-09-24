import type { Metadata } from 'next';
import Link from 'next/link';
import LegalSidebarTOC from '@/components/LegalSidebarTOC';
import { site } from '@/lib/site';
import { ADS_ENABLED } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How NXT Smart Home handles your data, how advertising and affiliate cookies work, and your rights under the Privacy Act 1988 and the GDPR.',
  alternates: { canonical: '/privacy/' },
};

/** Change whenever the policy's substance changes. */
const LAST_UPDATED = '24 September 2026';

export default function PrivacyPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 items-start">
        <LegalSidebarTOC />
        <main className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl xl:text-5xl dark:text-white">
            Privacy policy
          </h1>

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Last updated {LAST_UPDATED}</p>

          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-h2:mt-0 prose-h2:pt-0 prose-h3:mt-0 prose-h3:pt-0">
            <p>
              This policy explains what {site.name} (&quot;we&quot;) collects when you visit{' '}
              {site.domain}, and what our advertising and affiliate partners collect. The site is
              operated by {site.organisation.operator}, which is responsible for the personal
              information described here. We handle personal information in accordance with the
              Privacy Act 1988 (Cth) and the Australian Privacy Principles, and, for visitors in the
              European Union and the United Kingdom, the GDPR and UK GDPR.
            </p>
            <p>
              Privacy contact:{' '}
              <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>.
            </p>

            <h2>What we collect directly</h2>
            <p>
              You do not need an account to read anything here, and we do not sell personal
              information.
            </p>
            <ul>
              <li>
                <strong>Contact form and comments.</strong> If you use the contact form or leave a
                comment, we receive what you type, including your name and email address. We use it
                to reply and to moderate comments, and keep it only as long as needed for that.
              </li>
              <li>
                <strong>Server logs.</strong> Our web server keeps standard access logs — IP address,
                timestamp, requested URL, referrer and browser user agent — for security and
                troubleshooting. They are not used to build a profile of you.
              </li>
            </ul>

            <h2>Analytics</h2>
            <p>
              We use Google Analytics to understand which articles are read. It runs with Google
              Consent Mode: until you accept analytics in the cookie banner, it sets no analytics
              cookies. See our <Link href="/cookies/">cookie policy</Link> for the details.
            </p>

            <h2>Advertising</h2>
            <p>
              {ADS_ENABLED
                ? 'We use Google AdSense to show advertising on this site.'
                : 'We intend to show advertising on this site through Google AdSense. No ads are shown and no advertising cookies are set yet; once they are, the following applies.'}{' '}
              Third-party vendors, including
              Google, use cookies to serve ads based on a user&apos;s prior visits to this website
              and other websites. Google&apos;s use of advertising cookies enables it and its
              partners to serve ads to our users based on their visits to this site and/or other
              sites on the internet.
            </p>
            <p>
              You can opt out of personalised advertising by visiting{' '}
              <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
                Google Ads Settings
              </a>
              , or opt out of some third-party vendors&apos; use of cookies for personalised
              advertising at{' '}
              <a href="https://www.aboutads.info/choices" rel="noopener noreferrer" target="_blank">
                www.aboutads.info/choices
              </a>
              . Google explains how it uses information from sites that use its services at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                rel="noopener noreferrer"
                target="_blank"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>
            <p>
              Where the law requires consent (including the EU, the UK and Switzerland), advertising
              cookies are set only after you give it, through the consent message shown to you.
              Elsewhere, declining in our cookie banner means any ads shown are non-personalised.
              Ads are labelled and are kept separate from our editorial content.
            </p>

            <h2>Affiliate links and third-party cookies</h2>
            <p>
              When you click an outbound link to a retailer, the affiliate network handling that link
              will typically set a cookie in your browser so the retailer can attribute a resulting
              purchase to us. That cookie is set by the network and the retailer — not by us — and
              is governed by their privacy policies, not this one.
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

            <h2>Overseas processing</h2>
            <p>
              Google, our affiliate networks and some of our hosting and email providers process
              data outside Australia, including in the United States and Europe. By using the site
              you acknowledge that data associated with your visit may be handled there.
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
            <h3>In Australia</h3>
            <p>
              Under the Australian Privacy Principles you can ask what personal information we hold
              about you, ask us to correct it, and complain if you believe we have mishandled it.
              Contact us at{' '}
              <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>. If you
              are not satisfied with our response, you can complain to the Office of the Australian
              Information Commissioner (OAIC) at oaic.gov.au.
            </p>
            <h3>In the EU and UK</h3>
            <p>
              Under the GDPR and UK GDPR you have the right to access, correct or erase your personal
              data, to restrict or object to its processing, to data portability, and to withdraw
              consent at any time (for cookies, through the consent message or the cookie settings
              link in our footer). We rely on your consent for analytics and advertising cookies,
              and on our legitimate interests for server logs and replying to messages you send us.
              You can also complain to your local data protection authority.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We update this policy when what we do changes — for example, when we add an
              advertising or affiliate partner — and change the date at the top.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
