import { api } from "@/services/api";

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  featured?: string;
  sort?: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  brand?: string;
  categoryId: string;
  isFeatured?: boolean;

  images?: {
    url: string;
    publicId: string;
  }[];

  variants: {
    size?: string | null;
    color?: string;
    price: number;
    stock: number;
  }[];
}

export type UpdateProductPayload =
  Partial<CreateProductPayload> & {
    variants?: (
      CreateProductPayload["variants"][number] & {
        id?: string;
      }
    )[];
  };

export const productService = {
  create(data: CreateProductPayload) {
    return api.post("/products", data);
  },

  getAll(query: ProductQuery = {}) {
    return api.get("/products", {
      params: query,
    });
  },

  getById(id: string) {
    return api.get(`/products/${id}`);
  },

  update(id: string, data: UpdateProductPayload) {
    return api.patch(`/products/${id}`, data);
  },
};