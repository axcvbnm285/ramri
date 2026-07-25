import { useQuery } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";

export function usePlatformAdmin() {
  return useQuery({
    queryKey: ["platform-admin"],
    queryFn: async () => {
      const response = await platformAdminService.me();
      return response.data.data;
    },
    retry: false,
  });
}
