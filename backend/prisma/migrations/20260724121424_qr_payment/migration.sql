-- QR-code payment with manual verification: each store gets a payment QR
-- (Settings, same as the logo), and an Order records the proof a customer
-- submitted plus whether the store owner has verified it.
ALTER TYPE "PaymentMethod" ADD VALUE 'QR';

CREATE TYPE "PaymentStatus" AS ENUM ('PENDING_VERIFICATION', 'PAID', 'REJECTED');

ALTER TABLE "Store" ADD COLUMN "paymentQrUrl" TEXT;
ALTER TABLE "Store" ADD COLUMN "paymentQrPublicId" TEXT;

ALTER TABLE "Order" ADD COLUMN "paymentStatus" "PaymentStatus";
ALTER TABLE "Order" ADD COLUMN "paymentProofUrl" TEXT;
ALTER TABLE "Order" ADD COLUMN "paymentProofPublicId" TEXT;
ALTER TABLE "Order" ADD COLUMN "paymentReference" TEXT;
ALTER TABLE "Order" ADD COLUMN "paymentVerifiedAt" TIMESTAMP(3);
