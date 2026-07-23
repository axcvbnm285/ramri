-- Customer accounts are platform-wide, not owned by a store. storeId only
-- records which store's signup form a customer used first, so it must no
-- longer cascade-delete the customer when that store is removed (this was
-- the mechanism that wiped every customer account platform-wide when the
-- single "default" store everyone's signup pointed at got deleted).
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_storeId_fkey";
ALTER TABLE "Customer" ALTER COLUMN "storeId" DROP NOT NULL;
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
