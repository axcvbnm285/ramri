import { PaymentStatus } from "../types/order.types";

const STYLES: Record<PaymentStatus, string> = {
  PENDING_VERIFICATION: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  PAID: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const LABELS: Record<PaymentStatus, string> = {
  PENDING_VERIFICATION: "Payment pending verification",
  PAID: "Payment verified",
  REJECTED: "Payment rejected",
};

interface Props {
  status: PaymentStatus;
}

export default function PaymentStatusBadge({ status }: Props) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}
