"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import { useStorefrontProducts } from "@/features/storefront/hooks/useStorefrontProducts";
import ProductCard from "@/features/storefront/components/ProductCard";
import ProductGridSkeleton from "@/features/storefront/components/ProductGridSkeleton";

export default function ShopCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useStorefrontProducts({ category: slug, limit: 24 });

  const products = data?.products ?? [];

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold capitalize"
      >
        {slug.replace(/-/g, " ")}
      </motion.h1>

      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : isError ? (
        <p className="text-red-500">Failed to load products.</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
