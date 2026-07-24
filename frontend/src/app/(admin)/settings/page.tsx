"use client";

import { Loader2 } from "lucide-react";

import { useStoreSettings } from "@/features/settings/hooks/useStoreSettings";
import StoreNameCard from "@/features/settings/components/StoreNameCard";
import StoreLogoCard from "@/features/settings/components/StoreLogoCard";
import PaymentQrCard from "@/features/settings/components/PaymentQrCard";
import PromotionCard from "@/features/settings/components/PromotionCard";
import ContactUsCard from "@/features/settings/components/ContactUsCard";
import DeleteStoreCard from "@/features/settings/components/DeleteStoreCard";

export default function SettingsPage() {
  const { data: store, isLoading, isError } = useStoreSettings();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !store) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-red-500">Failed to load store settings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-gray-500">Manage how your store looks and runs.</p>
      </div>

      <StoreNameCard store={store} />
      <StoreLogoCard store={store} />
      <PaymentQrCard store={store} />
      <PromotionCard store={store} />
      <ContactUsCard />
      <DeleteStoreCard store={store} />
    </div>
  );
}
