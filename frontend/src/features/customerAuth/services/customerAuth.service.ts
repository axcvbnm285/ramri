import { api } from "@/services/api";
import { CustomerLoginDto, CustomerSignupDto } from "../types";

export const customerAuthService = {
  checkPhone(phone: string) {
    return api.post("/customers/check-phone", { phone });
  },

  signup(data: CustomerSignupDto) {
    return api.post("/customers/signup", data);
  },

  login(data: CustomerLoginDto) {
    return api.post("/customers/login", data);
  },

  logout() {
    return api.post("/customers/logout");
  },

  me() {
    return api.get("/customers/me");
  },
};
