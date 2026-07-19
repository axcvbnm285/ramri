"use client";

import { useQuery } from "@tanstack/react-query";
import { inventoryService, InventoryLogQuery } from "../services/inventory.service";
import { InventoryLogsResponse } from "../types/inventory.types";

export function useInventoryLogs(query: InventoryLogQuery) {
  return useQuery({
    queryKey: ["inventory", "logs", query],
    queryFn: async () => {
      const response = await inventoryService.getLogs(query);
      return response.data.data as InventoryLogsResponse;
    },
    placeholderData: (previousData) => previousData,
  });
}
