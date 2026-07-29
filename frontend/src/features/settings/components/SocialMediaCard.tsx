"use client";

import { useState } from "react";
import { Check, Loader2, Pencil } from "lucide-react";

import { Store } from "../types/settings.types";
import { useUpdateStore } from "../hooks/useUpdateStore";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { InstagramIcon, FacebookIcon, TiktokIcon } from "@/components/SocialIcons";
import SocialLinks from "@/components/SocialLinks";

interface Props {
  store: Store;
}

export default function SocialMediaCard({ store }: Props) {
  const [editing, setEditing] = useState(false);
  const [instagram, setInstagram] = useState(store.instagram ?? "");
  const [tiktok, setTiktok] = useState(store.tiktok ?? "");
  const [facebook, setFacebook] = useState(store.facebook ?? "");
  const { mutate: updateStore, isPending } = useUpdateStore();

  const hasAny = store.instagram || store.tiktok || store.facebook;

  const save = () => {
    updateStore(
      {
        instagram: instagram.trim(),
        tiktok: tiktok.trim(),
        facebook: facebook.trim(),
      },
      {
        onSuccess: () => setEditing(false),
        onError: (error) => alert(getErrorMessage(error, "Failed to update social links.")),
      }
    );
  };

  const cancel = () => {
    setInstagram(store.instagram ?? "");
    setTiktok(store.tiktok ?? "");
    setFacebook(store.facebook ?? "");
    setEditing(false);
  };

  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <h2 className="text-lg font-bold">Social Media</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Link your profiles and customers will see the icons on your product pages. Leave any field
        blank to hide that icon.
      </p>

      {!editing ? (
        <div className="mt-4 flex items-center gap-3">
          {hasAny ? (
            <SocialLinks
              instagram={store.instagram}
              tiktok={store.tiktok}
              facebook={store.facebook}
              size={20}
            />
          ) : (
            <span className="text-sm text-gray-400">No social links added yet.</span>
          )}

          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 rounded-lg border border-nepal-gold/40 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition hover:border-nepal-maroon hover:text-nepal-maroon"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <InstagramIcon size={15} /> Instagram
            </label>
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/yourstore"
              autoFocus
              className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <TiktokIcon size={15} /> TikTok
            </label>
            <input
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              placeholder="https://tiktok.com/@yourstore"
              className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <FacebookIcon size={15} /> Facebook
            </label>
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/yourstore"
              className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={save}
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark disabled:opacity-50"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              Save
            </button>
            <button
              onClick={cancel}
              className="rounded-lg border dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:bg-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
