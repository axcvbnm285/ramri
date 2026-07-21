"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Plus, X } from "lucide-react";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateCategory } from "@/features/categories/hooks/useCreateCategory";
import { useImageUpload } from "@/features/products/hooks/useImageUpload";
import CategoryRow from "@/features/categories/components/CategoryRow";
import { Category, CategorySection } from "@/features/categories/types/category.types";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [section, setSection] = useState<CategorySection>("WOMEN");
  const [image, setImage] = useState<{ url: string; publicId: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();
  const { uploadImages, isUploading } = useImageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      const [uploaded] = await uploadImages([file]);
      setImage(uploaded);
    } catch (error) {
      alert(getErrorMessage(error, "Failed to upload image."));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    createCategory(
      {
        name: name.trim(),
        section,
        imageUrl: image?.url,
        publicId: image?.publicId,
      },
      {
        onSuccess: () => {
          setName("");
          setImage(null);
        },
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
          Organize your products into categories customers can browse. Add a photo to make the
          category look great on the storefront homepage.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-3 rounded-xl border bg-white p-4 shadow-sm"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        {image ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-dashed text-gray-400 hover:border-black hover:text-black disabled:opacity-50"
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            <span className="text-[9px]">Photo</span>
          </button>
        )}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name (e.g. Kurtis)"
          className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-black"
        />

        <select
          value={section}
          onChange={(e) => setSection(e.target.value as CategorySection)}
          className="rounded-lg border px-4 py-3"
        >
          <option value="WOMEN">Women</option>
          <option value="BEAUTY">Beauty</option>
        </select>

        <button
          type="submit"
          disabled={isPending || isUploading || !name.trim()}
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
                <th className="px-4 py-3 font-medium">Section</th>
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
