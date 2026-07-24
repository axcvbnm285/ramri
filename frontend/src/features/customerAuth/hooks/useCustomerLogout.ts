"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";

export function useCustomerLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerAuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["current-customer"], null);
      queryClient.invalidateQueries({ queryKey: ["current-customer"] });
      // The cart lives on the server now, so it must survive logout — only
      // drop the client-side cache so the next customer on this browser
      // doesn't briefly see the previous one's cart before their own loads.
      queryClient.removeQueries({ queryKey: ["cart"] });
      useWishlistStore.getState().clear();
    },
  });
}
