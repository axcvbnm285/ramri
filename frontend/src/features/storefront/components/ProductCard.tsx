"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { StorefrontProduct } from "../types/storefront.types";
import WishlistButton from "@/features/wishlist/components/WishlistButton";

const MotionImage = motion.create(Image);

interface Props {
  product: StorefrontProduct;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const images = product.images;
  const prices = product.variants.map((v) => Number(v.price));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const inStock = product.variants.some((v) => v.stock > 0);

  const [activeImage, setActiveImage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startCycling = () => {
    if (images.length < 2) return;
    intervalRef.current = setInterval(() => {
      setActiveImage((i) => (i + 1) % images.length);
    }, 900);
  };

  const stopCycling = () => {
    clearInterval(intervalRef.current);
    setActiveImage(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.2 } }}
      onHoverStart={startCycling}
      onHoverEnd={stopCycling}
      className="group"
    >
      <Link
        href={`/shop/products/${product.slug}`}
        className="block overflow-hidden rounded-sm bg-white transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          {images.length > 0 ? (
            <AnimatePresence mode="sync">
              <MotionImage
                key={images[activeImage]?.id ?? activeImage}
                src={images[activeImage]?.url}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                priority={index < 4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="object-cover"
              />
            </AnimatePresence>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              No image
            </div>
          )}

          {!inStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
                Out of stock
              </span>
            </div>
          )}

          {product.isFeatured && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-pink-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              Featured
            </span>
          )}

          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-1">
              {images.map((img, i) => (
                <span
                  key={img.id}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeImage ? "w-4 bg-white" : "w-1 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-x-3 bottom-4 z-10 flex translate-y-2 justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <WishlistButton
              variant="pill"
              item={{
                productId: product.id,
                productSlug: product.slug,
                productName: product.name,
                image: images[0]?.url,
                price: minPrice,
              }}
            />
          </div>
        </div>

        <div className="p-2 pt-2.5">
          <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
          <p className="truncate text-xs text-gray-500">Sold by {product.store.name}</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            ₹{minPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
