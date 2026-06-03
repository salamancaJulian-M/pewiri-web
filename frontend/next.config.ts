import type { NextConfig } from "next";
import { STRAPI_HOST } from "./lib/config";

const host = STRAPI_HOST || "http://localhost:1337";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-media/:path*',
        destination: `${host}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: host.startsWith('https') ? 'https' : 'http',
        hostname: new URL(host).hostname,
        port: new URL(host).port || '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cheerful-idea-ebe87be11f.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;