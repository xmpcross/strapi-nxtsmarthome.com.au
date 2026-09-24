/**
 * Affiliate link layer.
 *
 * Every outbound merchant link on the site goes through `affiliateUrl()`.
 * The site now leaves retailer URLs untouched and lets the Geniuslink script
 * handle supported merchant affiliation automatically after the static export.
 */

export type Network = 'direct';

const ids = {
  /** Geniuslink JavaScript snippet TSID for link affiliation/localization. */
  geniuslinkTsid: process.env.NEXT_PUBLIC_GENIUSLINK_TSID ?? '',
  /** Sovrn Commerce (VigLink) public key; the script loads after cookie consent. */
  sovrnKey: process.env.NEXT_PUBLIC_SOVRN_KEY ?? '',
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

/** Return the original URL; Geniuslink is injected globally after build. */
export function affiliateUrl(rawUrl: string, options: AffiliateOptions = {}): string {
  void options;
  return rawUrl;
}

/**
 * Which networks are live. Surfaced on /affiliate-disclosure/ so the disclosure page
 * always matches reality instead of drifting out of date.
 */
export function configuredNetworks(): string[] {
  const live: string[] = [];
  if (ids.geniuslinkTsid) live.push('Geniuslink');
  if (ids.sovrnKey) live.push('Sovrn Commerce');
  return live;
}

/**
 * Whether each script actually loads (components/HeadScripts.tsx uses the same
 * tests). The cookie banner and /cookies/ describe only what is on, so the
 * copy never claims tracking the site is not doing. No server-only imports:
 * the cookie banner (a client component) reads these.
 */
export const GENIUSLINK_ENABLED = /^\d+$/.test(ids.geniuslinkTsid.trim());
export const SOVRN_ENABLED = Boolean(ids.sovrnKey.trim());
/** Any affiliate tracking at all. Off: every "we may earn a commission" notice is hidden. */
export const AFFILIATE_ENABLED = GENIUSLINK_ENABLED || SOVRN_ENABLED;

/** Attributes every outbound commercial link must carry. */
export const affiliateLinkAttrs = {
  target: '_blank',
  rel: 'sponsored nofollow noopener noreferrer',
} as const;
