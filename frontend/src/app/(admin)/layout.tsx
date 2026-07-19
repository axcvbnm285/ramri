"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useCurrentUser();

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
      <Sidebar />

      <main className="relative min-h-screen flex-1 overflow-x-hidden bg-gradient-to-br from-pink-50/70 via-gray-50 to-purple-50/50 p-6">
        <div className="pointer-events-none fixed -right-24 top-0 -z-0 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="pointer-events-none fixed bottom-0 right-1/3 -z-0 h-64 w-64 rounded-full bg-purple-200/25 blur-3xl" />

        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}