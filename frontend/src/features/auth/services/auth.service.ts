import { api } from "@/services/api";
import { LoginDto, SignupDto } from "../types";

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
};