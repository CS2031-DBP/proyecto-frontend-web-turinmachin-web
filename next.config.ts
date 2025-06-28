import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unilife-production.s3.amazonaws.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'unilife-testing.s3.amazonaws.com',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
