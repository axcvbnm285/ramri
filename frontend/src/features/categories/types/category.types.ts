export type CategorySection = "WOMEN" | "BEAUTY";

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  publicId?: string | null;
  isActive: boolean;
  section: CategorySection;
  createdAt: string;
}
