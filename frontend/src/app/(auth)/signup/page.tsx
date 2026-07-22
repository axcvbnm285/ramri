import type { Metadata } from "next";

import SignupForm from "@/features/auth/components/SignupForm";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Create Your Store",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <AuthShell
        tagline="Set up your store in minutes."
        subline="Start listing products and taking orders today."
      >
        <div className="flex justify-center">
          <SignupForm />
        </div>
      </AuthShell>
    </div>
  );
}
