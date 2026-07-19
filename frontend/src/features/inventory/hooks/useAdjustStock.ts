"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "../services/inventory.service";

export function useAdjustStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      change,
      note,
    }: {
      variantId: string;
      change: number;
      note?: string;
    }) => inventoryService.adjustStock(variantId, { change, note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
