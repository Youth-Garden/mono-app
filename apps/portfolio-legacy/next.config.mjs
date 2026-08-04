const withPWA = (await import('@ducanh2912/next-pwa')).default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', 'gsap', '@gsap/react'],
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
