/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable server-side features
  // output: 'export',
  // Add a trailing slash to all paths
  trailingSlash: true,
  // Configure images
  images: {
    unoptimized: false, // Enable Next.js Image Optimization
  },
  // Handle static files
  webpack: (config) => {
    // Handle PDF files
    config.module.rules.push({
      test: /\.(pdf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]',
      },
    });
    
    return config;
  },
  // Disable Turbopack in development
  experimental: {
    // You can add experimental features here if needed
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Configure page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
