"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { usePlatformAdmin } from "@/features/platform-admin/hooks/usePlatformAdmin";
import { usePlatformLogout } from "@/features/platform-admin/hooks/usePlatformLogout";

export default function PlatformDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading, isError } = usePlatformAdmin();
  const { mutate: logout, isPending: loggingOut } = usePlatformLogout();

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/platform/login");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        Loading...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <div>
          <p className="font-semibold">SandroNepal Platform</p>
          <p className="text-sm text-gray-500">{data.name}</p>
        </div>

        <button
          onClick={() => logout()}
          disabled={loggingOut}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}
