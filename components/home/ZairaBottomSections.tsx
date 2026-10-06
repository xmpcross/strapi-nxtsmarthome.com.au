'use client'

import React from 'react'
import Link from 'next/link'
import type { TPost } from '@/data/posts'
import type { TCategory } from '@/data/categories'

interface Props {
  posts: TPost[]
  categories?: TCategory[]
}

// Reusable Section Header matching Zaira theme styling
function ZairaHeader({ title, viewAllHref }: { title: string; viewAllHref?: string }) {
  return (
    <div className="relative mb-6 flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
      <div className="relative">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {title}
        </h2>
        {/* Coral accent bar under title */}
        <span className="absolute -bottom-3.5 left-0 h-0.5 w-12 bg-primary-600 dark:bg-primary-400" />
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 transition hover:border-primary-500 hover:text-primary-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
        >
          <span>View All</span>
          <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </Link>
      )}
    </div>
  )
}

// New Interactive Smart Gear Showcase Widget for Right Sidebar
function SmartGearShowcaseWidget() {
  const gearItems = [
    {
      id: 'aqara-a100-smart-door-lock',
      title: 'Aqara A100 Smart Door Lock',
      category: 'SMART LOCKS',
      price: '$297 AUD',
      rating: '4.8 ★',
      highlight: 'HomeKit & Fingerprint',
      href: '/products/aqara-a100-smart-door-lock/',
      image: '/images/products/aqara-a100-smart-door-lock.webp',
    },
    {
      id: 'echo-show-15-2nd-gen',
      title: 'Echo Show 15 2nd Gen',
      category: 'ENTERTAINMENT',
      price: '$549 AUD',
      rating: '5.0 ★',
      highlight: '15.6" 1080p Smart Display',
      href: '/products/amazon-echo-show-15-2nd-gen/',
      image: '/images/products/amazon-echo-show-15-2nd-gen-sq500.webp',
    },
    {
      id: 'echo-hub-8-smart-home-control-panel',
      title: 'Echo Hub 8" Smart Control Panel',
      category: 'HUBS & PLATFORMS',
      price: '$329 AUD',
      rating: '4.7 ★',
      highlight: 'Matter, Thread & Zigbee',
      href: '/products/amazon-echo-hub-8-smart-home-control-panel/',
      image: '/images/products/amazon-echo-hub-8-smart-home-control-panel-sq500.webp',
    },
    {
      id: 'arlo-ultra-2-4k-spotlight-camera',
      title: 'Arlo Ultra 2 4K Spotlight Camera',
      category: 'SECURITY CAMERAS',
      price: '$449 AUD',
      rating: '4.8 ★',
      highlight: '4K HDR & Color Night Vision',
      href: '/products/arlo-ultra-2-4k-spotlight-camera/',
      image: '/images/products/arlo-ultra-2-4k-spotlight-camera-sq500.webp',
    },
    {
      id: 'eufy-smart-lock-c220-with-wi-fi',
      title: 'Eufy Smart Lock C220 with Wi-Fi',
      category: 'SMART LOCKS',
      price: '$269 AUD',
      rating: '4.8 ★',
      highlight: 'Built-in Wi-Fi & Keypad',
      href: '/products/eufy-smart-lock-c220-with-wi-fi/',
      image: '/images/products/eufy-smart-lock-c220-with-wi-fi-sq500.webp',
    },
  ]

  const [selectedIdx, setSelectedIdx] = React.useState(0)

  const featured = gearItems[selectedIdx]
  const subList = gearItems.filter((_, idx) => idx !== selectedIdx).slice(0, 3)

  return (
    <section className="space-y-4">
      {/* Widget Header with Direct Shop All Link */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <div className="relative">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Featured Smart Gear
          </h2>
          <span className="absolute -bottom-3.5 left-0 h-0.5 w-12 bg-primary-600 dark:bg-primary-400" />
        </div>

        <Link
          href="/products/"
          className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-600 transition hover:border-primary-500 hover:text-primary-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
        >
          <span>Shop All</span>
          <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </Link>
      </div>

      {/* Hero Featured Spotlight Card */}
      <Link
        href={featured.href}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 transition-all duration-300 hover:border-primary-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-400 shadow-sm"
      >
        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-center p-4 border border-neutral-100 dark:border-neutral-800">
          {/* Top Category Badge */}
          <span className="absolute top-2.5 left-2.5 z-10 rounded-md bg-primary-600 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm">
            {featured.category}
          </span>

          {/* Top Price Tag */}
          <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-black text-white dark:bg-white dark:text-neutral-950 shadow-md">
            {featured.price}
          </span>

          {/* Clean Un-tinted Product Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image}
            alt={featured.title}
            className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-extrabold text-amber-500 flex items-center gap-1">
              ★ {featured.rating}
            </span>
            <span className="font-semibold text-neutral-500 dark:text-neutral-400 text-[10px] uppercase tracking-wider">
              {featured.highlight}
            </span>
          </div>

          <h3 className="text-base font-bold leading-snug text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
            {featured.title}
          </h3>

          <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:underline flex items-center gap-1">
              View Gear Details
              <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
              AU Retailers
            </span>
          </div>
        </div>
      </Link>

      {/* Mini Product Quick Selector List */}
      <div className="space-y-2.5 pt-1">
        {subList.map((item) => {
          const originalIdx = gearItems.findIndex((g) => g.id === item.id)
          return (
            <div
              key={item.id}
              className="group flex items-center justify-between gap-3 rounded-xl border border-neutral-200/70 bg-white p-2.5 transition-all duration-300 hover:border-primary-500 hover:bg-neutral-50/60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-400"
            >
              <button
                type="button"
                onClick={() => setSelectedIdx(originalIdx)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="h-full w-auto object-contain" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold leading-tight text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-1 transition-colors">
                    {item.title}
                  </h4>
                  <div className="text-[11px] font-extrabold text-neutral-900 dark:text-white">
                    {item.price}
                  </div>
                </div>
              </button>

              <Link
                href={item.href}
                className="shrink-0 flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-600 transition hover:border-primary-500 hover:bg-primary-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-primary-600 dark:hover:text-white"
                title={`View ${item.title}`}
              >
                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function ZairaBottomSections({ posts, categories = [] }: Props) {
  if (!posts.length) return null

  // Slices for different sections
  const recentPosts = posts.slice(0, 4)
  const recentFeatured = recentPosts[0]
  const recentList = recentPosts.slice(1, 4)

  const trendingPosts = posts.slice(4, 8).length >= 4 ? posts.slice(4, 8) : posts.slice(0, 4)
  const trendingFeatured = trendingPosts[0]
  const trendingGrid = trendingPosts.slice(1, 4)

  const latestPosts = posts.slice(0, 6)

  const popularPosts = posts.slice(12, 15).length >= 3 ? posts.slice(12, 15) : posts.slice(1, 4)

  const popularTechFeatured = posts[15] || posts[0]
  const popularTechList = posts.slice(16, 19).length >= 3 ? posts.slice(16, 19) : posts.slice(2, 5)

  // Default Hot Categories fallback
  const hotCategoriesList = categories.slice(0, 4).length > 0
    ? categories.slice(0, 4)
    : [
        { id: 'gadget', name: 'GADGET', handle: 'gadget', thumbnail: { src: posts[0]?.featuredImage?.src || '/og-default.png', alt: 'Gadget' } },
        { id: 'mobile', name: 'MOBILE', handle: 'mobile', thumbnail: { src: posts[1]?.featuredImage?.src || '/og-default.png', alt: 'Mobile' } },
        { id: 'news', name: 'NEWS', handle: 'news', thumbnail: { src: posts[2]?.featuredImage?.src || '/og-default.png', alt: 'News' } },
        { id: 'technology', name: 'TECHNOLOGY', handle: 'technology', thumbnail: { src: posts[3]?.featuredImage?.src || '/og-default.png', alt: 'Technology' } },
      ]

  return (
    <div className="w-full space-y-[50px]">
      {/* 1. TOP 2-COLUMN MAIN SECTION (Recent Posts & Trending News | Right Sidebar) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        
        {/* LEFT MAIN COLUMN (8 cols) */}
        <div className="space-y-[50px] lg:col-span-8">
          
          {/* SECTION 1: RECENT POSTS */}
          <section>
            <ZairaHeader title="Recent Posts" viewAllHref="/articles/" />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column: 1 Large Featured Post */}
              {recentFeatured && (
                <Link
                  href={`/${recentFeatured.handle}/`}
                  className="group relative flex h-[420px] w-full flex-col justify-end overflow-hidden rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800"
                >
                  {/* Background Image */}
                  {recentFeatured.featuredImage?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={recentFeatured.featuredImage.src}
                      alt={recentFeatured.featuredImage.alt || recentFeatured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-800" />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Card Content */}
                  <div className="relative z-10 space-y-2">
                    <span className="inline-block rounded bg-primary-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      {recentFeatured.categories?.[0]?.name || 'GADGET'}
                    </span>
                    
                    <h3 className="text-xl font-bold leading-snug text-white transition group-hover:text-primary-300 line-clamp-2">
                      {recentFeatured.title}
                    </h3>

                    {/* Meta Line */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      <span className="flex items-center gap-1">
                        <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        BY {recentFeatured.author?.name || 'ZAIRA'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        {recentFeatured.date || 'OCTOBER 11, 2025'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {recentFeatured.readingTime || 3} MINS
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Right Column: 3 Stacked Horizontal Posts */}
              <div className="flex flex-col justify-between space-y-4">
                {recentList.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${post.handle}/`}
                    className="group flex items-center justify-between gap-4 rounded-xl border-b border-neutral-100 pb-4 dark:border-neutral-800/80 last:border-none last:pb-0"
                  >
                    {/* Left Details */}
                    <div className="flex flex-1 flex-col justify-center min-w-0">
                      <span className="mb-1.5 inline-block w-fit rounded bg-primary-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        {post.categories?.[0]?.name || 'TECHNOLOGY'}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold leading-snug text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
                        {post.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <span>{post.date || 'OCTOBER 11, 2025'}</span>
                      </div>
                    </div>

                    {/* Right Square Thumbnail */}
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                      {post.featuredImage?.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featuredImage.src}
                          alt={post.featuredImage.alt || post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* IN-BETWEEN BANNER AD */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 p-6 text-white shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                  Special Offer
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">Modern Technology Fest Here</h3>
              </div>
              <a
                href="#"
                className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-900 transition hover:bg-neutral-100 shadow-sm"
              >
                See Details
              </a>
            </div>
          </div>

          {/* SECTION 2: TRENDING NEWS */}
          <section>
            <ZairaHeader title="Trending News" viewAllHref="/articles/" />

            <div className="space-y-6">
              {/* Top Featured Horizontal Card */}
              {trendingFeatured && (
                <div className="grid grid-cols-1 gap-6 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40 md:grid-cols-2">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    {trendingFeatured.featuredImage?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={trendingFeatured.featuredImage.src}
                        alt={trendingFeatured.featuredImage.alt || trendingFeatured.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-800" />
                    )}
                  </div>

                  <div className="flex flex-col justify-center space-y-3">
                    <span className="inline-block w-fit rounded bg-primary-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      {trendingFeatured.categories?.[0]?.name || 'MOBILE'}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold leading-snug text-neutral-900 dark:text-white line-clamp-2">
                      {trendingFeatured.title}
                    </h3>

                    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      <span>BY {trendingFeatured.author?.name || 'ZAIRA'}</span>
                      <span>•</span>
                      <span>{trendingFeatured.date || 'OCTOBER 11, 2025'}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                      {trendingFeatured.excerpt ||
                        'Discover the latest tech accessories, smart home automation guides, and performance updates designed for modern Australian living.'}
                    </p>

                    <Link
                      href={`/${trendingFeatured.handle}/`}
                      className="mt-2 flex w-fit items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-800 transition hover:border-primary-500 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-primary-400"
                    >
                      <span>Read More</span>
                      <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom 3 Vertical Column Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {trendingGrid.map((post) => (
                  <Link key={post.id} href={`/${post.handle}/`} className="group space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800">
                      {post.featuredImage?.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featuredImage.src}
                          alt={post.featuredImage.alt || post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <span className="inline-block rounded bg-primary-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        {post.categories?.[0]?.name || 'MOBILE'}
                      </span>
                      <h4 className="text-sm font-bold leading-snug text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        <span>BY {post.author?.name || 'ZAIRA'}</span>
                        <span>•</span>
                        <span>{post.date || 'OCTOBER 11, 2025'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT SIDEBAR COLUMN (4 cols) */}
        <div className="space-y-10 lg:col-span-4">
          
          {/* SIDEBAR BLOCK 1: SUBSCRIBE & FOLLOWERS */}
          <section>
            <ZairaHeader title="Subscribe & Followers" />
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Twitter', icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
                { name: 'Instagram', icon: 'M16 4H8C5.79 4 4 5.79 4 8v8c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-4 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4.5-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' },
                { name: 'Youtube', icon: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' },
                { name: 'Linkedin', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z' },
                { name: 'Pinterest', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.17-.11-.95-.2-2.41.04-3.45.22-.94 1.42-6.02 1.42-6.02s-.36-.72-.36-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.52.77 1.52 1.69 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.26 3.78-5.5 0-2.88-2.07-4.89-5.02-4.89-3.42 0-5.43 2.57-5.43 5.22 0 1.03.4 2.14.9 2.74.1.12.11.23.08.36-.09.38-.3.1.22-1.22-.52-.08-.12-.22-.16-.36-.16-1.48 0-2.4-1.07-2.4-2.58 0-2.1 1.53-4.04 4.41-4.04 2.32 0 4.12 1.65 4.12 3.86 0 2.3-1.45 4.15-3.46 4.15-.68 0-1.32-.35-1.54-.77l-.42 1.6c-.15.58-.56 1.31-.83 1.76A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-neutral-100/80 px-3 py-2.5 text-xs font-bold text-neutral-700 transition hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 dark:border-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:border-primary-400 dark:hover:bg-neutral-700"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* SIDEBAR BLOCK 2: DAILY NEWSLETTER */}
          <div className="relative overflow-hidden rounded-2xl bg-[#112240] p-6 text-center text-white shadow-xl border border-neutral-800">
            <h3 className="text-xl font-bold tracking-tight text-white mb-1.5">
              Daily Newsletter
            </h3>
            <p className="text-xs text-neutral-300 mb-5 max-w-xs mx-auto leading-relaxed">
              Get All The Top Stories From Blogs To Keep Track.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-xs text-white placeholder-neutral-400 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary-500 shadow-md"
              >
                <span>Subscribe Now</span>
                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </button>
            </form>
          </div>

          {/* SIDEBAR BLOCK 3: HOT CATEGORIES */}
          <section>
            <ZairaHeader title="Hot Categories" />
            <div className="space-y-3">
              {hotCategoriesList.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.handle || cat.id}/`}
                  className="group relative flex h-16 sm:h-20 w-full items-center justify-between overflow-hidden rounded-2xl p-4 shadow-sm border border-neutral-200/60 dark:border-neutral-800"
                >
                  {/* Background Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.thumbnail?.src || '/og-default.png'}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover brightness-50 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-40"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Category Name */}
                  <span className="relative z-10 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white">
                    {cat.name}
                  </span>

                  {/* Action Arrow Icon */}
                  <div className="relative z-10 flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition duration-300 group-hover:bg-primary-600 group-hover:scale-110">
                    <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SIDEBAR BLOCK 4: POPULAR POSTS */}
          <section>
            <ZairaHeader title="Popular Posts" />
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.handle}/`}
                  className="group flex items-center gap-3.5 border-b border-neutral-100 pb-3.5 dark:border-neutral-800/80 last:border-none last:pb-0"
                >
                  {/* Square Thumbnail */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                    {post.featuredImage?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featuredImage.src}
                        alt={post.featuredImage.alt || post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex flex-1 flex-col justify-center min-w-0 space-y-1">
                    <span className="inline-block w-fit rounded border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      {post.categories?.[0]?.name || 'MOBILE'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold leading-snug text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      <span>{post.date || 'OCTOBER 11, 2025'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>



        </div>

      </div>

      {/* 2. BOTTOM FULL-WIDTH PROMO BANNER */}
      <section className="relative overflow-hidden rounded-3xl border border-lime-300/80 bg-gradient-to-r from-lime-200 via-emerald-100 to-lime-300 p-6 sm:p-8 dark:border-lime-800/80 dark:from-lime-950/60 dark:via-emerald-950/40 dark:to-lime-900/60 shadow-md">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Left Cutout Mockup / Product Image */}
          <div className="relative h-36 sm:h-44 w-auto shrink-0">
            {posts[0]?.featuredImage?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posts[0].featuredImage.src}
                alt="Featured Tech Showcase"
                className="h-full w-auto object-contain rounded-2xl shadow-lg border border-white/40 dark:border-neutral-800"
              />
            ) : (
              <div className="h-full w-36 rounded-2xl bg-neutral-900" />
            )}
          </div>

          {/* Center Title & Subtitle */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
              iPhone 14 Pro Max 2023
            </h3>
            <p className="max-w-md text-xs sm:text-sm font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">
              Browned Butter And Brown Sugar Caramelly Goodness Crispy EdgesThick And Soft Centers. Explore Australian smart home tech deals & setup guides.
            </p>
          </div>

          {/* Right Action Button */}
          <Link
            href="/products/"
            className="shrink-0 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-neutral-900 shadow-lg transition hover:bg-primary-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-primary-600"
          >
            <span>Shop Online</span>
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </Link>
        </div>
      </section>

      {/* 3. NEW BOTTOM 2-COLUMN SECTION UNDER THE BANNER */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Column (8 cols): Latest Posts */}
        <div className="lg:col-span-8">
          <section>
            <ZairaHeader title="Latest Posts" viewAllHref="/articles/" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.handle}/`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 transition-all duration-300 hover:border-primary-500 hover:bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-400"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                      {post.featuredImage?.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featuredImage.src}
                          alt={post.featuredImage.alt || post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-block rounded bg-primary-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        {post.categories?.[0]?.name || 'TECHNOLOGY'}
                      </span>
                      <h3 className="text-base font-bold leading-snug text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {post.excerpt || 'Discover the latest smart home technology news and insights.'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-[11px] font-semibold text-neutral-400 dark:border-neutral-800">
                    <span>{post.date || 'SEPTEMBER 11, 2025'}</span>
                    <span>{post.readingTime || 2} MIN READ</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Smart Gear Showcase & Popular Tech */}
        <div className="lg:col-span-4 flex flex-col justify-start space-y-10">
          <SmartGearShowcaseWidget />

          {/* Popular Tech Widget (Moved below the banner image) */}
          <section>
            <ZairaHeader title="Popular Tech" />
            <div className="space-y-4">
              {/* Top Featured Overlay Post Card */}
              {popularTechFeatured && (
                <Link
                  href={`/${popularTechFeatured.handle}/`}
                  className="group relative flex h-60 w-full flex-col justify-end overflow-hidden rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800"
                >
                  {popularTechFeatured.featuredImage?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={popularTechFeatured.featuredImage.src}
                      alt={popularTechFeatured.featuredImage.alt || popularTechFeatured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="relative z-10 space-y-1.5">
                    <span className="inline-block rounded bg-primary-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      {popularTechFeatured.categories?.[0]?.name || 'MOBILE'}
                    </span>
                    <h4 className="text-base font-bold leading-snug text-white group-hover:text-primary-300 line-clamp-2 transition-colors">
                      {popularTechFeatured.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
                      <span>BY {popularTechFeatured.author?.name || 'ZAIRA'}</span>
                      <span>•</span>
                      <span>{popularTechFeatured.date || 'OCTOBER 11, 2025'}</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* 3 Mini Posts List */}
              {popularTechList.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.handle}/`}
                  className="group flex items-center gap-3.5 border-b border-neutral-100 pb-3.5 dark:border-neutral-800/80 last:border-none last:pb-0"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                    {post.featuredImage?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featuredImage.src}
                        alt={post.featuredImage.alt || post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-center min-w-0 space-y-1">
                    <span className="inline-block w-fit rounded border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      {post.categories?.[0]?.name || 'GADGET'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold leading-snug text-neutral-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      <span>{post.date || 'OCTOBER 11, 2025'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
