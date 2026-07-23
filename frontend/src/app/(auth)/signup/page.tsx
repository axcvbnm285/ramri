import type { Metadata } from "next";

import SignupForm from "@/features/auth/components/SignupForm";
import CustomerAuthShell from "@/components/auth/CustomerAuthShell";

export const metadata: Metadata = {
  title: "Create Your Store",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF3E4] via-[#FAF0DD] to-[#F5E7C8]">
      <CustomerAuthShell>
        <div className="flex justify-center">
          <SignupForm />
        </div>
      </CustomerAuthShell>
    </div>
  );
}
