import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";
import { getStorefrontCategories, getStorefrontProducts } from "@/lib/serverStorefront";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getStorefrontCategories(),
    getStorefrontProducts(),
  ]);

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/shop`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/shop/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [homeEntry, ...categoryEntries, ...productEntries];
}
