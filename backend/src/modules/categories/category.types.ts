import { CategorySection } from "@prisma/client";

export interface CreateCategoryDto {
  name: string;
  section?: CategorySection;
  imageUrl?: string;
  publicId?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  isActive?: boolean;
  section?: CategorySection;
  imageUrl?: string;
  publicId?: string;
}