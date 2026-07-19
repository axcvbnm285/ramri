"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateCategory } from "@/features/categories/hooks/useCreateCategory";
import CategoryRow from "@/features/categories/components/CategoryRow";
import { Category } from "@/features/categories/types/category.types";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function CategoriesPage() {
  const [name, setName] = useState("");

  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    createCategory(
      { name: name.trim() },
      {
        onSuccess: () => setName(""),
        onError: (error) =>
          alert(getErrorMessage(error, "Failed to create category.")),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="mt-1 text-gray-500">
          Organize your products into categories customers can browse.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name (e.g. Kurtis)"
          className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-black"
        />

        <button
          type="submit"
          disabled={isPending || !name.trim()}
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          <Plus size={18} />
          Add Category
        </button>
      </form>

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : isError ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-red-500">Failed to load categories.</p>
        </div>
      ) : !categories || categories.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
          No categories yet. Add your first one above.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: Category) => (
                <CategoryRow key={category.id} category={category} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
