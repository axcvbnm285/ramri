"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analytics.service";
import { DailyOrdersPoint } from "../types/analytics.types";

export function useDailyOrders(days = 30) {
  return useQuery({
    queryKey: ["analytics", "daily-orders", days],
    queryFn: async () => {
      const response = await analyticsService.getDailyOrders(days);
      return response.data.data as DailyOrdersPoint[];
    },
  });
}
