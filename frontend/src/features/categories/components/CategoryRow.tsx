"use client";

import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

import { Category } from "../types/category.types";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  category: Category;
}

export default function CategoryRow({ category }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

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
      </td>

      <td className="px-4 py-3 text-gray-500">{category.slug}</td>

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
