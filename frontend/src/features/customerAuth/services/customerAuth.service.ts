import { api } from "@/services/api";
import { CustomerLoginDto, CustomerSignupDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from "../types";

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

  forgotPassword(data: ForgotPasswordDto) {
    return api.post("/customers/forgot-password", data);
  },

  resetPassword(data: ResetPasswordDto) {
    return api.post("/customers/reset-password", data);
  },

  changePassword(data: ChangePasswordDto) {
    return api.patch("/customers/change-password", data);
  },
};
