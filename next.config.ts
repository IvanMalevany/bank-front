import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'bank-back-lake.vercel.app'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable page and API route caching for better performance
  experimental: {
    serverMinification: true,
  },
};

export default nextConfig;
