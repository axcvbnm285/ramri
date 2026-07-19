import { api } from "@/services/api";

export interface CustomerQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export const customerService = {
  getAll(query: CustomerQuery = {}) {
    return api.get("/customers", { params: query });
  },

  getById(id: string) {
    return api.get(`/customers/${id}`);
  },
};
