"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { useDebounce } from "@/hooks/useDebounce";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const limit = 10;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useCustomers({
    page,
    limit,
    search: debouncedSearch,
  });

  const customers = data?.customers ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="mt-1 text-gray-500">People who have signed up on your storefront.</p>
      </div>

      <input
        type="text"
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full max-w-sm rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-black"
      />

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : isError ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-red-500">Failed to load customers.</p>
        </div>
      ) : customers.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
          No customers yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{customer.name}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer._count?.orders ?? 0}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="text-sm font-medium text-pink-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Page {pagination.page} of {pagination.totalPages} • {pagination.total} customers
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
