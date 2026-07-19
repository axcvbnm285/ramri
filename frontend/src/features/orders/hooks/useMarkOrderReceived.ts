"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/order.service";

export function useMarkOrderReceived(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => orderService.markReceived(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });
}
