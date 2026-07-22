import type { Metadata } from "next";

import OrderDetailClient from "@/features/customerOrders/components/OrderDetailClient";

export const metadata: Metadata = {
  title: "Order Details",
  robots: { index: false, follow: true },
};

export default function ShopOrderDetailPage() {
  return <OrderDetailClient />;
}
