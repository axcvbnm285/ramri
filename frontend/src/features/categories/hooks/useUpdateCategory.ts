"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService, UpdateCategoryPayload } from "../services/category.service";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryPayload }) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
