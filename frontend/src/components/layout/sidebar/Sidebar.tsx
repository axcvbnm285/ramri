"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Logo from "./Logo";
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";

import { SIDEBAR_ITEMS } from "@/constants/sidebar";

interface SidebarContentProps {
  onNavigate?: () => void;
}

function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <Logo />
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem key={item.title} item={item} onClick={onNavigate} />
          ))}
        </nav>
      </div>

      <SidebarFooter />
    </>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-72 flex-col justify-between border-r border-nepal-gold/20 bg-white p-5 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between bg-white p-5 shadow-xl lg:hidden"
            >
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
