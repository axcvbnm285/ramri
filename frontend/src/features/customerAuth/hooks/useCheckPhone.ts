"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useCheckPhone() {
  return useMutation({
    mutationFn: async (phone: string) => {
      const response = await customerAuthService.checkPhone(phone);
      return response.data.data as { exists: boolean };
    },
  });
}
