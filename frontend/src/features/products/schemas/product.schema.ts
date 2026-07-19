import { z } from "zod";

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

  variants: z
    .array(
      z.object({
        size: z.string().optional(),
        color: z.string().optional(),
        price: z.number().positive(),
        stock: z.number().min(0),
      })
    )
    .min(1, "Add at least one variant"),
});

export type ProductSchema = z.infer<typeof productSchema>;