"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { addBenefits, addJob } from "@/app/lib/actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function AddBenefitModal() {
  const [open, setOpen] = useState(false);

  // Local state for repeatable array fields
  const [state, action, pending] = useActionState(addBenefits, undefined);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Benefit added successfully.");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-brand-teal hover:bg-brand-teal/80 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span className="ml-1">Add Benefit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl ">
        <DialogHeader>
          <DialogTitle>Add Benefit</DialogTitle>
          <DialogDescription>
            Fill out the details for a new benefit posting.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <form className="space-y-4" action={action}>
            {/* Title */}
            <div className=" space-y-1">
              <Label htmlFor="position" className="text-sm font-semibold">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Robust security features"
              />
              {state?.errors?.title && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="type" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write description here"
              />
              {state?.errors?.description && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
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
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
