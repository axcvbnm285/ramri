"use client";

import { useQuery } from "@tanstack/react-query";
import { customerOrderService } from "../services/customerOrder.service";
import { CustomerOrder } from "../types/customerOrder.types";

export function useMyOrder(orderId: string) {
  return useQuery({
    queryKey: ["my-orders", orderId],
    queryFn: async () => {
      const response = await customerOrderService.getMineById(orderId);
      return response.data.data as CustomerOrder;
    },
    enabled: !!orderId,
  });
}
