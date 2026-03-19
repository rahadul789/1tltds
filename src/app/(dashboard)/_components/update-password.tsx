"use client";

import { PencilLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { changePassword } from "@/app/actions/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UpdatePassword = () => {
  const [state, action, pending] = useActionState(changePassword, undefined);

  // ⭐ Controlled input states (keeps values after backend validation errors)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Clear input fields only when password successfully changes
  useEffect(() => {
    // state has two possible shapes: { errors: ... } or { message: string }
    // treat presence of `message` as a successful change
    if (state && "message" in state) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <PencilLine className="mr-2" />
          <span className="pb-[2px] text-sm font-normal">Update Password</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click Chnage password when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="grid gap-4">
          {/* OLD PASSWORD */}
          <div className="space-y-1">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {state?.errors?.oldPassword && (
              <p className="text-red-700 text-xs">{state.errors.oldPassword}</p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div className="space-y-1">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {state?.errors?.newPassword && (
              <p className="text-red-700 text-xs">{state.errors.newPassword}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {state?.errors?.confirmPassword && (
              <p className="text-red-700 text-xs">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* GENERAL BACKEND MESSAGE */}
          {state?.message && (
            <p className="text-red-700 text-xs">{state.message}</p>
          )}

          {/* FOOTER */}
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button disabled={pending} type="submit">
              {pending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Change Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePassword;
