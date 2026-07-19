export interface LowStockVariant {
  id: string;
  size?: string | null;
  color?: string | null;
  sku: string;
  stock: number;
  price: number;
  product: {
    id: string;
    name: string;
  };
}

export interface InventoryLog {
  id: string;
  change: number;
  previousStock: number;
  newStock: number;
  reason: "INITIAL_STOCK" | "ORDER" | "RESTOCK" | "MANUAL_ADJUSTMENT" | "RETURN";
  note?: string | null;
  createdAt: string;
  variant: {
    id: string;
    size?: string | null;
    color?: string | null;
    sku: string;
    product: { id: string; name: string };
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface InventoryLogsResponse {
  logs: InventoryLog[];
  pagination: Pagination;
}
