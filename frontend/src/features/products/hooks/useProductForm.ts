import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchema } from "../schemas/product.schema";

export function useProductForm(initialValues?: Partial<ProductSchema>) {
  return useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      categoryId: "",
      isFeatured: false,
      images: [],
      variants: [{ size: "M", color: "", price: 0, stock: 0 }],
      ...initialValues,
    },
  });
}
