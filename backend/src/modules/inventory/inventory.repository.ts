import prisma from "@/lib/prisma";
import { InventoryReason } from "@prisma/client";

export class InventoryRepository {
  async findLogs(
    storeId: string,
    query: { page?: number; limit?: number; productId?: string; reason?: string }
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where: any = {
      variant: { product: { storeId } },
    };

    if (query.productId) {
      where.variant = { ...where.variant, productId: query.productId };
    }

    if (query.reason) {
      where.reason = query.reason;
    }

    const [logs, total] = await prisma.$transaction([
      prisma.inventoryLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          variant: { include: { product: true } },
        },
      }),
      prisma.inventoryLog.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findLowStock(storeId: string, threshold: number) {
    return prisma.productVariant.findMany({
      where: {
        stock: { lte: threshold },
        product: { storeId },
      },
      include: { product: true },
      orderBy: { stock: "asc" },
    });
  }

  async findVariant(id: string, storeId: string) {
    return prisma.productVariant.findFirst({
      where: { id, product: { storeId } },
      include: { product: true },
    });
  }

  async adjustStock(
    variantId: string,
    change: number,
    previousStock: number,
    newStock: number,
    reason: InventoryReason,
    note?: string
  ) {
    return prisma.$transaction(async (tx) => {
      await tx.productVariant.update({
        where: { id: variantId },
        data: { stock: newStock },
      });

      return tx.inventoryLog.create({
        data: { variantId, change, previousStock, newStock, reason, note },
      });
    });
  }
}
