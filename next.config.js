/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      // --- ADDED THIS BLOCK ---
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
        pathname: '/**', // Allow any path on this hostname
      },
      // --- END ADDED BLOCK ---
    ],
    // domains: ['localhost'], // Keep commented unless needed for older configs
    // unoptimized: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Disable webpack caching in development
  webpack: (config, { _dev }) => {
    config.externals = [...config.externals, 'pg-native'];

    // if (dev) {
    //   config.cache = false;
    // }

    return config;
  },
  reactStrictMode: true,
  typescript: {
    // ignoreBuildErrors: true // Temporarily ignore TS errors to get the server running
  },
  eslint: {
    // ignoreDuringBuilds: true // Temporarily ignore ESLint errors
  }
};

module.exports = nextConfig;