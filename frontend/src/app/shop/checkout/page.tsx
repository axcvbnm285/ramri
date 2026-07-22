import type { Metadata } from "next";
import { Suspense } from "react";

import CheckoutPageClient from "@/features/checkout/components/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: true },
};

export default function ShopCheckoutPage() {
  return (
    <Suspense>
      <CheckoutPageClient />
    </Suspense>
  );
}
