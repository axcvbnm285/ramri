"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/features/auth/hooks/useLogout";
import ThemeToggle from "@/components/ThemeToggle";

export default function SidebarFooter() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="space-y-3 border-t border-nepal-gold/20 pt-5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-nepal-cream-3/60 hover:text-nepal-maroon disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-nepal-gold"
        >
          <LogOut size={20} />
          <span className="font-medium">{isPending ? "Logging out..." : "Logout"}</span>
        </button>

        <ThemeToggle className="text-gray-600 hover:bg-nepal-cream-3/60 dark:text-gray-300 dark:hover:bg-gray-800" />
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        Garment Management v1.0
      </p>
    </div>
  );
}