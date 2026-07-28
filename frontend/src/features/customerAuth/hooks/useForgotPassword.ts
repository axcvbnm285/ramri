"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useForgotPassword() {
  return useMutation({
    mutationFn: customerAuthService.forgotPassword,
  });
}
