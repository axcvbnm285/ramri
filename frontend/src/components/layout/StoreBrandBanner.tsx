"use client";

import { useStoreSettings } from "@/features/settings/hooks/useStoreSettings";
import StoreLogoAvatar from "@/components/StoreLogoAvatar";

export default function StoreBrandBanner() {
  const { data: store } = useStoreSettings();

  return (
    <div className="mb-6 flex justify-center">
      <StoreLogoAvatar
        logoUrl={store?.logo}
        name={store?.name ?? "Store"}
        size={72}
        className="border-nepal-gold/30 shadow-sm"
      />
    </div>
  );
}
