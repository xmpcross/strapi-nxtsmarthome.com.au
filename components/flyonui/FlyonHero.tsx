'use client';

import React from 'react';
import Link from 'next/link';

interface FlyonHeroProps {
  badge?: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function FlyonHero({
  badge,
  title,
  highlightedTitle,
  description,
  primaryCta,
  secondaryCta,
}: FlyonHeroProps) {
  return (
    <section className="hero py-12 lg:py-20 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-2xl my-6">
      <div className="hero-content text-center max-w-3xl mx-auto px-4">
        <div className="max-w-md md:max-w-2xl">
          {badge && (
            <div className="badge badge-outline badge-primary gap-2 py-3 px-4 mb-4 text-xs font-semibold uppercase tracking-wider shadow-xs">
              <span className="inline-block size-2 rounded-full bg-primary animate-ping"></span>
              {badge}
            </div>
          )}

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-base-content">
            {title}{' '}
            {highlightedTitle && (
              <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                {highlightedTitle}
              </span>
            )}
          </h1>

          <p className="py-6 text-lg text-base-content/80">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="btn btn-primary gap-2 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {primaryCta.label}
                <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn btn-outline border-base-300 font-semibold"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
