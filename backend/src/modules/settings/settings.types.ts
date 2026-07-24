export interface UpdateStoreDto {
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
