"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { usePlatformLogin } from "@/features/platform-admin/hooks/usePlatformLogin";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function PlatformLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = usePlatformLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: () => router.replace("/platform/dashboard"),
        onError: (error) => toast.error(getErrorMessage(error, "Login failed.")),
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-900 p-8"
      >
        <h1 className="text-xl font-semibold text-gray-100">Platform Admin</h1>
        <p className="mt-1 text-sm text-gray-500">SandroNepal internal access only.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2.5 font-medium text-gray-900 transition hover:bg-white disabled:opacity-50"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : "Login"}
        </button>
      </form>
    </div>
  );
}
