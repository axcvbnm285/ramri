"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/features/products/hooks/useProduct";
import ProductForm from "@/features/products/components/ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProduct(id);

  if (isLoading) return <div className="p-6">Loading product...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load product.</div>;
  if (!data) return null;

  const initialValues = {
    name: data.name ?? "",
    description: data.description ?? "",
    brand: data.brand ?? "",
    categoryId: data.categoryId ?? "",
    isFeatured: data.isFeatured ?? false,
    images: data.images ?? [],
    variants: data.variants?.map((v: any) => ({
      id: v.id,
      size: v.size,
      color: v.color ?? "",
      price: Number(v.price),
      stock: Number(v.stock),
    })) ?? [],
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
      <ProductForm mode="edit" productId={id} initialValues={initialValues} />
    </div>
  );
}
