import { useCart } from "./useCart";

export function useCartTotal() {
  const { data } = useCart();
  return (data ?? []).reduce((sum, item) => sum + item.price * item.quantity, 0);
}
