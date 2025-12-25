/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', 'gsap', '@gsap/react'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
