'use client';

import React, { useEffect, useState } from 'react';

interface SmartHomeLottieBannerProps {
  className?: string;
}

export default function SmartHomeLottieBanner({ className = '' }: SmartHomeLottieBannerProps) {
  const [LottieComp, setLottieComp] = useState<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    import('lottie-react').then((mod) => {
      setLottieComp(() => (mod as any).default || mod);
    });
    fetch('/data/smart-home-banner.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Lottie animation:', err));
  }, []);

  if (!animationData || !LottieComp) {
    return (
      <div className={`relative flex items-center justify-center rounded-3xl border border-neutral-200/80 bg-white/40 p-6 dark:border-neutral-800 dark:bg-neutral-900/40 min-h-[260px] ${className}`}>
        <div className="size-8 animate-spin rounded-full border-3 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const Component = LottieComp;

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-primary-50/40 via-white to-purple-50/30 p-4 sm:p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-900/80 dark:via-neutral-900 dark:to-neutral-950 ${className}`}>
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-16 -right-16 size-60 rounded-full bg-primary-500/15 blur-3xl dark:bg-primary-500/25 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 size-60 rounded-full bg-purple-500/15 blur-3xl dark:bg-purple-500/25 pointer-events-none" />

      {/* Interactive Floating Badge */}
      <div className="absolute top-4 start-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary-500/20 bg-white/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-primary-700 dark:border-primary-500/30 dark:bg-neutral-800/80 dark:text-primary-300 shadow-xs">
        <span className="size-2 rounded-full bg-primary-500 animate-pulse" />
        Live IoT Ecosystem
      </div>

      {/* Lottie Animation */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-[340px] mx-auto py-2">
        <Component
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}
