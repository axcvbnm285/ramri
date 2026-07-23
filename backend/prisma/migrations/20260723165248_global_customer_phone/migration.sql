-- Make Customer phone globally unique across all stores (was per-store),
-- since customer accounts are now platform-wide, not tied to one store.
DROP INDEX "Customer_storeId_phone_key";
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
