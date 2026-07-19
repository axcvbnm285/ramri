import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <Icon className="text-pink-600" size={34} />
      </div>
    </div>
  );
}