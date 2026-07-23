"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/features/auth/hooks/useLogout";

export default function SidebarFooter() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="space-y-3 border-t border-nepal-gold/20 pt-5">
      <button
        onClick={() => logout()}
        disabled={isPending}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-nepal-cream-3/60 hover:text-nepal-maroon disabled:opacity-50"
      >
        <LogOut size={20} />
        <span className="font-medium">{isPending ? "Logging out..." : "Logout"}</span>
      </button>

      <p className="text-center text-xs text-gray-400">
        Garment Management v1.0
      </p>
    </div>
  );
}