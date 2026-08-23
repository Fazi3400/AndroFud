import type { SidebarNavItem } from "@/types";

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: "layoutDashboard",
      items: [],
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: "cart",
      items: [],
    },
    {
      title: "Medias",
      href: "/admin/medias",
      icon: "image",
      items: [],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "user",
      items: [],
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: "receipt",
      items: [],
    },
    {
      title: "Offers",
      href: "/admin/offers",
      icon: "zap",
      items: [],
    },
  ],
};
