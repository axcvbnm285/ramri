"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService, VerifyPaymentPayload } from "../services/order.service";

export function useVerifyPayment(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyPaymentPayload) => orderService.verifyPayment(orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });
}
