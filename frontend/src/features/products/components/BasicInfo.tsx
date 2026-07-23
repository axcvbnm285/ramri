"use client";

import { useFormContext } from "react-hook-form";

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Basic Information
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            {...register("name")}
            placeholder="Enter product name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-nepal-maroon"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={5}
            placeholder="Write a description..."
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-nepal-maroon"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand
          </label>

          <input
            {...register("brand")}
            placeholder="Brand name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-nepal-maroon"
          />
        </div>
      </div>
    </div>
  );
}