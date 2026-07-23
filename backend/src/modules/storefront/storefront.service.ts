import { StorefrontRepository } from "./storefront.repository";

export class StorefrontService {
  private repository = new StorefrontRepository();

  async getCategories() {
    return this.repository.findCategories();
  }

  async getProducts(query: any) {
    return this.repository.findProducts({
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 12,
      search: query.search,
      categorySlug: query.category,
      featured: query.featured === undefined ? undefined : query.featured === "true",
      sort: query.sort,
    });
  }

  async getProductBySlug(slug: string) {
    const product = await this.repository.findProductBySlug(slug);

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }
}
