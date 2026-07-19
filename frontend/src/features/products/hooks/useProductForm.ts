import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchema } from "../schemas/product.schema";

export function useProductForm(initialValues?: Partial<ProductSchema>) {
  return useForm<ProductSchema>({
    // zod's `preprocess` (used for the priceOverride "" -> null coercion) makes
    // the resolver's inferred input type `unknown`, which trips up RHF's
    // generic matching even though the parsed output matches ProductSchema.
    resolver: zodResolver(productSchema) as unknown as Resolver<ProductSchema>,
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      categoryId: "",
      isFeatured: false,
      images: [],
      basePrice: 0,
      colorGroups: [
        { color: "", priceOverride: null, sizeStocks: [{ size: "", stock: 0 }] },
      ],
      ...initialValues,
    },
  });
}
