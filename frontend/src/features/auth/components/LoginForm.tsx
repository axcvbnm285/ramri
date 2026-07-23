"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  loginSchema,
  LoginSchema,
} from "../schemas/login.schema";

import { useLogin } from "../hooks/useLogin";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: () => {
       router.replace("/dashboard");
      },

      onError: (error) => {
        alert(getErrorMessage(error, "Login failed."));
      },
    });
  };

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

      <h1 className="text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-gray-500">
        Namaste! Login to keep your store running and your customers happy.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            {...register("email")}
            type="email"
            placeholder="owner@example.com"
            className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <input
              {...register("password")}
              type={
                showPassword ? "text" : "password"
              }
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 pr-12 outline-none focus:border-[#7A2436]"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2
                size={18}
                className="mr-2 animate-spin"
              />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have a store yet?{" "}
        <Link href="/signup" className="font-semibold text-[#7A2436] hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}