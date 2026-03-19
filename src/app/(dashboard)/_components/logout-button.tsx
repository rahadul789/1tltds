"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleLogouts() {
    startTransition(async () => {
      await handleLogout();
      router.push("/1tltd-login");
      router.refresh();
    });
  }

  return (
    <Button
      onClick={handleLogouts}
      disabled={isPending}
      className="text-red-600 cursor-pointer w-full justify-start gap-2"
      variant="ghost"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <LogOut size={16} />
          <span className="pb-[2px]">Log out</span>
        </>
      )}
    </Button>
  );
}
