"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Store } from "../types/settings.types";
import { useUpdateStore } from "../hooks/useUpdateStore";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  store: Store;
}

function toLocalInputValue(iso?: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export default function PromotionCard({ store }: Props) {
  const [enabled, setEnabled] = useState(store.promoEnabled);
  const [badgeText, setBadgeText] = useState(store.promoBadgeText ?? "");
  const [title, setTitle] = useState(store.promoTitle ?? "");
  const [description, setDescription] = useState(store.promoDescription ?? "");
  const [startsAt, setStartsAt] = useState(toLocalInputValue(store.promoStartsAt));
  const [endsAt, setEndsAt] = useState(toLocalInputValue(store.promoEndsAt));

  const { mutate: updateStore, isPending } = useUpdateStore();

  const canSave = !enabled || (badgeText.trim() && title.trim() && startsAt && endsAt);

  const handleSave = () => {
    if (!canSave) {
      alert("Fill in the badge text, title, and start/end dates before enabling the promotion.");
      return;
    }

    updateStore(
      {
        promoEnabled: enabled,
        ...(badgeText.trim() && { promoBadgeText: badgeText.trim() }),
        ...(title.trim() && { promoTitle: title.trim() }),
        ...(description.trim() && { promoDescription: description.trim() }),
        ...(startsAt && { promoStartsAt: new Date(startsAt).toISOString() }),
        ...(endsAt && { promoEndsAt: new Date(endsAt).toISOString() }),
      },
      { onError: (error) => alert(getErrorMessage(error, "Failed to update promotion.")) }
    );
  };

  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold">Promotion</h2>
          <p className="mt-1 text-sm text-gray-500">
            Run a limited-time offer — customers see it as a countdown banner across the store.
          </p>
        </div>

        <button
          onClick={() => setEnabled((e) => !e)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            enabled ? "bg-nepal-maroon" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              enabled ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Badge text</label>
          <input
            value={badgeText}
            onChange={(e) => setBadgeText(e.target.value)}
            placeholder="e.g. Buy 1 Get 1 Free"
            className="w-full rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Headline</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Festive Surprise Week"
            className="w-full rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Buy any 1 item and get a free surprise pick from us, on the house."
            rows={2}
            className="w-full rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Starts</label>
            <input
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="w-full rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Ends</label>
            <input
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="w-full rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Save Promotion
        </button>
      </div>
    </div>
  );
}
