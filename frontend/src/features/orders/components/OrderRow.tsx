import Link from "next/link";

import { Order } from "../types/order.types";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order;
}

export default function OrderRow({ order }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">
        <Link href={`/orders/${order.id}`} className="hover:underline">
          {order.orderNumber}
        </Link>
      </td>
      <td className="px-6 py-4">
        <div>{order.customer?.name}</div>
        <div className="text-sm text-gray-500">{order.customer?.phone}</div>
      </td>
      <td className="px-6 py-4">{order.items.length} item(s)</td>
      <td className="px-6 py-4">₹{Number(order.total).toLocaleString("en-IN")}</td>
      <td className="px-6 py-4">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4 text-gray-500">
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/orders/${order.id}`} className="text-sm font-medium text-pink-600 hover:underline">
          View
        </Link>
      </td>
    </tr>
  );
}
