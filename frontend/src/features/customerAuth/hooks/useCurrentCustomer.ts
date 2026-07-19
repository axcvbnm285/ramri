"use client";

import { useQuery } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useCurrentCustomer() {
  return useQuery({
    queryKey: ["current-customer"],
    queryFn: async () => {
      const response = await customerAuthService.me();
      return response.data.data;
    },
    retry: false,
  });
}
