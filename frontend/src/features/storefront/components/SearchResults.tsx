"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { useStorefrontProducts } from "../hooks/useStorefrontProducts";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { data, isLoading, isError } = useStorefrontProducts({ search: query, limit: 24 });
  const products = data?.products ?? [];

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold"
      >
        {query ? (
          <>
            Results for <span className="text-pink-600">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Search"
        )}
      </motion.h1>

      {!query ? (
        <p className="text-gray-500">Type something in the search bar to find products.</p>
      ) : isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : isError ? (
        <p className="text-red-500">Failed to load results.</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found for &ldquo;{query}&rdquo;.</p>
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
