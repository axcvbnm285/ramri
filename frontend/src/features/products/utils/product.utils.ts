import { Product, ProductVariant } from "../types/product.types";
import { ColorGroup } from "../schemas/product.schema";

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

/**
 * Groups a product's flat variant list back into color groups for the edit
 * form. Base price is the most common price across all variants; a color
 * group only gets a priceOverride if its variants share one price that
 * differs from that base.
 */
export function variantsToColorGroups(variants: ProductVariant[]): {
  basePrice: number;
  colorGroups: ColorGroup[];
} {
  if (variants.length === 0) {
    return {
      basePrice: 0,
      colorGroups: [{ color: "", priceOverride: null, sizeStocks: [{ size: "", stock: 0 }] }],
    };
  }

  const priceCounts = new Map<number, number>();
  for (const v of variants) {
    const price = Number(v.price);
    priceCounts.set(price, (priceCounts.get(price) ?? 0) + 1);
  }

  let basePrice = Number(variants[0].price);
  let maxCount = 0;
  for (const [price, count] of priceCounts) {
    if (count > maxCount) {
      maxCount = count;
      basePrice = price;
    }
  }

  const groups = new Map<string, ProductVariant[]>();
  for (const v of variants) {
    const key = v.color ?? "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(v);
  }

  const colorGroups: ColorGroup[] = Array.from(groups.entries()).map(([color, groupVariants]) => {
    const groupPrice = Number(groupVariants[0].price);
    const allSamePrice = groupVariants.every((v) => Number(v.price) === groupPrice);
    const priceOverride = allSamePrice && groupPrice !== basePrice ? groupPrice : null;

    return {
      color,
      priceOverride,
      sizeStocks: groupVariants.map((v) => ({
        id: v.id,
        size: v.size ?? "",
        stock: Number(v.stock),
      })),
    };
  });

  return { basePrice, colorGroups };
}