import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox';
import SectionSliderPosts from '@/components/SectionSliderPosts';
import BackgroundSection from '@/components/BackgroundSection';
import { getCategories } from '@/data/categories';
import { toTPost } from '@/data/posts';
import { getAllArticles } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { categories as siteCategories, site } from '@/lib/site';

const DESCRIPTION =
  'Browse smart home guides and reviews by topic — security, lighting, energy, climate, hubs and platforms, robot vacuums, setup guides and buying guides.';

export const metadata: Metadata = {
  title: 'Topics & Categories',
  description: DESCRIPTION,
  alternates: { canonical: '/categories/' },
};

// Topic counts and the per-topic rows refresh with the articles (ISR).
export const revalidate = 300;

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const cats = (await getCategories()).filter((c) => c.count > 0);

  // A "latest from" row for each topic with enough published work to fill one,
  // so this index links to real articles, not only to more listing pages.
  const SPOTLIGHT_MIN = 3;
  const spotlights = siteCategories
    .map((c) => ({
      category: c,
      posts: articles.filter((a) => a.category === c.key).map(toTPost),
    }))
    .filter((s) => s.posts.length >= SPOTLIGHT_MIN);

  return (
    <div className="container pt-14 pb-24 lg:pt-20 lg:pb-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Topics & Categories', path: '/categories/' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Topics & Categories',
          url: `${site.url}/categories/`,
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
        intro={`Everything we publish, organised by what you're trying to do: ${articles.length} guides across ${cats.length} topics, written for Australian homes, retailers and electrical rules.`}
      />

      <SectionGridCategoryBox categories={cats} categoryCardType="card2" />

      <div className="mt-24 space-y-24 lg:mt-28 lg:space-y-28">
        {spotlights.map(({ category, posts }, i) => (
          <div key={category.slug} className={i % 2 === 0 ? 'relative py-16' : 'relative'}>
            {i % 2 === 0 && <BackgroundSection />}
            <SectionSliderPosts
              postCardName="card7"
              heading={category.name}
              subHeading={category.blurb}
              posts={posts.slice(0, 8)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
