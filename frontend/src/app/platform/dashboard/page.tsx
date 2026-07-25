"use client";

import { Loader2, Check, X, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { usePendingStores } from "@/features/platform-admin/hooks/usePendingStores";
import { usePlatformStats } from "@/features/platform-admin/hooks/usePlatformStats";
import { useAllStores } from "@/features/platform-admin/hooks/useAllStores";
import {
  useApproveStore,
  useRejectStore,
  useDeleteStore,
  useReactivateStore,
} from "@/features/platform-admin/hooks/useReviewStore";
import { getErrorMessage } from "@/lib/getErrorMessage";
import StoreLogoAvatar from "@/components/StoreLogoAvatar";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function StatusBadge({ status, isActive }: { status: string; isActive: boolean }) {
  if (!isActive) {
    return (
      <span className="rounded-full bg-gray-700/40 px-2.5 py-1 text-xs font-medium text-gray-400">
        Deleted
      </span>
    );
  }

  const styles: Record<string, string> = {
    PENDING: "bg-yellow-600/20 text-yellow-400",
    APPROVED: "bg-green-600/20 text-green-400",
    REJECTED: "bg-red-600/20 text-red-400",
  };

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

export default function PlatformDashboardPage() {
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: pending, isLoading: pendingLoading } = usePendingStores();
  const { data: allStores, isLoading: allStoresLoading } = useAllStores();
  const { mutate: approve, isPending: approving } = useApproveStore();
  const { mutate: reject, isPending: rejecting } = useRejectStore();
  const { mutate: deleteStore, isPending: deleting } = useDeleteStore();
  const { mutate: reactivateStore, isPending: reactivating } = useReactivateStore();

  const handleApprove = (id: string, name: string) => {
    approve(id, {
      onSuccess: () => toast.success(`${name} approved.`),
      onError: (error) => toast.error(getErrorMessage(error, "Failed to approve store.")),
    });
  };

  const handleReject = (id: string, name: string) => {
    reject(id, {
      onSuccess: () => toast.success(`${name} rejected.`),
      onError: (error) => toast.error(getErrorMessage(error, "Failed to reject store.")),
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This takes it off the storefront and blocks owner login — products and orders are kept, and it can be reactivated any time.`)) {
      return;
    }

    deleteStore(id, {
      onSuccess: () => toast.success(`${name} deleted.`),
      onError: (error) => toast.error(getErrorMessage(error, "Failed to delete store.")),
    });
  };

  const handleReactivate = (id: string, name: string) => {
    reactivateStore(id, {
      onSuccess: () => toast.success(`${name} reactivated.`),
      onError: (error) => toast.error(getErrorMessage(error, "Failed to reactivate store.")),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Platform-wide stats and store approvals.</p>
      </div>

      {statsLoading ? (
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      ) : stats ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Approved stores" value={stats.stores.approved} />
          <StatCard label="Pending approval" value={stats.stores.pending} />
          <StatCard label="Rejected" value={stats.stores.rejected} />
          <StatCard label="Total orders" value={stats.totalOrders} />
          <StatCard label="Total customers" value={stats.totalCustomers} />
          <StatCard label="Platform GMV" value={`₹${Number(stats.totalGmv).toLocaleString("en-IN")}`} />
        </div>
      ) : null}

      {stats && stats.topStores.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Top stores by revenue</h2>
          <div className="overflow-hidden rounded-xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-gray-400">
                <tr>
                  <th className="px-5 py-3">Store</th>
                  <th className="px-5 py-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {stats.topStores.map(({ store, revenue }) =>
                  store ? (
                    <tr key={store.id}>
                      <td className="px-5 py-3">{store.name}</td>
                      <td className="px-5 py-3 text-right">
                        ₹{Number(revenue).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold">Pending approvals</h2>

        {pendingLoading ? (
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        ) : !pending || pending.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-500">
            No stores waiting for approval.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-gray-400">
                <tr>
                  <th className="px-5 py-3">Store</th>
                  <th className="px-5 py-3">Owner</th>
                  <th className="px-5 py-3">Signed up</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {pending.map((store) => (
                  <tr key={store.id}>
                    <td className="px-5 py-3 font-medium">{store.name}</td>
                    <td className="px-5 py-3 text-gray-400">
                      {store.users[0]?.name} — {store.users[0]?.email}
                    </td>
                    <td className="px-5 py-3 text-gray-400">
                      {new Date(store.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleApprove(store.id, store.name)}
                          disabled={approving || rejecting}
                          className="flex items-center gap-1 rounded-lg bg-green-600/20 px-3 py-1.5 text-green-400 transition hover:bg-green-600/30 disabled:opacity-50"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(store.id, store.name)}
                          disabled={approving || rejecting}
                          className="flex items-center gap-1 rounded-lg bg-red-600/20 px-3 py-1.5 text-red-400 transition hover:bg-red-600/30 disabled:opacity-50"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">All stores</h2>

        {allStoresLoading ? (
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        ) : !allStores || allStores.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-500">
            No stores yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-gray-400">
                <tr>
                  <th className="px-5 py-3">Store</th>
                  <th className="px-5 py-3">Owner</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3">Orders</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {allStores.map((store) => (
                  <tr key={store.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <StoreLogoAvatar logoUrl={store.logo} name={store.name} size={28} />
                        <span className="font-medium">{store.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-400">
                      {store.users[0]?.name} — {store.users[0]?.email}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={store.status} isActive={store.isActive} />
                    </td>
                    <td className="px-5 py-3 text-gray-400">{store._count.products}</td>
                    <td className="px-5 py-3 text-gray-400">{store._count.orders}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        {store.isActive ? (
                          <button
                            onClick={() => handleDelete(store.id, store.name)}
                            disabled={deleting || reactivating}
                            className="flex items-center gap-1 rounded-lg bg-red-600/20 px-3 py-1.5 text-red-400 transition hover:bg-red-600/30 disabled:opacity-50"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(store.id, store.name)}
                            disabled={deleting || reactivating}
                            className="flex items-center gap-1 rounded-lg bg-green-600/20 px-3 py-1.5 text-green-400 transition hover:bg-green-600/30 disabled:opacity-50"
                          >
                            <RotateCcw size={14} /> Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
