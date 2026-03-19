"use client";

import { updateTestimony } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Heading,
  AlignLeft,
  MessageSquareQuote,
  User,
  Loader2,
} from "lucide-react";

import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface TestimonySectionFormProps {
  item: Promise<{
    id: number;
    heading: string;
    paragraph: string;
    testimony: string;
    author: string;
  }>;
}

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

const TestimonySectionForm = ({
  item: featuresItem,
}: TestimonySectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(featuresItem);

  const [formData, setFormData] = useState({
    heading: item.heading || "",
    paragraph: item.paragraph || "",
    testimony: item.testimony || "",
    author: item.author || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, action, pending] = useActionState(updateTestimony, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-6 max-w-3xl my-8">
      {/* Heading */}
      <SectionCard icon={Heading} title="Heading">
        {isEdit ? (
          <Input
            name="heading"
            value={formData.heading}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.heading}</p>
        )}
        {state?.errors?.heading && (
          <p className="text-sm text-red-600">{state.errors.heading}</p>
        )}
      </SectionCard>

      {/* Paragraph */}
      <SectionCard icon={AlignLeft} title="Paragraph">
        {isEdit ? (
          <Textarea
            name="paragraph"
            value={formData.paragraph}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground whitespace-pre-line">
            {item.paragraph}
          </p>
        )}
        {state?.errors?.paragraph && (
          <p className="text-sm text-red-600">{state.errors.paragraph}</p>
        )}
      </SectionCard>

      {/* Testimony */}
      <SectionCard icon={MessageSquareQuote} title="Testimony">
        {isEdit ? (
          <Textarea
            name="testimony"
            value={formData.testimony}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground whitespace-pre-line">
            {item.testimony}
          </p>
        )}
        {state?.errors?.testimony && (
          <p className="text-sm text-red-600">{state.errors.testimony}</p>
        )}
      </SectionCard>

      {/* Author */}
      <SectionCard icon={User} title="Author">
        {isEdit ? (
          <Input
            name="author"
            value={formData.author}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.author}</p>
        )}
        {state?.errors?.author && (
          <p className="text-sm text-red-600">{state.errors.author}</p>
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

export default TestimonySectionForm;
