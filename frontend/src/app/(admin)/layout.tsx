"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useNewOrderNotifications } from "@/features/orders/hooks/useNewOrderNotifications";

import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useCurrentUser();

  useNewOrderNotifications(!!data);

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/login");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>
          <span className="text-lg font-bold">SandroNepal</span>
        </header>

        <main className="relative min-w-0 flex-1 overflow-x-hidden bg-gradient-to-br from-pink-50/70 via-gray-50 to-purple-50/50 p-4 sm:p-6">
          <div className="pointer-events-none fixed -right-24 top-0 -z-0 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="pointer-events-none fixed bottom-0 right-1/3 -z-0 h-64 w-64 rounded-full bg-purple-200/25 blur-3xl" />

          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}