import type { Metadata } from "next";

import WishlistPageClient from "@/features/wishlist/components/WishlistPageClient";

export const metadata: Metadata = {
  title: "Your Wishlist",
  robots: { index: false, follow: true },
};

export default function ShopWishlistPage() {
  return <WishlistPageClient />;
}
