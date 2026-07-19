import { OrderStatus } from "../types/order.types";

const STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  DISPATCHED: "bg-purple-100 text-purple-700",
  RECEIVED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

interface Props {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: Props) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}>
      {status}
    </span>
  );
}
