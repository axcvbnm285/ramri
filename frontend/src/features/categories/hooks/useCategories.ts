import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getAll();
      return response.data.data;
    },
  });
}