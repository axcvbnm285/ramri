"use client";

import { Mail } from "lucide-react";

import { getSupportEmailUrl } from "@/lib/support";

export default function FloatingSupportButton() {
  return (
    <a
      href={getSupportEmailUrl()}
      aria-label="Email SandroNepal support"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-nepal-maroon py-3.5 pl-3.5 pr-3.5 text-white shadow-lg transition-all hover:pr-5 hover:shadow-xl"
    >
      <Mail size={24} className="shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all group-hover:max-w-xs">
        Need help? Email us
      </span>
    </a>
  );
}
