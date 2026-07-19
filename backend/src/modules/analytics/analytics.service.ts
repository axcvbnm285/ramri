import { AnalyticsRepository } from "./analytics.repository";

export class AnalyticsService {
  private repository = new AnalyticsRepository();

  async getOverview(storeId: string) {
    const now = new Date();
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    const [products, customers, orders, ordersToday, revenue] = await Promise.all([
      this.repository.countProducts(storeId),
      this.repository.countCustomers(storeId),
      this.repository.countOrders(storeId),
      this.repository.countOrdersToday(storeId, startOfToday),
      this.repository.sumRevenue(storeId),
    ]);

    return {
      products,
      customers,
      orders,
      ordersToday,
      revenue: Number(revenue),
    };
  }

  async getDailyOrders(storeId: string, days: number) {
    const now = new Date();
    const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const since = new Date(todayUtc - (days - 1) * 24 * 60 * 60 * 1000);

    const orders = await this.repository.findOrdersSince(storeId, since);

    const buckets = new Map<string, { date: string; count: number; revenue: number }>();

    for (let i = 0; i < days; i++) {
      const key = new Date(since.getTime() + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      buckets.set(key, { date: key, count: 0, revenue: 0 });
    }

    for (const order of orders) {
      const key = order.createdAt.toISOString().slice(0, 10);
      const bucket = buckets.get(key);
      if (bucket) {
        bucket.count += 1;
        if (order.status !== "CANCELLED") {
          bucket.revenue += Number(order.total);
        }
      }
    }

    return Array.from(buckets.values());
  }
}
