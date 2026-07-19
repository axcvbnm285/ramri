"use client";

import { useQuery } from "@tanstack/react-query";
import { addressService } from "../services/address.service";
import { Address } from "../types/address.types";

export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await addressService.getAll();
      return response.data.data as Address[];
    },
  });
}
