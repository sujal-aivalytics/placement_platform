import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
