import type { NextConfig } from "next";
import { STRAPI_HOST } from "./lib/config";

const host = STRAPI_HOST || "http://localhost:1337";

const nextConfig: NextConfig = {
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
        protocol: host.startsWith('https') ? 'https' : 'http',
        hostname: new URL(host).hostname,
        port: new URL(host).port || '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;