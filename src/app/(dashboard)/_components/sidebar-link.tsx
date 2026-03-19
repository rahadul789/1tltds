"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dock,
  Goal,
  Handshake,
  Home,
  IdCardLanyard,
  LucidePanelBottom,
  ReceiptText,
  MessagesSquare,
  LayoutDashboard,
  UserRoundPen,
  Infinity,
  Settings,
  Users,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Home", url: "/home", icon: Home },
  { title: "Features", url: "/vision", icon: Goal },
  { title: "Services", url: "/services", icon: Dock },
  { title: "Testimony", url: "/testimony", icon: UserRoundPen },
  { title: "Infinite", url: "/infinite", icon: Infinity },
  { title: "Contact", url: "/contact", icon: ReceiptText },
  { title: "Career", url: "/career", icon: IdCardLanyard },
  { title: "Partner", url: "/partner", icon: Handshake },
  { title: "Messages", url: "/messages", icon: MessagesSquare },
  { title: "Footer", url: "/footer", icon: LucidePanelBottom },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function SidebarLink() {
  const pathname = usePathname();

  return (
    <div className="space-y-3 mt-8">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === `/dashboard${item.url}` ||
          (item.url === "/" && pathname === "/dashboard");

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={`
                flex items-center gap-3 px-4 py-4 rounded-md 
                text-[15px] font-medium transition-all border-l-4 hover:scale-[1.02]

                ${
                  isActive
                    ? `
                      border-brand-teal bg-brand-teal/15 
                      text-brand-teal dark:text-brand-teal
                      dark:bg-brand-teal/20
                    `
                    : `
                      border-transparent 
                      text-gray-700 dark:text-gray-300 
                      hover:bg-gray-100 dark:hover:bg-white/10
                      hover:text-gray-900 dark:hover:text-white
                    `
                }
              `}
            >
              <Link href={`/dashboard${item.url}`}>
                <Icon
                  className={`h-5 w-5 transition-colors
                    ${
                      isActive
                        ? "text-brand-teal"
                        : "text-gray-500 dark:text-gray-400"
                    }
                  `}
                />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </div>
  );
}
