'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ADS_ENABLED } from '@/lib/ads';

/**
 * Cookie consent banner.
 *
 * This gates real things rather than only recording a click. Two third-party
 * scripts are held back until a choice is made:
 *
 *   Google Analytics  components/HeadScripts.tsx (public/js/ga-init.js) sets Consent Mode v2 defaults to
 *                     denied before the tag loads, so gtag buffers rather than
 *                     writes. Accepting sends the 'update' that releases it.
 *   Sovrn Commerce    public/js/sovrn-init.js does not self-start; it parks a
 *                     loader on window.__nxtLoadSovrn, which is called here.
 *
 * The choice is stored under CONSENT_KEY. The version suffix is deliberate: if
 * the set of scripts changes, bumping it re-asks everyone rather than treating
 * a decision made about the old set as a decision about the new one.
 *
 * Declining is a real decline for both: neither runs, and nothing is written
 * beyond the record of the choice itself.
 *
 * Advertising (Google AdSense, components/HeadScripts.tsx) reads the same
 * Consent Mode v2 signals as GA, so Accept here also releases personalised ads
 * and Decline leaves ads limited and non-personalised. v2 of the key re-asks
 * everyone, because a choice made before ads existed is not consent to them.
 *
 * EEA, UK and Switzerland: AdSense requires a Google-certified CMP there, which
 * is Google's own consent message (AdSense -> Privacy & messaging). When that
 * message is running it exposes the IAB TCF API (window.__tcfapi) and reports
 * gdprApplies. For those visitors this banner stands aside entirely: Google's
 * message collects consent and drives Consent Mode for Google's tags, and a
 * second banner would contradict it. Sovrn, which is not governed by that
 * message here, stays off for them. Everywhere else (Australia included)
 * gdprApplies is false or the API is absent, and this banner works as before.
 */

export const CONSENT_KEY = 'nxt.consent.v2';

/** Only wait for Google's consent message when ads are actually switched on (lib/ads.ts). */
const ADSENSE_ON = ADS_ENABLED;

type TcfApi = (
  command: string,
  version: number,
  callback: (data: { gdprApplies?: boolean; eventStatus?: string } | null, success: boolean) => void,
) => void;

/**
 * Resolves true when Google's CMP is present and says GDPR applies to this
 * visitor, false otherwise. Gives the CMP a short window to appear, since
 * adsbygoogle.js loads async.
 */
function googleCmpApplies(timeoutMs = 2500): Promise<boolean> {
  return new Promise((resolve) => {
    const started = Date.now();
    const poll = () => {
      const tcf = (window as typeof window & { __tcfapi?: TcfApi }).__tcfapi;
      if (typeof tcf === 'function') {
        let settled = false;
        tcf('addEventListener', 2, (data, success) => {
          if (settled) return;
          settled = true;
          resolve(Boolean(success && data?.gdprApplies));
        });
        return;
      }
      if (Date.now() - started >= timeoutMs) return resolve(false);
      window.setTimeout(poll, 150);
    };
    poll();
  });
}

type Choice = 'granted' | 'denied';

function apply(choice: Choice) {
  if (typeof window === 'undefined') return;

  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    __nxtLoadSovrn?: () => void;
  };

  if (choice === 'granted') {
    w.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
    w.__nxtLoadSovrn?.();
  }
}

type GoogleFc = { callbackQueue?: unknown[]; showRevocationMessage?: () => void };

/**
 * Lets the footer reopen the banner so a choice can be changed. Where Google's
 * consent message is in charge (see above), it reopens that instead, through
 * its documented revocation call.
 */
export function reopenCookieBanner() {
  const w = window as typeof window & { __nxtGoogleCmp?: boolean; googlefc?: GoogleFc };
  if (w.__nxtGoogleCmp) {
    w.googlefc = w.googlefc || {};
    w.googlefc.callbackQueue = w.googlefc.callbackQueue || [];
    w.googlefc.callbackQueue.push(() => w.googlefc?.showRevocationMessage?.());
    return;
  }
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* storage unavailable — the banner shows again next visit anyway */
  }
  window.dispatchEvent(new Event('nxt:consent-reopen'));
}

export default function CookieBanner() {
  // Never render on the server pass: the answer depends on localStorage, and
  // guessing it produces a hydration mismatch and a banner that flashes.
  const [show, setShow] = useState(false);

  useEffect(() => {
    const read = () => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(CONSENT_KEY);
      } catch {
        // Private mode, or storage blocked. Asking again on every visit is the
        // safe failure: it never assumes consent that was not given.
      }
      setShow(stored !== 'granted' && stored !== 'denied');
    };

    // With AdSense on, first find out whether Google's consent message is in
    // charge for this visitor; the banner only appears once it is not.
    let handedOver = false;
    let cancelled = false;
    if (ADSENSE_ON) {
      googleCmpApplies().then((applies) => {
        if (cancelled) return;
        handedOver = applies;
        (window as typeof window & { __nxtGoogleCmp?: boolean }).__nxtGoogleCmp = applies;
        if (!applies) read();
      });
    } else {
      read();
    }

    const reopen = () => {
      if (!handedOver) read();
    };
    window.addEventListener('nxt:consent-reopen', reopen);
    return () => {
      cancelled = true;
      window.removeEventListener('nxt:consent-reopen', reopen);
    };
  }, []);

  const choose = (choice: Choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* the choice still applies to this page view */
    }
    apply(choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-heading"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-[1366px] flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-7 dark:border-card-edge dark:bg-card">
        <div className="min-w-0">
          <h2
            id="cookie-banner-heading"
            className="text-base font-bold text-slate-900 dark:text-white"
          >
            Cookies on this site
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {ADS_ENABLED ? (
              <>
                Google Analytics tells us which guides get read, Google AdSense shows ads, and
                Sovrn Commerce credits us when a link you follow leads to a purchase.{' '}
                <strong>Analytics, personalised ads and Sovrn wait for your answer</strong>;
                decline and any ads shown are non-personalised.
              </>
            ) : (
              <>
                Google Analytics tells us which guides get read, and Sovrn Commerce credits us when
                a link you follow leads to a purchase. <strong>Both wait for your answer.</strong>
              </>
            )}{' '}
            Geniuslink may also affiliate supported retailer links. Read our{' '}
            <Link
              href="/cookies/"
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-card-edge dark:text-slate-300 dark:hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
