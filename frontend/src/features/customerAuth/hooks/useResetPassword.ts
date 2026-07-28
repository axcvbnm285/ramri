"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useResetPassword() {
  return useMutation({
    mutationFn: customerAuthService.resetPassword,
  });
}
