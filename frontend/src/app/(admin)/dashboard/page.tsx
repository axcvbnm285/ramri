"use client";

import { Loader2 } from "lucide-react";

import { useAnalyticsOverview } from "@/features/analytics/hooks/useAnalyticsOverview";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentOrders from "@/components/dashboard/RecentOrders";
import LowStock from "@/components/dashboard/LowStock";

export default function DashboardPage() {
  const { data: overview, isLoading } = useAnalyticsOverview();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back to SandroNepal.
        </p>
      </div>

      {isLoading || !overview ? (
        <div className="flex min-h-[160px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <StatsGrid overview={overview} />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders />
        <LowStock />
      </div>
    </div>
  );
}