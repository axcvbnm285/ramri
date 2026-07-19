"use client";

import { useQuery } from "@tanstack/react-query";
import { storefrontService, StorefrontProductQuery } from "../services/storefront.service";
import { StorefrontProductsResponse } from "../types/storefront.types";

export function useStorefrontProducts(query: StorefrontProductQuery) {
  return useQuery({
    queryKey: ["storefront", "products", query],
    queryFn: async () => {
      const response = await storefrontService.getProducts(query);
      return response.data.data as StorefrontProductsResponse;
    },
    placeholderData: (previousData) => previousData,
  });
}
