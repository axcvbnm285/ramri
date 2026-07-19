import { Order } from "@/features/orders/types/order.types";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  createdAt: string;
  _count?: { orders: number };
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface CustomerDetail extends Customer {
  addresses: Address[];
  orders: Order[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomersResponse {
  customers: Customer[];
  pagination: Pagination;
}
