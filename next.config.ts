import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI or local validation builds to avoid colliding with a running dev server.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        pathname: '/plus-assets/**',
      },
    ],
  },
};

export default nextConfig;
