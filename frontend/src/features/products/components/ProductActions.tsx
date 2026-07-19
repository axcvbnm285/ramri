"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  isSubmitting?: boolean;
}

export default function ProductActions({
  isSubmitting = false,
}: ProductActionsProps) {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => router.push("/products")}
        className="rounded-lg border px-6 py-3 disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={18}
              className="mr-2 animate-spin"
            />
            Saving...
          </>
        ) : (
          "Save Product"
        )}
      </button>
    </div>
  );
}