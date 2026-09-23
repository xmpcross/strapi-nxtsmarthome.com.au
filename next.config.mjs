/** @type {import('next').NextConfig} */
// The preview build is served from /preview/, so its assets need that prefix.
const basePath = process.env.PREVIEW_BASE_PATH || '';

// Production runs as a Node server (`next start`, nxtsmarthome-com-au.service on
// 127.0.0.1:3013) so Strapi content refreshes by ISR without a rebuild. The
// /preview/ build is still a static export, published by scripts/deploy-preview.sh.
const staticExport = Boolean(basePath) || process.env.STATIC_EXPORT === '1';

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
};

export default nextConfig;
