import { useCart } from "./useCart";

export function useCartCount() {
  const { data } = useCart();
  return (data ?? []).reduce((sum, item) => sum + item.quantity, 0);
}
