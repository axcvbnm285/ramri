"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analytics.service";
import { AnalyticsOverview } from "../types/analytics.types";

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: async () => {
      const response = await analyticsService.getOverview();
      return response.data.data as AnalyticsOverview;
    },
  });
}
