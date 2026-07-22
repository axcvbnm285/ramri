"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";

export default function WishlistPageClient() {
  const items = useWishlistStore((state) => state.items);
  const remove = useWishlistStore((state) => state.remove);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border bg-white text-center">
        <Heart size={40} className="text-gray-300" />
        <p className="mt-3 text-lg font-medium">Your wishlist is empty</p>
        <p className="mt-1 text-sm text-gray-500">
          Tap the heart on any product to save it here.
        </p>
        <Link href="/shop" className="mt-4 rounded-lg bg-black px-5 py-3 text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.productId} className="group relative overflow-hidden rounded-xl border bg-white">
            <Link href={`/shop/products/${item.productSlug}`} className="block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">
                    No image
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-900">{item.productName}</p>
                <p className="mt-1 font-semibold text-gray-900">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>

            <button
              onClick={() => remove(item.productId)}
              aria-label="Remove from wishlist"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm hover:bg-white hover:text-red-500"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
