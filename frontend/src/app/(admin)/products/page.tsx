"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";

import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import ProductTable from "@/features/products/components/ProductTable";
import EmptyProducts from "@/features/products/components/EmptyProducts";
import ProductStats from "@/features/products/components/ProductStats";
import ProductFilters from "@/features/products/components/ProductFilters";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const debouncedSearch =useDebounce(search);
  const limit = 10;

  useEffect(() => {
    setPage(1);
  }, [search, status, featured, sort]);

  const {
    data,
    isLoading,
    isError,
  } = useProducts({
    page,
    limit,
    search: debouncedSearch,
    status,
    featured,
    sort,
  });

  const products = data?.products ?? [];
  const pagination = data?.pagination;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-red-500">
          Failed to load products.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your store products.
          </p>
        </div>

        <Link
          href="/products/add"
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Statistics */}
      <ProductStats products={products} />

      {/* Filters */}
      <ProductFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        featured={featured}
        setFeatured={setFeatured}
        sort={sort}
        setSort={setSort}
      />

      {/* Products */}
      {products.length === 0 ? (
        <EmptyProducts />
      ) : (
        <ProductTable products={products} />
      )}

      {pagination && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Page {pagination.page} of {pagination.totalPages} • {pagination.total} products
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}