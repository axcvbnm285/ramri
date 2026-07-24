"use client";

import { useQuery } from "@tanstack/react-query";
import { storefrontService } from "../services/storefront.service";
import { Promotion } from "../types/storefront.types";

export function usePromotions() {
  return useQuery({
    queryKey: ["storefront", "promotions"],
    queryFn: async () => {
      const response = await storefrontService.getPromotions();
      return response.data.data as Promotion[];
    },
    staleTime: 60_000,
  });
}
