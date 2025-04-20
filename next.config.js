/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // <-- ADDED Cloudinary Hostname
        pathname: '**', // Allow any path
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Keep for Google Profile Images etc.
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
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sisijemimah.com',
        port: '',
        pathname: '/**',
      },
      // You might need to add other hostnames here if your AI extracts images from them
      // e.g., zenaskitchen.com, images.immediate.co.uk
      // Though the Cloudinary upload should handle most cases now.
      {
        protocol: 'https',
        hostname: 'zenaskitchen.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.immediate.co.uk',
        pathname: '/**',
      },
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