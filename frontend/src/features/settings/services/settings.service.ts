import { api } from "@/services/api";
import { UpdateStorePayload } from "../types/settings.types";

export const settingsService = {
  getStore() {
    return api.get("/settings");
  },

  updateStore(data: UpdateStorePayload) {
    return api.patch("/settings", data);
  },

  deleteStore() {
    return api.delete("/settings");
  },
};
