"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    title: "Fresh styles, delivered to your door",
    subtitle: "Shop the latest arrivals. Pay cash on delivery.",
    cta: "Shop New Arrivals",
    href: "#new-arrivals",
    from: "from-pink-600",
    to: "to-pink-500",
  },
  {
    title: "Handpicked Festive Favorites",
    subtitle: "Comfortable fabrics, vibrant prints, made for every occasion.",
    cta: "Explore Featured",
    href: "#featured",
    from: "from-fuchsia-600",
    to: "to-pink-500",
  },
  {
    title: "Easy Ordering. Easy Returns.",
    subtitle: "Simple checkout, doorstep delivery, and real-time order tracking.",
    cta: "Start Shopping",
    href: "#new-arrivals",
    from: "from-rose-600",
    to: "to-orange-400",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.section
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`bg-gradient-to-r ${slide.from} ${slide.to} p-10 pb-14 text-white sm:p-14 sm:pb-16`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="max-w-lg text-3xl font-bold sm:text-4xl"
          >
            {slide.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-3 max-w-md text-white/90"
          >
            {slide.subtitle}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            href={slide.href}
            className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            {slide.cta}
          </motion.a>
        </motion.section>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
