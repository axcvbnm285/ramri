export type OrderStatus = "PENDING" | "CONFIRMED" | "DISPATCHED" | "RECEIVED" | "CANCELLED";
export type PaymentStatus = "PENDING_VERIFICATION" | "PAID" | "REJECTED";

export interface OrderItem {
  id: string;
  variantId: string;
  productName: string;
  size?: string | null;
  color?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
}

export interface OrderAddress {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderStatusLog {
  id: string;
  status: OrderStatus;
  note?: string | null;
  changedBy: "ADMIN" | "CUSTOMER" | "SYSTEM";
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  paymentMethod: "COD" | "QR";
  paymentStatus?: PaymentStatus | null;
  paymentProofUrl?: string | null;
  paymentReference?: string | null;
  paymentVerifiedAt?: string | null;
  courierName?: string | null;
  trackingId?: string | null;
  trackingUrl?: string | null;
  notes?: string | null;
  dispatchedAt?: string | null;
  receivedAt?: string | null;
  cancelledAt?: string | null;
  createdAt: string;
  items: OrderItem[];
  customer?: OrderCustomer;
  address?: OrderAddress;
  statusLogs?: OrderStatusLog[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: Pagination;
}
