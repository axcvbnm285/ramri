import type { Metadata } from "next";
import { Suspense } from "react";

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF3E4] via-[#FAF0DD] to-[#F5E7C8]">
      <Suspense>
        <CustomerAuthShell>
          <div className="flex justify-center">
            <ResetPasswordForm />
          </div>
        </CustomerAuthShell>
      </Suspense>
    </div>
  );
}
