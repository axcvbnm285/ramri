"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "../services/address.service";
import { AddressPayload } from "../types/address.types";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddressPayload) => addressService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
