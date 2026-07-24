"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { useStorefrontProduct } from "@/features/storefront/hooks/useStorefrontProduct";
import ImageGallery from "@/features/storefront/components/ImageGallery";
import MultiVariantPicker from "@/features/storefront/components/MultiVariantPicker";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import WishlistButton from "@/features/wishlist/components/WishlistButton";
import { useCurrentCustomer } from "@/features/customerAuth/hooks/useCurrentCustomer";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function ProductDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const { data: product, isLoading, isError } = useStorefrontProduct(slug);
  const { data: customer } = useCurrentCustomer();
  const { mutate: addToCart } = useAddToCart();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Accessories (jewelry, sunglasses, etc.) often have a single variant with
  // no size/color — auto-select qty 1 instead of forcing an extra tap.
  const isSingleUnnamedVariant =
    !!product &&
    product.variants.length === 1 &&
    !product.variants[0].size &&
    !product.variants[0].color;

  useEffect(() => {
    if (isSingleUnnamedVariant && product) {
      setQuantities({ [product.variants[0].id]: 1 });
    }
  }, [isSingleUnnamedVariant, product]);

  const updateQuantity = (variantId: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [variantId]: qty }));
  };

  const selectedEntries = useMemo(
    () => (product?.variants ?? []).filter((v) => (quantities[v.id] ?? 0) > 0),
    [product, quantities]
  );

  const totalQuantity = selectedEntries.reduce((sum, v) => sum + quantities[v.id], 0);
  const totalPrice = selectedEntries.reduce(
    (sum, v) => sum + Number(v.price) * quantities[v.id],
    0
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return <p className="text-red-500">Product not found.</p>;
  }

  const prices = product.variants.map((v) => Number(v.price));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const inStock = product.variants.some((v) => v.stock > 0);

  const handleAddToCart = () => {
    if (!customer) {
      toast.error("Please login to add items to your cart.");
      router.push(`/shop/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (selectedEntries.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    selectedEntries.forEach((variant) => {
      addToCart(
        { variantId: variant.id, quantity: quantities[variant.id] },
        { onError: (error) => toast.error(getErrorMessage(error, "Failed to add to cart.")) }
      );
    });

    toast.success(
      totalQuantity > 1 ? `Added ${totalQuantity} items to cart` : "Added to cart",
      { action: { label: "View Cart", onClick: () => router.push("/shop/cart") } }
    );

    // Reset the picker so re-adding doesn't look like the previous
    // selection is still pending, and the customer can keep shopping.
    setQuantities(isSingleUnnamedVariant ? { [product.variants[0].id]: 1 } : {});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="grid grid-cols-1 gap-10 md:grid-cols-2"
    >
      <ImageGallery images={product.images} productName={product.name} />

      <div className="space-y-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              {product.brand && <p className="text-sm text-gray-500">{product.brand}</p>}
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="mt-1 text-xs font-medium text-gray-400">
                Sold by {product.store.name}
              </p>
            </div>

            <WishlistButton
              item={{
                productId: product.id,
                productSlug: product.slug,
                productName: product.name,
                image: product.images[0]?.url,
                price: minPrice,
              }}
              size={22}
              className="h-11 w-11 shrink-0 border bg-white"
            />
          </div>

          <p className="mt-2 text-2xl font-semibold">
            {selectedEntries.length > 0 ? (
              <>₹{totalPrice.toLocaleString("en-IN")}</>
            ) : (
              <>₹{minPrice.toLocaleString("en-IN")}</>
            )}
            {selectedEntries.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                for {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>

        {!inStock ? (
          <p className="font-medium text-red-500">Out of stock</p>
        ) : (
          <>
            {isSingleUnnamedVariant ? (
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-gray-700">Quantity</p>
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.variants[0].id,
                        Math.max(1, (quantities[product.variants[0].id] ?? 1) - 1)
                      )
                    }
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{quantities[product.variants[0].id] ?? 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.variants[0].id,
                        Math.min(
                          product.variants[0].stock,
                          (quantities[product.variants[0].id] ?? 1) + 1
                        )
                      )
                    }
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{product.variants[0].stock} in stock</p>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Select size — you can pick more than one
                </p>
                <MultiVariantPicker
                  variants={product.variants}
                  quantities={quantities}
                  onChange={updateQuantity}
                />
              </div>
            )}

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </motion.button>
          </>
        )}

        {product.description && (
          <div className="border-t pt-5">
            <h2 className="mb-2 font-semibold">Description</h2>
            <p className="whitespace-pre-line text-gray-600">{product.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
