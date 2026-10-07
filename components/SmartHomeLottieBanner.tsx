'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// lottie-react v3: named `Lottie` export, takes `src` (path or parsed JSON).
// lottie-web touches `document` at import, so load it client-side only.
const Lottie = dynamic(() => import('lottie-react').then((m) => m.Lottie), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-3 border-primary-500 border-t-transparent" />
    </div>
  ),
});

interface SmartHomeLottieBannerProps {
  className?: string;
}

export default function SmartHomeLottieBanner({ className = '' }: SmartHomeLottieBannerProps) {
  /*
   * Mount the animation once the browser is idle: lottie-web plus its 123 KB
   * JSON cost seconds of mobile main-thread time at hydration (audit perf #7).
   * Under reduced motion it shows its first frame and does not play.
   */
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    // No panel background: the animation sits on the page (user request, 6 Oct 2026).
    <div className={`relative ${className}`}>

      {/* Interactive Floating Badge */}
      <div className="absolute top-4 start-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary-500/20 bg-white/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-primary-700 dark:border-primary-500/30 dark:bg-neutral-800/80 dark:text-primary-300 shadow-xs">
        <span className="size-2 rounded-full bg-primary-500 animate-pulse" />
        Live IoT Ecosystem
      </div>

      {/* Lottie Animation — fills its element, so the wrapper sets the size */}
      <div className="relative z-10 mx-auto aspect-square w-full max-w-[520px]">
        {ready ? (
          <Lottie src="/data/smart-home-banner.json" autoplay={!still} loop={!still} className="size-full" />
        ) : null}
      </div>
    </div>
  );
}
