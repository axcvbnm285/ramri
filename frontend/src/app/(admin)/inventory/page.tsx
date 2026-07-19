"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useLowStock } from "@/features/inventory/hooks/useLowStock";
import { useInventoryLogs } from "@/features/inventory/hooks/useInventoryLogs";
import StockAdjustRow from "@/features/inventory/components/StockAdjustRow";

const REASON_LABELS: Record<string, string> = {
  INITIAL_STOCK: "Initial Stock",
  ORDER: "Order",
  RESTOCK: "Restock",
  MANUAL_ADJUSTMENT: "Manual Adjustment",
  RETURN: "Cancelled/Returned",
};

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data: lowStock, isLoading: isLoadingLowStock } = useLowStock(5);
  const { data: logsData, isLoading: isLoadingLogs } = useInventoryLogs({ page, limit });

  const logs = logsData?.logs ?? [];
  const pagination = logsData?.pagination;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="mt-1 text-gray-500">Monitor stock levels and restock as needed.</p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold">Low Stock</h2>

        {isLoadingLowStock ? (
          <div className="flex min-h-[120px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : !lowStock || lowStock.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
            All stock levels look healthy.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((variant) => (
                  <StockAdjustRow key={variant.id} variant={variant} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold">Inventory Log</h2>

        {isLoadingLogs ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : logs.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
            No inventory activity yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Change</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Reason</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{log.variant.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {[log.variant.size, log.variant.color].filter(Boolean).join(" / ") ||
                          log.variant.sku}
                      </p>
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        log.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {log.change >= 0 ? `+${log.change}` : log.change}
                    </td>
                    <td className="px-4 py-3">
                      {log.previousStock} → {log.newStock}
                    </td>
                    <td className="px-4 py-3">{REASON_LABELS[log.reason] ?? log.reason}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(log.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
