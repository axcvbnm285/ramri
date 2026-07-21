export type CategorySection = "WOMEN" | "BEAUTY";

export interface StorefrontCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  section: CategorySection;
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
