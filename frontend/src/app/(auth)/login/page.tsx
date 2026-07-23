import type { Metadata } from "next";

import LoginForm from "@/features/auth/components/LoginForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Store Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF3E4] via-[#FAF0DD] to-[#F5E7C8]">
      <CustomerAuthShell>
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </CustomerAuthShell>
    </div>
  );
}
