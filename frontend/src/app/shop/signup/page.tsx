import { Suspense } from "react";

import CustomerSignupForm from "@/features/customerAuth/components/CustomerSignupForm";

export default function ShopSignupPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Suspense>
        <CustomerSignupForm />
      </Suspense>
    </div>
  );
}
