import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { organisationJsonLd } from '@/lib/seo';
import { sovrnEnabled, sovrnKey } from '@/lib/affiliate';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language}>
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
          Sovrn Commerce auto-affiliate script. Only injected once NEXT_PUBLIC_SOVRN_KEY
          is set, so development and pre-approval builds stay clean.
        */}
        {sovrnEnabled && (
          <script
            dangerouslySetInnerHTML={{
              __html: `var vglnk={key:${JSON.stringify(sovrnKey)}};(function(d,t){var s=d.createElement(t);s.type='text/javascript';s.async=true;s.src='https://cdn.viglink.com/api/vglnk.js';var r=d.getElementsByTagName(t)[0];r.parentNode.insertBefore(s,r);}(document,'script'));`,
            }}
          />
        )}
      </body>
    </html>
  );
}
