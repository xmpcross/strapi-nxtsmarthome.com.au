import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { HomeTopicSection, TopicTile } from '@/components/home/HomeSections';
import { getCategoriesWithPosts } from '@/data/categories';
import { getAllArticles } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

const DESCRIPTION =
  'Browse smart home guides and reviews by topic — security, lighting, energy, climate, hubs and platforms, robot vacuums, setup guides and buying guides.';

export const metadata: Metadata = {
  title: 'Topics & Categories',
  description: DESCRIPTION,
  alternates: { canonical: '/all-topics/' },
};

// Topic counts and the per-topic rows refresh with the articles (ISR).
export const revalidate = 300;

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const cats = (await getCategoriesWithPosts()).filter((c) => c.count > 0);

  // A "latest from" row for each topic with enough published work to fill one,
  // so this index links to real articles, not only to more listing pages.
  const SPOTLIGHT_MIN = 3;
  const spotlights = cats.filter((c) => (c.posts?.length ?? 0) >= SPOTLIGHT_MIN);

  return (
    <div className="page-categories-index container pt-14 pb-24 lg:pt-20 lg:pb-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Topics & Categories', path: '/all-topics/' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Topics & Categories',
          url: `${site.url}/all-topics/`,
          description: DESCRIPTION,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: cats.length,
            itemListElement: cats.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.name,
              url: `${site.url}/categories/${c.handle}/`,
            })),
          },
        }}
      />

      <PageHeader
        eyebrow="Topics"
        title="Explore smart home topics"
        // h1 at 2.5rem, section h2s at 2rem (app/globals.css), user request 24 Sep 2026.
        titleClassName="text-[2.5rem] leading-tight"
        intro={`Everything we publish, organised by what you're trying to do: ${articles.length} guides across ${cats.length} topics, written for Australian homes, retailers and electrical rules.`}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <li key={c.id}>
            <TopicTile topic={c} />
          </li>
        ))}
      </ul>

      <div className="mt-24 space-y-24 lg:mt-28 lg:space-y-28">
        {spotlights.map((c, i) => (
          <HomeTopicSection key={c.id} category={c} posts={c.posts ?? []} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
