import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";

import SidebarLink from "@/app/(dashboard)/_components/sidebar-link";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" mb-2">
            <Link
              href="/dashboard"
              className="relative z-20  flex items-center space-x-1  py-1 text-sm font-normal text-black"
            >
              <Image src="/logo.svg" alt="logo" width={30} height={30} />
              <p className="font-medium text-md dark:text-white text-brand-red pb-[2px]">
                1<span className=" text-brand-teal">Technologies</span>
              </p>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
