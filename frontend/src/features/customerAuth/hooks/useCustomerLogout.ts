"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";

export function useCustomerLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerAuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["current-customer"], null);
      queryClient.invalidateQueries({ queryKey: ["current-customer"] });
      useCartStore.getState().clear();
      useWishlistStore.getState().clear();
    },
  });
}
