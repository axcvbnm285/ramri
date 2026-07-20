"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import { StorefrontProductVariant } from "../types/storefront.types";

const SIZE_LABELS: Record<string, string> = { FREE_SIZE: "Free Size" };

interface Props {
  variants: StorefrontProductVariant[];
  quantities: Record<string, number>;
  onChange: (variantId: string, quantity: number) => void;
}

export default function MultiVariantPicker({ variants, quantities, onChange }: Props) {
  return (
    <div className="space-y-2">
      {variants.map((variant) => {
        const sizeLabel = variant.size ? (SIZE_LABELS[variant.size] ?? variant.size) : null;
        const label = [sizeLabel, variant.color].filter(Boolean).join(" / ") || "Standard";
        const outOfStock = variant.stock <= 0;
        const qty = quantities[variant.id] ?? 0;

        return (
          <motion.div
            key={variant.id}
            layout
            className={`flex items-center justify-between rounded-lg border px-4 py-2.5 transition-colors ${
              outOfStock
                ? "border-gray-100 bg-gray-50"
                : qty > 0
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-200"
            }`}
          >
            <div>
              <p className={`font-medium ${outOfStock ? "text-gray-300 line-through" : "text-gray-900"}`}>
                {label}
              </p>
              <p className="text-xs text-gray-400">
                {outOfStock ? "Out of stock" : `${variant.stock} in stock`}
              </p>
            </div>

            {!outOfStock && (
              <div className="flex items-center rounded-lg border bg-white">
                <button
                  type="button"
                  onClick={() => onChange(variant.id, Math.max(0, qty - 1))}
                  disabled={qty === 0}
                  className="p-2 text-gray-600 hover:text-black disabled:opacity-30"
                >
                  <Minus size={14} />
                </button>
                <span className="w-7 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => onChange(variant.id, Math.min(variant.stock, qty + 1))}
                  disabled={qty >= variant.stock}
                  className="p-2 text-gray-600 hover:text-black disabled:opacity-30"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
