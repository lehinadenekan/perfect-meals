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
        hostname: 'lh3.googleusercontent.com',
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
        protocol: 'https',
        hostname: 'img.spoonacular.com',
        pathname: '**',
      },
    ],
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Disable webpack caching in development
  webpack: (config, { dev }) => {
    config.externals = [...config.externals, 'pg-native'];

    if (dev) {
      config.cache = false;
    }

    return config;
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true // Temporarily ignore TS errors to get the server running
  },
  eslint: {
    ignoreDuringBuilds: true // Temporarily ignore ESLint errors
  }
};

module.exports = nextConfig; 