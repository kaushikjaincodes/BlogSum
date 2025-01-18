import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains:["lh3.googleusercontent.com", "googleusercontent.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;
