import { api } from "@/services/api";
import { AddressPayload } from "../types/address.types";

export const addressService = {
  getAll() {
    return api.get("/customers/addresses");
  },

  create(data: AddressPayload) {
    return api.post("/customers/addresses", data);
  },

  update(id: string, data: Partial<AddressPayload>) {
    return api.patch(`/customers/addresses/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/customers/addresses/${id}`);
  },
};
