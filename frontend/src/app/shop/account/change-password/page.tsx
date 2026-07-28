import type { Metadata } from "next";

import ChangePasswordClient from "@/features/customerAccount/components/ChangePasswordClient";

export const metadata: Metadata = {
  title: "Change Password",
  robots: { index: false, follow: true },
};

export default function ShopChangePasswordPage() {
  return <ChangePasswordClient />;
}
