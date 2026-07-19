export interface PlaceOrderItemDto {
  variantId: string;
  quantity: number;
}

export interface PlaceOrderDto {
  addressId: string;
  items: PlaceOrderItemDto[];
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: "CONFIRMED" | "DISPATCHED";
  courierName?: string;
  trackingId?: string;
  trackingUrl?: string;
  note?: string;
}
