"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, User } from "lucide-react";

import { useCartCount } from "@/features/cart/store/cartStore";
import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";

export default function ShopHeader() {
  const cartCount = useCartCount();
  const { data: customer } = useCurrentCustomer();

  return (
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/shop" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Ramri" className="h-11 w-auto" />
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href={customer ? "/shop/account" : "/shop/login"}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-pink-600"
          >
            <User size={20} />
            <span className="hidden sm:inline">{customer ? customer.name.split(" ")[0] : "Login"}</span>
          </Link>

          <Link href="/shop/cart" className="relative flex items-center text-gray-700 hover:text-pink-600">
            <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ShoppingBag size={22} />
            </motion.span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs font-medium text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </nav>
      </div>
    </header>
  );
}
