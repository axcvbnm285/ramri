import { Product } from "../types/product.types";
import ProductRow from "./ProductRow";

interface Props {
  products: Product[];
}

export default function ProductTable({
  products,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <table className="w-full">

        <thead className="border-b bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Product
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Price
            </th>

            <th className="px-6 py-4 text-left">
              Stock
            </th>

            <th className="px-6 py-4 text-left">
              Featured
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody className="divide-y">

          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}