import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ['res.cloudinary.com'], // Allow images from Cloudinary
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false; // Disables source maps in development
    }
    return config;
  },
  eslint: {
    // dirs: ["src"], // Only run ESLint on the 'src' directory during builds
    ignoreDuringBuilds: true, // Set to true to ignore ESLint errors during builds
  },
};

export default nextConfig;
