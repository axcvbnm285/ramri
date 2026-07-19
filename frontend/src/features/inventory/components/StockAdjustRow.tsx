"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { LowStockVariant } from "../types/inventory.types";
import { useAdjustStock } from "../hooks/useAdjustStock";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  variant: LowStockVariant;
}

export default function StockAdjustRow({ variant }: Props) {
  const [amount, setAmount] = useState(10);
  const { mutate, isPending } = useAdjustStock();

  const handleRestock = () => {
    if (amount <= 0) return;

    mutate(
      { variantId: variant.id, change: amount, note: "Manual restock" },
      {
        onError: (error) =>
          alert(getErrorMessage(error, "Failed to adjust stock.")),
      }
    );
  };

  return (
    <tr className="border-t">
      <td className="px-4 py-3">
        <p className="font-medium">{variant.product.name}</p>
        <p className="text-sm text-gray-500">
          {[variant.size, variant.color].filter(Boolean).join(" / ") || variant.sku}
        </p>
      </td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-orange-600">
          <AlertTriangle size={14} />
          {variant.stock}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-20 rounded-lg border px-2 py-1.5 text-right"
          />
          <button
            onClick={handleRestock}
            disabled={isPending}
            className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            Restock
          </button>
        </div>
      </td>
    </tr>
  );
}
