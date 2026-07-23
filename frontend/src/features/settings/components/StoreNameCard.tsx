"use client";

import { useState } from "react";
import { Check, Loader2, Pencil } from "lucide-react";

import { Store } from "../types/settings.types";
import { useUpdateStore } from "../hooks/useUpdateStore";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  store: Store;
}

export default function StoreNameCard({ store }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(store.name);
  const { mutate: updateStore, isPending } = useUpdateStore();

  const save = () => {
    if (!name.trim() || name === store.name) {
      setEditing(false);
      setName(store.name);
      return;
    }

    updateStore(
      { name: name.trim() },
      {
        onSuccess: () => setEditing(false),
        onError: (error) => alert(getErrorMessage(error, "Failed to update store name.")),
      }
    );
  };

  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Store Name</h2>
      <p className="mt-1 text-sm text-gray-500">
        This is the name that goes on every parcel your customers unbox — make it one they remember.
      </p>

      <div className="mt-4 flex items-center gap-3">
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon"
          />
        ) : (
          <span className="text-xl font-semibold">{store.name}</span>
        )}

        {editing ? (
          <button
            onClick={save}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark disabled:opacity-50"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 rounded-lg border border-nepal-gold/40 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-nepal-maroon hover:text-nepal-maroon"
          >
            <Pencil size={14} />
            Rename
          </button>
        )}
      </div>
    </div>
  );
}
