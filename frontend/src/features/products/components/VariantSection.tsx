"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

import { ProductSchema } from "../schemas/product.schema";
import ColorGroupRow from "./ColorGroupRow";

export default function VariantSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProductSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colorGroups",
  });

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold">Pricing & Stock</h2>
      <p className="mb-5 text-sm text-gray-500">
        Set a base price, then add each color and the sizes it comes in. Leave color or size
        blank for items that don&apos;t have one (e.g. jewelry, sunglasses).
      </p>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Base Price (₹)</label>
        <input
          type="number"
          step="0.01"
          {...register("basePrice", { valueAsNumber: true })}
          placeholder="999"
          className="w-full max-w-xs rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-nepal-maroon"
        />
        {errors.basePrice && (
          <p className="mt-1 text-sm text-red-500">{errors.basePrice.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          Applies to every color unless you set a price override for it below.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Colors & Sizes</h3>

        <button
          type="button"
          onClick={() =>
            append({ color: "", priceOverride: null, sizeStocks: [{ size: "", stock: 0 }] })
          }
          className="flex items-center gap-2 rounded-lg bg-nepal-maroon px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Color
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <ColorGroupRow
            key={field.id}
            groupIndex={index}
            onRemoveGroup={() => remove(index)}
            canRemoveGroup={fields.length > 1}
          />
        ))}
      </div>

      {errors.colorGroups?.root && (
        <p className="mt-2 text-sm text-red-500">{errors.colorGroups.root.message}</p>
      )}
    </div>
  );
}
