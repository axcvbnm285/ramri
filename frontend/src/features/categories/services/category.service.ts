import { api } from "@/services/api";
import { CategorySection } from "../types/category.types";

export interface CreateCategoryPayload {
  name: string;
  section?: CategorySection;
  imageUrl?: string;
  publicId?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  isActive?: boolean;
  section?: CategorySection;
  imageUrl?: string;
  publicId?: string;
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