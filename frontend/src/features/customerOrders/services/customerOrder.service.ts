import { api } from "@/services/api";

export interface PaymentProofPayload {
  proofUrl?: string;
  proofPublicId?: string;
  reference?: string;
}

export interface PlaceOrderPayload {
  addressId: string;
  items: { variantId: string; quantity: number }[];
  notes?: string;
  paymentProofs?: Record<string, PaymentProofPayload>;
}

export const customerOrderService = {
  place(data: PlaceOrderPayload) {
    return api.post("/orders", data);
  },

  getMine() {
    return api.get("/orders/me");
  },

  getMineById(id: string) {
    return api.get(`/orders/me/${id}`);
  },

  markReceived(id: string) {
    return api.patch(`/orders/me/${id}/receive`);
  },
};
