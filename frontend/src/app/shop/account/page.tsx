import type { Metadata } from "next";

import AccountPageClient from "@/features/customerAccount/components/AccountPageClient";

export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false, follow: true },
};

export default function ShopAccountPage() {
  return <AccountPageClient />;
}
