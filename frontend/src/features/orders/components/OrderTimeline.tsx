import { OrderStatusLog } from "../types/order.types";

interface Props {
  logs: OrderStatusLog[];
}

export default function OrderTimeline({ logs }: Props) {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="flex items-start gap-3">
          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-nepal-maroon" />
          <div>
            <p className="font-medium">
              {log.status}{" "}
              <span className="font-normal text-gray-400">
                by {log.changedBy.toLowerCase()}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              {new Date(log.createdAt).toLocaleString("en-IN")}
            </p>
            {log.note && <p className="text-sm text-gray-500">{log.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
