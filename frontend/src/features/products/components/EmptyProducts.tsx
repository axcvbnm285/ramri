import Link from "next/link";
import { Package } from "lucide-react";

export default function EmptyProducts() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border bg-white">

      <Package
        size={48}
        className="text-gray-400"
      />

      <h2 className="mt-4 text-xl font-semibold">
        No products yet
      </h2>

      <p className="mt-2 text-gray-500">
        Add your first product to get started.
      </p>

      <Link
        href="/products/add"
        className="mt-6 rounded-lg bg-nepal-maroon px-5 py-3 text-white"
      >
        Add Product
      </Link>

    </div>
  );
}