"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Order } from "../types/order.types";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import { useCancelOrder } from "../hooks/useCancelOrder";
import { useMarkOrderReceived } from "../hooks/useMarkOrderReceived";
import DispatchForm from "./DispatchForm";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  order: Order;
}

export default function OrderActions({ order }: Props) {
  const [showDispatchForm, setShowDispatchForm] = useState(false);

  const { mutate: updateStatus, isPending: isConfirming } = useUpdateOrderStatus(order.id);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder(order.id);
  const { mutate: markReceived, isPending: isMarkingReceived } = useMarkOrderReceived(order.id);

  // Refs (not just isPending) guard against a fast double-click firing the
  // mutation twice before React commits the disabled state to the DOM —
  // isPending only updates on the next render, refs update synchronously.
  const confirmInFlight = useRef(false);
  const cancelInFlight = useRef(false);
  const receiveInFlight = useRef(false);

  const handleConfirm = () => {
    if (confirmInFlight.current) return;
    confirmInFlight.current = true;

    updateStatus(
      { status: "CONFIRMED" },
      {
        onError: (error) => toast.error(getErrorMessage(error, "Failed to confirm order.")),
        onSettled: () => {
          confirmInFlight.current = false;
        },
      }
    );
  };

  const handleCancel = () => {
    if (cancelInFlight.current) return;
    if (!confirm("Cancel this order? Stock will be restored.")) return;

    cancelInFlight.current = true;

    cancelOrder(undefined, {
      onError: (error) => toast.error(getErrorMessage(error, "Failed to cancel order.")),
      onSettled: () => {
        cancelInFlight.current = false;
      },
    });
  };

  const handleMarkReceived = () => {
    if (receiveInFlight.current) return;
    if (!confirm("Mark this order as received on the customer's behalf?")) return;

    receiveInFlight.current = true;

    markReceived(undefined, {
      onError: (error) => toast.error(getErrorMessage(error, "Failed to update order.")),
      onSettled: () => {
        receiveInFlight.current = false;
      },
    });
  };

  if (order.status === "RECEIVED" || order.status === "CANCELLED") {
    return null;
  }

  return (
    <div className="space-y-3 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Actions</h2>

      {order.status === "PENDING" && (
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isConfirming && <Loader2 size={16} className="animate-spin" />}
          Confirm Order
        </button>
      )}

      {order.status === "CONFIRMED" &&
        (showDispatchForm ? (
          <DispatchForm orderId={order.id} onDone={() => setShowDispatchForm(false)} />
        ) : (
          <button
            onClick={() => setShowDispatchForm(true)}
            className="w-full rounded-lg bg-black py-2.5 font-medium text-white transition hover:bg-gray-800"
          >
            Dispatch via Porter
          </button>
        ))}

      {order.status === "DISPATCHED" && (
        <button
          onClick={handleMarkReceived}
          disabled={isMarkingReceived}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {isMarkingReceived && <Loader2 size={16} className="animate-spin" />}
          Mark as Received
        </button>
      )}

      {(order.status === "PENDING" || order.status === "CONFIRMED") && (
        <button
          onClick={handleCancel}
          disabled={isCancelling}
          className="w-full rounded-lg border border-red-200 py-2.5 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
