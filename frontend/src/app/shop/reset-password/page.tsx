import type { Metadata } from "next";
import { Suspense } from "react";

import ResetPasswordForm from "@/features/customerAuth/components/ResetPasswordForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function ShopResetPasswordPage() {
  return (
    <Suspense>
      <CustomerAuthShell>
        <div className="flex justify-center">
          <ResetPasswordForm />
        </div>
      </CustomerAuthShell>
    </Suspense>
  );
}
