"use client";

import { useQuery } from "@tanstack/react-query";
import {
  productService,
  ProductQuery,
} from "../services/product.service";

export function useProducts(query: ProductQuery) {
  return useQuery({
    queryKey: ["products", query],

    queryFn: async () => {
      const response = await productService.getAll(query);
      return response.data.data;
    },

    placeholderData: (previousData) => previousData,
  });
}