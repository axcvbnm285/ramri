import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { useLowStock } from "@/features/inventory/hooks/useLowStock";

export default function LowStock() {
  const { data, isLoading } = useLowStock(5);

  const variants = data ?? [];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Low Stock</h2>
        <Link href="/inventory" className="text-sm font-medium text-nepal-maroon hover:underline">
          View all
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : variants.length === 0 ? (
        <p className="text-sm text-gray-400">All stock levels look healthy.</p>
      ) : (
        <div className="space-y-3">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50 p-3"
            >
              <div>
                <p className="font-medium">{variant.product.name}</p>
                <p className="text-sm text-gray-500">
                  {[variant.size, variant.color].filter(Boolean).join(" / ") || variant.sku}
                </p>
              </div>

              <div className="flex items-center gap-2 text-orange-600">
                <AlertTriangle size={16} />
                <span className="font-medium">{variant.stock} left</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
