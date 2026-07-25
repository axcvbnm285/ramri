import { api } from "@/services/api";

export const platformAdminService = {
  login(data: { email: string; password: string }) {
    return api.post("/platform-admin/login", data);
  },

  logout() {
    return api.post("/platform-admin/logout");
  },

  me() {
    return api.get("/platform-admin/me");
  },

  allStores() {
    return api.get("/platform-admin/stores");
  },

  pendingStores() {
    return api.get("/platform-admin/stores/pending");
  },

  approveStore(id: string) {
    return api.post(`/platform-admin/stores/${id}/approve`);
  },

  rejectStore(id: string) {
    return api.post(`/platform-admin/stores/${id}/reject`);
  },

  deleteStore(id: string) {
    return api.post(`/platform-admin/stores/${id}/delete`);
  },

  reactivateStore(id: string) {
    return api.post(`/platform-admin/stores/${id}/reactivate`);
  },

  stats() {
    return api.get("/platform-admin/stats");
  },
};
