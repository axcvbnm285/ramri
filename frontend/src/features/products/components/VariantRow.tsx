"use client";

import { Trash2 } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  index: number;
  register: UseFormRegister<any>;
  remove: (index: number) => void;
};

export default function VariantRow({
  index,
  register,
  remove,
}: Props) {
  return (
    <div className="grid grid-cols-5 gap-3 items-end">
      {/* Size */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Size
        </label>

        <select
          {...register(`variants.${index}.size`)}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="">--</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Color
        </label>

        <input
          {...register(`variants.${index}.color`)}
          placeholder="Pink"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Price */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Price
        </label>

        <input
          type="number"
          {...register(`variants.${index}.price`, {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Stock
        </label>

        <input
          type="number"
          {...register(`variants.${index}.stock`, {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => remove(index)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border text-red-500 hover:bg-red-50"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}