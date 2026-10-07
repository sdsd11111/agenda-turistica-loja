import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Cuando conectes Bunny CDN (Baninet), agrega aquí tu hostname:
    // remotePatterns: [{ protocol: "https", hostname: "TU-ZONA.b-cdn.net" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
