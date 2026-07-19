"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useCustomerSignup() {
  return useMutation({
    mutationFn: customerAuthService.signup,
  });
}
