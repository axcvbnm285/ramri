import { useQuery } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";
import { PlatformStats } from "../types";

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-admin", "stats"],
    queryFn: async () => {
      const response = await platformAdminService.stats();
      return response.data.data as PlatformStats;
    },
  });
}
