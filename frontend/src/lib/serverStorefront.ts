import { StorefrontCategory } from "@/features/storefront/types/storefront.types";
import { StorefrontProduct, StorefrontProductsResponse } from "@/features/storefront/types/storefront.types";

// Server Components (generateMetadata, sitemap.ts) run outside the browser,
// so relative "/api/..." paths have no origin to resolve against — unlike
// the client-side axios instance, this must always resolve to an absolute
// backend URL. BACKEND_URL (already required in production for the rewrite
// proxy in next.config.ts) is reused here; local dev falls back to the same
// NEXT_PUBLIC_API_URL the browser uses, since BACKEND_URL isn't set locally.
function getApiBaseUrl() {
  if (process.env.BACKEND_URL) return `${process.env.BACKEND_URL}/api`;
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
}

// Storefront catalog data changes infrequently (new products/categories),
// so metadata/sitemap generation revalidates hourly rather than refetching
// on every crawl request.
const REVALIDATE_SECONDS = 3600;

async function serverFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export function getStorefrontCategories() {
  return serverFetch<StorefrontCategory[]>("/storefront/categories").then(
    (data) => data ?? []
  );
}

export function getStorefrontProducts(options: { limit?: number; category?: string } = {}) {
  const { limit = 1000, category } = options;
  const params = new URLSearchParams({ limit: String(limit) });
  if (category) params.set("category", category);

  return serverFetch<StorefrontProductsResponse>(`/storefront/products?${params}`).then(
    (data) => data?.products ?? []
  );
}

export async function getStorefrontCategoryBySlug(slug: string) {
  const categories = await getStorefrontCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getStorefrontProductBySlug(slug: string) {
  return serverFetch<StorefrontProduct>(
    `/storefront/products/${encodeURIComponent(slug)}`
  );
}
