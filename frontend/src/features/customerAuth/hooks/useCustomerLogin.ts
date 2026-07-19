"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useCustomerLogin() {
  return useMutation({
    mutationFn: customerAuthService.login,
  });
}
