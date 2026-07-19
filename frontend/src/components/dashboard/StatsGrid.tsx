import { Package, ShoppingCart, Users, Wallet } from "lucide-react";

import StatsCard from "./StatsCard";
import { AnalyticsOverview } from "@/features/analytics/types/analytics.types";

interface Props {
  overview: AnalyticsOverview;
}

export default function StatsGrid({ overview }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Products" value={String(overview.products)} icon={Package} />
      <StatsCard title="Orders" value={String(overview.orders)} icon={ShoppingCart} />
      <StatsCard title="Customers" value={String(overview.customers)} icon={Users} />
      <StatsCard
        title="Revenue"
        value={`₹${overview.revenue.toLocaleString("en-IN")}`}
        icon={Wallet}
      />
    </div>
  );
}
