import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains:["lh3.googleusercontent.com", "googleusercontent.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.pexels.com"
      }
    ]
  }
};

export default nextConfig;
