"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await productService.getById(productId);
      return response.data.data;
    },
    enabled: !!productId,
  });
}
