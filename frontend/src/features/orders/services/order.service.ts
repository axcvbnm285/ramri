import { api } from "@/services/api";

export interface OrderQuery {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface UpdateOrderStatusPayload {
  status: "CONFIRMED" | "DISPATCHED";
  courierName?: string;
  trackingId?: string;
  trackingUrl?: string;
  note?: string;
}

export interface VerifyPaymentPayload {
  approved: boolean;
  note?: string;
}

export const orderService = {
  getAll(query: OrderQuery = {}) {
    return api.get("/orders", { params: query });
  },

  getById(id: string) {
    return api.get(`/orders/${id}`);
  },

  updateStatus(id: string, data: UpdateOrderStatusPayload) {
    return api.patch(`/orders/${id}/status`, data);
  },

  verifyPayment(id: string, data: VerifyPaymentPayload) {
    return api.patch(`/orders/${id}/verify-payment`, data);
  },

  cancel(id: string) {
    return api.patch(`/orders/${id}/cancel`);
  },

  markReceived(id: string) {
    return api.patch(`/orders/${id}/mark-received`);
  },
};
