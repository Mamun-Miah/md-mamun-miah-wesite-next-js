import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lightblue-goat-212889.hostingersite.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

export default nextConfig;
