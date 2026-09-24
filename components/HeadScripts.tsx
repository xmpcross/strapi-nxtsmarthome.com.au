/**
 * Google Analytics, Google AdSense, Geniuslink and Sovrn Commerce, rendered into
 * <head> on every page.
 *
 * These used to be injected into the exported HTML after the build
 * (scripts/inject-ga.mjs, scripts/inject-geniuslink.mjs), because anything React
 * renders inline also appears a second time in the RSC payload, and verifiers
 * that text-scan the page then report the tag twice. The site now runs on
 * `next start`, where there is no exported HTML to post-process. So the inline
 * code lives in static files under public/js/ and takes its ids from data-
 * attributes: the page carries only a <script src>, and the snippet text exists
 * once.
 *
 * GA runs with Consent Mode v2 defaults denied until the cookie banner grants
 * them. Geniuslink converts Amazon links on page load; no TSID, no script.
 * Sovrn affiliates other merchant links and loads only after consent
 * (public/js/sovrn-init.js, released by the cookie banner); no key, no script.
 *
 * AdSense, two stages (lib/ads.ts). With NEXT_PUBLIC_ADSENSE_CLIENT set, only
 * the google-adsense-account meta renders, which is what Google needs to
 * verify the site for review; no ad script loads. ADS ARE OFF until the site
 * is approved and NEXT_PUBLIC_ADSENSE_SHOW_ADS=1 is set too; then the
 * adsbygoogle.js loader goes on every page as well. No ad units are placed by
 * hand: Auto ads are switched on in the AdSense dashboard. AdSense reads the same Consent Mode
 * v2 signals as GA (defaults denied), and for EEA/UK/CH visitors Google's own
 * consent message (AdSense Privacy & messaging) takes over from our banner —
 * see components/CookieBanner.tsx. Keep app/cookies/page.tsx in step with
 * this list.
 */
import { ADSENSE_CLIENT, ADS_ENABLED } from '@/lib/ads';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SY9XCRZH2K';
const GENIUSLINK_TSID = (process.env.NEXT_PUBLIC_GENIUSLINK_TSID || '').trim();
const GENIUSLINK_BASE = process.env.NEXT_PUBLIC_GENIUSLINK_BASE_URL || 'https://buy.geni.us';
const GENIUSLINK_PRESERVE = process.env.NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING === 'true';
const SOVRN_KEY = (process.env.NEXT_PUBLIC_SOVRN_KEY || '').trim();

export default function HeadScripts() {
  const geniuslink = /^\d+$/.test(GENIUSLINK_TSID);
  return (
    <>
      {/* Verification only: no ads without ADS_ENABLED. */}
      {ADSENSE_CLIENT && <meta name="google-adsense-account" content={ADSENSE_CLIENT} />}
      {ADS_ENABLED && (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      )}
      {/* Consent defaults must be queued before gtag.js loads, so this one is not async. */}
      <script src="/js/ga-init.js" data-ga-id={GA_ID} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      {geniuslink && (
        <>
          <script src="https://geniuslinkcdn.com/snippet.min.js" defer />
          <script
            src="/js/geniuslink-init.js"
            defer
            data-tsid={GENIUSLINK_TSID}
            data-base-url={GENIUSLINK_BASE}
            data-preserve-existing={GENIUSLINK_PRESERVE ? 'true' : 'false'}
          />
        </>
      )}
      {SOVRN_KEY && <script src="/js/sovrn-init.js" defer data-key={SOVRN_KEY} />}
    </>
  );
}
