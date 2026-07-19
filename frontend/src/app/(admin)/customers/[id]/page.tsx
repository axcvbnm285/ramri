"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useCustomer } from "@/features/customers/hooks/useCustomer";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: customer, isLoading, isError } = useCustomer(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-red-500">Failed to load customer.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{customer.name}</h1>
        <p className="mt-1 text-gray-500">{customer.phone}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Order History</h2>

            {customer.orders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders yet.</p>
            ) : (
              <div className="divide-y">
                {customer.orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-between py-3 hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">
                        ₹{Number(order.total).toLocaleString("en-IN")}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold">Saved Addresses</h2>

            {customer.addresses.length === 0 ? (
              <p className="text-sm text-gray-500">No addresses saved.</p>
            ) : (
              <div className="space-y-4">
                {customer.addresses.map((address) => (
                  <div key={address.id} className="text-sm">
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-gray-500">{address.phone}</p>
                    <p className="text-gray-500">
                      {address.line1}
                      {address.line2 ? `, ${address.line2}` : ""}, {address.city},{" "}
                      {address.state} - {address.pincode}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
