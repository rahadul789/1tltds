"use client";

import { addInfiniteItem } from "@/app/lib/actions";
import DropzoneImage from "@/components/dropzone-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const AddInfiniteModal = ({ heading }: { heading: string }) => {
  const [state, action, pending] = useActionState(addInfiniteItem, undefined);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Item added successfully.");
    }
  }, [state]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-brand-teal hover:bg-brand-teal/80 cursor-pointer">
          <Plus />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            All items are displayed on the horizontal auto infinite scroll.
          </DialogDescription>
        </DialogHeader>
        <DropzoneImage setUrl={setUrl} url={url} />
        {state?.errors?.url && (
          <p className=" text-red-700 text-xs font-semibold">
            {state.errors.url}
          </p>
        )}
        <form action={action}>
          <div className=" space-y-4 max-w-2xl">
            <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-teal border-t-1 space-y-2">
              <h2 className=" text-sm font-semibold">Title</h2>
              <Input name="title" id="title" />
              {state?.errors?.title && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.title}
                </p>
              )}
              <Input
                name="heading"
                id="heading"
                hidden
                value={heading}
                readOnly
              />

              <Input name="url" id="url" hidden value={url} readOnly />
            </div>

            <div className=" flex justify-end">
              <Button
                disabled={pending}
                className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
              >
                {pending ? (
                  <>
                    <Loader2 className=" animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInfiniteModal;
