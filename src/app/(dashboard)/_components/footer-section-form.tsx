"use client";

import { updateFooter } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heading,
  MapPin,
  Mail,
  Copyright as CopyrightIcon,
  Facebook,
  Linkedin,
  Loader2,
} from "lucide-react";
import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

/* ========================= */
/*     SectionCard Reuse     */
/* ========================= */
const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal flex items-center justify-center">
          <Icon size={20} />
        </div>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
};

interface FooterSectionFormProps {
  item: Promise<{
    id: number;
    title: string;
    address: string;
    email: string;
    copyright: string;
    facebook: string;
    linkedIn: string;
  }>;
}

const FooterSectionForm = ({ item: footerItem }: FooterSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(footerItem);

  const [formData, setFormData] = useState({
    title: item.title || "",
    address: item.address || "",
    email: item.email || "",
    copyright: item.copyright || "",
    facebook: item.facebook || "",
    linkedIn: item.linkedIn || "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, action, pending] = useActionState(updateFooter, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Footer updated successfully.");
    }
  }, [state]);

  return (
    <form action={action}>
      <div className="my-10 space-y-8 max-w-2xl">
        {/* Title */}
        <SectionCard icon={Heading} title="Title">
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
            <p className="text-xs text-red-600">{state.errors.title}</p>
          )}
        </SectionCard>

        {/* Address */}
        <SectionCard icon={MapPin} title="Address">
          {!isEdit ? (
            <p className="text-muted-foreground">{item.address}</p>
          ) : (
            <Input
              name="address"
              value={formData.address}
              onChange={handleOnChange}
            />
          )}
          {state?.errors?.address && (
            <p className="text-xs text-red-600">{state.errors.address}</p>
          )}
        </SectionCard>

        {/* Email */}
        <SectionCard icon={Mail} title="Email">
          {!isEdit ? (
            <p className="text-muted-foreground">{item.email}</p>
          ) : (
            <Input
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
          )}
          {state?.errors?.email && (
            <p className="text-xs text-red-600">{state.errors.email}</p>
          )}
        </SectionCard>

        {/* Copyright */}
        <SectionCard icon={CopyrightIcon} title="Copyright">
          {!isEdit ? (
            <p className="text-muted-foreground">{item.copyright}</p>
          ) : (
            <Input
              name="copyright"
              value={formData.copyright}
              onChange={handleOnChange}
            />
          )}
          {state?.errors?.copyright && (
            <p className="text-xs text-red-600">{state.errors.copyright}</p>
          )}
        </SectionCard>

        {/* ================= SOCIAL LINKS ================= */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Social Links
          </p>

          {/* Facebook */}
          <SectionCard icon={Facebook} title="Facebook">
            {!isEdit ? (
              <p className="text-muted-foreground">{item.facebook}</p>
            ) : (
              <Input
                name="facebook"
                value={formData.facebook}
                onChange={handleOnChange}
              />
            )}
            {state?.errors?.facebook && (
              <p className="text-xs text-red-600">{state.errors.facebook}</p>
            )}
          </SectionCard>

          {/* LinkedIn */}
          <SectionCard icon={Linkedin} title="LinkedIn">
            {!isEdit ? (
              <p className="text-muted-foreground">{item.linkedIn}</p>
            ) : (
              <Input
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleOnChange}
              />
            )}
            {state?.errors?.linkedIn && (
              <p className="text-xs text-red-600">{state.errors.linkedIn}</p>
            )}
          </SectionCard>
        </div>

        {/* Edit / Save buttons */}
        {/* {!isEdit ? (
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
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
                  Updating...
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
      </div>
    </form>
  );
};

export default FooterSectionForm;
