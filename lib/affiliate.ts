/**
 * Affiliate link layer.
 *
 * Every outbound merchant link on the site goes through `affiliateUrl()`. That gives us
 * one place to add tracking, one place to add subIDs, and one place to change networks.
 *
 * IMPORTANT — none of the IDs below are real. Fill them in from your network dashboards
 * via .env.local (see .env.example). Until an ID is set, the matching network is treated
 * as "not configured": the link still renders and still works, it just goes out without
 * a tracking wrapper. The Sovrn Commerce script (if enabled) will usually monetise those
 * automatically, so nothing is lost while you wait for programme approvals.
 */

export type Network = 'sovrn' | 'cj' | 'walmart' | 'ebay' | 'amazon' | 'direct';

/**
 * Read at build time. In a static export these are inlined into the HTML, so they must be
 * NEXT_PUBLIC_* to be available in the browser bundle.
 */
const ids = {
  /** Sovrn Commerce (formerly VigLink) site key — enables the auto-affiliate script. */
  sovrnKey: process.env.NEXT_PUBLIC_SOVRN_KEY ?? '',
  /** CJ Affiliate publisher (PID). */
  cjPid: process.env.NEXT_PUBLIC_CJ_PID ?? '',
  /** Walmart runs through Impact. This is your Impact publisher id. */
  walmartPid: process.env.NEXT_PUBLIC_WALMART_PID ?? '',
  /** eBay Partner Network campaign id (campid). */
  ebayCampId: process.env.NEXT_PUBLIC_EBAY_CAMPID ?? '',
  /** Amazon Associates AU tracking id, e.g. yourtag-22. */
  amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG ?? '',
};

/** eBay AU rotation id for the AU programme. */
const EBAY_AU_ROTATION = '705-53470-19255-0';

export interface AffiliateOptions {
  /** Force a network. If omitted, it is detected from the URL's hostname. */
  network?: Network;
  /**
   * Sub-ID passed through to the network so you can see which article earned the click.
   * Convention on this site: the article slug.
   */
  subId?: string;
}

/** Detect which network a raw merchant URL belongs to, based on hostname. */
export function detectNetwork(rawUrl: string): Network {
  let host: string;
  try {
    host = new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return 'direct';
  }

  if (host.endsWith('ebay.com.au') || host.endsWith('ebay.com')) return 'ebay';
  if (host.endsWith('walmart.com')) return 'walmart';
  if (host.endsWith('amazon.com.au') || host.endsWith('amazon.com')) return 'amazon';

  // Merchants you run through CJ. Extend this list as you are approved for programmes.
  const cjMerchants = [
    'thegoodguys.com.au',
    'kogan.com',
    'catch.com.au',
    'lenovo.com',
    'samsung.com',
  ];
  if (cjMerchants.some((m) => host.endsWith(m))) return 'cj';

  return 'direct';
}

/**
 * Convert a raw merchant URL into a tracked affiliate URL.
 * Returns the URL unchanged when the relevant network is not configured yet.
 */
export function affiliateUrl(rawUrl: string, options: AffiliateOptions = {}): string {
  const network = options.network ?? detectNetwork(rawUrl);
  const subId = sanitiseSubId(options.subId ?? '');

  try {
    switch (network) {
      case 'ebay': {
        if (!ids.ebayCampId) return rawUrl;
        const url = new URL(rawUrl);
        url.searchParams.set('mkcid', '1');
        url.searchParams.set('mkrid', EBAY_AU_ROTATION);
        url.searchParams.set('siteid', '15'); // 15 = eBay Australia
        url.searchParams.set('campid', ids.ebayCampId);
        url.searchParams.set('toolid', '10001');
        url.searchParams.set('mkevt', '1');
        if (subId) url.searchParams.set('customid', subId);
        return url.toString();
      }

      case 'walmart': {
        if (!ids.walmartPid) return rawUrl;
        const target = encodeURIComponent(rawUrl);
        const sub = subId ? `&subId1=${encodeURIComponent(subId)}` : '';
        return `https://goto.walmart.com/c/${ids.walmartPid}/565706/9383?veh=aff&sourceid=imp_000&u=${target}${sub}`;
      }

      case 'cj': {
        if (!ids.cjPid) return rawUrl;
        const target = encodeURIComponent(rawUrl);
        const sub = subId ? `?sid=${encodeURIComponent(subId)}` : '';
        return `https://www.anrdoezrs.net/links/${ids.cjPid}/type/dlg/${target}${sub}`;
      }

      case 'amazon': {
        if (!ids.amazonTag) return rawUrl;
        const url = new URL(rawUrl);
        url.searchParams.set('tag', ids.amazonTag);
        if (subId) url.searchParams.set('ascsubtag', subId);
        return url.toString();
      }

      case 'sovrn':
      case 'direct':
      default:
        // Left raw on purpose. The Sovrn Commerce script monetises these client-side
        // wherever a matching merchant programme exists.
        return rawUrl;
    }
  } catch {
    return rawUrl;
  }
}

function sanitiseSubId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 60);
}

/** True when the Sovrn auto-affiliate script should be injected. */
export const sovrnEnabled = Boolean(ids.sovrnKey);
export const sovrnKey = ids.sovrnKey;

/**
 * Which networks are live. Surfaced on /affiliate-disclosure/ so the disclosure page
 * always matches reality instead of drifting out of date.
 */
export function configuredNetworks(): string[] {
  const live: string[] = [];
  if (ids.sovrnKey) live.push('Sovrn Commerce');
  if (ids.cjPid) live.push('CJ Affiliate');
  if (ids.walmartPid) live.push('Walmart (Impact)');
  if (ids.ebayCampId) live.push('eBay Partner Network');
  if (ids.amazonTag) live.push('Amazon Associates');
  return live;
}

/** Attributes every outbound commercial link must carry. */
export const affiliateLinkAttrs = {
  target: '_blank',
  rel: 'sponsored nofollow noopener noreferrer',
} as const;
