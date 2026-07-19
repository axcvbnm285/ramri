import { Suspense } from "react";

import CustomerLoginForm from "@/features/customerAuth/components/CustomerLoginForm";
import AuthShell from "@/components/auth/AuthShell";

export default function ShopLoginPage() {
  return (
    <Suspense>
      <AuthShell>
        <div className="flex justify-center">
          <CustomerLoginForm />
        </div>
      </AuthShell>
    </Suspense>
  );
}
