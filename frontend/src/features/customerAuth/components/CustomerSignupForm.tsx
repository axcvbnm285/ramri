"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { customerSignupSchema, CustomerSignupSchema } from "../schemas/customerSignup.schema";
import { useCustomerSignup } from "../hooks/useCustomerSignup";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function CustomerSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerSignupSchema>({
    resolver: zodResolver(customerSignupSchema),
  });

  const { mutate, isPending } = useCustomerSignup();

  const onSubmit = (data: CustomerSignupSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["current-customer"] });
        router.replace(searchParams.get("redirect") ?? "/shop/account");
      },
      onError: (error) => {
        alert(getErrorMessage(error, "Signup failed."));
      },
    });
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Ramri" className="mb-4 h-12 w-auto" />

      <h1 className="text-3xl font-bold">Create Account</h1>
      <p className="mt-2 text-gray-500">Sign up to place orders and track deliveries.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Your name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="9876543210"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-black"
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
          className="flex w-full items-center justify-center rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-900 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/shop/login" className="font-medium text-black hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
