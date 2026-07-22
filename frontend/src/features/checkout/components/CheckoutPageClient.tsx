"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { useAddresses } from "@/features/customerAddresses/hooks/useAddresses";
import AddressForm from "@/features/customerAddresses/components/AddressForm";
import { useCartStore, useCartTotal } from "@/features/cart/store/cartStore";
import { usePlaceOrder } from "@/features/customerOrders/hooks/usePlaceOrder";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function CheckoutPageClient() {
  const router = useRouter();
  const { data: customer, isLoading: isLoadingCustomer, isError } = useCurrentCustomer();
  const { data: addresses, isLoading: isLoadingAddresses } = useAddresses();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const total = useCartTotal();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const { mutate: placeOrder, isPending } = usePlaceOrder();

  useEffect(() => {
    if (!isLoadingCustomer && isError) {
      router.replace("/shop/login?redirect=/shop/checkout");
    }
  }, [isLoadingCustomer, isError, router]);

  const effectiveAddressId =
    selectedAddressId ?? addresses?.find((a) => a.isDefault)?.id ?? addresses?.[0]?.id ?? null;

  if (isLoadingCustomer || !customer) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!effectiveAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    placeOrder(
      {
        addressId: effectiveAddressId,
        items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
      },
      {
        onSuccess: (response) => {
          clearCart();
          toast.success("Order placed successfully!");
          router.push(`/shop/account/orders/${response.data.data.id}`);
        },
        onError: (error) => toast.error(getErrorMessage(error, "Failed to place order.")),
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <div className="rounded-xl border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Delivery Address</h2>
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
            <p className="text-sm text-gray-500">Add a delivery address to continue.</p>
          ) : (
            <div className="space-y-2">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
                    effectiveAddressId === address.id ? "border-pink-600 bg-pink-50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={effectiveAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id)}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-gray-500">{address.phone}</p>
                    <p className="text-gray-500">
                      {address.line1}
                      {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
                      - {address.pincode}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-fit space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-lg font-bold">Order Summary</h2>

        {items.map((item) => (
          <div key={item.variantId} className="flex justify-between text-sm text-gray-600">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}

        <div className="flex justify-between border-t pt-3 text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <p className="text-sm text-gray-500">Payment: Cash on Delivery</p>

        <button
          onClick={handlePlaceOrder}
          disabled={isPending || !effectiveAddressId}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Place Order
        </button>
      </div>
    </div>
  );
}
