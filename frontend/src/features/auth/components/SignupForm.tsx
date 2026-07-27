"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

import { signupSchema, SignupSchema } from "../schemas/signup.schema";

import { useSignup } from "../hooks/useSignup";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { getSupportEmailUrl } from "@/lib/support";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState<{ storeName: string; email: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useSignup();

  const onSubmit = (data: SignupSchema) => {
    mutate(data, {
      onSuccess: (response) => {
        const store = response.data.data.store;
        setSubmitted({ storeName: store.name, email: data.email });
      },

      onError: (error) => {
        toast.error(getErrorMessage(error, "Signup failed."));
      },
    });
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7A2436]/10">
          <MailCheck size={28} className="text-[#7A2436]" />
        </div>

        <h1 className="mt-5 text-2xl font-bold">Application submitted</h1>

        <p className="mt-3 text-gray-500">
          Thank you for creating <strong>{submitted.storeName}</strong> on SandroNepal. Our team is reviewing your
          application, and we&apos;ll email <strong>{submitted.email}</strong> the moment a decision is made —
          usually within 24 hours.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Back to login
        </Link>

        <p className="mt-4 text-center text-sm text-gray-500">
          Need help?{" "}
          <a
            href={getSupportEmailUrl()}
            className="font-semibold text-[#7A2436] hover:underline"
          >
            Email us
          </a>
        </p>
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

      <h1 className="text-3xl font-bold">Create your store</h1>

      <p className="mt-2 text-gray-500">
        Namaste! Bring your business online and start reaching customers across Nepal today.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Store name</label>

          <input
            {...register("storeName")}
            type="text"
            placeholder="SandroNepal"
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />

          {errors.storeName && (
            <p className="mt-1 text-sm text-red-500">{errors.storeName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Your name</label>

          <input
            {...register("ownerName")}
            type="text"
            placeholder="Owner name"
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />

          {errors.ownerName && (
            <p className="mt-1 text-sm text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            {...register("email")}
            type="email"
            placeholder="owner@example.com"
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#7A2436] hover:underline">
          Log in
        </Link>
      </p>

      <p className="mt-2 text-center text-sm text-gray-500">
        Need help?{" "}
        <a
          href={getSupportEmailUrl()}
          className="font-semibold text-[#7A2436] hover:underline"
        >
          Email us
        </a>
      </p>
    </div>
  );
}
