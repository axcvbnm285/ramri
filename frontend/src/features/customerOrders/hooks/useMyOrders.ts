"use client";

import { useQuery } from "@tanstack/react-query";
import { customerOrderService } from "../services/customerOrder.service";
import { CustomerOrder } from "../types/customerOrder.types";

export function useMyOrders() {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const response = await customerOrderService.getMine();
      return response.data.data as CustomerOrder[];
    },
  });
}
