import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

import { ROUTES } from "./routes";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: ROUTES.PRODUCTS,
    icon: Package,
  },
  {
    title: "Categories",
    href: ROUTES.CATEGORIES,
    icon: FolderTree,
  },
  {
    title: "Inventory",
    href: ROUTES.INVENTORY,
    icon: Boxes,
  },
  {
    title: "Orders",
    href: ROUTES.ORDERS,
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: ROUTES.CUSTOMERS,
    icon: Users,
  },
  {
    title: "Analytics",
    href: ROUTES.ANALYTICS,
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];