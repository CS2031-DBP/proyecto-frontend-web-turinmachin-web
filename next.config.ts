import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
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
      {
        protocol: 'https',
        hostname: 'unilife-storage.s3.amazonaws.com',
        port: '',
        search: '',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value:
            "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; object-src 'none';",
        },
      ],
    },
  ],
};

export default nextConfig;
