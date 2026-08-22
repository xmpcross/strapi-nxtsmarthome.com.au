import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { articleHref, squareCoverFor, type Article } from '@/lib/content';

/**
 * Recommended — the reference theme's closing grid.
 *
 * Ported from the "Recommended" section on magzin.alithemes.net/home-2, whose
 * measurements are carried over rather than approximated:
 *
 *   .section-title      18px/34px padding, 10px radius, hairline border, white
 *                       — already what SectionHeading renders, so it is reused
 *                       rather than copied, and the two cannot drift.
 *   .row.g-4            24px gutters
 *   .col-lg-3.col-md-6  four across on desktop, two on tablet, one on mobile
 *   .rounded-16         16px radius on the thumbnail
 *   .card-recommend img square artwork, capped at 280px tall
 *   h6.mt-3             18px semi-bold title, 16px below the image
 *   .hover-up           the card lifts 3px
 *   .hover-effect-30    the artwork scales 1.05 and rotates 1deg
 *
 * Titles are h3: the page's h1 is the site name and the section heading is an
 * h2, so the reference's h6 would skip three levels for no visual gain.
 */

export default function Recommended({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section aria-labelledby="recommended-heading" className="mt-16">
      <SectionHeading id="recommended-heading" title="Recommended" />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => {
          const href = articleHref(article);
          return (
            <li key={article.slug} className="group transition duration-300 hover:-translate-y-[3px]">
              <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-2xl">
                <img
                  src={squareCoverFor(article)}
                  alt=""
                  width={300}
                  height={300}
                  loading="lazy"
                  className="aspect-square max-h-[280px] w-full object-cover transition duration-300 group-hover:scale-[1.05] group-hover:rotate-[1deg]"
                />
              </Link>

              <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
                <Link href={href} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
