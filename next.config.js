/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    path: '/_next/image',
    loader: 'default',
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't include node modules in the client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        http2: false,
        dgram: false,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
  // Body parser configuration is now handled in the API routes directly
  // Environment variables that should be available to the server and client
  env: {
    // Add any environment variables you need on the client side here
  },
};

module.exports = nextConfig;
