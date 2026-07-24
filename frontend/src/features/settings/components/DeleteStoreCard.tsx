"use client";

import { useState } from "react";
import { Loader2, TriangleAlert } from "lucide-react";

import { Store } from "../types/settings.types";
import { useDeleteStore } from "../hooks/useDeleteStore";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { getWhatsAppSupportUrl } from "@/lib/support";

interface Props {
  store: Store;
}

export default function DeleteStoreCard({ store }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { mutate: deleteStore, isPending } = useDeleteStore();

  const canConfirm = confirmText.trim() === store.name;

  const handleDelete = () => {
    if (!canConfirm) return;

    deleteStore(undefined, {
      onError: (error) => alert(getErrorMessage(error, "Failed to delete store.")),
    });
  };

  return (
    <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-red-600">Delete Store</h2>
      <p className="mt-1 text-sm text-gray-500">
        Taking a break or moving on? We&apos;ll keep your data safe on our side, just in case you change your mind.
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete Store
        </button>
      ) : (
        <div className="mt-4 space-y-3 rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex gap-2 text-sm text-red-700">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" />
            <p>
              This immediately takes <strong>{store.name}</strong> off the SandroNepal storefront and logs you out
              of the dashboard. Your products, orders and customer history are kept, not erased —{" "}
              <a
                href={getWhatsAppSupportUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
              >
                message us on WhatsApp
              </a>{" "}
              if you ever want them permanently removed.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Type <strong>{store.name}</strong> to confirm
            </label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full max-w-sm rounded-lg border border-red-200 bg-white px-4 py-2 outline-none focus:border-red-500"
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={!canConfirm || isPending}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              Yes, delete my store
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setConfirmText("");
              }}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
