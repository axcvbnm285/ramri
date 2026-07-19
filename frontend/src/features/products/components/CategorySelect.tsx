"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useCategories } from "@/features/categories/hooks/useCategories";

export default function CategorySelect() {
  const { register, getValues, setValue } = useFormContext();

  const {
    data: categories = [],
    isLoading,
  } = useCategories();

  // The <select> is uncontrolled (via register's ref), so its initial value
  // is only applied once, on mount. In edit mode, the product's category id
  // is set as a form default before this async category list has loaded, so
  // there's no matching <option> yet and the browser falls back to the first
  // one. Re-apply the value once real options exist.
  useEffect(() => {
    if (!isLoading && categories.length > 0) {
      const current = getValues("categoryId");
      if (current) setValue("categoryId", current);
    }
  }, [isLoading, categories, getValues, setValue]);

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