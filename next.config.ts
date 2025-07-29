import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.unilife.lat',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
