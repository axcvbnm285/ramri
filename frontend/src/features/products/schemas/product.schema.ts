import { z } from "zod";

export const sizeStockSchema = z.object({
  id: z.string().optional(),
  size: z.string().optional(), // "" = no size for this row
  stock: z.number().min(0, "Stock can't be negative"),
});

export const colorGroupSchema = z.object({
  color: z.string().optional(), // "" = no color for this group
  priceOverride: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? null : Number(val)),
    z.number().positive().nullable()
  ),
  sizeStocks: z.array(sizeStockSchema).min(1),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is required"),

  description: z.string().optional(),

  brand: z.string().optional(),

  categoryId: z.string().min(1, "Select a category"),

  isFeatured: z.boolean(),

  images: z.array(
    z.object({
      url: z.string(),
      publicId: z.string(),
    })
  ),

  basePrice: z.number().positive("Base price is required"),

  colorGroups: z
    .array(colorGroupSchema)
    .min(1, "Add at least one color / stock group"),
});

export type ProductSchema = z.infer<typeof productSchema>;
export type ColorGroup = z.infer<typeof colorGroupSchema>;
export type SizeStock = z.infer<typeof sizeStockSchema>;
