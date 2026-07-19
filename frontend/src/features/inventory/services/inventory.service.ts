import { api } from "@/services/api";

export interface InventoryLogQuery {
  page?: number;
  limit?: number;
  productId?: string;
  reason?: string;
}

export const inventoryService = {
  getLogs(query: InventoryLogQuery = {}) {
    return api.get("/inventory/logs", { params: query });
  },

  getLowStock(threshold = 5) {
    return api.get("/inventory/low-stock", { params: { threshold } });
  },

  adjustStock(variantId: string, data: { change: number; note?: string }) {
    return api.patch(`/inventory/variants/${variantId}/stock`, data);
  },
};
