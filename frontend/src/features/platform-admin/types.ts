export interface PlatformAdmin {
  name: string;
  email: string;
}

export interface PendingStore {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  users: { name: string; email: string }[];
}

export interface PlatformStore {
  id: string;
  name: string;
  email: string;
  logo: string | null;
  isActive: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  users: { name: string; email: string }[];
  _count: { products: number; orders: number };
}

export interface PlatformStats {
  stores: { pending: number; approved: number; rejected: number };
  totalOrders: number;
  totalCustomers: number;
  totalGmv: number;
  topStores: {
    store: { id: string; name: string; logo: string | null } | null;
    revenue: number;
  }[];
}
