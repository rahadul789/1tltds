"use client";

import { updateHome } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Tag,
  Type,
  FileText,
  BadgeCheck,
  SquareMousePointer,
  Loader2,
} from "lucide-react";

import {
  ChangeEvent,
  use,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

interface HomeSectionFormProps {
  item: Promise<{
    id: number;
    title1: string;
    title2: string;
    badge1: string;
    badge2: string;
    paragraph: string;
    buttonText: string;
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
}) => {
  return (
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
};

const HomeSectionForm = ({ item: homeItem }: HomeSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(homeItem);

  const [formData, setFormData] = useState({
    badge1: item.badge1 || "",
    badge2: item.badge2 || "",
    title1: item.title1 || "",
    title2: item.title2 || "",
    paragraph: item.paragraph || "",
    buttonText: item.buttonText || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const [state, action, pending] = useActionState(updateHome, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Data updated successfully.");
      setIsEdit(false);
    }
  }, [state]);

  return (
    <form action={action} className="max-w-3xl space-y-6 pb-10">
      {/* Badge 1 */}
      <SectionCard icon={BadgeCheck} title="Badge 1">
        {isEdit ? (
          <Input
            name="badge1"
            value={formData.badge1}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.badge1}</p>
        )}
        {state?.errors?.badge1 && (
          <p className="text-sm text-red-600">{state.errors.badge1}</p>
        )}
      </SectionCard>

      {/* Badge 2 */}
      <SectionCard icon={BadgeCheck} title="Badge 2">
        {isEdit ? (
          <Input
            name="badge2"
            value={formData.badge2}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.badge2}</p>
        )}
        {state?.errors?.badge2 && (
          <p className="text-sm text-red-600">{state.errors.badge2}</p>
        )}
      </SectionCard>

      {/* Title 1 */}
      <SectionCard icon={Type} title="Title 1">
        {isEdit ? (
          <Input
            name="title1"
            value={formData.title1}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.title1}</p>
        )}
        {state?.errors?.title1 && (
          <p className="text-sm text-red-600">{state.errors.title1}</p>
        )}
      </SectionCard>

      {/* Title 2 */}
      <SectionCard icon={Type} title="Title 2">
        {isEdit ? (
          <Input
            name="title2"
            value={formData.title2}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.title2}</p>
        )}
        {state?.errors?.title2 && (
          <p className="text-sm text-red-600">{state.errors.title2}</p>
        )}
      </SectionCard>

      {/* Paragraph */}
      <SectionCard icon={FileText} title="Paragraph">
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

      {/* Button Text */}
      <SectionCard icon={SquareMousePointer} title="Button Text">
        {isEdit ? (
          <Input
            name="buttonText"
            value={formData.buttonText}
            onChange={handleOnChange}
          />
        ) : (
          <p className="text-muted-foreground">{item.buttonText}</p>
        )}

        {state?.errors?.buttonText && (
          <p className="text-sm text-red-600">{state.errors.buttonText}</p>
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
                <span>Updating</span>
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

export default HomeSectionForm;
