import type { Metadata } from "next";
import { Suspense } from "react";

import CustomerAuthForm from "@/features/customerAuth/components/CustomerAuthForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: { index: false, follow: true },
};

export default function ShopSignupPage() {
  return (
    <Suspense>
      <CustomerAuthShell>
        <div className="flex justify-center">
          <CustomerAuthForm />
        </div>
      </CustomerAuthShell>
    </Suspense>
  );
}
