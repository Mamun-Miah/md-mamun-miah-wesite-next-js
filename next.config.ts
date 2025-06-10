import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linen-squirrel-954851.hostingersite.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

export default nextConfig;
