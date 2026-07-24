"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";
import { CartItem } from "../types/cart.types";
import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";

const LEGACY_KEY = "ramri-cart";

// One-time migration for carts created before the cart moved server-side:
// the old Zustand `persist` store left items sitting in localStorage, tied
// to one browser instead of the account. Push them up once, then drop the
// key so this never runs again for this browser.
export function useMigrateLegacyCart() {
  const { data: customer } = useCurrentCustomer();
  const queryClient = useQueryClient();
  const migrated = useRef(false);

  useEffect(() => {
    if (!customer || migrated.current) return;

    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;

    migrated.current = true;

    (async () => {
      try {
        const parsed = JSON.parse(raw);
        const items: CartItem[] = parsed?.state?.items ?? [];

        for (const item of items) {
          await cartService.addItem(item.variantId, item.quantity);
        }

        localStorage.removeItem(LEGACY_KEY);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } catch {
        localStorage.removeItem(LEGACY_KEY);
      }
    })();
  }, [customer, queryClient]);
}
