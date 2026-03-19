"use client";

import { deleteInfiniteItem } from "@/app/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Loader2, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteInfiniteItemModal = ({
  id,
  title,
  url,
}: {
  id: number;
  title: string;
  url: string;
}) => {
  const [state, action, pending] = useActionState(
    deleteInfiniteItem,
    undefined
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Item deleted successfully.");
    }
  }, [state]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className=" rounded-full cursor-pointer hover:bg-red-100  "
          size="icon"
          variant="secondary"
        >
          <Trash2 color="red" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this Item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.{" "}
            {title ? (
              <>
                It will permanently remove{" "}
                <span className="font-semibold">“{title}”</span>.
              </>
            ) : (
              "It will permanently remove this item."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={url} />

          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Deleting…</span>
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteInfiniteItemModal;
