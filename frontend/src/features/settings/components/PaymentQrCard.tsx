"use client";

import { useRef } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, QrCode } from "lucide-react";

import { Store } from "../types/settings.types";
import { useUpdateStore } from "../hooks/useUpdateStore";
import { useImageUpload } from "@/features/products/hooks/useImageUpload";
import { getErrorMessage } from "@/lib/getErrorMessage";

interface Props {
  store: Store;
}

export default function PaymentQrCard({ store }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateStore, isPending } = useUpdateStore();
  const { uploadImages, isUploading } = useImageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      const [uploaded] = await uploadImages([file]);
      updateStore(
        { paymentQrUrl: uploaded.url, paymentQrPublicId: uploaded.publicId },
        { onError: (error) => alert(getErrorMessage(error, "Failed to update payment QR.")) }
      );
    } catch (error) {
      alert(getErrorMessage(error, "Failed to upload payment QR."));
    }
  };

  const busy = isUploading || isPending;

  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Payment QR Code</h2>
      <p className="mt-1 text-sm text-gray-500">
        Customers pay this QR at checkout — it&apos;s shown to them alongside your store name, so
        keep it current.
      </p>

      <div className="mt-4 flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-nepal-gold/30 bg-nepal-cream-3/40">
          {busy ? (
            <Loader2 size={20} className="animate-spin text-nepal-maroon" />
          ) : store.paymentQrUrl ? (
            <Image
              src={store.paymentQrUrl}
              alt={`${store.name} payment QR`}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <QrCode size={26} className="text-nepal-gold" />
          )}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-lg border border-nepal-gold/40 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-nepal-maroon hover:text-nepal-maroon disabled:opacity-50"
        >
          <ImagePlus size={14} />
          {store.paymentQrUrl ? "Change QR" : "Upload QR"}
        </button>
      </div>
    </div>
  );
}
