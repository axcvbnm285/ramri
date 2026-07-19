"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useProduct } from "@/features/products/hooks/useProduct";
import { variantsToColorGroups } from "@/features/products/utils/product.utils";
import ProductForm from "@/features/products/components/ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-red-500">Failed to load product.</p>
      </div>
    );
  }

  const { basePrice, colorGroups } = variantsToColorGroups(data.variants ?? []);

  const initialValues = {
    name: data.name ?? "",
    description: data.description ?? "",
    brand: data.brand ?? "",
    categoryId: data.categoryId ?? data.category?.id ?? "",
    isFeatured: data.isFeatured ?? false,
    images: data.images ?? [],
    basePrice,
    colorGroups,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <ProductForm mode="edit" productId={id} initialValues={initialValues} />
    </div>
  );
}
