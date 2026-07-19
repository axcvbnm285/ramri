"use client";

import { useQuery } from "@tanstack/react-query";
import { inventoryService } from "../services/inventory.service";
import { LowStockVariant } from "../types/inventory.types";

export function useLowStock(threshold = 5) {
  return useQuery({
    queryKey: ["inventory", "low-stock", threshold],
    queryFn: async () => {
      const response = await inventoryService.getLowStock(threshold);
      return response.data.data as LowStockVariant[];
    },
  });
}
