import { Order } from "../types/order.types";
import OrderRow from "./OrderRow";

interface Props {
  orders: Order[];
}

export default function OrderTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-4">Order</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
