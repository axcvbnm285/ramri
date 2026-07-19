"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService, OrderQuery } from "../services/order.service";
import { OrdersResponse } from "../types/order.types";

export function useOrders(query: OrderQuery) {
  return useQuery({
    queryKey: ["orders", query],
    queryFn: async () => {
      const response = await orderService.getAll(query);
      return response.data.data as OrdersResponse;
    },
    placeholderData: (previousData) => previousData,
  });
}
