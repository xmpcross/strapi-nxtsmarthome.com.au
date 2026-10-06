import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import AllTopicsClient, { TopicCategoryData } from '@/components/AllTopicsClient';
import FlyonAccordion from '@/components/flyonui/FlyonAccordion';
import { getCategories } from '@/data/categories';
import { toTPost } from '@/data/posts';
import { getAllArticles } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getListableTopProducts } from '@/lib/products';
import { getCategory, site } from '@/lib/site';
import Link from 'next/link';

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
  const allPosts = articles.map(toTPost);
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
      id: 'au-standards',
      question: 'How are these guides adapted for Australian electrical & network rules?',
      answer:
        'Australia uses 230V/50Hz mains power, requiring RCM (Regulatory Compliance Mark) certified hardware. Any 240V in-wall switch or power point requires installation by a licensed Australian electrician. Our guides strictly distinguish between DIY low-voltage devices and electrician-required hardware.',
    },
    {
      id: 'wifi-bands',
      question: 'Why do most smart home devices require a separate 2.4GHz Wi-Fi band?',
      answer:
        'Most IoT microcontrollers (e.g., Tuya, ESP32, Matter over Wi-Fi) operate exclusively on 2.4GHz because it offers far superior range and wall penetration than 5GHz. Australian mesh routers (Telstra Smart Modem, eero, Google Nest Wi-Fi) often band-steer, so our setup guides provide exact steps to split or temporarily separate bands.',
    },
    {
      id: 'ecosystem-choice',
      question: 'Should I choose Apple Home, Google Home, or Amazon Alexa in Australia?',
      answer:
        'All three platforms have strong Australian localization. Apple Home is best for privacy and fast local execution; Google Home excels at natural voice queries and Nest hardware; Amazon Alexa offers the widest accessory compatibility. Devices supporting Matter or Thread work across all three simultaneously.',
    },
  ];

  return (
    <div className="page-categories-index min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950">
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hairline Border Hero Banner, Zero Drop Shadow */}
        <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 p-8 sm:p-12 lg:p-16 dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-950">
          {/* Animated Background Mesh Orbs */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-96 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/15"></div>
          <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15"></div>

          <div className="relative z-10 max-w-3xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-50 px-4 py-1.5 text-xs font-bold text-primary-700 dark:border-primary-500/40 dark:bg-primary-950/80 dark:text-primary-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-primary-500"></span>
              </span>
              AUSTRALIAN SMART HOME DIRECTORY
            </div>

            {/* Giant Display Title */}
            <h1 className="mt-5 text-4xl font-black tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
              Master Your Home.{' '}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-primary-400 dark:via-indigo-300 dark:to-purple-400">
                Topic by Topic.
              </span>
            </h1>

            <p className="mt-4 text-lg font-normal leading-relaxed text-neutral-600 dark:text-neutral-300">
              Explore {articles.length} expert guides across {cats.length} core smart home domains — thoroughly tested for Australian 230V power rules, NBN network setups, and local retail availability.
            </p>

            {/* Stats Counter Bar - Hairline Border */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 dark:border-neutral-800 dark:bg-neutral-800/80">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{articles.length}</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Published Guides</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 dark:border-neutral-800 dark:bg-neutral-800/80">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{cats.length}</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Categories</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 dark:border-neutral-800 dark:bg-neutral-800/80">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">RCM / AU</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Electrical Standards</div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 dark:border-neutral-800 dark:bg-neutral-800/80">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">Matter</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Thread Ready</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Interactive Category & Article Directory Component */}
        <section className="mt-12">
          <AllTopicsClient categories={topicData} posts={allPosts} />
        </section>

        {/* Australian Standards & Buying Advice Section */}
        <section className="mt-20 rounded-3xl border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-800 dark:bg-primary-950/80 dark:text-primary-300">
                Australian Buying & Setup Advice
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                Frequently Asked Smart Home Questions
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                Essential knowledge for setting up smart devices safely and reliably in Australia.
              </p>
            </div>
            <Link
              href="/how-we-test/"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs font-bold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 shrink-0"
            >
              How We Test Devices →
            </Link>
          </div>

          <FlyonAccordion items={topicFaqs} />
        </section>
      </div>
    </div>
  );
}
