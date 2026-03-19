"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, Mail, Calendar, Loader2 } from "lucide-react";
import { deleteUser } from "@/app/lib/actions";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string | Date;
}

const UserSections = ({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!selectedUser) return;

    // Prevent self delete
    if (selectedUser.id === currentUserId) {
      toast.error(" You cannot delete your own account!");
      return;
    }

    startTransition(async () => {
      const res = await deleteUser(selectedUser.id);

      if (res.success) {
        toast.success("User deleted successfully!");
      } else {
        toast.error(res.error || "Failed to delete user.");
      }

      setOpen(false);
    });
  };

  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 max-w-4xl ">
      {/* HEADER */}
      <div className="p-4 border-b bg-muted/40 dark:bg-neutral-800/40 dark:border-neutral-700 rounded-t-xl">
        <h2 className="text-lg font-semibold">All Users</h2>
        <p className="text-sm text-muted-foreground">
          Manage registered users in your platform.
        </p>
      </div>

      {/* USER CARDS GRID */}
      <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <p className="text-center text-muted-foreground w-full py-10">
            No users found.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-xl border shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-700 transition hover:shadow-md"
            >
              {/* CARD HEADER */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-brand-teal/20 dark:bg-brand-teal/30 text-brand-teal dark:text-brand-teal flex items-center justify-center font-semibold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>

              {/* JOINED DATE */}
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(user.created_at).toLocaleDateString()}
              </div>

              {/* DELETE BUTTON */}
              <div className="flex justify-end mt-4">
                <button
                  className="
                    h-9 w-9 flex items-center justify-center rounded-full 
                    hover:bg-red-100 hover:text-red-600 text-red-500 dark:text-red-400 
                    dark:hover:bg-red-900/20 transition-all duration-200 cursor-pointer
                  "
                  onClick={() => {
                    setSelectedUser(user);
                    setOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DELETE CONFIRM MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md dark:bg-neutral-900 dark:border-neutral-800">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {selectedUser?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserSections;
