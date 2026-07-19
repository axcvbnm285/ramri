"use client";

import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useProductForm } from "../hooks/useProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { ProductSchema } from "../schemas/product.schema";

import BasicInfo from "./BasicInfo";
import CategorySelect from "./CategorySelect";
import ImageUploader from "./ImageUploader";
import VariantSection from "./VariantSection";
import ProductActions from "./ProductActions";

interface ProductFormProps {
  mode?: "create" | "edit";
  productId?: string;
  initialValues?: Partial<ProductSchema> & {
    variants?: (ProductSchema["variants"][number] & { id?: string })[];
  };
}

export default function ProductForm({
  mode = "create",
  productId,
  initialValues,
}: ProductFormProps) {
  const router = useRouter();
  const methods = useProductForm(initialValues);

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct(productId ?? "");

  const isPending = isCreating || isUpdating;

  const onSubmit = methods.handleSubmit((data) => {
    const payload = {
      name: data.name,
      description: data.description || undefined,
      brand: data.brand || undefined,
      categoryId: data.categoryId,
      isFeatured: data.isFeatured ?? false,
      images: data.images ?? [],
      variants: data.variants.map((variant: any) => ({
        id: variant.id,
        size: variant.size,
        color: variant.color || undefined,
        price: Number(variant.price),
        stock: Number(variant.stock),
      })),
    };

    if (mode === "edit" && productId) {
      updateProduct(payload, {
        onSuccess: () => {
          router.push("/products");
        },
        onError: (error: any) => {
          alert(error?.response?.data?.message ?? "Failed to update product.");
        },
      });
    } else {
      createProduct(payload, {
        onSuccess: () => {
          router.push("/products");
        },
        onError: (error: any) => {
          alert(error?.response?.data?.message ?? "Failed to create product.");
        },
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <BasicInfo />
            <CategorySelect />
          </div>

          <div className="space-y-6">
            <ImageUploader />
            <VariantSection />
            <ProductActions isSubmitting={isPending} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
