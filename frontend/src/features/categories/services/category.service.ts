import { api } from "@/services/api";

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  isActive?: boolean;
}

export const categoryService = {
  getAll() {
    return api.get("/categories");
  },

  create(data: CreateCategoryPayload) {
    return api.post("/categories", data);
  },

  update(id: string, data: UpdateCategoryPayload) {
    return api.patch(`/categories/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/categories/${id}`);
  },
};