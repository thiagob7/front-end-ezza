import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "monitor-replaymes.us2.pitunnel.com",
    "192.168.23.169:3000",
  ],
};

export default nextConfig;
