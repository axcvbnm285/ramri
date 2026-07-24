"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/features/cart/hooks/useCart";
import { useUpdateCartItem } from "@/features/cart/hooks/useUpdateCartItem";
import { useRemoveCartItem } from "@/features/cart/hooks/useRemoveCartItem";
import { useCartTotal } from "@/features/cart/hooks/useCartTotal";

export default function CartPageClient() {
  const router = useRouter();
  const { data: items, isLoading } = useCart();
  const { mutate: updateQuantity } = useUpdateCartItem();
  const { mutate: removeItemMutation } = useRemoveCartItem();
  const total = useCartTotal();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border bg-white text-center">
        <p className="text-lg font-medium">Your cart is empty</p>
        <Link href="/shop" className="mt-4 rounded-lg bg-black px-5 py-3 text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex items-center gap-4 rounded-xl border bg-white p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <Link href={`/shop/products/${item.productSlug}`} className="font-medium hover:underline">
                {item.productName}
              </Link>
              <p className="text-sm text-gray-500">
                {[item.size, item.color].filter(Boolean).join(" / ")}
              </p>
              <p className="mt-1 font-medium">₹{item.price.toLocaleString("en-IN")}</p>
            </div>

            <div className="flex items-center rounded-lg border">
              <button
                onClick={() =>
                  updateQuantity({ variantId: item.variantId, quantity: item.quantity - 1 })
                }
                className="p-2 text-gray-600 hover:text-black"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity({ variantId: item.variantId, quantity: item.quantity + 1 })
                }
                disabled={item.quantity >= item.stock}
                className="p-2 text-gray-600 hover:text-black disabled:opacity-30"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => removeItemMutation(item.variantId)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="h-fit space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-lg font-bold">Order Summary</h2>

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between border-t pt-3 text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <p className="text-sm text-gray-500">Payment: Cash on Delivery</p>

        <button
          onClick={() => router.push("/shop/checkout")}
          className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
