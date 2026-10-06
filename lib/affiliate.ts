/**
 * Affiliate link layer.
 *
 * Every outbound merchant link on the site goes through `affiliateUrl()`.
 * Amazon and eBay links are routed through Geniuslink (affiliateUrl below);
 * other retailers stay plain links, because Geniuslink refuses their hostnames.
 * The Geniuslink snippet in <head> also converts any Amazon link in article copy.
 * Geniuslink is the only affiliate integration on this site.
 */

export type Network = 'direct';

const ids = {
  /** Geniuslink JavaScript snippet TSID for link affiliation/localization. */
  geniuslinkTsid: process.env.NEXT_PUBLIC_GENIUSLINK_TSID ?? '',
};

export interface AffiliateOptions {
  /** Kept for compatibility with existing components. Links are no longer wrapped here. */
  network?: Network;
  subId?: string;
}

/** Links are handled directly; Geniuslink performs supported merchant affiliation. */
export function detectNetwork(rawUrl: string): Network {
  void rawUrl;
  return 'direct';
}

const GENIUSLINK_TSID = ids.geniuslinkTsid.trim();
const GENIUSLINK_BASE = (process.env.NEXT_PUBLIC_GENIUSLINK_BASE_URL || 'https://buy.geni.us').replace(/\/+$/, '');
const GENIUSLINK_DTB = process.env.NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING === 'true';
/** Already a Geniuslink/GeoRiot link: leave it alone. */
const GENIUSLINK_HOST = /(^|\.)(geni\.us|georiot\.com)$/i;

/**
 * Merchants Geniuslink's Proxy.ashx accepts for this account. Any other host
 * gets a 403 "unsupported hostname" page instead of the retailer (JB Hi-Fi, The
 * Good Guys, Officeworks, Bunnings, Harvey Norman and Bing Lee all do, checked
 * 6 Oct 2026), so only these are routed; the rest stay plain retailer links.
 * Add a host only after a test click through Proxy.ashx reaches the merchant.
 */
const GENIUSLINK_MERCHANT = /(^|\.)(amazon\.[a-z.]+|ebay\.[a-z.]+)$/i;

/**
 * Route an Amazon or eBay URL through Geniuslink, server-side, building the same
 * Proxy.ashx URL the browser snippet (public/js/geniuslink-init.js) does.
 * No TSID, not an http(s) URL, or an unsupported merchant: the original URL
 * comes back unchanged.
 */
export function affiliateUrl(rawUrl: string, options: AffiliateOptions = {}): string {
  void options;
  if (!/^\d+$/.test(GENIUSLINK_TSID)) return rawUrl;
  let host: string;
  try {
    const u = new URL(rawUrl);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return rawUrl;
    host = u.hostname;
  } catch {
    return rawUrl;
  }
  if (GENIUSLINK_HOST.test(host)) return rawUrl;
  if (!GENIUSLINK_MERCHANT.test(host)) return rawUrl;
  return `${GENIUSLINK_BASE}/Proxy.ashx?TSID=${GENIUSLINK_TSID}&GR_URL=${encodeURIComponent(rawUrl)}${GENIUSLINK_DTB ? '&dtb=1' : ''}`;
}

/**
 * Which networks are live. Surfaced on /affiliate-disclosure/ so the disclosure page
 * always matches reality instead of drifting out of date.
 */
export function configuredNetworks(): string[] {
  const live: string[] = [];
  if (ids.geniuslinkTsid) live.push('Geniuslink');
  return live;
}

/**
 * Whether each script actually loads (components/HeadScripts.tsx uses the same
 * tests). The cookie banner and /cookies/ describe only what is on, so the
 * copy never claims tracking the site is not doing. No server-only imports:
 * the cookie banner (a client component) reads these.
 */
export const GENIUSLINK_ENABLED = /^\d+$/.test(ids.geniuslinkTsid.trim());
/** Any affiliate tracking at all. Off: every "we may earn a commission" notice is hidden. */
export const AFFILIATE_ENABLED = GENIUSLINK_ENABLED;

/** Attributes every outbound commercial link must carry. */
export const affiliateLinkAttrs = {
  target: '_blank',
  rel: 'sponsored nofollow noopener noreferrer',
} as const;
