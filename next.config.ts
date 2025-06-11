import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mdmamunmiah.com',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
  },
  
};

export default nextConfig;
