"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { changePasswordSchema, ChangePasswordSchema } from "@/features/customerAuth/schemas/changePassword.schema";
import { useChangePassword } from "@/features/customerAuth/hooks/useChangePassword";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function ChangePasswordClient() {
  const router = useRouter();
  const { data: customer, isLoading: isLoadingCustomer, isError } = useCurrentCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useChangePassword();

  useEffect(() => {
    if (!isLoadingCustomer && isError) {
      router.replace("/shop/login?redirect=/shop/account/change-password");
    }
  }, [isLoadingCustomer, isError, router]);

  if (isLoadingCustomer || !customer) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const onSubmit = (data: ChangePasswordSchema) => {
    mutate(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password changed successfully.");
          reset();
        },
        onError: (error) => toast.error(getErrorMessage(error, "Failed to change password.")),
      }
    );
  };

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Change Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border bg-white p-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Current password</label>
          <input
            {...register("currentPassword")}
            type="password"
            autoFocus
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">New password</label>
          <input
            {...register("newPassword")}
            type="password"
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Confirm new password</label>
          <input
            {...register("confirmPassword")}
            type="password"
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
          {isPending ? <Loader2 size={18} className="animate-spin" /> : "Save password"}
        </button>
      </form>
    </div>
  );
}
