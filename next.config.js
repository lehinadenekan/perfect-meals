/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
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
};

module.exports = nextConfig; 