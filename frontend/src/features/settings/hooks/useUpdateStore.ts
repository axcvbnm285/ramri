"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";
import { UpdateStorePayload } from "../types/settings.types";

export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateStorePayload) => settingsService.updateStore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-settings"] });
    },
  });
}
