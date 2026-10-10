import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "mvps.b-cdn.net" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/descubre-loja",
        destination: "/guias",
        permanent: true,
      },
      {
        source: "/descubre-loja/:slug",
        destination: "/guias/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
