import { StorefrontStore } from "../types/storefront.types";

export function isPromoActive(store: StorefrontStore): boolean {
  if (!store.promoEnabled || !store.promoStartsAt || !store.promoEndsAt) return false;

  const now = Date.now();
  return now >= new Date(store.promoStartsAt).getTime() && now <= new Date(store.promoEndsAt).getTime();
}
