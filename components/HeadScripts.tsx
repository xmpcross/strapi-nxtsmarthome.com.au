/**
 * Google Analytics and Geniuslink, rendered into <head> on every page.
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
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SY9XCRZH2K';
const GENIUSLINK_TSID = (process.env.NEXT_PUBLIC_GENIUSLINK_TSID || '').trim();
const GENIUSLINK_BASE = process.env.NEXT_PUBLIC_GENIUSLINK_BASE_URL || 'https://buy.geni.us';
const GENIUSLINK_PRESERVE = process.env.NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING === 'true';

export default function HeadScripts() {
  const geniuslink = /^\d+$/.test(GENIUSLINK_TSID);
  return (
    <>
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
    </>
  );
}
