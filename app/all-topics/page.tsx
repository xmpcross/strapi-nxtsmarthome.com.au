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
  'Browse Australian smart home guides, reviews and setup advice by topic — security cameras, smart lighting, climate control, home hubs, Matter & Thread protocols, setup and buying guides.';

export const metadata: Metadata = {
  title: 'Smart Home Topics & Categories — NXT Smart Home AU',
  description: DESCRIPTION,
  alternates: { canonical: '/all-topics/' },
};

// Topic counts and the per-topic rows refresh with the articles (ISR).
export const revalidate = 300;

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const allPosts = articles.map(toTPost);
  const rawCats = await getCategories();
  const cats = rawCats.filter((c) => c.count > 0 && c.handle !== 'robot-vacuums' && c.handle !== 'robot-vacuum');
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
      icon3d: meta?.icon3d,
      iconSvg: meta?.iconSvg,
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
    {
      id: 'matter-thread',
      question: 'What is Matter and Thread, and why does it matter for Australian homes?',
      answer:
        'Matter is the universal smart home standard that lets devices from Apple, Google, Amazon, and Samsung talk to each other locally without cloud latency. Thread is a low-power mesh network protocol that replaces Wi-Fi for sensors and smart locks, making response times instant and immune to internet outages.',
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
        {/* Top Hero Section — No Background Color, Clean & Un-boxed */}
        <section className="relative py-4 lg:py-6 bg-transparent">
          <div className="max-w-3xl space-y-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-50 px-3.5 py-1 text-xs font-bold text-primary-700 dark:border-primary-500/40 dark:bg-primary-950/60 dark:text-primary-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-primary-500"></span>
              </span>
              AUSTRALIAN SMART HOME DIRECTORY
            </div>

            {/* Giant Display Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Master Your Home.{' '}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-primary-400 dark:via-indigo-300 dark:to-purple-400">
                Topic by Topic.
              </span>
            </h1>

            <p className="text-base sm:text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-2xl">
              Explore {articles.length} expert guides across {cats.length} core smart home domains — thoroughly tested for Australian 230V power rules, NBN network setups, and local retail availability.
            </p>

            {/* Stats Counter Bar — Transparent Hairline Cards */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-neutral-200/80 bg-transparent p-3.5 dark:border-neutral-800">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{articles.length}</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Published Guides</div>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-transparent p-3.5 dark:border-neutral-800">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">{cats.length}</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Categories</div>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-transparent p-3.5 dark:border-neutral-800">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">RCM / AU</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Electrical Standards</div>
              </div>
              <div className="rounded-2xl border border-neutral-200/80 bg-transparent p-3.5 dark:border-neutral-800">
                <div className="text-2xl font-black text-primary-600 dark:text-primary-400">Matter</div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">Thread Ready</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Interactive Category & Article Directory Component */}
        <section className="mt-8">
          <AllTopicsClient categories={topicData} posts={allPosts} />
        </section>

        {/* Redesigned Australian Standards & Buying Advice FAQ Section (2-Column Accordions) */}
        <section className="mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                  Frequently Asked Smart Home Questions
                </h2>
                <span className="absolute -bottom-3 left-0 h-0.5 w-16 bg-primary-600 dark:bg-primary-400" />
              </div>
              <p className="pt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
                Essential knowledge for setting up smart devices safely and reliably under Australian electrical & network rules.
              </p>
            </div>

            <Link
              href="/how-we-test/"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:border-primary-500 hover:text-primary-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors shadow-xs"
            >
              <span>How We Test Devices</span>
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </Link>
          </div>

          {/* 2-Column Accordion Layout */}
          <div className="pt-2">
            <FlyonAccordion items={topicFaqs} columns={2} />
          </div>
        </section>
      </div>
    </div>
  );
}
