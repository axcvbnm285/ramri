import { api } from "@/services/api";

export const analyticsService = {
  getOverview() {
    return api.get("/analytics/overview");
  },

  getDailyOrders(days = 30) {
    return api.get("/analytics/daily-orders", { params: { days } });
  },
};
