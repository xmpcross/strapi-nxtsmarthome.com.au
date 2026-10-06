'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import ProductCard from '@/components/ProductCard'
import type { TopProduct } from '@/lib/products'

export default function ProductCarousel({ products }: { products: TopProduct[] }) {
  const displayProducts = products.slice(0, 8)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const totalItems = displayProducts.length

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    const card = container.children[index] as HTMLElement
    if (card) {
      container.scrollTo({
        left: card.offsetLeft,
        behavior: 'smooth',
      })
    }
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalItems
    scrollToIndex(nextIndex)
  }, [currentIndex, totalItems, scrollToIndex])

  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems
    scrollToIndex(prevIndex)
  }, [currentIndex, totalItems, scrollToIndex])

  // Auto-slide effect every 3.5 seconds
  useEffect(() => {
    if (isPaused || totalItems <= 1) return
    const interval = setInterval(() => {
      nextSlide()
    }, 3500)
    return () => clearInterval(interval)
  }, [isPaused, totalItems, nextSlide])

  if (!displayProducts.length) return null

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1 Row Auto-Sliding Track */}
      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none gap-5 pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProducts.map((product) => (
          <div
            key={product.slug}
            className="w-[280px] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Controls & Pagination */}
      <div className="mt-6 flex items-center justify-between">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {displayProducts.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-primary-600 dark:bg-primary-400'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
              }`}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="btn btn-circle btn-xs sm:btn-sm btn-outline border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            aria-label="Previous product"
          >
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="btn btn-circle btn-xs sm:btn-sm btn-outline border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            aria-label="Next product"
          >
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
