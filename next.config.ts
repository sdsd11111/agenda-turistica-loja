import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Unsplash — fotos de eventos y atractivos
      { protocol: "https", hostname: "images.unsplash.com" },
      // Baninet/Bunny CDN — cuando conectes tu CDN:
      // { protocol: "https", hostname: "TU-ZONA.b-cdn.net" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
