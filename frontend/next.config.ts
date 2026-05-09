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
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'c1z4hrjc-3000.use2.devtunnels.ms'
      ]
    }
  }
};

export default nextConfig;
