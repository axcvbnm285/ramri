"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
