import type { Metadata } from "next";

import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF3E4] via-[#FAF0DD] to-[#F5E7C8]">
      <CustomerAuthShell>
        <div className="flex justify-center">
          <ForgotPasswordForm />
        </div>
      </CustomerAuthShell>
    </div>
  );
}
