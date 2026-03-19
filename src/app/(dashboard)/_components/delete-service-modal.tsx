"use client";

import { deleteService } from "@/app/lib/actions";
import {
  AlertDialog,
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

const DeleteServiceModal = ({
  id,
  title,
  length,
  url,
}: {
  id: number;
  title: string;
  length: number;
  url: string;
}) => {
  const [state, action, pending] = useActionState(deleteService, undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Service deleted successfully.");
    }
  }, [state]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className=" rounded-full cursor-pointer text-red-500 hover:bg-red-100 "
          size="icon"
          variant="secondary"
        >
          <Trash2 color="red" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this service?</AlertDialogTitle>
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
            <br />
            <br />
            {length <= 8 && (
              <span className=" mt-2 text-sm text-red-600 font-semibold ">
                ⚠ You must have at least 8 services. Please add more services
                before deleting.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={url} />

          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending} className=" cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              variant="destructive"
              disabled={pending || length <= 8}
            >
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

export default DeleteServiceModal;
