export interface Store {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  logo?: string | null;
  logoPublicId?: string | null;
  paymentQrUrl?: string | null;
  paymentQrPublicId?: string | null;
  promoEnabled: boolean;
  promoBadgeText?: string | null;
  promoTitle?: string | null;
  promoDescription?: string | null;
  promoStartsAt?: string | null;
  promoEndsAt?: string | null;
  isActive: boolean;
  address?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  whatsapp?: string | null;
  createdAt: string;
}

export interface UpdateStorePayload {
  name?: string;
  logo?: string;
  logoPublicId?: string;
  paymentQrUrl?: string;
  paymentQrPublicId?: string;
  promoEnabled?: boolean;
  promoBadgeText?: string;
  promoTitle?: string;
  promoDescription?: string;
  promoStartsAt?: string;
  promoEndsAt?: string;
}
