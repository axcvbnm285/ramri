"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { changePasswordSchema, ChangePasswordSchema } from "@/features/auth/schemas/changePassword.schema";
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function ChangePasswordCard() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: ChangePasswordSchema) => {
    mutate(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password changed successfully.");
          reset();
          setOpen(false);
        },
        onError: (error) => toast.error(getErrorMessage(error, "Failed to change password.")),
      }
    );
  };

  return (
    <div className="rounded-2xl border border-nepal-gold/20 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <h2 className="text-lg font-bold">Change Password</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Update the password you use to log in to your dashboard.
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 flex items-center gap-1.5 rounded-lg border border-nepal-gold/40 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition hover:border-nepal-maroon hover:text-nepal-maroon"
        >
          <KeyRound size={14} />
          Change password
        </button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Current password</label>
            <input
              {...register("currentPassword")}
              type="password"
              autoFocus
              className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">New password</label>
            <input
              {...register("newPassword")}
              type="password"
              className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Confirm new password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full max-w-sm rounded-lg border border-nepal-gold/40 px-4 py-2.5 outline-none focus:border-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-lg bg-nepal-maroon px-4 py-2.5 text-sm font-medium text-white transition hover:bg-nepal-maroon-dark disabled:opacity-50"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                reset();
              }}
              className="rounded-lg border dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:bg-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
