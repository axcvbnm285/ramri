"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { usePromotions } from "@/features/storefront/hooks/usePromotions";
import { useCountdown } from "@/hooks/useCountdown";
import PagodaMotif from "@/components/auth/PagodaMotif";
import StoreLogoAvatar from "@/components/StoreLogoAvatar";
import { Promotion } from "@/features/storefront/types/storefront.types";

export default function PromoBanner() {
  const { data: promotions } = usePromotions();

  if (!promotions || promotions.length === 0) return null;

  return (
    <div className="space-y-6">
      {promotions.map((promo) => (
        <PromoCard key={promo.storeId} promo={promo} />
      ))}
    </div>
  );
}

function PromoCard({ promo }: { promo: Promotion }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(promo.endsAt);

  if (isExpired) return null;

  const shopHref = promo.categorySlug ? `/shop/categories/${promo.categorySlug}` : "/shop";

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-nepal-maroon-dark via-nepal-maroon to-[#4a1420] p-8 text-white shadow-2xl md:p-12"
    >
      <PagodaMotif className="pointer-events-none absolute -left-10 bottom-0 h-[110%] w-auto text-nepal-gold/10" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-nepal-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-nepal-maroon/40 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-nepal-gold">
            <Sparkles size={14} />
            Limited time offer from {promo.storeName}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <StoreLogoAvatar
              logoUrl={promo.storeLogo}
              name={promo.storeName}
              size={22}
              className="border-nepal-gold/40"
            />
            <span className="text-sm font-semibold text-white/90">{promo.storeName}</span>
          </div>

          {promo.title && (
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{promo.title}</h2>
          )}

          {promo.description && (
            <p className="mt-3 text-sm text-white/80 md:text-base">{promo.description}</p>
          )}

          {promo.badgeText && (
            <span className="mt-5 inline-block -rotate-2 rounded-lg bg-nepal-gold px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-nepal-maroon-dark shadow-lg">
              {promo.badgeText}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <div className="flex gap-2">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex w-16 flex-col items-center rounded-xl border border-nepal-gold/30 bg-white/10 py-2.5 backdrop-blur-sm"
              >
                <span className="text-2xl font-bold tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-white/70">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={shopHref}
            className="flex items-center gap-2 rounded-full bg-nepal-gold px-6 py-3 text-sm font-bold text-nepal-maroon-dark transition hover:opacity-90"
          >
            Shop Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
