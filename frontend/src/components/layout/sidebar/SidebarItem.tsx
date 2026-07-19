"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { SidebarItem as SidebarItemType } from "@/types/sidebar";

interface Props {
  item: SidebarItemType;
}

export default function SidebarItem({ item }: Props) {
  const pathname = usePathname();

  const Icon = item.icon;

  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
        active
          ? "bg-pink-600 text-white shadow-md"
          : "text-gray-600 hover:bg-pink-100 hover:text-pink-600"
      )}
    >
      <Icon size={20} />

      <span className="font-medium">
        {item.title}
      </span>
    </Link>
  );
}