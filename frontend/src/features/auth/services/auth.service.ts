import { api } from "@/services/api";
import { LoginDto, SignupDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from "../types";

export const authService = {
  login(data: LoginDto) {
    return api.post("/auth/login", data);
  },

  signup(data: SignupDto) {
    return api.post("/auth/signup", data);
  },

  me() {
    return api.get("/auth/me");
  },

  logout() {
    return api.post("/auth/logout");
  },

  forgotPassword(data: ForgotPasswordDto) {
    return api.post("/auth/forgot-password", data);
  },

  resetPassword(data: ResetPasswordDto) {
    return api.post("/auth/reset-password", data);
  },

  changePassword(data: ChangePasswordDto) {
    return api.patch("/auth/change-password", data);
  },
};