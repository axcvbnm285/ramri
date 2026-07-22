import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force all metadata (title/description/OG/Twitter tags) to resolve
  // before the initial HTML is sent, instead of streaming it in after.
  // Next.js only guarantees streamed metadata reaches JS-executing bots
  // (Googlebot); link-preview bots that don't run JS — WhatsApp, Facebook,
  // Twitter, iMessage — would otherwise miss it. WhatsApp sharing matters
  // a lot here since this store is transitioning its customers off WhatsApp.
  htmlLimitedBots: /.*/,

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