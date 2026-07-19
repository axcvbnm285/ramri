export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
}
