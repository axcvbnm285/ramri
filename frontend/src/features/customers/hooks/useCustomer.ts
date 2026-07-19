"use client";

import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";
import { CustomerDetail } from "../types/customer.types";

export function useCustomer(customerId: string) {
  return useQuery({
    queryKey: ["customers", customerId],
    queryFn: async () => {
      const response = await customerService.getById(customerId);
      return response.data.data as CustomerDetail;
    },
    enabled: !!customerId,
  });
}
