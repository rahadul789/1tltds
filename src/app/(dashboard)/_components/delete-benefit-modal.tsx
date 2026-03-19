"use client";

import { addService, deleteBenefit, deleteService } from "@/app/lib/actions";
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
import { Loader2, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteBenefitModal = ({ id, title }: { id: number; title: string }) => {
  const [state, action, pending] = useActionState(deleteBenefit, undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Benefit deleted successfully.");
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
          <Trash2 />
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
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={action}>
          <input type="hidden" name="id" value={id} />

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

export default DeleteBenefitModal;
