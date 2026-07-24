"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { useMyOrder } from "@/features/customerOrders/hooks/useMyOrder";
import { useMarkMyOrderReceived } from "@/features/customerOrders/hooks/useMarkMyOrderReceived";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";
import PaymentStatusBadge from "@/features/orders/components/PaymentStatusBadge";
import StoreLogoAvatar from "@/components/StoreLogoAvatar";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function OrderDetailClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading: isLoadingCustomer, isError } = useCurrentCustomer();
  const { data: order, isLoading, isError: isOrderError } = useMyOrder(id);
  const { mutate: markReceived, isPending } = useMarkMyOrderReceived(id);
  const markReceivedInFlight = useRef(false);

  useEffect(() => {
    if (!isLoadingCustomer && isError) {
      router.replace(`/shop/login?redirect=/shop/account/orders/${id}`);
    }
  }, [isLoadingCustomer, isError, router, id]);

  if (isLoadingCustomer || !customer || isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isOrderError || !order) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-red-500">Order not found.</p>
      </div>
    );
  }

  const handleMarkReceived = () => {
    if (markReceivedInFlight.current) return;
    markReceivedInFlight.current = true;

    markReceived(undefined, {
      onSuccess: () => toast.success("Thanks! Order marked as received."),
      onError: (error) => toast.error(getErrorMessage(error, "Failed to update order.")),
      onSettled: () => {
        markReceivedInFlight.current = false;
      },
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
          {order.store && (
            <div className="mt-1 flex items-center gap-1.5">
              <StoreLogoAvatar logoUrl={order.store.logo} name={order.store.name} size={18} />
              <span className="text-sm font-medium text-gray-600">{order.store.name}</span>
            </div>
          )}
          <p className="mt-1 text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {order.status === "DISPATCHED" && (
        <div className="rounded-xl border border-pink-200 bg-pink-50 p-5">
          <p className="font-medium">Your order is on its way!</p>
          {order.courierName && (
            <p className="mt-1 text-sm text-gray-600">
              Shipped via {order.courierName}
              {order.trackingId ? ` • Tracking ID: ${order.trackingId}` : ""}
            </p>
          )}
          {order.trackingUrl && (
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-pink-600 hover:underline"
            >
              Track shipment
            </a>
          )}

          <button
            onClick={handleMarkReceived}
            disabled={isPending}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <CheckCircle2 size={16} />
            )}
            I&apos;ve received this order
          </button>
        </div>
      )}

      {order.status === "RECEIVED" && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-5 text-green-700">
          <CheckCircle2 size={18} />
          <span className="font-medium">Delivered — order received.</span>
        </div>
      )}

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 font-bold">Items</h2>

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

        <div className="mt-1 flex items-center justify-end gap-2">
          {order.paymentMethod === "COD" ? (
            <p className="text-sm text-gray-500">Payment: Cash on Delivery</p>
          ) : (
            order.paymentStatus && <PaymentStatusBadge status={order.paymentStatus} />
          )}
        </div>
      </div>

      {order.paymentMethod === "QR" && order.paymentStatus === "PENDING_VERIFICATION" && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          We&apos;ve received your payment proof — the seller will confirm it shortly.
        </div>
      )}

      {order.paymentMethod === "QR" && order.paymentStatus === "REJECTED" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          The seller couldn&apos;t verify this payment. Please contact them to resolve it.
        </div>
      )}

      {order.address && (
        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-3 font-bold">Delivery Address</h2>
          <p className="font-medium">{order.address.fullName}</p>
          <p className="text-sm text-gray-500">{order.address.phone}</p>
          <p className="mt-1 text-sm text-gray-500">
            {order.address.line1}
            {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city},{" "}
            {order.address.state} - {order.address.pincode}
          </p>
        </div>
      )}
    </div>
  );
}
