export interface CartItem {
  variantId: string;
  productSlug: string;
  productName: string;
  image?: string;
  size?: string | null;
  color?: string | null;
  price: number;
  quantity: number;
  stock: number;
  storeId?: string;
  storeName?: string;
}
