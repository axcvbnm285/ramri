"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "../services/address.service";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
