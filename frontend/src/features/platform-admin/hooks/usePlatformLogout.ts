"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";

export function usePlatformLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: platformAdminService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["platform-admin"], null);
      queryClient.invalidateQueries({ queryKey: ["platform-admin"] });
      router.replace("/platform/login");
    },
  });
}
