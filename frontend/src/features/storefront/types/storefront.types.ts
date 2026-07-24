export type CategorySection = "WOMEN" | "BEAUTY";

export interface StorefrontStore {
  id: string;
  name: string;
  logo?: string | null;
  promoEnabled?: boolean;
  promoBadgeText?: string | null;
  promoTitle?: string | null;
  promoDescription?: string | null;
  promoStartsAt?: string | null;
  promoEndsAt?: string | null;
}

export interface Promotion {
  storeId: string;
  storeName: string;
  storeLogo: string | null;
  title: string | null;
  description: string | null;
  badgeText: string | null;
  endsAt: string;
  categorySlug: string | null;
}

export interface StorefrontCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  section: CategorySection;
  store: StorefrontStore;
}

export interface StorefrontProductImage {
  id: string;
  url: string;
  position: number;
}

export interface StorefrontProductVariant {
  id: string;
  size?: string | null;
  color?: string | null;
  price: number;
  stock: number;
}

export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  brand?: string | null;
  isFeatured: boolean;
  category: StorefrontCategory;
  store: StorefrontStore;
  images: StorefrontProductImage[];
  variants: StorefrontProductVariant[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface StorefrontProductsResponse {
  products: StorefrontProduct[];
  pagination: Pagination;
}
