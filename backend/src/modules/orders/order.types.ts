export interface PlaceOrderItemDto {
  variantId: string;
  quantity: number;
}

export interface PaymentProofDto {
  proofUrl?: string;
  proofPublicId?: string;
  reference?: string;
}

export interface PlaceOrderDto {
  addressId: string;
  items: PlaceOrderItemDto[];
  notes?: string;
  // Keyed by storeId — every store represented in `items` must have an
  // entry here with a proofUrl and/or reference. Checkout is QR-payment-only
  // (COD isn't viable since deliveries go through Porter, which can't
  // collect cash), so this is required, not optional per store.
  paymentProofs?: Record<string, PaymentProofDto>;
}

export interface UpdateOrderStatusDto {
  status: "CONFIRMED" | "DISPATCHED";
  courierName?: string;
  trackingId?: string;
  trackingUrl?: string;
  note?: string;
}

export interface VerifyPaymentDto {
  approved: boolean;
  note?: string;
}
