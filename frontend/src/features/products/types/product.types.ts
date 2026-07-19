export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color?: string;
  stock: number;
  price: number;
  sku: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  status: string;
  isFeatured: boolean;

  images: ProductImage[];

  variants: ProductVariant[];

  category: ProductCategory;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}