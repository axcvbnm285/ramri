"use client";

import Logo from "./Logo";
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";

import { SIDEBAR_ITEMS } from "@/constants/sidebar";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col justify-between border-r bg-white p-5">
      <div>
        <Logo />

        <nav className="mt-10 flex flex-col gap-2">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
            />
          ))}
        </nav>
      </div>

      <SidebarFooter />
    </aside>
  );
}