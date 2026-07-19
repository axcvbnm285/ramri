"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { StorefrontProduct } from "../types/storefront.types";

interface Props {
  product: StorefrontProduct;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const image = product.images[0]?.url;
  const prices = product.variants.map((v) => Number(v.price));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const inStock = product.variants.some((v) => v.stock > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link
        href={`/shop/products/${product.slug}`}
        className="block overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              No image
            </div>
          )}

          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
                Out of stock
              </span>
            </div>
          )}

          {product.isFeatured && (
            <span className="absolute left-2 top-2 rounded-full bg-pink-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        <div className="p-3">
          <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
          {product.brand && <p className="truncate text-xs text-gray-500">{product.brand}</p>}
          <p className="mt-1 font-semibold text-gray-900">₹{minPrice.toLocaleString("en-IN")}</p>
        </div>
      </Link>
    </motion.div>
  );
}
