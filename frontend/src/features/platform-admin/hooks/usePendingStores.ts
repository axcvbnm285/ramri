import { useQuery } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";
import { PendingStore } from "../types";

export function usePendingStores() {
  return useQuery({
    queryKey: ["platform-admin", "pending-stores"],
    queryFn: async () => {
      const response = await platformAdminService.pendingStores();
      return response.data.data as PendingStore[];
    },
  });
}
