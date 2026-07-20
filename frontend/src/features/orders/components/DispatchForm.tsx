"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  orderId: string;
  onDone: () => void;
}

export default function DispatchForm({ orderId, onDone }: Props) {
  const [courierName, setCourierName] = useState("Porter");
  const [trackingId, setTrackingId] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  const { mutate, isPending } = useUpdateOrderStatus(orderId);
  const submitInFlight = useRef(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submitInFlight.current) return;
    submitInFlight.current = true;

    mutate(
      {
        status: "DISPATCHED",
        courierName: courierName || undefined,
        trackingId: trackingId || undefined,
        trackingUrl: trackingUrl || undefined,
      },
      {
        onSuccess: onDone,
        onError: (error) => toast.error(getErrorMessage(error, "Failed to dispatch order.")),
        onSettled: () => {
          submitInFlight.current = false;
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border bg-gray-50 p-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Courier</label>
        <input
          value={courierName}
          onChange={(e) => setCourierName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tracking ID (optional)</label>
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Porter tracking ID"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tracking link (optional)</label>
        <input
          value={trackingUrl}
          onChange={(e) => setTrackingUrl(e.target.value)}
          placeholder="https://porter.in/track/..."
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        Confirm Dispatch
      </button>
    </form>
  );
}
