import { Product } from "../types/product.types";

export function getTotalStock(product: Product) {
  return product.variants.reduce(
    (sum, variant) => sum + Number(variant.stock),
    0
  );
}

export function getLowestPrice(product: Product) {
  if (product.variants.length === 0) {
    return 0;
  }

  return Math.min(
    ...product.variants.map((variant) =>
      Number(variant.price)
    )
  );
}