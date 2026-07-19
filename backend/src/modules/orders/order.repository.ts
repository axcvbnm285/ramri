import prisma from "@/lib/prisma";
import { OrderStatus, StatusChangedBy } from "@prisma/client";
import { PlaceOrderItemDto } from "./order.types";
import { generateOrderNumber } from "@/utils/orderNumber";

export class OrderRepository {
  async findAddress(id: string, customerId: string) {
    return prisma.address.findFirst({ where: { id, customerId } });
  }

  async placeOrder(
    storeId: string,
    customerId: string,
    addressId: string,
    items: PlaceOrderItemDto[],
    notes?: string
  ) {
    return prisma.$transaction(
      async (tx) => {
      const orderNumber = generateOrderNumber();

      let subtotal = 0;

      const orderItemsData: {
        variantId: string;
        productName: string;
        size: any;
        color: string | null;
        price: any;
        quantity: number;
        subtotal: number;
      }[] = [];

      const inventoryLogs: {
        variantId: string;
        change: number;
        previousStock: number;
        newStock: number;
        reason: "ORDER";
        note: string;
      }[] = [];

      for (const item of items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
          include: { product: true },
        });

        if (!variant || variant.product.storeId !== storeId) {
          throw new Error("One or more items in your cart are no longer available.");
        }

        if (variant.stock < item.quantity) {
          const label = [variant.product.name, variant.size, variant.color]
            .filter(Boolean)
            .join(" - ");
          throw new Error(`${label} is out of stock.`);
        }

        const previousStock = variant.stock;
        const newStock = previousStock - item.quantity;

        await tx.productVariant.update({
          where: { id: variant.id },
          data: { stock: newStock },
        });

        inventoryLogs.push({
          variantId: variant.id,
          change: -item.quantity,
          previousStock,
          newStock,
          reason: "ORDER",
          note: `Order #${orderNumber}`,
        });

        const lineSubtotal = Number(variant.price) * item.quantity;
        subtotal += lineSubtotal;

        orderItemsData.push({
          variantId: variant.id,
          productName: variant.product.name,
          size: variant.size,
          color: variant.color,
          price: variant.price,
          quantity: item.quantity,
          subtotal: lineSubtotal,
        });
      }

      const order = await tx.order.create({
        data: {
          orderNumber,
          storeId,
          customerId,
          addressId,
          notes,
          subtotal,
          total: subtotal,
          items: { create: orderItemsData },
          statusLogs: {
            create: { status: "PENDING", changedBy: "CUSTOMER" },
          },
        },
        include: { items: true, address: true },
      });

      if (inventoryLogs.length > 0) {
        await tx.inventoryLog.createMany({ data: inventoryLogs });
      }

      return order;
      },
      { maxWait: 10000, timeout: 20000 }
    );
  }

  async findAll(
    storeId: string,
    query: { page?: number; limit?: number; status?: string; search?: string }
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const where: any = { storeId };

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { orderNumber: { contains: query.search, mode: "insensitive" } },
        { customer: { name: { contains: query.search, mode: "insensitive" } } },
        { customer: { phone: { contains: query.search, mode: "insensitive" } } },
      ];
    }

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { customer: true, items: true },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, storeId: string) {
    return prisma.order.findFirst({
      where: { id, storeId },
      include: {
        customer: true,
        address: true,
        items: true,
        statusLogs: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  async findMine(customerId: string) {
    return prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
  }

  async findMineDetail(id: string, customerId: string) {
    return prisma.order.findFirst({
      where: { id, customerId },
      include: {
        items: true,
        address: true,
        statusLogs: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  async updateStatusWithLog(
    id: string,
    data: Record<string, unknown>,
    status: OrderStatus,
    changedBy: StatusChangedBy,
    note?: string
  ) {
    return prisma.order.update({
      where: { id },
      data: {
        ...data,
        statusLogs: { create: { status, changedBy, note } },
      },
    });
  }

  async cancelOrder(id: string) {
    return prisma.$transaction(
      async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      for (const item of order.items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (!variant) continue;

        const previousStock = variant.stock;
        const newStock = previousStock + item.quantity;

        await tx.productVariant.update({
          where: { id: variant.id },
          data: { stock: newStock },
        });

        await tx.inventoryLog.create({
          data: {
            variantId: variant.id,
            change: item.quantity,
            previousStock,
            newStock,
            reason: "RETURN",
            note: `Order #${order.orderNumber} cancelled`,
          },
        });
      }

      return tx.order.update({
        where: { id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          statusLogs: { create: { status: "CANCELLED", changedBy: "ADMIN" } },
        },
      });
      },
      { maxWait: 10000, timeout: 20000 }
    );
  }

  async markReceived(id: string, changedBy: StatusChangedBy) {
    return prisma.order.update({
      where: { id },
      data: {
        status: "RECEIVED",
        receivedAt: new Date(),
        statusLogs: { create: { status: "RECEIVED", changedBy } },
      },
    });
  }
}
