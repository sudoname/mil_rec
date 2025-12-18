import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Standalone output for deployment
  output: 'standalone',
};

export default nextConfig;
