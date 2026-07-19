"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerOrderService } from "../services/customerOrder.service";

export function useMarkMyOrderReceived(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => customerOrderService.markReceived(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders", orderId] });
    },
  });
}
