import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FOCUS, typeLabel } from '@/components/category/shared';
import { articleHref, coverFor, type Article } from '@/lib/content';
import { guidePillars, type PillarSection } from '@/lib/guide-pillars';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
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
  const faq = count > 0 ? (pillar?.faq ?? []) : [];

  // Contents: the guide's sections, then the questions and the closing note.
  const contents = [
    ...sections.map((s) => ({ id: s.id, label: s.heading, guides: s.items.length })),
    ...(faq.length ? [{ id: 'questions', label: 'Common questions', guides: 0 }] : []),
    { id: 'how-made', label: 'How these guides are made', guides: 0 },
  ];

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
      {faq.length ? <JsonLd data={faqJsonLd(faq)} /> : null}

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

          {/*
           * Full width, set in two columns on large screens: the page uses the
           * whole container while each line stays a readable measure.
           */}
          <div className="mt-6 gap-12 space-y-4 text-base leading-relaxed text-pretty text-neutral-700 sm:text-lg lg:columns-2 dark:text-neutral-300 [&>p]:break-inside-avoid">
            <p className="text-neutral-900 dark:text-white">{category.intro}</p>
            {pillar?.lead.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>

          {count > 0 ? (
            <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">{count}</span>{' '}
              {count === 1 ? 'guide' : 'guides'} in {sections.length} {sections.length === 1 ? 'section' : 'sections'}
            </p>
          ) : null}

          {/* The guides' own covers, as a mosaic: the page's first image is a real guide, not decoration. */}
          {ordered.length >= 3 ? <CoverMosaic articles={ordered.slice(0, 5)} /> : null}
        </header>

        <div className="container pt-10 pb-20 lg:pt-12 lg:pb-28">
          {count === 0 ? (
            <section className="border-y border-neutral-200 py-8 dark:border-neutral-800">
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
            <>
              {/* Contents: jump links across the page, so no side rail narrows the sections. */}
              <nav
                aria-label="On this page"
                className="border-y border-neutral-200 py-4 dark:border-neutral-800"
              >
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">On this page</p>
                <ol className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
                  {contents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`text-sm text-neutral-700 hover:text-primary-600 hover:underline hover:underline-offset-4 dark:text-neutral-300 dark:hover:text-primary-400 ${FOCUS}`}
                      >
                        {item.label}
                        {item.guides ? (
                          <span className="ms-1.5 tabular-nums text-neutral-600 dark:text-neutral-400">
                            {item.guides}
                            <span className="sr-only"> {item.guides === 1 ? 'guide' : 'guides'}</span>
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-14 space-y-20 lg:mt-16 lg:space-y-24">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
                    <h2
                      id={`${section.id}-heading`}
                      className="max-w-4xl text-2xl font-bold tracking-tight text-balance text-neutral-900 sm:text-3xl dark:text-white"
                    >
                      {section.heading}
                    </h2>
                    {section.paragraphs.length ? (
                      <div className="mt-5 gap-12 space-y-4 leading-relaxed text-pretty text-neutral-700 sm:text-[1.0625rem] lg:columns-2 dark:text-neutral-300 [&>p]:break-inside-avoid">
                        {section.paragraphs.map((text) => (
                          <p key={text.slice(0, 40)}>{text}</p>
                        ))}
                      </div>
                    ) : null}

                    {section.checklist ? (
                      <div className="mt-8 border-t border-neutral-200 pt-5 dark:border-neutral-800">
                        <p className="font-semibold text-neutral-900 dark:text-white">{section.checklist.title}</p>
                        <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                          {section.checklist.items.map((item) => (
                            <li key={item} className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                              <svg
                                aria-hidden="true"
                                className="mt-1 size-4 shrink-0 text-primary-600 dark:text-primary-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {section.items.length === 1 ? (
                      <div className="mt-10">
                        <GuideFeature article={section.items[0]} />
                      </div>
                    ) : (
                      <ul
                        className={`mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 ${section.items.length >= 3 ? 'lg:grid-cols-3' : ''}`}
                      >
                        {section.items.map((article) => (
                          <li key={article.slug}>
                            <GuideTile article={article} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {faq.length ? (
                  <section id="questions" aria-labelledby="questions-heading" className="scroll-mt-24">
                    <h2
                      id="questions-heading"
                      className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white"
                    >
                      Common questions
                    </h2>
                    <div className="mt-6 grid gap-x-12 border-t border-neutral-200 lg:grid-cols-2 dark:border-neutral-800">
                      {faq.map((item) => (
                        <details key={item.q} className="group border-b border-neutral-200 dark:border-neutral-800">
                          <summary
                            className={`flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-lg font-semibold text-neutral-900 dark:text-white [&::-webkit-details-marker]:hidden ${FOCUS}`}
                          >
                            {item.q}
                            <svg
                              aria-hidden="true"
                              className="mt-1.5 size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
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
                          <p className="pb-5 leading-relaxed text-neutral-700 dark:text-neutral-300">{item.a}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section
                  id="how-made"
                  aria-labelledby="how-made-heading"
                  className="scroll-mt-24 border-t border-neutral-200 pt-8 dark:border-neutral-800"
                >
                  <h2 id="how-made-heading" className="text-xl font-bold text-neutral-900 dark:text-white">
                    How these guides are made
                  </h2>
                  <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
                    Our guides are researched, not bench-tested. They draw on manufacturer documentation, published
                    specifications, Australian standards and regulator guidance, and every guide is labelled with its type.
                    Where a guide links to a retailer, the link may earn us a commission; it never decides what we write.{' '}
                    <Link
                      href="/how-we-test/"
                      className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                    >
                      How we research
                    </Link>
                  </p>
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const meta = (article: Article) => (
  <>
    {typeLabel(article.type)} · <span className="tabular-nums">{article.readingMinutes}</span> min read
  </>
);

/**
 * One large cover and up to four smaller ones, each a link to its guide. Titles
 * sit on a dark scrim at the foot of each photo so they hold contrast on any
 * image, in either theme. On phones only the first three show.
 */
function CoverMosaic({ articles }: { articles: Article[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:h-[30rem] lg:grid-cols-4 lg:grid-rows-2">
      {articles.map((article, i) => (
        <li
          key={article.slug}
          className={
            i === 0
              ? 'col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto'
              : `aspect-square sm:aspect-[4/3] lg:aspect-auto ${i >= 3 ? 'hidden lg:block' : ''}`
          }
        >
          <Link
            href={articleHref(article)}
            className={`group relative block size-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 ${FOCUS}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverFor(article)}
              alt=""
              width={i === 0 ? 1200 : 600}
              height={i === 0 ? 750 : 450}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3 pt-10 sm:p-5 sm:pt-16">
              <span
                className={`block font-bold leading-snug text-balance text-white group-hover:underline group-hover:underline-offset-4 ${
                  i === 0 ? 'text-xl sm:text-2xl' : 'line-clamp-3 text-[0.8125rem] sm:line-clamp-none sm:text-base'
                }`}
              >
                {article.title}
              </span>
              {i === 0 ? <span className="mt-1.5 block text-sm text-neutral-200">{meta(article)}</span> : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** A guide as a photo tile: cover, title, the full description and its type. */
function GuideTile({ article }: { article: Article }) {
  return (
    <Link href={articleHref(article)} className={`group block ${FOCUS}`}>
      <span className="block aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverFor(article)}
          alt=""
          width={640}
          height={400}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </span>
      <span className="mt-4 block text-lg leading-snug font-bold text-balance text-neutral-900 group-hover:text-primary-600 group-hover:underline group-hover:underline-offset-4 dark:text-white dark:group-hover:text-primary-400">
        {article.title}
      </span>
      <span className="mt-2 block leading-relaxed text-pretty text-neutral-700 dark:text-neutral-300">
        {article.description}
      </span>
      <span className="mt-3 block text-sm text-neutral-600 dark:text-neutral-400">{meta(article)}</span>
    </Link>
  );
}

/** A section with a single guide: the photo and the text side by side across the page. */
function GuideFeature({ article }: { article: Article }) {
  return (
    <Link
      href={articleHref(article)}
      className={`group grid items-center gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] ${FOCUS}`}
    >
      <span className="block aspect-[16/9] overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverFor(article)}
          alt=""
          width={960}
          height={540}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </span>
      <span className="block">
        <span className="block text-xl leading-snug font-bold text-balance text-neutral-900 group-hover:text-primary-600 group-hover:underline group-hover:underline-offset-4 sm:text-2xl dark:text-white dark:group-hover:text-primary-400">
          {article.title}
        </span>
        <span className="mt-3 block leading-relaxed text-pretty text-neutral-700 sm:text-[1.0625rem] dark:text-neutral-300">
          {article.description}
        </span>
        <span className="mt-3 block text-sm text-neutral-600 dark:text-neutral-400">{meta(article)}</span>
      </span>
    </Link>
  );
}
