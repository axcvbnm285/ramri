import type { Metadata } from "next";
import { Suspense } from "react";

import CustomerAuthForm from "@/features/customerAuth/components/CustomerAuthForm";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: { index: false, follow: true },
};

export default function ShopSignupPage() {
  return (
    <Suspense>
      <AuthShell>
        <div className="flex justify-center">
          <CustomerAuthForm />
        </div>
      </AuthShell>
    </Suspense>
  );
}
