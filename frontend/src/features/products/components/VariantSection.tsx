"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

import VariantRow from "./VariantRow";

export default function VariantSection() {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Variants
        </h2>

        <button
          type="button"
          onClick={() =>
            append({
              size: "",
              color: "",
              price: 0,
              stock: 0,
            })
          }
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
        >
          <Plus size={18} />

          Add Variant
        </button>
      </div>

      <div className="space-y-5">
        {fields.map((field, index) => (
          <VariantRow
            key={field.id}
            index={index}
            register={register}
            remove={remove}
          />
        ))}
      </div>
    </div>
  );
}