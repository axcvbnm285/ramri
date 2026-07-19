import { api } from "@/services/api";

export interface StorefrontProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: string;
  sort?: string;
}

export const storefrontService = {
  getCategories() {
    return api.get("/storefront/categories");
  },

  getProducts(query: StorefrontProductQuery = {}) {
    return api.get("/storefront/products", { params: query });
  },

  getProductBySlug(slug: string) {
    return api.get(`/storefront/products/${slug}`);
  },
};
