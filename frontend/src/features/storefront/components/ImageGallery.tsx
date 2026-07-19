"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { StorefrontProductImage } from "../types/storefront.types";

interface Props {
  images: StorefrontProductImage[];
  productName: string;
}

export default function ImageGallery({ images, productName }: Props) {
  const sorted = [...images].sort((a, b) => a.position - b.position);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sorted[activeIndex];

  if (sorted.length === 0) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-gray-100 text-gray-300">
        No image available
      </div>
    );
  }

  const go = (dir: 1 | -1) => {
    setActiveIndex((i) => (i + dir + sorted.length) % sorted.length);
  };

  return (
    <div className="space-y-3">
      <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.id}
            src={active.url}
            alt={productName}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {sorted.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow transition hover:bg-white group-hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow transition hover:bg-white group-hover:opacity-100"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {sorted.map((image, index) => (
                <span
                  key={image.id}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {sorted.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                index === activeIndex ? "border-pink-600" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
