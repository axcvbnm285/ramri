import { Suspense } from "react";

import CustomerAuthForm from "@/features/customerAuth/components/CustomerAuthForm";
import AuthShell from "@/components/auth/AuthShell";

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
