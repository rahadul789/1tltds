"use client";

import { updateFeatures } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Lightbulb, Quote, Star, AlignLeft, Loader2 } from "lucide-react";

import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface VisionSectionFormProps {
  item: Promise<{
    id: number;
    title: string;
    subTitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  }>;
}

const SectionCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

const VisionSectionForm = ({ item: featuresItem }: VisionSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(featuresItem);

  const [formData, setFormData] = useState({
    title: item.title || "",
    subTitle: item.subTitle || "",
    feature1Title: item.feature1Title || "",
    feature1Description: item.feature1Description || "",
    feature2Title: item.feature2Title || "",
    feature2Description: item.feature2Description || "",
    feature3Title: item.feature3Title || "",
    feature3Description: item.feature3Description || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const [state, action, pending] = useActionState(updateFeatures, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Data updated successfully.");
      setIsEdit(false);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-6 max-w-3xl my-8">
      {/* HEADING */}
      <SectionCard title="Main Heading" icon={Lightbulb}>
        {isEdit ? (
          <Input
            name="title"
            value={formData.title}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.title}</p>
        )}
        {state?.errors?.title && (
          <p className="text-sm text-red-600">{state.errors.title}</p>
        )}
      </SectionCard>

      {/* SUB HEADING */}
      <SectionCard title="Sub Heading" icon={Quote}>
        {isEdit ? (
          <Input
            name="subTitle"
            value={formData.subTitle}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.subTitle}</p>
        )}
        {state?.errors?.subTitle && (
          <p className="text-sm text-red-600">{state.errors.subTitle}</p>
        )}
      </SectionCard>

      {/* FEATURE 1 */}
      <p className="font-semibold text-xs mt-8">Feature 1</p>

      <SectionCard title="Title" icon={Star}>
        {isEdit ? (
          <Input
            name="feature1Title"
            value={formData.feature1Title}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.feature1Title}</p>
        )}
        {state?.errors?.feature1Title && (
          <p className="text-sm text-red-600">{state.errors.feature1Title}</p>
        )}
      </SectionCard>

      <SectionCard title="Description" icon={AlignLeft}>
        {isEdit ? (
          <Textarea
            name="feature1Description"
            value={formData.feature1Description}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground whitespace-pre-line">
            {item.feature1Description}
          </p>
        )}
        {state?.errors?.feature1Description && (
          <p className="text-sm text-red-600">
            {state.errors.feature1Description}
          </p>
        )}
      </SectionCard>

      {/* FEATURE 2 */}
      <p className="font-semibold text-xs mt-8">Feature 2</p>

      <SectionCard title="Title" icon={Star}>
        {isEdit ? (
          <Input
            name="feature2Title"
            value={formData.feature2Title}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.feature2Title}</p>
        )}
        {state?.errors?.feature2Title && (
          <p className="text-sm text-red-600">{state.errors.feature2Title}</p>
        )}
      </SectionCard>

      <SectionCard title="Description" icon={AlignLeft}>
        {isEdit ? (
          <Textarea
            name="feature2Description"
            value={formData.feature2Description}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground whitespace-pre-line">
            {item.feature2Description}
          </p>
        )}
        {state?.errors?.feature2Description && (
          <p className="text-sm text-red-600">
            {state.errors.feature2Description}
          </p>
        )}
      </SectionCard>

      {/* FEATURE 3 */}
      <p className="font-semibold text-xs mt-8">Feature 3</p>

      <SectionCard title="Title" icon={Star}>
        {isEdit ? (
          <Input
            name="feature3Title"
            value={formData.feature3Title}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.feature3Title}</p>
        )}
        {state?.errors?.feature3Title && (
          <p className="text-sm text-red-600">{state.errors.feature3Title}</p>
        )}
      </SectionCard>

      <SectionCard title="Description" icon={AlignLeft}>
        {isEdit ? (
          <Textarea
            name="feature3Description"
            value={formData.feature3Description}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground whitespace-pre-line">
            {item.feature3Description}
          </p>
        )}
        {state?.errors?.feature3Description && (
          <p className="text-sm text-red-600">
            {state.errors.feature3Description}
          </p>
        )}
      </SectionCard>

      {/* ACTION BUTTONS */}
      {/* {!isEdit ? (
        <div className="flex justify-end">
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        </div>
      ) : (
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>

          <Button disabled={pending}>
            {pending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Updating...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      )} */}

      {!isEdit && (
        <div className=" flex justify-end ">
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

export default VisionSectionForm;
