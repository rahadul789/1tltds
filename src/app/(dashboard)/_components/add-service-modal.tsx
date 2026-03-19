"use client";

import { addService } from "@/app/lib/actions";
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

const AddServiceModal = () => {
  const [state, action, pending] = useActionState(addService, undefined);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Service added successfully.");
    }
  }, [state]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-brand-teal hover:bg-brand-teal/80 cursor-pointer">
          <Plus />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
          <DialogDescription>
            First six services will be shown in frontend
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
            <Input name="url" id="title" value={url} hidden readOnly />
            <div className=" space-y-1">
              <h2 className=" text-sm font-semibold">Title</h2>
              <Input name="title" id="title" />
              {state?.errors?.title && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.title}
                </p>
              )}
            </div>
            <div className="  space-y-1">
              <h2 className=" text-sm font-semibold">Summary</h2>

              <Textarea name="summary" id="summary" />

              {state?.errors?.summary && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.summary}
                </p>
              )}
            </div>

            <div className="  space-y-1">
              <h2 className=" text-sm font-semibold">Description</h2>

              <Textarea name="description" id="description" />

              {state?.errors?.description && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div className=" flex justify-end">
              <Button
                disabled={pending}
                className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
              >
                {pending ? (
                  <>
                    <Loader2 className=" animate-spin" />
                    <span>Adding</span>
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

export default AddServiceModal;
