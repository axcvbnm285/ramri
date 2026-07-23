import { useQuery } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";
import { Store } from "../types/settings.types";

export function useStoreSettings() {
  return useQuery({
    queryKey: ["store-settings"],
    queryFn: async (): Promise<Store> => {
      const response = await settingsService.getStore();
      return response.data.data;
    },
  });
}
