"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: string) => cartService.removeItem(variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
