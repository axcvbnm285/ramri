"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  productService,
  CreateProductPayload,
} from "../services/product.service";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductPayload) =>
      productService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}