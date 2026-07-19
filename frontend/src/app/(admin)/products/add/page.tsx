import ProductForm from "@/features/products/components/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="text-gray-500 mt-1">
          Create a new product for your store.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}