"use client";

import Link from "next/link";
import { useState } from "react";
import { Gift, X } from "lucide-react";

import { usePromotions } from "@/features/storefront/hooks/usePromotions";
import { useCountdown } from "@/hooks/useCountdown";

export default function PromoBar() {
  const { data: promotions } = usePromotions();
  const [dismissed, setDismissed] = useState(false);

  const promo = [...(promotions ?? [])].sort(
    (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime()
  )[0];

  const countdown = useCountdown(promo?.endsAt ?? new Date().toISOString());

  if (!promo || dismissed || countdown.isExpired) return null;

  const shopHref = promo.categorySlug ? `/shop/categories/${promo.categorySlug}` : "/shop";

  return (
    <div className="flex items-center justify-center gap-3 bg-nepal-maroon px-4 py-2 text-xs text-white md:text-sm">
      <Gift size={14} className="shrink-0 text-nepal-gold" />

      <p className="truncate">
        <span className="font-bold">{promo.badgeText ?? "Special offer"}</span>
        {" at "}
        <span className="font-semibold">{promo.storeName}</span>
        {" — ends in "}
        {countdown.days > 0 ? `${countdown.days}d ` : ""}
        {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:
        {String(countdown.seconds).padStart(2, "0")}
      </p>

      <Link href={shopHref} className="shrink-0 font-bold text-nepal-gold hover:underline">
        Shop Now
      </Link>

      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-white/60 hover:text-white"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
