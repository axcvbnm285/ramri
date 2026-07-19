import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button className="rounded-xl border p-2 hover:bg-gray-100">
      <Bell size={20} />
    </button>
  );
}