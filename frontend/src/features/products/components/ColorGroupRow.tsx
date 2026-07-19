"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, X } from "lucide-react";

import { ProductSchema } from "../schemas/product.schema";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "FREE_SIZE"];
const SIZE_LABELS: Record<string, string> = { FREE_SIZE: "Free Size" };

interface Props {
  groupIndex: number;
  onRemoveGroup: () => void;
  canRemoveGroup: boolean;
}

export default function ColorGroupRow({ groupIndex, onRemoveGroup, canRemoveGroup }: Props) {
  const { control, register, watch } = useFormContext<ProductSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `colorGroups.${groupIndex}.sizeStocks`,
  });

  const activeSizes = watch(`colorGroups.${groupIndex}.sizeStocks`) ?? [];
  const isBlankMode = fields.length === 1 && !activeSizes[0]?.size;
  const usedSizes = new Set(activeSizes.map((s) => s.size).filter(Boolean));
  const availableSizes = SIZE_OPTIONS.filter((s) => !usedSizes.has(s));

  const addSize = (size: string) => {
    if (isBlankMode) {
      remove(0);
    }
    append({ size, stock: 0 });
  };

  const removeSize = (index: number) => {
    remove(index);
    if (fields.length === 1) {
      append({ size: "", stock: 0 });
    }
  };

  return (
    <div className="rounded-xl border bg-gray-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Color</label>
            <input
              {...register(`colorGroups.${groupIndex}.color`)}
              placeholder="e.g. Red — leave blank if not applicable"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Price override <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register(`colorGroups.${groupIndex}.priceOverride`)}
              placeholder="Base price"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        {canRemoveGroup && (
          <button
            type="button"
            onClick={onRemoveGroup}
            className="mt-7 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-red-500 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-medium">Sizes in stock</p>

        {isBlankMode ? (
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-gray-500">No size — Stock:</label>
            <input
              type="number"
              {...register(`colorGroups.${groupIndex}.sizeStocks.0.stock`, {
                valueAsNumber: true,
              })}
              className="w-24 rounded-lg border px-3 py-1.5"
            />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {fields.map((field, sizeIndex) => (
              <div
                key={field.id}
                className="flex items-center gap-1.5 rounded-lg border border-pink-600 bg-pink-50 px-2 py-1.5"
              >
                <span className="text-sm font-medium text-pink-700">
                  {SIZE_LABELS[activeSizes[sizeIndex]?.size ?? ""] ?? activeSizes[sizeIndex]?.size}
                </span>
                <input
                  type="number"
                  {...register(`colorGroups.${groupIndex}.sizeStocks.${sizeIndex}.stock`, {
                    valueAsNumber: true,
                  })}
                  className="w-16 rounded border px-1.5 py-0.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeSize(sizeIndex)}
                  className="text-pink-400 hover:text-pink-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {availableSizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => addSize(size)}
                className="rounded-lg border border-dashed px-3 py-1 text-sm text-gray-500 hover:border-pink-600 hover:text-pink-600"
              >
                + {SIZE_LABELS[size] ?? size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
