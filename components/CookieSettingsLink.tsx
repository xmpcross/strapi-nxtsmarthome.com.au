'use client';

import { reopenCookieBanner } from '@/components/CookieBanner';

/**
 * Footer control that reopens the consent banner.
 *
 * Its own client component because the footer is a server component, and this
 * needs an onClick. A button rather than a link: it changes state on this page
 * rather than navigating anywhere.
 */
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={reopenCookieBanner} className={className}>
      Cookie settings
    </button>
  );
}
