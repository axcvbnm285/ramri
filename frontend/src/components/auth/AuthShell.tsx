"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";

interface Props {
  children: React.ReactNode;
  tagline?: string;
  subline?: string;
}

const FLOATERS: { Icon: typeof Sparkles; top: string; left: string; delay: number; size: number }[] = [
  { Icon: Sparkles, top: "12%", left: "16%", delay: 0, size: 22 },
  { Icon: Heart, top: "72%", left: "12%", delay: 0.6, size: 18 },
  { Icon: ShoppingBag, top: "22%", left: "80%", delay: 0.3, size: 24 },
  { Icon: Sparkles, top: "82%", left: "72%", delay: 0.9, size: 16 },
  { Icon: Heart, top: "48%", left: "88%", delay: 1.2, size: 14 },
];

export default function AuthShell({
  children,
  tagline = "Fashion for Every You",
  subline = "Cash on delivery. Easy returns. Real fast.",
}: Props) {
  return (
    <div className="flex min-h-[80vh] overflow-hidden rounded-3xl lg:mx-6 lg:my-6 lg:shadow-xl">
      {/* Decorative brand panel */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 lg:flex">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:28px_28px]" />

        {FLOATERS.map((f, i) => {
          const FloaterIcon = f.Icon;
          return (
            <motion.div
              key={i}
              className="absolute text-white/70"
              style={{ top: f.top, left: f.left }}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: f.delay,
                ease: "easeInOut",
              }}
            >
              <FloaterIcon size={f.size} />
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center px-10 text-center"
        >
          <div className="rounded-3xl bg-white/95 p-5 shadow-2xl">
            <Image
              src="/logo.png"
              alt="SandroNepal"
              width={1254}
              height={1254}
              priority
              className="h-24 w-auto"
            />
          </div>
          <p className="mt-8 max-w-sm text-lg font-medium text-white/90">{tagline}</p>
          <p className="mt-2 text-sm text-white/70">{subline}</p>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-gradient-to-b from-pink-50 via-white to-purple-50 px-4 py-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
