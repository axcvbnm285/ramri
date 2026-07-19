"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { useDebounce } from "@/hooks/useDebounce";
import OrderTable from "@/features/orders/components/OrderTable";
import OrderFilters from "@/features/orders/components/OrderFilters";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);
  const limit = 10;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useOrders({
    page,
    limit,
    search: debouncedSearch,
    status,
  });

  const orders = data?.orders ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="mt-1 text-gray-500">Track and manage customer orders.</p>
      </div>

      <OrderFilters
        search={search}
        setSearch={handleSearchChange}
        status={status}
        setStatus={handleStatusChange}
      />

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : isError ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-red-500">Failed to load orders.</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <OrderTable orders={orders} />
      )}

      {pagination && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Page {pagination.page} of {pagination.totalPages} • {pagination.total} orders
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
