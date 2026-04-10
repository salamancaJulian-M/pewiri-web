import type { NextConfig } from "next";
import { STRAPI_HOST } from "./lib/config";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api-media/:path*',
        destination: `${STRAPI_HOST}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
