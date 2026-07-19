"use client";

import { useQuery } from "@tanstack/react-query";
import { customerService, CustomerQuery } from "../services/customer.service";
import { CustomersResponse } from "../types/customer.types";

export function useCustomers(query: CustomerQuery) {
  return useQuery({
    queryKey: ["customers", query],
    queryFn: async () => {
      const response = await customerService.getAll(query);
      return response.data.data as CustomersResponse;
    },
    placeholderData: (previousData) => previousData,
  });
}
