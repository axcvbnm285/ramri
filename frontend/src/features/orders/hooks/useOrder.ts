"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services/order.service";
import { Order } from "../types/order.types";

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const response = await orderService.getById(orderId);
      return response.data.data as Order;
    },
    enabled: !!orderId,
  });
}
