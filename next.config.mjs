/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — nginx serves the files directly, no node process in production.
  output: 'export',
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
