"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useStorefrontCategories } from "@/features/storefront/hooks/useStorefrontCategories";
import { useStorefrontProducts } from "@/features/storefront/hooks/useStorefrontProducts";
import ProductCard from "@/features/storefront/components/ProductCard";
import ProductGridSkeleton from "@/features/storefront/components/ProductGridSkeleton";
import FeaturedCarousel from "@/features/storefront/components/FeaturedCarousel";
import HeroSlider from "@/components/shop/HeroSlider";

export default function ShopHomePage() {
  const { data: categories, isLoading: isLoadingCategories } = useStorefrontCategories();
  const { data: featuredData, isLoading: isLoadingFeatured } = useStorefrontProducts({
    featured: "true",
    limit: 10,
  });
  const { data, isLoading: isLoadingProducts } = useStorefrontProducts({ limit: 8 });

  const products = data?.products ?? [];
  const featuredProducts = featuredData?.products ?? [];

  return (
    <div className="space-y-12">
      <HeroSlider />

      <section>
        <h2 className="mb-4 text-xl font-bold">Shop by Category</h2>

        {isLoadingCategories ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
        ) : !categories || categories.length === 0 ? (
          <p className="text-gray-500">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/shop/categories/${category.slug}`}
                  className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border bg-white text-center font-medium text-gray-700 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {category.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={category.imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-25"
                    />
                  )}
                  <span className="relative z-10 px-2">{category.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <div id="featured">
        {isLoadingFeatured ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <FeaturedCarousel products={featuredProducts} />
        )}
      </div>

      <section id="new-arrivals">
        <h2 className="mb-4 text-xl font-bold">New Arrivals</h2>

        {isLoadingProducts ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
