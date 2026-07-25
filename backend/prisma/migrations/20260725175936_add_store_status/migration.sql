-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN "status" "StoreStatus" NOT NULL DEFAULT 'PENDING';

-- Backfill: every store that existed before approval gating shipped is
-- already live and trusted, so grandfather them all in as approved. Only
-- stores created from this point forward start PENDING.
UPDATE "Store" SET "status" = 'APPROVED';
