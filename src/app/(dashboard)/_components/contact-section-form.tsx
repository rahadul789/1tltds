"use client";

import { updateContact } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Loader2,
  FileEdit,
  Heading as HeadingIcon,
  Link2,
  SquareMousePointer,
} from "lucide-react";

import { ChangeEvent, use, useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

/* -------------------------------------- */
/*           REUSABLE SECTION CARD        */
/* -------------------------------------- */

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>

    {children}
  </div>
);

/* -------------------------------------- */
/*       MAIN CONTACT SECTION FORM        */
/* -------------------------------------- */

interface ContactSectionFormProps {
  item: Promise<{
    id: number;
    title: string;
    subTitle: string;
    buttonLabel: string;
    buttonLink: string;
  }>;
}

const ContactSectionForm = ({ item: homeItem }: ContactSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(homeItem);

  const [formData, setFormData] = useState({
    title: item.title || "",
    subTitle: item.subTitle || "",
    buttonLabel: item.buttonLabel || "",
    buttonLink: item.buttonLink || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [state, action, pending] = useActionState(updateContact, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Contact section updated successfully.");
    }
  }, [state]);

  return (
    <form action={action} className="w-full max-w-2xl space-y-6 my-10">
      {/* Heading */}
      <SectionCard icon={HeadingIcon} title="Heading">
        {!isEdit ? (
          <p className="text-muted-foreground">{item.title}</p>
        ) : (
          <Input
            name="title"
            value={formData.title}
            onChange={handleOnChange}
          />
        )}

        {state?.errors?.title && (
          <p className="text-xs text-red-600 font-medium">
            {state.errors.title}
          </p>
        )}
      </SectionCard>

      {/* Sub Heading */}
      <SectionCard icon={FileEdit} title="Sub Heading">
        {!isEdit ? (
          <p className="text-muted-foreground">{item.subTitle}</p>
        ) : (
          <Input
            name="subTitle"
            value={formData.subTitle}
            onChange={handleOnChange}
          />
        )}

        {state?.errors?.subTitle && (
          <p className="text-xs text-red-600 font-medium">
            {state.errors.subTitle}
          </p>
        )}
      </SectionCard>

      {/* Button Label */}
      <SectionCard icon={SquareMousePointer} title="Button Label">
        {!isEdit ? (
          <p className="text-muted-foreground">{item.buttonLabel}</p>
        ) : (
          <Input
            name="buttonLabel"
            value={formData.buttonLabel}
            onChange={handleOnChange}
          />
        )}

        {state?.errors?.buttonLabel && (
          <p className="text-xs text-red-600 font-medium">
            {state.errors.buttonLabel}
          </p>
        )}
      </SectionCard>

      {/* Button Link */}
      <SectionCard icon={Link2} title="Button Link">
        {!isEdit ? (
          <p className="text-muted-foreground break-all">{item.buttonLink}</p>
        ) : (
          <Input
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleOnChange}
          />
        )}

        {state?.errors?.buttonLink && (
          <p className="text-xs text-red-600 font-medium">
            {state.errors.buttonLink}
          </p>
        )}
      </SectionCard>

      {/* ACTION BUTTONS */}
      {/* {!isEdit ? (
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setIsEdit(true)}
            className="px-6"
          >
            Edit
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>

          <Button disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      )} */}

      {!isEdit && (
        <div className=" flex justify-end">
          <Button
            className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
            onClick={() => setIsEdit((prev) => !prev)}
          >
            Edit
          </Button>
        </div>
      )}
      {isEdit && (
        <div className=" flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsEdit((prev) => !prev)}
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
                <span>Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default ContactSectionForm;
