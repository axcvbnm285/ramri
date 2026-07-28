"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { resetPasswordSchema, ResetPasswordSchema } from "../schemas/resetPassword.schema";
import { useResetPassword } from "../hooks/useResetPassword";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordSchema) => {
    if (!token) return;

    mutate(
      { token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password reset successfully. Please log in.");
          router.replace("/login");
        },
        onError: (error) => toast.error(getErrorMessage(error, "Something went wrong.")),
      }
    );
  };

  if (!token) {
    return (
      <div className="w-full max-w-md rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold">Invalid reset link</h1>
        <p className="mt-3 text-gray-500">
          This link is missing its token. Request a new one below.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-block rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Request new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl p-8">
      <Image
        src="/logo-header.png"
        alt="SandroNepal"
        width={1254}
        height={978}
        priority
        className="mb-4 h-12 w-auto"
      />

      <h1 className="text-3xl font-bold">Reset your password</h1>

      <p className="mt-2 text-gray-500">Choose a new password for your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">New password</label>

          <div className="relative">
            <input
              {...register("newPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoFocus
              className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 pr-12 outline-none focus:border-[#7A2436]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Confirm new password</label>

          <input
            {...register("confirmPassword")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : "Reset password"}
        </button>
      </form>
    </div>
  );
}
