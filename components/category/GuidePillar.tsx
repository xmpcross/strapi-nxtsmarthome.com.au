import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FOCUS, typeLabel } from '@/components/category/shared';
import { articleHref, squareCoverFor, type Article } from '@/lib/content';
import { guidePillars, type PillarSection } from '@/lib/guide-pillars';
import { breadcrumbJsonLd } from '@/lib/seo';
import { site, type Category } from '@/lib/site';

/**
 * Buying Guides and Setup Guides as pillar pages: one long guide whose sections
 * explain part of the subject, each followed by the category's own posts that
 * go deeper (lib/guide-pillars.ts). Only this category's posts are listed; any
 * post the pillar does not place lands in "More guides", so none is hidden.
 */
export default function GuidePillar({ category, articles }: { category: Category; articles: Article[] }) {
  const base = `/categories/${category.slug}/`;
  const pillar = guidePillars[category.slug];
  const bySlug = new Map(articles.map((a) => [a.slug, a]));

  // Sections keep only published posts; a section left with none is dropped.
  const placed = new Set<string>();
  const sections: (PillarSection & { items: Article[] })[] = [];
  for (const section of pillar?.sections ?? []) {
    const items = section.posts.flatMap((slug) => {
      const article = bySlug.get(slug);
      if (!article || placed.has(slug)) return [];
      placed.add(slug);
      return [article];
    });
    if (items.length) sections.push({ ...section, items });
  }
  const unplaced = articles.filter((a) => !placed.has(a.slug));
  if (unplaced.length) {
    sections.push({
      id: 'more-guides',
      heading: sections.length ? 'More guides' : `All ${category.name.toLowerCase()}`,
      paragraphs: [],
      posts: [],
      items: unplaced,
    });
  }

  const ordered = sections.flatMap((s) => s.items);
  const count = articles.length;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: base },
        ])}
      />
      {count > 0 ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: category.name,
            description: category.intro,
            url: `${site.url}${base}`,
            inLanguage: site.language,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: ordered.map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${site.url}${articleHref(article)}`,
                name: article.title,
              })),
            },
          }}
        />
      ) : null}

      <div className={`page-category-${category.slug}`}>
        <header className="container pt-8 lg:pt-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400"
          >
            <Link href="/" className={`hover:text-neutral-900 dark:hover:text-white ${FOCUS}`}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/all-topics/" className={`hover:text-neutral-900 dark:hover:text-white ${FOCUS}`}>
              All Topics
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-900 dark:text-white" aria-current="page">
              {category.name}
            </span>
          </nav>

          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            {category.icon3d ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={category.icon3d}
                alt=""
                width={72}
                height={72}
                className="size-14 shrink-0 object-contain sm:size-[4.5rem]"
              />
            ) : null}
            <h1 className="text-4xl font-black tracking-tight text-balance text-neutral-900 sm:text-5xl dark:text-white">
              {category.name}
            </h1>
          </div>

          <div className="mt-5 max-w-[68ch] space-y-4 text-base leading-relaxed text-pretty text-neutral-700 sm:text-lg dark:text-neutral-300">
            <p>{category.intro}</p>
            {pillar?.lead.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>

          {count > 0 ? (
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">{count}</span>{' '}
              {count === 1 ? 'guide' : 'guides'} in {sections.length} {sections.length === 1 ? 'section' : 'sections'}
            </p>
          ) : null}
        </header>

        <div className="container pt-10 pb-20 lg:pt-14 lg:pb-28">
          {count === 0 ? (
            <section className="max-w-3xl border-y border-neutral-200 py-8 dark:border-neutral-800">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                No {category.name.toLowerCase()} yet
              </h2>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <Link
                  href="/all-topics/"
                  className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                >
                  Browse every topic
                </Link>{' '}
                or{' '}
                <Link
                  href="/search/"
                  className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                >
                  search the guides
                </Link>
                .
              </p>
            </section>
          ) : (
            <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
              {/* Contents: a collapsible list on small screens, a sticky rail on large ones. */}
              <nav aria-label="On this page" className="mb-10 lg:mb-0">
                <details className="group border-y border-neutral-200 lg:hidden dark:border-neutral-800">
                  <summary
                    className={`flex cursor-pointer items-center justify-between py-3 font-semibold text-neutral-900 dark:text-white ${FOCUS}`}
                  >
                    On this page
                    <svg
                      aria-hidden="true"
                      className="size-4 transition-transform group-open:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <ol className="pb-3">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={`block py-1.5 text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 ${FOCUS}`}
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>

                <div className="hidden lg:sticky lg:top-24 lg:block">
                  <p className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">On this page</p>
                  <ol className="border-l border-neutral-200 dark:border-neutral-800">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={`-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-neutral-700 hover:border-primary-500 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 ${FOCUS}`}
                        >
                          {section.heading}
                          <span className="sr-only">
                            {' '}
                            ({section.items.length} {section.items.length === 1 ? 'guide' : 'guides'})
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <div className="min-w-0 space-y-16 lg:space-y-20">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
                    <h2
                      id={`${section.id}-heading`}
                      className="text-2xl font-bold tracking-tight text-balance text-neutral-900 sm:text-3xl dark:text-white"
                    >
                      {section.heading}
                    </h2>
                    {section.paragraphs.length ? (
                      <div className="mt-4 max-w-[68ch] space-y-4 leading-relaxed text-pretty text-neutral-700 dark:text-neutral-300">
                        {section.paragraphs.map((text) => (
                          <p key={text.slice(0, 40)}>{text}</p>
                        ))}
                      </div>
                    ) : null}

                    <ul className="mt-6 border-t border-neutral-200 dark:border-neutral-800">
                      {section.items.map((article) => (
                        <li key={article.slug} className="border-b border-neutral-200 dark:border-neutral-800">
                          <Link
                            href={articleHref(article)}
                            className={`group grid grid-cols-[minmax(0,1fr)] gap-x-6 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] ${FOCUS}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={squareCoverFor(article)}
                              alt=""
                              width={112}
                              height={84}
                              loading="lazy"
                              className="hidden aspect-[4/3] w-28 rounded-lg object-cover sm:block"
                            />
                            <span className="min-w-0">
                              <span className="block text-lg leading-snug font-bold text-neutral-900 group-hover:text-primary-600 group-hover:underline group-hover:underline-offset-4 dark:text-white dark:group-hover:text-primary-400">
                                {article.title}
                              </span>
                              <span className="mt-1.5 line-clamp-2 block text-neutral-700 dark:text-neutral-300">
                                {article.description}
                              </span>
                              <span className="mt-2 block text-sm text-neutral-600 dark:text-neutral-400">
                                {typeLabel(article.type)} · <span className="tabular-nums">{article.readingMinutes}</span> min
                                read
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
