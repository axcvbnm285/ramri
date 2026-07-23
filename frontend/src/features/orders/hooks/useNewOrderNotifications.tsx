"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { orderService } from "../services/order.service";
import { OrdersResponse } from "../types/order.types";

const POLL_INTERVAL_MS = 20000;
const RECENT_ORDERS_TO_CHECK = 5;

/**
 * Polls for newly-placed orders and toasts a clickable alert for each one
 * that wasn't there on the previous check. Mounted once in the admin layout
 * so it fires no matter which admin page is currently open.
 */
export function useNewOrderNotifications(enabled: boolean) {
  const router = useRouter();

  // null = "haven't established a baseline yet" — on the very first successful
  // fetch we just record what's already there so existing orders don't all
  // trigger a notification the moment the admin logs in.
  const seenIds = useRef<Set<string> | null>(null);

  const { data } = useQuery({
    queryKey: ["orders", "new-order-poll"],
    queryFn: async () => {
      const response = await orderService.getAll({ limit: RECENT_ORDERS_TO_CHECK });
      return response.data.data as OrdersResponse;
    },
    enabled,
    refetchInterval: POLL_INTERVAL_MS,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data) return;

    if (seenIds.current === null) {
      seenIds.current = new Set(data.orders.map((order) => order.id));
      return;
    }

    const newOrders = data.orders.filter((order) => !seenIds.current!.has(order.id));

    // Oldest-first so if several arrived between polls, the toast stack
    // reads newest-on-top like the rest of the app.
    for (const order of [...newOrders].reverse()) {
      seenIds.current.add(order.id);

      toast.custom(
        (t) => (
          <button
            onClick={() => {
              toast.dismiss(t);
              router.push(`/orders/${order.id}`);
            }}
            className="flex w-80 items-start gap-3 rounded-xl border border-nepal-gold/30 bg-white p-4 text-left shadow-lg transition hover:border-nepal-gold"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nepal-cream-3 text-nepal-maroon">
              <ShoppingBag size={18} />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-gray-900">New order received!</span>
              <span className="block truncate text-sm text-gray-500">
                {order.customer?.name ?? "Customer"} • {order.orderNumber}
              </span>
            </span>
          </button>
        ),
        { position: "top-right", duration: 10000 }
      );
    }
  }, [data, router]);
}
