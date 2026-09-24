/**
 * Google AdSense switches. Two separate settings, because verifying the site
 * and showing ads are separate stages:
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 *       Verification only: the google-adsense-account meta tag on every page
 *       and /ads.txt. This is what Google needs to review the site. No ad
 *       script loads and no ads display.
 *
 *   NEXT_PUBLIC_ADSENSE_SHOW_ADS=1
 *       Also loads adsbygoogle.js, so ads can display. Set only after the site
 *       is approved (and Privacy & messaging is on). It needs the client id too.
 *
 * Both are NEXT_PUBLIC_, so they are fixed at build time: change them in
 * .env.local, then ./deploy.sh. The site's wording about advertising (footer,
 * About, legal pages, cookie banner) follows ADS_ENABLED, so it never claims
 * ads the site is not showing.
 *
 * No fs or server-only imports: the cookie banner (a client component) reads it.
 */
const client = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '').trim();

/** The publisher id, or '' when unset or malformed. */
export const ADSENSE_CLIENT = /^ca-pub-\d{16}$/.test(client) ? client : '';

/** True only when ads are switched on, not merely verified. */
export const ADS_ENABLED = Boolean(ADSENSE_CLIENT) && process.env.NEXT_PUBLIC_ADSENSE_SHOW_ADS === '1';
