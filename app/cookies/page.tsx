import type { Metadata } from 'next';
import Link from 'next/link';
import LegalSidebarTOC from '@/components/LegalSidebarTOC';
import { site } from '@/lib/site';
import { ADS_ENABLED } from '@/lib/ads';
import { GENIUSLINK_ENABLED, SOVRN_ENABLED } from '@/lib/affiliate';

export const metadata: Metadata = {
  title: 'Cookie Information',
  description:
    'Which cookies NXT Smart Home actually uses, which come from Google advertising and analytics, our affiliate partners and CDN, and how to control them.',
  alternates: { canonical: '/cookies/' },
};

{
  /*
    [VERIFY] LEGAL — human review required. See CLAUDE.md rule 6.

    The factual content below should be checked against what the built site
    actually loads whenever scripts change:
      - Geniuslink for affiliate link affiliation (only when NEXT_PUBLIC_GENIUSLINK_TSID
        is set; the Sovrn line likewise needs NEXT_PUBLIC_SOVRN_KEY — lib/affiliate.ts)
      - cdn.viglink.com (Sovrn Commerce), consent-gated: public/js/sovrn-init.js
        parks its loader on window.__nxtLoadSovrn until the banner is accepted
      - googletagmanager.com/gtag/js for Google Analytics
      - analytics.ahrefs.com/analytics.js for Ahrefs Web Analytics, loaded on
        every page, not consent-gated: Ahrefs says it uses zero cookies and
        collects no personal data (ahrefs.com/web-analytics, checked 24 Sep 2026)
      - pagead2.googlesyndication.com/pagead/js/adsbygoogle.js for Google
        AdSense, only when NEXT_PUBLIC_ADSENSE_SHOW_ADS=1 as well as
        NEXT_PUBLIC_ADSENSE_CLIENT (lib/ads.ts). Off until the site is
        approved; before that only the verification meta tag renders. The
        SearchAtlas script stays removed. For EEA/UK/CH visitors
        Google's own consent message (AdSense Privacy & messaging) replaces
        our banner.
      - Google Analytics and AdSense load with Consent Mode v2 defaults of
        denied (components/HeadScripts.tsx). The choice is made in
        components/CookieBanner.tsx and stored as nxt.consent.v2.
      - no Facebook pixel — facebook.com appears only as a footer link
      - retailer domains appear only as outbound links, not scripts
      - Cloudflare fronts the site and may set its own security cookies

    Analytics was added to the site at some point before 23 August 2026 while
    this page still said none was present. The banner and this rewrite close
    that gap. If the set of scripts changes again, update this page AND bump the
    CONSENT_KEY version so past choices are not read as consent to the new set.
  */
}

export default function CookiesPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 items-start">
        <LegalSidebarTOC />
        <main className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl xl:text-5xl dark:text-white">
            Cookie information
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: 24 September 2026
          </p>

          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-h2:mt-0 prose-h2:pt-0 prose-h3:mt-0 prose-h3:pt-0">
            <p>
              Cookies are small files a website asks your browser to store. This page sets out which
              ones are actually involved when you visit {site.domain} — not a generic list.
            </p>

            <h2>What we set ourselves</h2>
            <p>
              No cookies. There are no accounts, logins or server-side sessions. Your cookie choice
              and your light/dark theme are remembered in your browser&apos;s local storage, which
              never leaves your device.
            </p>

            <h2>Cookies that can come from others</h2>

            <h3>Content delivery and security</h3>
            <p>
              The site is served through a content delivery network, which may set a small number of
              strictly functional cookies to distinguish genuine visitors from automated traffic and
              to keep the site available. These are security and delivery cookies, not advertising
              ones.
            </p>

            <h3>Analytics</h3>
            <p>
              We use Google Analytics to see which guides get read and which land badly, so we know
              what to write next and what to fix. It sets cookies that record a return visit as the
              same visit rather than a new one.
            </p>
            <p>
              <strong>It does not run unless you accept.</strong> The tag loads with its storage
              switched off and stays that way until you choose, so declining is a real decline rather
              than a preference recorded after the fact.
            </p>
            <p>
              We also use Ahrefs Web Analytics for page-view counts. Ahrefs describes it as using no
              cookies and collecting no personal data, so it runs on every page without asking.
            </p>

            <h3>Advertising</h3>
            <p>
              {ADS_ENABLED
                ? 'We show ads through Google AdSense.'
                : 'No ads are shown and no advertising cookies are set yet. When we switch on Google AdSense, this applies:'}{' '}
              Google and its partners use cookies to serve ads
              based on your prior visits to this and other websites, to limit how often you see an
              ad, and to measure ad performance. Ads are labelled and kept separate from our
              editorial content.
            </p>
            <p>
              <strong>Personalised ads wait for your consent.</strong> AdSense reads the same consent
              signal as analytics: until you accept, any ads shown are non-personalised. In the EU,
              the UK and Switzerland, Google&apos;s own consent message asks you instead of our
              banner, and advertising cookies are set only if you agree there. You can opt out of
              personalised advertising at{' '}
              <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
                Google Ads Settings
              </a>
              , and read how Google uses data from partner sites at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                rel="noopener noreferrer"
                target="_blank"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>

            <h3>Affiliate tracking</h3>
            <p>
              {GENIUSLINK_ENABLED || SOVRN_ENABLED
                ? 'We take part in affiliate programmes, which is how the site is funded. This is what can happen here:'
                : 'No affiliate tracking scripts run on this site at the moment: outbound retailer links are plain links. This is what can still happen:'}
            </p>
            <ul>
              {GENIUSLINK_ENABLED && (
                <li>
                  Geniuslink may affiliate supported outbound merchant links and route clicks through
                  its tracking service.
                </li>
              )}
              {SOVRN_ENABLED && (
                <li>
                  A commerce script from Sovrn attributes outbound merchant links, and may set a
                  cookie to record which link you followed. Like the analytics tag, it is not loaded
                  at all until you accept.
                </li>
              )}
              <li>
                When you click through to a retailer such as Amazon AU, eBay AU, JB Hi-Fi, The Good
                Guys, Officeworks, Bunnings or Harvey Norman,{' '}
                <strong>that retailer sets its own cookies on its own site</strong>
                {GENIUSLINK_ENABLED || SOVRN_ENABLED ? ' so a resulting purchase can be credited to us' : ''}.
                Those cookies are governed by the retailer&apos;s policies, not ours.
              </li>
            </ul>
            {(GENIUSLINK_ENABLED || SOVRN_ENABLED) && (
              <p>
                Affiliate cookies record that a referral happened. They do not tell us who you are,
                and we never receive your name, address or payment details.
              </p>
            )}

            <h2>Controlling cookies</h2>
            <p>
              {ADS_ENABLED
                ? 'The first time you visit, a banner asks whether to allow analytics, personalised advertising and affiliate tracking (in the EU, UK and Switzerland, Google’s consent message asks instead).'
                : 'The first time you visit, a banner asks whether to allow analytics and affiliate tracking.'}{' '}
              Nothing beyond your answer is stored by us until you accept. To
              change your mind later, use <strong>Cookie settings</strong> in the footer, which asks
              again.
            </p>
            <p>
              You can block or delete cookies in your browser settings — every major browser allows
              this, usually under Privacy or Site settings. Blocking cookies will not stop you reading
              anything here, because nothing on this site depends on them. It may mean ads are less
              relevant, or that a purchase is not credited to us, which costs us a commission and
              costs you nothing.
            </p>
            <p>
              Browser features such as tracking protection or Do Not Track, and most ad blockers,
              may also stop affiliate tracking scripts from loading.
            </p>

            <h2>If this changes</h2>
            <p>
              If we add or remove a script that sets cookies, we will update this page and ask again
              rather than carry an old answer over to a new set of scripts. The date at the top shows
              when this was last reviewed.
            </p>

            <h2>Related</h2>
            <p>
              See our <Link href="/privacy/">privacy policy</Link> for how personal information is
              handled, and our <Link href="/affiliate-disclosure/">affiliate disclosure</Link> for how
              the commercial side of the site works. Questions can go to{' '}
              <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
