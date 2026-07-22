"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, LogOut, Plus, Trash2 } from "lucide-react";

import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { useCustomerLogout } from "@/features/customerAuth/hooks/useCustomerLogout";
import { useAddresses } from "@/features/customerAddresses/hooks/useAddresses";
import { useDeleteAddress } from "@/features/customerAddresses/hooks/useDeleteAddress";
import AddressForm from "@/features/customerAddresses/components/AddressForm";

export default function AccountPageClient() {
  const router = useRouter();
  const { data: customer, isLoading, isError } = useCurrentCustomer();
  const { data: addresses, isLoading: isLoadingAddresses } = useAddresses();
  const { mutate: logout } = useCustomerLogout();
  const { mutate: deleteAddress } = useDeleteAddress();

  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/shop/login?redirect=/shop/account");
    }
  }, [isLoading, isError, router]);

  if (isLoading || !customer) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleRemoveAddress = (id: string) => {
    if (!confirm("Remove this address?")) return;
    deleteAddress(id);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <p className="text-gray-500">{customer.phone}</p>
        </div>

        <button
          onClick={() => logout()}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <Link
        href="/shop/account/orders"
        className="block rounded-xl border bg-white p-5 font-medium transition hover:border-pink-600 hover:text-pink-600"
      >
        View Order History →
      </Link>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">Saved Addresses</h2>
          <button
            onClick={() => setShowAddressForm((s) => !s)}
            className="flex items-center gap-1 text-sm font-medium text-pink-600 hover:underline"
          >
            <Plus size={14} />
            Add new
          </button>
        </div>

        {showAddressForm && (
          <div className="mb-4">
            <AddressForm
              onSuccess={() => setShowAddressForm(false)}
              onCancel={() => setShowAddressForm(false)}
            />
          </div>
        )}

        {isLoadingAddresses ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : !addresses || addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No addresses saved yet.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between rounded-lg border p-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {address.fullName}
                    {address.isDefault && (
                      <span className="ml-2 rounded-full bg-pink-100 px-2 py-0.5 text-xs text-pink-700">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500">{address.phone}</p>
                  <p className="text-gray-500">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} -{" "}
                    {address.pincode}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveAddress(address.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
