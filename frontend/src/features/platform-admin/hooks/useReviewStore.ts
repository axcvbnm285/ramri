import { useMutation, useQueryClient } from "@tanstack/react-query";
import { platformAdminService } from "../services/platformAdmin.service";

export function useApproveStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => platformAdminService.approveStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "pending-stores"] });
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "stats"] });
    },
  });
}

export function useRejectStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => platformAdminService.rejectStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "pending-stores"] });
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "stats"] });
    },
  });
}

export function useDeleteStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => platformAdminService.deleteStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "all-stores"] });
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "stats"] });
    },
  });
}

export function useReactivateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => platformAdminService.reactivateStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "all-stores"] });
      queryClient.invalidateQueries({ queryKey: ["platform-admin", "stats"] });
    },
  });
}
