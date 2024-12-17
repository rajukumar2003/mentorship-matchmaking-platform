import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './app',
      '@components': './app/components',
      '@lib': './app/lib',
      '@api': './app/api'
    };
    return config;
  }
};

export default nextConfig;
