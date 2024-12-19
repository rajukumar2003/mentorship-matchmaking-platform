/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
