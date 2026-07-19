import Link from "next/link";

import { useOrders } from "@/features/orders/hooks/useOrders";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

export default function RecentOrders() {
  const { data, isLoading } = useOrders({ page: 1, limit: 5 });

  const orders = data?.orders ?? [];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Orders</h2>
        <Link href="/orders" className="text-sm font-medium text-pink-600 hover:underline">
          View all
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-400">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between rounded-xl border p-3 transition hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">{order.customer?.name}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-medium">₹{Number(order.total).toLocaleString("en-IN")}</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
