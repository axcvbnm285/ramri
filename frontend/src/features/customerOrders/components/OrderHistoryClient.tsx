"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { useMyOrders } from "@/features/customerOrders/hooks/useMyOrders";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

export default function OrderHistoryClient() {
  const router = useRouter();
  const { data: customer, isLoading: isLoadingCustomer, isError } = useCurrentCustomer();
  const { data: orders, isLoading: isLoadingOrders } = useMyOrders();

  useEffect(() => {
    if (!isLoadingCustomer && isError) {
      router.replace("/shop/login?redirect=/shop/account/orders");
    }
  }, [isLoadingCustomer, isError, router]);

  if (isLoadingCustomer || !customer) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {isLoadingOrders ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
          You haven&apos;t placed any orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/shop/account/orders/${order.id}`}
              className="flex items-center justify-between rounded-xl border bg-white p-4 transition hover:shadow-sm"
            >
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" • "}
                  {order.items.length} item(s)
                </p>
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
