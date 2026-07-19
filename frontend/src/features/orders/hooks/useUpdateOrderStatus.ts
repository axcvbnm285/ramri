"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService, UpdateOrderStatusPayload } from "../services/order.service";

export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrderStatusPayload) => orderService.updateStatus(orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });
}
