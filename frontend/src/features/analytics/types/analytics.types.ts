export interface AnalyticsOverview {
  products: number;
  customers: number;
  orders: number;
  ordersToday: number;
  revenue: number;
}

export interface DailyOrdersPoint {
  date: string;
  count: number;
  revenue: number;
}
