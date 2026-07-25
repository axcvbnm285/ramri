"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  label: string;
}

export default function OrderStampAnimation({ label }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [0, 0, -3, 3, -2, 2, 0] }}
      transition={{ opacity: { duration: 0.15 }, x: { duration: 0.4, delay: 0.35, times: [0, 0.35, 0.45, 0.55, 0.65, 0.8, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Impact ring — a quick flash radiating out at the moment of "contact" */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 2.2, opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
        className="absolute h-40 w-40 rounded-full border-4 border-red-500"
      />

      <motion.div
        initial={{ scale: 3.5, opacity: 0, rotate: -14, y: -120 }}
        animate={{
          scale: [3.5, 0.85, 1.08, 0.97, 1],
          opacity: [0, 1, 1, 1, 1],
          rotate: [-14, -8, -8, -8, -8],
          y: [-120, 0, 0, 0, 0],
        }}
        transition={{ duration: 0.55, times: [0, 0.55, 0.72, 0.86, 1], ease: "easeOut" }}
      >
        <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-[6px] border-double border-red-600 text-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]">
          <Check size={36} strokeWidth={3} />
          <p className="mt-1 text-center text-sm font-black uppercase leading-tight tracking-wider">
            {label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
