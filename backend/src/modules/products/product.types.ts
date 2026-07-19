import { Size } from "@prisma/client";

export interface CreateVariantDto {
  size?: Size | null;
  color?: string;
  price: number;
  stock: number;
}

export interface CreateProductImageDto {
  url: string;
  publicId: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  brand?: string;
  categoryId: string;
  isFeatured?: boolean;
  images?: CreateProductImageDto[];
  variants: CreateVariantDto[];
}

export interface UpdateVariantDto {
  id?: string;
  size?: Size | null;
  color?: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  brand?: string;
  categoryId?: string;
  isFeatured?: boolean;
  images?: CreateProductImageDto[];
  variants?: UpdateVariantDto[];
}