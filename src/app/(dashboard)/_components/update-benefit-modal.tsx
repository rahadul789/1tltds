"use client";

import { updateBenefitItem, updateServiceItem } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Loader2, X } from "lucide-react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface UpdateBenefitModalProps {
  benefit: {
    id: number;
    title: string;
    description: string;
  };
}
[];

const UpdateBenefitModal = ({ benefit }: UpdateBenefitModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: benefit.id,
    title: benefit.title || "",
    description: benefit.description || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [state, action, pending] = useActionState(updateBenefitItem, undefined);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full cursor-pointer "
          size="icon"
          variant="secondary"
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit service</DialogTitle>
          <DialogDescription>
            You can edit and update your service.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="  space-y-4 max-w-2xl">
            <div className="  space-y-1">
              <h2 className=" text-sm font-semibold">Title</h2>
              <Input
                name="title"
                id="title"
                value={formData.title}
                onChange={handleOnChange}
              />
              <input
                name="id"
                value={formData.id}
                hidden
                onChange={handleOnChange}
              />

              {state?.errors?.title && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.title}
                </p>
              )}
            </div>
            <div className=" space-y-1">
              <h2 className=" text-sm font-semibold">Description</h2>

              <Textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleOnChange}
                className=" h-40"
              />

              {state?.errors?.title && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div className=" flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={pending}
                className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
              >
                {pending ? (
                  <>
                    <Loader2 className=" animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBenefitModal;
