import { useQuery } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";
import { PlatformStore } from "../types";

export function useAllStores() {
  return useQuery({
    queryKey: ["platform-admin", "all-stores"],
    queryFn: async () => {
      const response = await platformAdminService.allStores();
      return response.data.data as PlatformStore[];
    },
  });
}
