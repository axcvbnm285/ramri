"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Order } from "../types/order.types";
import { useVerifyPayment } from "../hooks/useVerifyPayment";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  order: Order;
}

export default function PaymentVerificationCard({ order }: Props) {
  const [note, setNote] = useState("");
  const { mutate: verifyPayment, isPending } = useVerifyPayment(order.id);

  const handleVerify = (approved: boolean) => {
    if (!approved && !confirm("Reject this payment? The customer will need to re-pay.")) return;

    verifyPayment(
      { approved, note: note.trim() || undefined },
      { onError: (error) => toast.error(getErrorMessage(error, "Failed to update payment.")) }
    );
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Payment Verification</h2>
        {order.paymentStatus && <PaymentStatusBadge status={order.paymentStatus} />}
      </div>

      {order.paymentProofUrl && (
        <a href={order.paymentProofUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative mb-3 h-48 w-full overflow-hidden rounded-lg border bg-gray-50">
            <Image
              src={order.paymentProofUrl}
              alt="Payment proof screenshot"
              fill
              sizes="400px"
              className="object-contain"
            />
          </div>
        </a>
      )}

      {order.paymentReference && (
        <p className="mb-3 text-sm text-gray-600">
          <span className="font-medium">Reference:</span> {order.paymentReference}
        </p>
      )}

      {order.paymentStatus === "PENDING_VERIFICATION" ? (
        <div className="space-y-3">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note (optional, e.g. reason for rejection)"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-nepal-maroon"
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleVerify(true)}
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              Approve
            </button>
            <button
              onClick={() => handleVerify(false)}
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              <X size={16} />
              Reject
            </button>
          </div>
        </div>
      ) : (
        order.paymentVerifiedAt && (
          <p className="text-xs text-gray-400">
            Verified on{" "}
            {new Date(order.paymentVerifiedAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        )
      )}
    </div>
  );
}
