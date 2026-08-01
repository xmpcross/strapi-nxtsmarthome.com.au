import Link from 'next/link';
import { categories, site } from '@/lib/site';

const legalLinks = [
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
  { href: '/how-we-test/', label: 'How We Test' },
  { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
  { href: '/privacy/', label: 'Privacy Policy' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              Site
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
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

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
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
