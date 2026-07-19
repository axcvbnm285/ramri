import { StorefrontRepository } from "./storefront.repository";
import { getDefaultStore } from "@/lib/store";

export class StorefrontService {
  private repository = new StorefrontRepository();

  async getCategories() {
    const store = await getDefaultStore();
    return this.repository.findCategories(store.id);
  }

  async getProducts(query: any) {
    const store = await getDefaultStore();
    return this.repository.findProducts(store.id, {
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 12,
      search: query.search,
      categorySlug: query.category,
      featured: query.featured === undefined ? undefined : query.featured === "true",
      sort: query.sort,
    });
  }

  async getProductBySlug(slug: string) {
    const store = await getDefaultStore();
    const product = await this.repository.findProductBySlug(store.id, slug);

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }
}
