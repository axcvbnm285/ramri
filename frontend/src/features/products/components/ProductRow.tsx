import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

import { Product } from "../types/product.types";
import {
  getLowestPrice,
  getTotalStock,
} from "../utils/product.utils";

import ProductStatusBadge from "./ProductStatusBadge";
import FeaturedBadge from "./FeaturedBadge";

interface Props {
  product: Product;
}

export default function ProductRow({
  product,
}: Props) {
  const totalStock =
    getTotalStock(product);

  const lowestPrice =
    getLowestPrice(product);

  return (
    <tr className="hover:bg-gray-50">

      <td className="px-6 py-4">
        <div className="flex items-center gap-4">

          {product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              width={56}
              height={56}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
              <Package
                size={22}
                className="text-gray-400"
              />
            </div>
          )}

          <div>

            <p className="font-medium">
              {product.name}
            </p>

            {product.brand && (
              <p className="text-sm text-gray-500">
                {product.brand}
              </p>
            )}

          </div>

        </div>
      </td>

      <td className="px-6 py-4">
        {product.category?.name ?? "—"}
      </td>

      <td className="px-6 py-4">
        ₹{lowestPrice}
      </td>

      <td className="px-6 py-4">
        {totalStock}
      </td>

      <td className="px-6 py-4">
        <FeaturedBadge
          featured={product.isFeatured}
        />
      </td>

      <td className="px-6 py-4">
        <ProductStatusBadge
          status={product.status}
        />
      </td>

      <td className="px-6 py-4 text-right">

        <Link
          href={`/products/${product.id}`}
          className="font-medium hover:underline"
        >
          Edit
        </Link>

      </td>

    </tr>
  );
}