"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import { checkPhoneSchema, CheckPhoneSchema } from "../schemas/checkPhone.schema";
import { customerLoginSchema } from "../schemas/customerLogin.schema";
import { customerSignupSchema } from "../schemas/customerSignup.schema";
import { useCheckPhone } from "../hooks/useCheckPhone";
import { useCustomerLogin } from "../hooks/useCustomerLogin";
import { getWhatsAppSupportUrl } from "@/lib/support";
import { useCustomerSignup } from "../hooks/useCustomerSignup";
import { getErrorMessage } from "@/lib/getErrorMessage";

type Step = "phone" | "login" | "signup";

// Phone is collected in the first step and held in local state, so the
// login/signup steps validate only the fields they actually render.
const passwordOnlySchema = customerLoginSchema.pick({ password: true });
type PasswordOnlySchema = { password: string };

const signupDetailsSchema = customerSignupSchema.omit({ phone: true });
type SignupDetailsSchema = {
  name: string;
  password: string;
  email?: string;
};

export default function CustomerAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checkPhone = useCheckPhone();
  const login = useCustomerLogin();
  const signup = useCustomerSignup();

  const phoneForm = useForm<CheckPhoneSchema>({ resolver: zodResolver(checkPhoneSchema) });
  const loginForm = useForm<PasswordOnlySchema>({ resolver: zodResolver(passwordOnlySchema) });
  const signupForm = useForm<SignupDetailsSchema>({ resolver: zodResolver(signupDetailsSchema) });

  const goToStart = () => {
    setStep("phone");
    loginForm.reset();
    signupForm.reset();
  };

  const onContinue = (data: CheckPhoneSchema) => {
    checkPhone.mutate(data.phone, {
      onSuccess: (result) => {
        setPhone(data.phone);
        setStep(result.exists ? "login" : "signup");
      },
      onError: (error) => alert(getErrorMessage(error, "Something went wrong.")),
    });
  };

  const onLogin = (data: PasswordOnlySchema) => {
    login.mutate(
      { phone, password: data.password },
      {
        onSuccess: (response) => {
          queryClient.setQueryData(["current-customer"], response.data.data);
          router.replace(searchParams.get("redirect") ?? "/shop/account");
        },
        onError: (error) => alert(getErrorMessage(error, "Login failed.")),
      }
    );
  };

  const onSignup = (data: SignupDetailsSchema) => {
    signup.mutate(
      { ...data, phone, email: data.email || undefined },
      {
        onSuccess: (response) => {
          queryClient.setQueryData(["current-customer"], response.data.data);
          router.replace(searchParams.get("redirect") ?? "/shop/account");
        },
        onError: (error) => alert(getErrorMessage(error, "Signup failed.")),
      }
    );
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

      {step === "phone" && (
        <>
          <h1 className="text-2xl font-bold">
            <span className="font-extrabold">Login</span> or{" "}
            <span className="font-extrabold">Signup</span>
          </h1>

          <form onSubmit={phoneForm.handleSubmit(onContinue)} className="mt-6 space-y-4">
            <div>
              <div className="flex items-center rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 focus-within:border-[#7A2436]">
                <span className="text-gray-500">+977</span>
                <span className="mx-3 h-5 w-px bg-gray-300" />
                <input
                  {...phoneForm.register("phone")}
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full outline-none"
                  autoFocus
                />
              </div>
              {phoneForm.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {phoneForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={checkPhone.isPending}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium uppercase tracking-wide text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {checkPhone.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Continue"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Have trouble logging in?{" "}
            <a
              href={getWhatsAppSupportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#7A2436] hover:underline"
            >
              Get help
            </a>
          </p>
        </>
      )}

      {step === "login" && (
        <>
          <button
            onClick={goToStart}
            className="mb-2 flex items-center gap-1 text-sm text-gray-500 hover:text-black"
          >
            <ChevronLeft size={16} /> +977 {phone}
          </button>

          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Login to track your orders.</p>

          <form onSubmit={loginForm.handleSubmit(onLogin)} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  {...loginForm.register("password")}
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
              {loginForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {login.isPending ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </>
      )}

      {step === "signup" && (
        <>
          <button
            onClick={goToStart}
            className="mb-2 flex items-center gap-1 text-sm text-gray-500 hover:text-black"
          >
            <ChevronLeft size={16} /> +977 {phone}
          </button>

          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-500">Sign up to place orders and track deliveries.</p>

          <form onSubmit={signupForm.handleSubmit(onSignup)} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                {...signupForm.register("name")}
                type="text"
                placeholder="Your name"
                autoFocus
                className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
              />
              {signupForm.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email <span className="font-normal text-gray-400">(for order updates)</span>
              </label>
              <input
                {...signupForm.register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#C9A227]/40 bg-white/60 px-4 py-3 outline-none focus:border-[#7A2436]"
              />
              {signupForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  {...signupForm.register("password")}
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
              {signupForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={signup.isPending}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B0A12] to-[#7A2436] py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {signup.isPending ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
