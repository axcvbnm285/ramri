"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, UpdateProductPayload } from "../services/product.service";

export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductPayload) =>
      productService.update(productId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
  });
}
