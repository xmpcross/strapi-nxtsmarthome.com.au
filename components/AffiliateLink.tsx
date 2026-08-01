import { affiliateUrl, affiliateLinkAttrs, type Network } from '@/lib/affiliate';

interface Props {
  href: string;
  network?: Network;
  /** Article slug, passed to the network as a subID for per-article reporting. */
  subId?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * The only sanctioned way to link to a merchant. Applies network tracking and the
 * rel attributes Google requires on paid links.
 */
export default function AffiliateLink({ href, network, subId, className, children }: Props) {
  return (
    <a href={affiliateUrl(href, { network, subId })} className={className} {...affiliateLinkAttrs}>
      {children}
    </a>
  );
}
