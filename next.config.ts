import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unilife.s3.amazonaws.com',
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
