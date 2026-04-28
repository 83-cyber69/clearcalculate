import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  experimental: {
    // Avoid enabling experimental filesystem caching features on Windows/OneDrive.
  }
};

export default nextConfig;
