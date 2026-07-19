import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await authService.me();
      return response.data.data;
    },

    retry: false,
  });
}