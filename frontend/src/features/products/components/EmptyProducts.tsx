import Link from "next/link";
import { Package } from "lucide-react";

export default function EmptyProducts() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800">

      <Package
        size={48}
        className="text-gray-400 dark:text-gray-500"
      />

      <h2 className="mt-4 text-xl font-semibold">
        No products yet
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
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