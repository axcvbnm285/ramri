"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { SidebarItem as SidebarItemType } from "@/types/sidebar";

interface Props {
  item: SidebarItemType;
  onClick?: () => void;
}

export default function SidebarItem({ item, onClick }: Props) {
  const pathname = usePathname();

  const Icon = item.icon;

  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
        active
          ? "bg-nepal-maroon text-white shadow-md"
          : "text-gray-600 hover:bg-nepal-cream-3/60 hover:text-nepal-maroon"
      )}
    >
      <Icon size={20} />

      <span className="font-medium">
        {item.title}
      </span>
    </Link>
  );
}