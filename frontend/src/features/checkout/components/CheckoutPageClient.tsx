"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Plus, TriangleAlert, Upload, X, ZoomIn } from "lucide-react";
import { toast } from "sonner";

import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { useAddresses } from "@/features/customerAddresses/hooks/useAddresses";
import AddressForm from "@/features/customerAddresses/components/AddressForm";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCartTotal } from "@/features/cart/hooks/useCartTotal";
import { useClearCart } from "@/features/cart/hooks/useClearCart";
import { usePlaceOrder } from "@/features/customerOrders/hooks/usePlaceOrder";
import { PaymentProofPayload } from "@/features/customerOrders/services/customerOrder.service";
import { useUploadPaymentProof } from "@/features/checkout/hooks/useUploadPaymentProof";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function CheckoutPageClient() {
  const router = useRouter();
  const { data: customer, isLoading: isLoadingCustomer, isError } = useCurrentCustomer();
  const { data: addresses, isLoading: isLoadingAddresses } = useAddresses();

  const { data: items, isLoading: isLoadingCart } = useCart();
  const { mutate: clearCart } = useClearCart();
  const total = useCartTotal();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [payments, setPayments] = useState<Record<string, PaymentProofPayload>>({});
  const [uploadingStoreId, setUploadingStoreId] = useState<string | null>(null);
  const [zoomedQr, setZoomedQr] = useState<{ url: string; storeName: string } | null>(null);

  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const { uploadProof } = useUploadPaymentProof();

  useEffect(() => {
    if (!isLoadingCustomer && isError) {
      router.replace("/shop/login?redirect=/shop/checkout");
    }
  }, [isLoadingCustomer, isError, router]);

  const effectiveAddressId =
    selectedAddressId ?? addresses?.find((a) => a.isDefault)?.id ?? addresses?.[0]?.id ?? null;

  if (isLoadingCustomer || !customer || isLoadingCart) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  const storeGroups = items.reduce<Record<string, typeof items>>((groups, item) => {
    const key = item.storeId ?? "unknown";
    groups[key] = [...(groups[key] ?? []), item];
    return groups;
  }, {});
  const storeIds = Object.keys(storeGroups);

  const updatePayment = (storeId: string, patch: PaymentProofPayload) => {
    setPayments((prev) => ({ ...prev, [storeId]: { ...prev[storeId], ...patch } }));
  };

  const handleProofFileChange = async (storeId: string, file: File) => {
    setUploadingStoreId(storeId);
    try {
      const uploaded = await uploadProof(file);
      updatePayment(storeId, { proofUrl: uploaded.url, proofPublicId: uploaded.publicId });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to upload payment proof."));
    } finally {
      setUploadingStoreId(null);
    }
  };

  const isPaymentReady = (storeId: string) => {
    const hasQr = !!storeGroups[storeId][0].storeQrUrl;
    if (!hasQr) return false;
    const payment = payments[storeId];
    return !!(payment?.proofUrl || payment?.reference?.trim());
  };

  const allPaymentsReady = storeIds.every(isPaymentReady);

  const handlePlaceOrder = () => {
    if (!effectiveAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    if (!allPaymentsReady) {
      toast.error("Please complete payment for every seller before placing the order.");
      return;
    }

    const paymentProofs: Record<string, PaymentProofPayload> = {};
    storeIds.forEach((storeId) => {
      paymentProofs[storeId] = payments[storeId] ?? {};
    });

    placeOrder(
      {
        addressId: effectiveAddressId,
        items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
        paymentProofs,
      },
      {
        onSuccess: (response) => {
          clearCart();
          const orders: { id: string }[] = response.data.data;

          if (orders.length === 1) {
            toast.success("Order placed successfully!");
            router.push(`/shop/account/orders/${orders[0].id}`);
          } else {
            toast.success(
              `Order placed! Split into ${orders.length} orders — one per seller.`
            );
            router.push("/shop/account/orders");
          }
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
                    effectiveAddressId === address.id
                      ? "border-pink-600 bg-pink-50"
                      : ""
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

        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-1 font-bold">Payment</h2>
          <p className="mb-4 text-sm text-gray-500">
            {storeIds.length > 1
              ? "Scan each seller's QR code and pay them separately — the order is split one per seller."
              : "Scan the QR code below to pay, then upload a screenshot or enter the transaction reference."}
          </p>

          <div className="space-y-5">
            {storeIds.map((storeId) => {
              const group = storeGroups[storeId];
              const storeName = group[0].storeName ?? "Seller";
              const storeQrUrl = group[0].storeQrUrl;
              const payment = payments[storeId];
              const isUploading = uploadingStoreId === storeId;

              return (
                <div key={storeId} className="rounded-lg border p-4">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {storeName}
                  </p>

                  {!storeQrUrl ? (
                    <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      <TriangleAlert size={16} className="mt-0.5 shrink-0" />
                      <p>This seller hasn&apos;t set up payment yet — contact them before ordering.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setZoomedQr({ url: storeQrUrl, storeName })}
                        className="group relative h-40 w-40 shrink-0 overflow-hidden rounded-lg border bg-gray-50"
                      >
                        <Image
                          src={storeQrUrl}
                          alt={`${storeName} payment QR`}
                          fill
                          sizes="160px"
                          className="object-contain"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                          <ZoomIn size={22} className="text-white" />
                        </span>
                      </button>
                      <p className="sm:hidden">
                        <button
                          type="button"
                          onClick={() => setZoomedQr({ url: storeQrUrl, storeName })}
                          className="text-xs font-medium text-pink-600 hover:underline"
                        >
                          Tap QR to zoom in
                        </button>
                      </p>

                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="mb-1 block text-sm font-medium">
                            Payment screenshot
                          </label>
                          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:border-pink-400 hover:text-pink-600">
                            {isUploading ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Upload size={16} />
                            )}
                            {payment?.proofUrl ? "Replace screenshot" : "Upload screenshot"}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                e.target.value = "";
                                if (file) handleProofFileChange(storeId, file);
                              }}
                            />
                          </label>
                          {payment?.proofUrl && (
                            <p className="mt-1 text-xs text-green-600">Screenshot uploaded.</p>
                          )}
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium">
                            Or transaction reference
                          </label>
                          <input
                            value={payment?.reference ?? ""}
                            onChange={(e) =>
                              updatePayment(storeId, { reference: e.target.value })
                            }
                            placeholder="e.g. transaction ID from your banking app"
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-pink-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-fit space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-lg font-bold">Order Summary</h2>

        {storeIds.length > 1 ? (
          <p className="text-xs text-gray-500">
            Items from {storeIds.length} sellers — this will be placed as {storeIds.length}{" "}
            separate orders.
          </p>
        ) : null}

        {storeIds.map((storeId) => (
          <div key={storeId} className="space-y-2">
            {storeIds.length > 1 && (
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {storeGroups[storeId][0].storeName}
              </p>
            )}
            {storeGroups[storeId].map((item) => (
              <div key={item.variantId} className="flex justify-between text-sm text-gray-600">
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-between border-t pt-3 text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isPending || !effectiveAddressId || !allPaymentsReady}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Place Order
        </button>
      </div>

      {zoomedQr && (
        <div
          onClick={() => setZoomedQr(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl bg-white p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                {zoomedQr.storeName}
              </p>
              <button
                onClick={() => setZoomedQr(null)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={zoomedQr.url}
                alt={`${zoomedQr.storeName} payment QR (zoomed)`}
                fill
                sizes="448px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
