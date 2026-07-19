import { Suspense } from "react";

import CustomerLoginForm from "@/features/customerAuth/components/CustomerLoginForm";

export default function ShopLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Suspense>
        <CustomerLoginForm />
      </Suspense>
    </div>
  );
}
