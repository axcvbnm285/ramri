"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LogOut, Package, Search, ShoppingBag, User } from "lucide-react";

import { useCartCount } from "@/features/cart/hooks/useCartCount";
import { useMigrateLegacyCart } from "@/features/cart/hooks/useMigrateLegacyCart";
import { useWishlistCount } from "@/features/wishlist/store/wishlistStore";
import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { useCustomerLogout } from "@/features/customerAuth/hooks/useCustomerLogout";
import { useStorefrontCategories } from "@/features/storefront/hooks/useStorefrontCategories";
import { StorefrontCategory } from "@/features/storefront/types/storefront.types";

type MenuKey = "women" | "beauty" | "profile" | null;

export default function ShopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  useMigrateLegacyCart();
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const { data: customer } = useCurrentCustomer();
  const logout = useCustomerLogout();
  const { data: categories } = useStorefrontCategories();

  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [search, setSearch] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => setOpenMenu(null), [pathname]);

  const openWithClear = (key: MenuKey) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const womenCategories = useMemo(
    () => (categories ?? []).filter((c) => c.section === "WOMEN"),
    [categories]
  );
  const beautyCategories = useMemo(
    () => (categories ?? []).filter((c) => c.section === "BEAUTY"),
    [categories]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    if (q) router.push(`/shop/search?q=${encodeURIComponent(q)}`);
  };

  const megaMenuOpen = openMenu === "women" || openMenu === "beauty";

  return (
    <header className="sticky top-0 z-30 border-b border-pink-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 md:gap-10">
        <Link href="/shop" className="flex shrink-0 items-center">
          <Image
            src="/logo-header.png"
            alt="SandroNepal"
            width={1254}
            height={978}
            priority
            className="h-10 w-auto md:h-11"
          />
        </Link>

        <nav className="hidden items-stretch gap-8 md:flex">
          <Link
            href="/shop"
            className="flex items-center border-b-2 border-transparent text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-pink-600"
          >
            Home
          </Link>

          <button
            onMouseEnter={() => openWithClear("women")}
            onMouseLeave={scheduleClose}
            className={`flex items-center border-b-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              openMenu === "women"
                ? "border-pink-600 text-pink-600"
                : "border-transparent text-gray-900 hover:text-pink-600"
            }`}
          >
            Women
          </button>

          <button
            onMouseEnter={() => openWithClear("beauty")}
            onMouseLeave={scheduleClose}
            className={`flex items-center border-b-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              openMenu === "beauty"
                ? "border-pink-600 text-pink-600"
                : "border-transparent text-gray-900 hover:text-pink-600"
            }`}
          >
            Beauty
          </button>
        </nav>

        <form onSubmit={handleSearch} className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full rounded-sm border border-transparent bg-gray-100 py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-pink-300 focus:bg-white"
          />
        </form>

        <div className="flex shrink-0 items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => openWithClear("profile")}
            onMouseLeave={scheduleClose}
          >
            <Link
              href={customer ? "/shop/account" : "/shop/login"}
              className="flex flex-col items-center gap-0.5 text-gray-800 hover:text-pink-600"
            >
              <User size={20} />
              <span className="text-xs font-medium">
                {customer ? customer.name.split(" ")[0] : "Profile"}
              </span>
            </Link>

            <AnimatePresence>
              {openMenu === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 min-w-[180px] rounded-lg border bg-white py-2 shadow-xl"
                >
                  {customer ? (
                    <>
                      <Link
                        href="/shop/account/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      >
                        <Package size={15} /> Orders
                      </Link>
                      <Link
                        href="/shop/wishlist"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      >
                        <Heart size={15} /> Wishlist
                      </Link>
                      <Link
                        href="/shop/cart"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      >
                        <ShoppingBag size={15} /> Cart
                      </Link>
                      <button
                        onClick={() => logout.mutate()}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/shop/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      >
                        Login
                      </Link>
                      <Link
                        href="/shop/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/shop/wishlist"
            className="relative flex flex-col items-center gap-0.5 text-gray-800 hover:text-pink-600"
          >
            <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
              <Heart size={20} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-medium text-white"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
            <span className="text-xs font-medium">Wishlist</span>
          </Link>

          <Link
            href="/shop/cart"
            className="relative flex flex-col items-center gap-0.5 text-gray-800 hover:text-pink-600"
          >
            <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-medium text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
            <span className="text-xs font-medium">Bag</span>
          </Link>
        </div>
      </div>

      {/* Full-width mega menu panel, Myntra-style */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => openWithClear(openMenu)}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full z-30 border-t bg-white shadow-2xl"
          >
            <div className="mx-auto max-w-6xl px-8 py-8">
              <MegaMenuColumns
                title={openMenu === "women" ? "All Women's Wear" : "All Beauty Categories"}
                categories={openMenu === "women" ? womenCategories : beautyCategories}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop dim, matches Myntra's overlay behind the open mega menu */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpenMenu(null)}
            className="absolute inset-x-0 top-full z-20 h-screen bg-black/30"
          />
        )}
      </AnimatePresence>

      <div className="border-t px-4 py-2 md:hidden">
        <nav className="flex items-center gap-5 overflow-x-auto">
          <Link href="/shop" className="whitespace-nowrap text-sm font-medium text-gray-700">
            Home
          </Link>
          {womenCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/categories/${cat.slug}`}
              className="whitespace-nowrap text-sm text-gray-500"
            >
              {cat.name}
            </Link>
          ))}
          {beautyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/categories/${cat.slug}`}
              className="whitespace-nowrap text-sm text-gray-500"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function MegaMenuColumns({
  title,
  categories,
}: {
  title: string;
  categories: StorefrontCategory[];
}) {
  if (categories.length === 0) {
    return <p className="text-sm text-gray-400">No categories yet.</p>;
  }

  return (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-wide text-pink-600">{title}</p>
      <div
        className="grid gap-x-10 gap-y-2.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/categories/${cat.slug}`}
            className="text-sm text-gray-800 hover:text-pink-600"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
