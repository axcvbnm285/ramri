import prisma from "@/lib/prisma";

const CART_ITEM_INCLUDE = {
  variant: {
    include: {
      product: {
        include: {
          images: { orderBy: { position: "asc" as const }, take: 1 },
          store: { select: { id: true, name: true, paymentQrUrl: true } },
        },
      },
    },
  },
};

export class CartRepository {
  async findAll(customerId: string) {
    return prisma.cartItem.findMany({
      where: { customerId },
      orderBy: { createdAt: "asc" },
      include: CART_ITEM_INCLUDE,
    });
  }

  async findVariant(variantId: string) {
    return prisma.productVariant.findUnique({ where: { id: variantId } });
  }

  async findOne(customerId: string, variantId: string) {
    return prisma.cartItem.findUnique({
      where: { customerId_variantId: { customerId, variantId } },
    });
  }

  async upsertAdd(customerId: string, variantId: string, quantity: number) {
    return prisma.cartItem.upsert({
      where: { customerId_variantId: { customerId, variantId } },
      create: { customerId, variantId, quantity },
      update: { quantity: { increment: quantity } },
      include: CART_ITEM_INCLUDE,
    });
  }

  async setQuantity(customerId: string, variantId: string, quantity: number) {
    return prisma.cartItem.update({
      where: { customerId_variantId: { customerId, variantId } },
      data: { quantity },
      include: CART_ITEM_INCLUDE,
    });
  }

  async remove(customerId: string, variantId: string) {
    await prisma.cartItem.deleteMany({ where: { customerId, variantId } });
  }

  async clear(customerId: string) {
    await prisma.cartItem.deleteMany({ where: { customerId } });
  }
}
