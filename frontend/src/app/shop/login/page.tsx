import type { Metadata } from "next";
import { Suspense } from "react";

import CustomerAuthForm from "@/features/customerAuth/components/CustomerAuthForm";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: true },
};

export default function ShopLoginPage() {
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
