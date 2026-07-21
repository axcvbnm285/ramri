-- CreateEnum
CREATE TYPE "CategorySection" AS ENUM ('WOMEN', 'BEAUTY');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "section" "CategorySection" NOT NULL DEFAULT 'WOMEN';
