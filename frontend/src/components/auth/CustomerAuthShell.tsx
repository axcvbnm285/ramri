"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import PagodaMotif from "./PagodaMotif";

interface Props {
  children: React.ReactNode;
}

export default function CustomerAuthShell({ children }: Props) {
  return (
    <div className="flex min-h-[80vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#FBF3E4] via-[#FAF0DD] to-[#F5E7C8] lg:mx-6 lg:my-6 lg:shadow-xl">
      {/* Decorative brand panel */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden lg:flex">
        <PagodaMotif className="absolute -left-16 bottom-0 h-[90%] w-auto text-[#C9A227]/25" />
        <PagodaMotif className="absolute left-24 top-8 h-[55%] w-auto text-[#C9A227]/15" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-72"
        >
          <div className="relative aspect-[1792/2398] w-full overflow-hidden rounded-2xl shadow-2xl shadow-[#C9A227]/20">
            <Image
              src="/auth-card.png"
              alt="SandroNepal — Discover Your Style. Elegant. Timeless."
              fill
              priority
              sizes="288px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
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
