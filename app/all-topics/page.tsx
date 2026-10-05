import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import AllTopicsClient, { TopicCategoryData } from '@/components/AllTopicsClient';
import FlyonAccordion from '@/components/flyonui/FlyonAccordion';
import FlyonHero from '@/components/flyonui/FlyonHero';
import { getCategories } from '@/data/categories';
import { getAllArticles } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getListableTopProducts } from '@/lib/products';
import { getCategory, site } from '@/lib/site';

const DESCRIPTION =
  'Browse smart home guides and reviews by topic — security, lighting, energy, climate, hubs and platforms, robot vacuums, setup guides and buying guides.';

export const metadata: Metadata = {
  title: 'Topics & Categories — NXT Smart Home AU',
  description: DESCRIPTION,
  alternates: { canonical: '/all-topics/' },
};

// Topic counts and the per-topic rows refresh with the articles (ISR).
export const revalidate = 300;

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const rawCats = await getCategories();
  const cats = rawCats.filter((c) => c.count > 0);
  const withProducts = new Set(getListableTopProducts().map((p) => p.categorySlug));

  const topicData: TopicCategoryData[] = cats.map((c) => {
    const meta = getCategory(c.handle);
    return {
      id: c.id,
      name: c.name,
      handle: c.handle,
      count: c.count,
      description: c.description,
      emoji: meta?.emoji,
      intro: meta?.intro,
      subcategories: meta?.subcategories,
      hasProducts: withProducts.has(c.handle),
    };
  });

  const topicFaqs = [
    {
      id: 'faq-1',
      question: 'How are these smart home guides tailored for Australia?',
      answer:
        'All NXT Smart Home guides specifically cover Australian electrical standards (230V/50Hz), NBN Wi-Fi configurations (2.4GHz vs 5GHz band separation), local retailer availability (JB Hi-Fi, Bunnings, Harvey Norman), and Australian compliance marks (RCM / Telecommunications standards).',
    },
    {
      id: 'faq-2',
      question: 'Which smart home ecosystems work best together in Australian homes?',
      answer:
        'Apple Home, Google Home, and Amazon Alexa are the primary platforms in AU. Matter and Thread devices seamlessly bridge across all three. Check our Hubs & Platforms guides for step-by-step setup.',
    },
    {
      id: 'faq-3',
      question: 'Do I need a certified electrician to install smart switches in Australia?',
      answer:
        'Yes. In Australia, any 240V mains wiring — including hardwired smart light switches and smart power points — legally requires a licensed electrician. Plug-in smart plugs and battery/DIY smart devices do not.',
    },
  ];

  return (
    <div className="page-categories-index container pt-8 pb-24 lg:pt-12 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6">
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

      {/* FlyonUI Hero Banner */}
      <FlyonHero
        badge="Australian Smart Home Directory"
        title="Explore Smart Home"
        highlightedTitle="Topics & Guides"
        description={`Everything we publish, organized by what you want to achieve: ${articles.length} in-depth guides across ${cats.length} core topics, crafted for Australian homes, retail ecosystems, and electrical standards.`}
        primaryCta={{ label: 'Explore All Guides', href: '#directory' }}
        secondaryCta={{ label: 'Compare Products', href: '/products/' }}
      />

      {/* Quick Metrics Bar */}
      <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="card card-border bg-base-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-xs">
          <span className="text-2xl lg:text-3xl font-extrabold text-primary">{articles.length}</span>
          <span className="text-xs text-base-content/70 font-medium mt-1 block">Published Guides</span>
        </div>
        <div className="card card-border bg-base-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-xs">
          <span className="text-2xl lg:text-3xl font-extrabold text-primary">{cats.length}</span>
          <span className="text-xs text-base-content/70 font-medium mt-1 block">Topic Categories</span>
        </div>
        <div className="card card-border bg-base-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-xs">
          <span className="text-2xl lg:text-3xl font-extrabold text-primary">100%</span>
          <span className="text-xs text-base-content/70 font-medium mt-1 block">AU Compliance</span>
        </div>
        <div className="card card-border bg-base-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-xs">
          <span className="text-2xl lg:text-3xl font-extrabold text-primary">2.4GHz / 5GHz</span>
          <span className="text-xs text-base-content/70 font-medium mt-1 block">Wi-Fi Tested</span>
        </div>
      </div>

      {/* Interactive Category Filter & Directory */}
      <div id="directory" className="pt-4">
        <AllTopicsClient categories={topicData} />
      </div>

      {/* FlyonUI Accordion FAQ Section */}
      <div className="mt-20 card card-border bg-base-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl">
        <div className="max-w-2xl mb-6">
          <span className="badge badge-soft badge-primary text-xs font-semibold uppercase tracking-wider mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-base-content">
            Understanding Australian Smart Home Setup
          </h2>
        </div>
        <FlyonAccordion items={topicFaqs} />
      </div>
    </div>
  );
}
