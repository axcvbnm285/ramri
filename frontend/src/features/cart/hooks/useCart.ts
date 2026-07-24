import { useQuery } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";
import { CartItem } from "../types/cart.types";
import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";

export function useCart() {
  const { data: customer } = useCurrentCustomer();

  return useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartItem[]> => {
      const response = await cartService.getCart();
      return response.data.data;
    },
    enabled: !!customer,
  });
}
