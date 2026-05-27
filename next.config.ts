import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unilife-s3.grazen.xyz',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
