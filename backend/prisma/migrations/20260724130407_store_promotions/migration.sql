-- Self-service store promotion campaigns (e.g. limited-time Buy 1 Get 1
-- Free), shown as a countdown banner/badge on the storefront.
ALTER TABLE "Store" ADD COLUMN "promoEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Store" ADD COLUMN "promoBadgeText" TEXT;
ALTER TABLE "Store" ADD COLUMN "promoTitle" TEXT;
ALTER TABLE "Store" ADD COLUMN "promoDescription" TEXT;
ALTER TABLE "Store" ADD COLUMN "promoStartsAt" TIMESTAMP(3);
ALTER TABLE "Store" ADD COLUMN "promoEndsAt" TIMESTAMP(3);
