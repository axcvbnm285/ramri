import { api } from "@/services/api";

export const cartService = {
  getCart() {
    return api.get("/cart");
  },

  addItem(variantId: string, quantity: number) {
    return api.post("/cart", { variantId, quantity });
  },

  updateItem(variantId: string, quantity: number) {
    return api.patch(`/cart/${variantId}`, { quantity });
  },

  removeItem(variantId: string) {
    return api.delete(`/cart/${variantId}`);
  },

  clearCart() {
    return api.delete("/cart");
  },
};
