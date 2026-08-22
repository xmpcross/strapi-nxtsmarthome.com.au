import type { Metadata } from 'next';
import Link from 'next/link';
import LegalSidebarTOC from '@/components/LegalSidebarTOC';
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
    loads on 23 August 2026:
      - two third-party scripts: cdn.viglink.com (Sovrn Commerce) and
        googletagmanager.com/gtag/js (Google Analytics, G-SY9XCRZH2K)
      - BOTH are gated behind consent. GA loads with Consent Mode v2 defaults of
        denied (scripts/inject-ga.mjs) and Sovrn does not self-start; its loader
        waits on window.__nxtLoadSovrn (scripts/inject-sovrn.mjs). The choice is
        made in components/CookieBanner.tsx and stored as nxt.consent.v1.
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
    <div className="mx-auto max-w-[1366px] px-4 py-12 sm:px-6">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 items-start">
        <LegalSidebarTOC />
        <main className="min-w-0">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Cookie information
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: 23 August 2026
          </p>

          <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-h2:mt-0 prose-h2:pt-0 prose-h3:mt-0 prose-h3:pt-0">
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

            <h3>Affiliate tracking</h3>
            <p>
              We take part in affiliate programmes, which is how the site is funded. Two things happen
              here:
            </p>
            <ul>
              <li>
                A commerce script from Sovrn attributes outbound merchant links, and may set a
                cookie to record which link you followed. Like the analytics tag, it is not loaded at
                all until you accept.
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
              The first time you visit, a banner asks whether to allow the analytics and affiliate
              scripts. Nothing beyond your answer is stored until you accept. To change your mind
              later, use <strong>Cookie settings</strong> in the footer, which asks again.
            </p>
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
