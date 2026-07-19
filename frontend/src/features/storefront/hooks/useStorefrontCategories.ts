"use client";

import { useQuery } from "@tanstack/react-query";
import { storefrontService } from "../services/storefront.service";
import { StorefrontCategory } from "../types/storefront.types";

export function useStorefrontCategories() {
  return useQuery({
    queryKey: ["storefront", "categories"],
    queryFn: async () => {
      const response = await storefrontService.getCategories();
      return response.data.data as StorefrontCategory[];
    },
  });
}
