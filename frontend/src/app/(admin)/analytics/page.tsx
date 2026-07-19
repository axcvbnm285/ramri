"use client";

import { Loader2 } from "lucide-react";

import { useAnalyticsOverview } from "@/features/analytics/hooks/useAnalyticsOverview";
import { useDailyOrders } from "@/features/analytics/hooks/useDailyOrders";
import StatsGrid from "@/components/dashboard/StatsGrid";
import DailyOrdersChart from "@/features/analytics/components/DailyOrdersChart";

export default function AnalyticsPage() {
  const { data: overview, isLoading: isLoadingOverview } = useAnalyticsOverview();
  const { data: dailyOrders, isLoading: isLoadingDaily } = useDailyOrders(30);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-gray-500">Track how your store is performing over time.</p>
      </div>

      {isLoadingOverview || !overview ? (
        <div className="flex min-h-[160px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <StatsGrid overview={overview} />
      )}

      {isLoadingDaily || !dailyOrders ? (
        <div className="flex min-h-[220px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <DailyOrdersChart data={dailyOrders} />
      )}
    </div>
  );
}
