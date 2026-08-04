import type { Metadata } from 'next';
import './globals.css';
// After globals.css: plain CSS, unlayered, so it settles the cascade for the
// hero's secondary tiles without needing !important.
import './magzin-post-cards.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { organisationJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // 89 chars previously — truncated in every result. Short form fits.
    default: `${site.name} — ${site.shortTagline}`,
    // No brand suffix: article titles already run 45-65 chars, so appending
    // " | NXT Smart Home" pushed them past the ~60-char display limit and cut
    // the meaningful part. The WebSite JSON-LD carries the site name instead.
    template: '%s',
  },
  description: site.metaDescription,
  applicationName: site.name,
  alternates: { canonical: '/' },
  // Files live in public/. The SVG is served to browsers that support it and stays
  // crisp at any density; the PNGs cover Android/iOS home screens and the .ico is
  // there for older browsers that still request /favicon.ico directly.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.shortTagline}`,
    description: site.metaDescription,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.shortTagline}`,
    description: site.metaDescription,
    // Without an image a summary_large_image card renders blank.
    images: [site.ogImage],
  },
  // Search engine ownership verification. Rendered into <head> on every page.
  // Add `google: '<code>'` here when Search Console gives you one.
  verification: {
    other: { 'msvalidate.01': '057158952120360611CA2F41AD7D5B50' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} suppressHydrationWarning>
      <head>
        {/*
          Applies the saved theme (or the OS preference) before first paint. Without
          this a dark-theme reader gets a white flash on every navigation, because
          the class can only be set after React hydrates.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organisationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        {/*
          The Sovrn Commerce script is NOT rendered here on purpose.

          Anything React renders in a static export is written to the page twice:
          once as real HTML, and once inside the RSC hydration payload
          (self.__next_f.push([...])). The script only executes once, but Sovrn's
          verifier text-scans the page and reports "multiple instances found".

          It is injected into the built HTML after the export instead, by
          scripts/inject-sovrn.mjs (npm postbuild), so it appears exactly once.
        */}
      </body>
    </html>
  );
}
