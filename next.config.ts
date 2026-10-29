import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Bahasa default Indonesia. Alamat lama tanpa bahasa dialihkan ke versi /id.
  async redirects() {
    return [
      { source: "/", destination: "/id", permanent: false },
      { source: "/proyek", destination: "/id/proyek", permanent: true },
      { source: "/proyek/:slug", destination: "/id/proyek/:slug", permanent: true },
      { source: "/artikel", destination: "/id/artikel", permanent: true },
      { source: "/artikel/:slug", destination: "/id/artikel/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
