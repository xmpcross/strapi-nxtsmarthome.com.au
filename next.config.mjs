/** @type {import('next').NextConfig} */
// The preview build is served from /preview/, so its assets need that prefix.
const basePath = process.env.PREVIEW_BASE_PATH || '';

const nextConfig = {
  // Static export — nginx serves the files directly, no node process in production.
  output: 'export',
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  images: {
    // next/image optimisation requires a server; static export needs raw <img>.
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
