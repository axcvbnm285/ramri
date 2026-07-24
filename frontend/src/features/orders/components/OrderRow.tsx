import Link from "next/link";

import { Order } from "../types/order.types";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

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
        <div className="flex flex-col items-start gap-1">
          <OrderStatusBadge status={order.status} />
          {order.paymentMethod === "QR" && order.paymentStatus && (
            <PaymentStatusBadge status={order.paymentStatus} />
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-500">
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/orders/${order.id}`} className="text-sm font-medium text-nepal-maroon hover:underline">
          View
        </Link>
      </td>
    </tr>
  );
}
