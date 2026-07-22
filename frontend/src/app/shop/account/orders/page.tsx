import type { Metadata } from "next";

import OrderHistoryClient from "@/features/customerOrders/components/OrderHistoryClient";

export const metadata: Metadata = {
  title: "Your Orders",
  robots: { index: false, follow: true },
};

export default function ShopOrderHistoryPage() {
  return <OrderHistoryClient />;
}
