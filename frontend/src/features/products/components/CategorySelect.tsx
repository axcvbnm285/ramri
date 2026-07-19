"use client";

import { useFormContext } from "react-hook-form";
import { useCategories } from "@/features/categories/hooks/useCategories";

export default function CategorySelect() {
  const { register } = useFormContext();

  const {
    data: categories = [],
    isLoading,
  } = useCategories();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Category
      </h2>

      <select
        {...register("categoryId")}
        className="w-full rounded-lg border px-4 py-3"
      >
        <option value="">
          {isLoading
            ? "Loading..."
            : "Select Category"}
        </option>

        {categories.map((category: any) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}