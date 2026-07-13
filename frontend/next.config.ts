import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
