"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useCreateAddress } from "../hooks/useCreateAddress";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function AddressForm({ onSuccess, onCancel }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { mutate, isPending } = useCreateAddress();

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(form, {
      onSuccess,
      onError: (error) =>
        alert(getErrorMessage(error, "Failed to save address.")),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border bg-gray-50 p-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          value={form.fullName}
          onChange={update("fullName")}
          placeholder="Full name"
          required
          className="col-span-2 rounded-lg border px-3 py-2 outline-none focus:border-black sm:col-span-1"
        />
        <input
          value={form.phone}
          onChange={update("phone")}
          placeholder="Phone number"
          required
          className="col-span-2 rounded-lg border px-3 py-2 outline-none focus:border-black sm:col-span-1"
        />
      </div>

      <input
        value={form.line1}
        onChange={update("line1")}
        placeholder="Address line 1"
        required
        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
      />

      <input
        value={form.line2}
        onChange={update("line2")}
        placeholder="Address line 2 (optional)"
        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
      />

      <div className="grid grid-cols-3 gap-3">
        <input
          value={form.city}
          onChange={update("city")}
          placeholder="City"
          required
          className="rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
        <input
          value={form.state}
          onChange={update("state")}
          placeholder="State"
          required
          className="rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
        <input
          value={form.pincode}
          onChange={update("pincode")}
          placeholder="Pincode"
          required
          className="rounded-lg border px-3 py-2 outline-none focus:border-black"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Save Address
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-4 py-2.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
