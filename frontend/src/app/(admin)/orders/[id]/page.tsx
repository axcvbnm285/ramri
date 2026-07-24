"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useOrder } from "@/features/orders/hooks/useOrder";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";
import OrderActions from "@/features/orders/components/OrderActions";
import OrderTimeline from "@/features/orders/components/OrderTimeline";
import PaymentVerificationCard from "@/features/orders/components/PaymentVerificationCard";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-red-500">Failed to load order.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
          <p className="mt-1 text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Items</h2>

            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      {[item.size, item.color].filter(Boolean).join(" / ")} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">₹{Number(item.subtotal).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span>₹{Number(order.total).toLocaleString("en-IN")}</span>
            </div>

            {order.paymentMethod === "COD" && (
              <p className="mt-1 text-right text-sm text-gray-500">Payment: Cash on Delivery</p>
            )}
          </div>

          {order.paymentMethod === "QR" && <PaymentVerificationCard order={order} />}

          {(order.trackingId || order.trackingUrl) && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Shipment</h2>
              <p className="text-sm text-gray-500">Courier: {order.courierName}</p>
              {order.trackingId && (
                <p className="text-sm text-gray-500">Tracking ID: {order.trackingId}</p>
              )}
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-nepal-maroon hover:underline"
                >
                  Track shipment
                </a>
              )}
            </div>
          )}

          {order.statusLogs && order.statusLogs.length > 0 && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Status Timeline</h2>
              <OrderTimeline logs={order.statusLogs} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <OrderActions order={order} />

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold">Customer</h2>
            <p className="font-medium">{order.customer?.name}</p>
            <p className="text-sm text-gray-500">{order.customer?.phone}</p>
          </div>

          {order.address && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Delivery Address</h2>
              <p className="font-medium">{order.address.fullName}</p>
              <p className="text-sm text-gray-500">{order.address.phone}</p>
              <p className="mt-2 text-sm text-gray-500">
                {order.address.line1}
                {order.address.line2 ? `, ${order.address.line2}` : ""}
                <br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
