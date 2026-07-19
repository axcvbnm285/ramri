import prisma from "@/lib/prisma";

export class AnalyticsRepository {
  async countProducts(storeId: string) {
    return prisma.product.count({ where: { storeId } });
  }

  async countCustomers(storeId: string) {
    return prisma.customer.count({ where: { storeId } });
  }

  async countOrders(storeId: string) {
    return prisma.order.count({ where: { storeId } });
  }

  async countOrdersToday(storeId: string, since: Date) {
    return prisma.order.count({
      where: { storeId, createdAt: { gte: since } },
    });
  }

  async sumRevenue(storeId: string) {
    const result = await prisma.order.aggregate({
      where: { storeId, status: { not: "CANCELLED" } },
      _sum: { total: true },
    });
    return result._sum.total ?? 0;
  }

  async findOrdersSince(storeId: string, since: Date) {
    return prisma.order.findMany({
      where: { storeId, createdAt: { gte: since } },
      select: { createdAt: true, status: true, total: true },
      orderBy: { createdAt: "asc" },
    });
  }
}
