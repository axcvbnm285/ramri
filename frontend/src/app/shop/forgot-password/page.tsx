import type { Metadata } from "next";
import { Suspense } from "react";

import ForgotPasswordForm from "@/features/customerAuth/components/ForgotPasswordForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export default function ShopForgotPasswordPage() {
  return (
    <Suspense>
      <CustomerAuthShell>
        <div className="flex justify-center">
          <ForgotPasswordForm />
        </div>
      </CustomerAuthShell>
    </Suspense>
  );
}
