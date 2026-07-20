import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Proxy same-origin /api/* calls through to the backend. This is what
  // keeps the auth cookie first-party in production (frontend and backend
  // live on different domains — Vercel and Render — so without this, the
  // cookie has to be SameSite=None, which mobile Safari's cross-site
  // tracking prevention aggressively blocks/evicts, causing a login loop).
  // Only active when BACKEND_URL is set (production); local dev talks to
  // the backend directly via NEXT_PUBLIC_API_URL and doesn't need this.
  async rewrites() {
    if (!process.env.BACKEND_URL) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;