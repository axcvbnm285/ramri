"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService, CreateCategoryPayload } from "../services/category.service";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryPayload) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
