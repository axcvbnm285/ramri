"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { StorefrontProduct } from "../types/storefront.types";
import ProductCard from "./ProductCard";

interface Props {
  products: StorefrontProduct[];
}

export default function FeaturedCarousel({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Sparkles size={18} className="text-pink-600" />
          Featured Picks
        </h2>

        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            className="rounded-full border p-2 text-gray-500 transition hover:border-pink-600 hover:text-pink-600"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="rounded-full border p-2 text-gray-500 transition hover:border-pink-600 hover:text-pink-600"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.08 }}
            className="w-40 shrink-0 snap-start sm:w-52"
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
