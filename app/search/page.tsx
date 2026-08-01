import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search every smart home guide, review and comparison on NXT Smart Home.',
  alternates: { canonical: '/search/' },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Search
      </h1>
      <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
