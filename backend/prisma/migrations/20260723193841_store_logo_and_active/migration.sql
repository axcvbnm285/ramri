-- Track the Cloudinary public_id for the store logo (so a future replace
-- could clean up the old asset) and let a store be deactivated ("deleted")
-- without touching its Products/Orders, which are RESTRICT-constrained
-- against Store and cannot be hard-deleted while they exist.
ALTER TABLE "Store" ADD COLUMN "logoPublicId" TEXT;
ALTER TABLE "Store" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
