"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId, quantity }: { variantId: string; quantity: number }) =>
      cartService.updateItem(variantId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
