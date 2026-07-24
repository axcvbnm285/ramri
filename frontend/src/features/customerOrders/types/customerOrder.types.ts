export type OrderStatus = "PENDING" | "CONFIRMED" | "DISPATCHED" | "RECEIVED" | "CANCELLED";
export type PaymentStatus = "PENDING_VERIFICATION" | "PAID" | "REJECTED";

export interface OrderItem {
  id: string;
  productName: string;
  size?: string | null;
  color?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
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

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  paymentMethod: "COD" | "QR";
  paymentStatus?: PaymentStatus | null;
  paymentProofUrl?: string | null;
  paymentReference?: string | null;
  courierName?: string | null;
  trackingId?: string | null;
  trackingUrl?: string | null;
  dispatchedAt?: string | null;
  receivedAt?: string | null;
  createdAt: string;
  items: OrderItem[];
  address?: OrderAddress;
  statusLogs?: OrderStatusLog[];
}
