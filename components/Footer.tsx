import Link from 'next/link';
import { categories, site } from '@/lib/site';

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

/**
 * Only accounts that actually exist are rendered. These same URLs feed the
 * Organization `sameAs` in lib/seo.ts, which is how search engines connect the
 * site to its social profiles.
 */
const socialLinks = [
  site.social.facebook && {
    href: site.social.facebook,
    label: `${site.name} on Facebook`,
    icon: <FacebookIcon />,
  },
].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

/** "About Us" column — who we are and how to reach us. */
const aboutLinks = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/sitemap.xml', label: 'Sitemap', external: true },
  { href: '/contact/', label: 'Contact' },
];

/** "Useful Links" column — the policy and disclosure pages. */
const usefulLinks = [
  { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms and Conditions' },
  { href: '/cookies/', label: 'Cookie Information' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-site px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-extrabold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm text-white">
                NXT
              </span>
              <span className="text-slate-900 dark:text-white">{site.shortName} AU</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              Topics
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}/`}
                    className="text-slate-600 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {/*
                /categories/ is in the sitemap but nothing linked to it — an orphan
                page, which is a common cause of "Discovered - currently not indexed".
              */}
              <li>
                <Link
                  href="/categories/"
                  className="font-medium text-brand-700 hover:underline dark:text-brand-400"
                >
                  All topics →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              About Us
            </h3>
            <ul className="space-y-2 text-sm">
              {aboutLinks.map((link) =>
                link.external ? (
                  // A static file, so a plain anchor — Link is for app routes.
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-600 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-10 flex items-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">Follow</span>
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={s.label}
                title={s.label}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400"
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}

        <div className="mt-6 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>
            © {year} {site.organisation.name}. Prices and availability are indicative only and
            change frequently — always confirm on the retailer&apos;s site before buying.
          </p>
          <p className="mt-2">
            {site.name} is reader-supported. When you buy through links on our site we may earn
            an affiliate commission at no additional cost to you.{' '}
            <Link href="/affiliate-disclosure/" className="underline hover:text-brand-600">
              Learn more
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
