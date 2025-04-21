import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // you can adjust to 20mb, 50mb etc.
    },
  },
};

export default nextConfig;
