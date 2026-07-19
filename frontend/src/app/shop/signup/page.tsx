import { Suspense } from "react";

import CustomerSignupForm from "@/features/customerAuth/components/CustomerSignupForm";
import AuthShell from "@/components/auth/AuthShell";

export default function ShopSignupPage() {
  return (
    <Suspense>
      <AuthShell>
        <div className="flex justify-center">
          <CustomerSignupForm />
        </div>
      </AuthShell>
    </Suspense>
  );
}
