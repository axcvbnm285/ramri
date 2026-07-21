"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { useWishlistStore, WishlistItem } from "../store/wishlistStore";
import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";

interface Props {
  item: WishlistItem;
  size?: number;
  className?: string;
  variant?: "icon" | "pill";
}

export default function WishlistButton({ item, size = 18, className = "", variant = "icon" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: customer } = useCurrentCustomer();
  const has = useWishlistStore((state) => state.has(item.productId));
  const toggle = useWishlistStore((state) => state.toggle);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!customer) {
      toast.error("Please login to use your wishlist.");
      router.push(`/shop/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    toggle(item);
  };

  if (variant === "pill") {
    return (
      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
        className={`flex items-center justify-center gap-1.5 rounded-full border bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-800 shadow-md backdrop-blur transition-colors hover:bg-white ${className}`}
      >
        <Heart size={14} className={has ? "fill-pink-600 text-pink-600" : "text-gray-700"} />
        {has ? "Wishlisted" : "Wishlist"}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center rounded-full transition-colors ${className}`}
    >
      <motion.span
        key={has ? "filled" : "empty"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Heart
          size={size}
          className={has ? "fill-pink-600 text-pink-600" : "text-gray-500"}
        />
      </motion.span>
    </motion.button>
  );
}
