import prisma from "@/lib/prisma";

export class PlatformAdminRepository {
  async findPendingStores() {
    return prisma.store.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: { users: { select: { name: true, email: true }, take: 1 } },
    });
  }

  async setStoreStatus(id: string, status: "APPROVED" | "REJECTED") {
    return prisma.store.update({
      where: { id },
      data: { status },
      include: { users: { select: { name: true, email: true }, take: 1 } },
    });
  }

  async findAllStores() {
    const stores = await prisma.store.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        users: { select: { name: true, email: true }, take: 1 },
        _count: { select: { products: true, orders: true } },
      },
    });

    return stores;
  }

  async setStoreActive(id: string, isActive: boolean) {
    return prisma.store.update({ where: { id }, data: { isActive } });
  }

  async countStoresByStatus() {
    const [pending, approved, rejected] = await prisma.$transaction([
      prisma.store.count({ where: { status: "PENDING" } }),
      prisma.store.count({ where: { status: "APPROVED" } }),
      prisma.store.count({ where: { status: "REJECTED" } }),
    ]);
    return { pending, approved, rejected };
  }

  async countOrders() {
    return prisma.order.count();
  }

  async countCustomers() {
    return prisma.customer.count();
  }

  async sumGmv() {
    const result = await prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    });
    return result._sum.total ?? 0;
  }

  async topStoresByRevenue(limit = 5) {
    const grouped = await prisma.order.groupBy({
      by: ["storeId"],
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
      orderBy: { _sum: { total: "desc" } },
      take: limit,
    });

    const stores = await prisma.store.findMany({
      where: { id: { in: grouped.map((g) => g.storeId) } },
      select: { id: true, name: true, logo: true },
    });
    const storeMap = new Map(stores.map((s) => [s.id, s]));

    return grouped.map((g) => ({
      store: storeMap.get(g.storeId) ?? null,
      revenue: g._sum.total ?? 0,
    }));
  }
}
