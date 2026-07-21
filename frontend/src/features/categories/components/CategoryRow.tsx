"use client";

import { useRef, useState } from "react";
import { Check, ImagePlus, Loader2, Pencil, Trash2, X } from "lucide-react";

import { Category } from "../types/category.types";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { useImageUpload } from "@/features/products/hooks/useImageUpload";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  category: Category;
}

export default function CategoryRow({ category }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const { uploadImages, isUploading } = useImageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      const [uploaded] = await uploadImages([file]);
      updateCategory({
        id: category.id,
        data: { imageUrl: uploaded.url, publicId: uploaded.publicId },
      });
    } catch (error) {
      alert(getErrorMessage(error, "Failed to upload image."));
    }
  };

  const save = () => {
    if (!name.trim() || name === category.name) {
      setEditing(false);
      return;
    }

    updateCategory(
      { id: category.id, data: { name } },
      {
        onSuccess: () => setEditing(false),
        onError: (error) =>
          alert(getErrorMessage(error, "Failed to update category.")),
      }
    );
  };

  const toggleActive = () => {
    updateCategory({ id: category.id, data: { isActive: !category.isActive } });
  };

  const remove = () => {
    if (!confirm(`Delete category "${category.name}"?`)) return;

    deleteCategory(category.id, {
      onError: (error) =>
        alert(getErrorMessage(error, "Failed to delete category.")),
    });
  };

  return (
    <tr className="border-t">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border bg-gray-50 disabled:opacity-50"
            title="Change photo"
          >
            {isUploading ? (
              <span className="flex h-full w-full items-center justify-center">
                <Loader2 size={14} className="animate-spin text-gray-400" />
              </span>
            ) : category.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={category.imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-gray-300">
                <ImagePlus size={14} />
              </span>
            )}
          </button>

          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
              autoFocus
            />
          ) : (
            <span className="font-medium">{category.name}</span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 text-gray-500">{category.slug}</td>

      <td className="px-4 py-3">
        <select
          value={category.section}
          onChange={(e) =>
            updateCategory({
              id: category.id,
              data: { section: e.target.value as "WOMEN" | "BEAUTY" },
            })
          }
          className="rounded-lg border px-2 py-1.5 text-sm"
        >
          <option value="WOMEN">Women</option>
          <option value="BEAUTY">Beauty</option>
        </select>
      </td>

      <td className="px-4 py-3">
        <button
          onClick={toggleActive}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            category.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {category.isActive ? "Active" : "Inactive"}
        </button>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          {editing ? (
            <>
              <button
                onClick={save}
                disabled={isUpdating}
                className="rounded-lg p-2 text-green-600 hover:bg-green-50"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setName(category.name);
                  setEditing(false);
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={remove}
                disabled={isDeleting}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
