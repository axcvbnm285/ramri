import type { Metadata } from "next";

import CartPageClient from "@/features/cart/components/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false, follow: true },
};

export default function ShopCartPage() {
  return <CartPageClient />;
}
