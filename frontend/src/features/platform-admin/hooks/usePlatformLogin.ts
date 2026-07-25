import { useMutation } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";

export function usePlatformLogin() {
  return useMutation({
    mutationFn: platformAdminService.login,
  });
}
