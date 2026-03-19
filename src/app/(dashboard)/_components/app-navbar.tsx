import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./toggle-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilLine, User, UserCircleIcon } from "lucide-react";
import { deleteSession } from "@/app/lib/session";
import { LogoutButton } from "./logout-button";
import UpdatePassword from "./update-password";

type AppNavbarProps = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

export default function AppNavbar({ user }: AppNavbarProps) {
  const handleLogout = async () => {
    await deleteSession();
  };

  return (
    <div className=" mt-2">
      <div className=" flex gap-3 justify-between backdrop-blur-2xl p-1 ">
        <div className="  -translate-x-3">
          <SidebarTrigger />
        </div>
        <div className=" flex gap-2 ">
          <ModeToggle />
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className=" rounded-full">
                  <User className=" text-brand-red" />{" "}
                  <span className=" text-xs text-brand-teal">
                    {user && user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="  w-46" align="end">
                <DropdownMenuItem disabled className=" text-xs text-wrap">
                  {user && user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <UserCircleIcon /> <span className=" pb-[2px]">Profile</span>
                </DropdownMenuItem> */}
                <UpdatePassword />
                <div className=" border-b my-1" />
                <LogoutButton handleLogout={handleLogout} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
