"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerOrderService } from "../services/customerOrder.service";

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerOrderService.place,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
}
