"use client";

import { useQuery } from "@tanstack/react-query";
import { storefrontService } from "../services/storefront.service";
import { StorefrontProduct } from "../types/storefront.types";

export function useStorefrontProduct(slug: string) {
  return useQuery({
    queryKey: ["storefront", "products", slug],
    queryFn: async () => {
      const response = await storefrontService.getProductBySlug(slug);
      return response.data.data as StorefrontProduct;
    },
    enabled: !!slug,
  });
}
