import fs from 'node:fs';

/** @type {import('next').NextConfig} */
// The preview build is served from /preview/, so its assets need that prefix.
const basePath = process.env.PREVIEW_BASE_PATH || '';

// Production runs as a Node server (`next start`, nxtsmarthome-com-au.service on
// 127.0.0.1:3013) so Strapi content refreshes by ISR without a rebuild. The
// /preview/ build is still a static export, published by scripts/deploy-preview.sh.
const staticExport = Boolean(basePath) || process.env.STATIC_EXPORT === '1';

/*
 * Permanent redirects for removed or merged URLs, from data/redirects-adsense.json
 * ([{ from, to, reason }]). nginx serves the same rules first (scripts/gen-redirects.mjs
 * writes them into public/_redirects.map); these cover requests that reach Next
 * directly. Both slash forms are listed, so neither takes an extra trailing-slash hop.
 * A static export cannot redirect, so the preview build skips them.
 */
function adsenseRedirects() {
  const file = new URL('./data/redirects-adsense.json', import.meta.url);
  if (!fs.existsSync(file)) return [];
  const rules = JSON.parse(fs.readFileSync(file, 'utf8'));
  return rules.flatMap(({ from, to }) => {
    const bare = from.replace(/\/+$/, '');
    return [
      { source: bare, destination: to, permanent: true },
      { source: `${bare}/`, destination: to, permanent: true },
    ];
  });
}

const nextConfig = {
  ...(staticExport ? { output: 'export' } : {}),
  // deploy.sh builds into a side directory while the live server keeps running,
  // then swaps it in. Unset, this is the normal .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  images: {
    // Covers are pre-sized at build time; the preview export needs raw <img> too.
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(staticExport ? {} : { redirects: async () => adsenseRedirects() }),
};

export default nextConfig;
