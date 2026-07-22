import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Store-owner admin dashboard — auth-gated, no public search value.
        "/dashboard",
        "/products",
        "/orders",
        "/customers",
        "/categories",
        "/inventory",
        "/analytics",
        "/login",
        "/signup",
        // Customer utility/account pages — private or duplicate/thin content.
        "/shop/cart",
        "/shop/checkout",
        "/shop/wishlist",
        "/shop/account",
        "/shop/search",
        "/shop/login",
        "/shop/signup",
        // Not real pages, no reason to crawl.
        "/api/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
