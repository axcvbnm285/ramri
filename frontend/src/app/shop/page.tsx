"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useStorefrontCategories } from "@/features/storefront/hooks/useStorefrontCategories";
import HeroSlider from "@/components/shop/HeroSlider";

export default function ShopHomePage() {
  const { data: categories, isLoading: isLoadingCategories } = useStorefrontCategories();

  return (
    <div className="space-y-12">
      <HeroSlider />

      <section>
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-800">
          Shop by Category
        </h2>

        {isLoadingCategories ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-md bg-gray-100" />
            ))}
          </div>
        ) : !categories || categories.length === 0 ? (
          <p className="text-gray-500">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/shop/categories/${category.slug}`}
                  className="group block overflow-hidden rounded-md border border-orange-200/70 bg-white p-1.5 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gradient-to-br from-pink-100 via-fuchsia-50 to-purple-100">
                    {category.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-3xl font-serif italic text-pink-300">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="px-1 py-2.5 text-center">
                    <p className="truncate text-sm font-semibold capitalize text-gray-900">
                      {category.name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-pink-600">Shop Now</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
