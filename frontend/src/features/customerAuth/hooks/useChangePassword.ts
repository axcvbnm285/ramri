"use client";

import { useMutation } from "@tanstack/react-query";
import { customerAuthService } from "../services/customerAuth.service";

export function useChangePassword() {
  return useMutation({
    mutationFn: customerAuthService.changePassword,
  });
}
