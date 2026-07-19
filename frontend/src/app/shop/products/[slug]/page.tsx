"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { useStorefrontProduct } from "@/features/storefront/hooks/useStorefrontProduct";
import ImageGallery from "@/features/storefront/components/ImageGallery";
import VariantSelector from "@/features/storefront/components/VariantSelector";
import { useCartStore } from "@/features/cart/store/cartStore";

export default function ShopProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: product, isLoading, isError } = useStorefrontProduct(slug);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product, selectedVariantId]
  );

  // Accessories (jewelry, sunglasses, etc.) often have a single variant with
  // no size/color — auto-select it instead of forcing an extra click.
  const isSingleUnnamedVariant =
    !!product &&
    product.variants.length === 1 &&
    !product.variants[0].size &&
    !product.variants[0].color;

  useEffect(() => {
    if (isSingleUnnamedVariant && product) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [isSingleUnnamedVariant, product]);

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
  const displayPrice = selectedVariant ? Number(selectedVariant.price) : minPrice;
  const inStock = product.variants.some((v) => v.stock > 0);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a size.");
      return;
    }

    addItem({
      variantId: selectedVariant.id,
      productSlug: product.slug,
      productName: product.name,
      image: product.images[0]?.url,
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: Number(selectedVariant.price),
      quantity,
      stock: selectedVariant.stock,
    });

    toast.success("Added to cart");
    router.push("/shop/cart");
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
          {product.brand && <p className="text-sm text-gray-500">{product.brand}</p>}
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <motion.p
            key={displayPrice}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-2xl font-semibold"
          >
            ₹{displayPrice.toLocaleString("en-IN")}
          </motion.p>
        </div>

        {!inStock ? (
          <p className="font-medium text-red-500">Out of stock</p>
        ) : (
          <>
            {isSingleUnnamedVariant ? (
              selectedVariant && (
                <p className="text-sm text-gray-500">{selectedVariant.stock} in stock</p>
              )
            ) : (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Select size</p>
                <VariantSelector
                  variants={product.variants}
                  selectedId={selectedVariantId}
                  onSelect={setSelectedVariantId}
                />
                {selectedVariant && (
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedVariant.stock} in stock
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-700">Quantity</p>
              <div className="flex items-center rounded-lg border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-gray-600 hover:text-black"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      selectedVariant ? Math.min(selectedVariant.stock, q + 1) : q + 1
                    )
                  }
                  className="p-2 text-gray-600 hover:text-black"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

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
