"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";

export function useDeleteStore() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: settingsService.deleteStore,
    onSuccess: () => {
      queryClient.setQueryData(["current-user"], null);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      router.replace("/login");
    },
  });
}
