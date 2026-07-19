import { motion } from "framer-motion";

import { StorefrontProductVariant } from "../types/storefront.types";

interface Props {
  variants: StorefrontProductVariant[];
  selectedId: string | null;
  onSelect: (variantId: string) => void;
}

export default function VariantSelector({ variants, selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const sizeLabel = variant.size === "FREE_SIZE" ? "Free Size" : variant.size;
        const label = [sizeLabel, variant.color].filter(Boolean).join(" / ") || "Standard";
        const outOfStock = variant.stock <= 0;
        const selected = variant.id === selectedId;

        return (
          <motion.button
            key={variant.id}
            type="button"
            disabled={outOfStock}
            onClick={() => onSelect(variant.id)}
            whileHover={!outOfStock ? { scale: 1.05 } : undefined}
            whileTap={!outOfStock ? { scale: 0.95 } : undefined}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              outOfStock
                ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
                : selected
                  ? "border-pink-600 bg-pink-600 text-white"
                  : "border-gray-300 text-gray-700 hover:border-pink-600"
            }`}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
