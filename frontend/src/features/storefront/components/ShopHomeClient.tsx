"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useStorefrontCategories } from "@/features/storefront/hooks/useStorefrontCategories";
import HeroSlider from "@/components/shop/HeroSlider";
import PromoBanner from "@/components/shop/PromoBanner";

export default function ShopHomeClient() {
  const { data: categories, isLoading: isLoadingCategories } = useStorefrontCategories();

  return (
    <div className="space-y-12">
      <HeroSlider />

      <PromoBanner />

      <section id="categories">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-800">
          Shop by Category
        </h2>

        {isLoadingCategories ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-xl bg-gray-100" />
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
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/shop/categories/${category.slug}`} className="group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-3xl font-serif italic text-orange-300">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="mt-3 truncate text-center text-sm font-bold uppercase tracking-wide text-gray-900">
                    {category.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
