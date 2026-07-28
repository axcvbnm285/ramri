"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { forgotPasswordSchema, ForgotPasswordSchema } from "../schemas/forgotPassword.schema";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordSchema) => {
    mutate(data, {
      onSuccess: () => setSubmitted(true),
      onError: (error) => toast.error(getErrorMessage(error, "Something went wrong.")),
    });
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7A2436]/10">
          <MailCheck size={28} className="text-[#7A2436]" />
        </div>

        <h1 className="mt-5 text-2xl font-bold">Check your email</h1>

        <p className="mt-3 text-gray-500">
          If that email is registered with us, we&apos;ve sent a link to reset your password.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Back to login
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

      <h1 className="text-3xl font-bold">Forgot password?</h1>

      <p className="mt-2 text-gray-500">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            {...register("email")}
            type="email"
            placeholder="owner@example.com"
            autoFocus
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />

          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : "Send reset link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-[#7A2436] hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
