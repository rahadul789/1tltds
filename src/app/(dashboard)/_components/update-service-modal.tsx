"use client";

import { updateServiceItem } from "@/app/lib/actions";
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
import DropzoneImage from "@/components/dropzone-image";
import Image from "next/image";

interface HomeSectionFormProps {
  services: {
    id: number;
    serviceId: number;
    title: string;
    summary: string;
    description: string;
    url: string;
  };
}
[];

const UpdateServiceModal = ({ services }: HomeSectionFormProps) => {
  const [open, setOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState("");
  const [editPhoto, setEditPhoto] = useState(false);

  const [formData, setFormData] = useState({
    id: services.id,
    title: services.title || "",
    summary: services.summary || "",
    description: services.description || "",
    url: services.url || "",
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

  const [state, action, pending] = useActionState(updateServiceItem, undefined);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  useEffect(() => {
    setEditPhoto(false);
  }, [tempUrl]);

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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit service</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-start gap-4">
          {/* CURRENT IMAGE */}
          <div className="relative w-32 h-32 rounded-md overflow-hidden bg-gray-100 group/image">
            <Image
              src={tempUrl || formData.url}
              alt="logo"
              fill
              className="object-cover transition-opacity duration-200 group-hover/image:opacity-30 pointer-events-none"
            />

            {/* Change button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditPhoto(true)}
              >
                Change Photo
              </Button>
            </div>
          </div>

          {/* WHEN CHANGE IS CLICKED → DropzoneImage appears */}
          {editPhoto && (
            <div className="relative">
              <DropzoneImage setUrl={setTempUrl} url={tempUrl} />

              <Button
                onClick={() => {
                  setEditPhoto(false);
                  setTempUrl("");
                }}
                className="absolute top-2 right-2"
                size="icon"
              >
                <X />
              </Button>
            </div>
          )}
        </div>
        <form action={action}>
          <div className="  space-y-4 max-w-2xl">
            <div className=" space-y-1">
              <h2 className=" text-sm font-semibold">Title</h2>
              <input
                type="hidden"
                name="deletedUrl"
                value={tempUrl ? formData.url : ""}
              />

              {/* NEW URL → tempUrl OR fallback old */}
              <input
                type="hidden"
                name="url"
                value={tempUrl ? tempUrl : formData.url}
              />
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
            <div className="  space-y-1">
              <h2 className=" text-sm font-semibold">Summary</h2>

              <Textarea
                name="summary"
                id="summary"
                value={formData.summary}
                onChange={handleOnChange}
              />

              {state?.errors?.summary && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.summary}
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

              {state?.errors?.description && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div className=" flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className=" cursor-pointer"
                >
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

export default UpdateServiceModal;
