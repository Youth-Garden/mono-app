/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
