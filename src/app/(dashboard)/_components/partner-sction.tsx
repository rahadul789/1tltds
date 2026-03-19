"use client";

import {
  Briefcase,
  FileText,
  MessageSquare,
  Mail,
  LinkIcon,
  Type,
  TextQuote,
  NotebookPen,
  Megaphone,
  Contact,
  Sparkles,
} from "lucide-react";

import { updatePartner } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import UpdateBenefitModal from "./update-benefit-modal";
import DeleteBenefitModal from "./delete-benefit-modal";
import EditableFieldCard from "./editable-field-card";

/* -------------------------------------------------------------------------- */
/*                   Reusable Section Card (your standard UI)                 */
/* -------------------------------------------------------------------------- */
const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

interface partnerSectionProps {
  item: Promise<{
    id: number;
    bannerTitle: string;
    bannerParagraph: string;
    benefitTitle: string;
    contactTitle: string;
    contactParagraph: string;
    email: string;
    buttonLabel: string;
    buttonLink: string;
  }>;
  benefits: Promise<
    {
      id: number;
      title: string;
      description: string;
    }[]
  >;
}

const ParterSection = ({ item: data, benefits }: partnerSectionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(data);
  const allBenefits = use(benefits);

  const [formData, setFormData] = useState({
    bannerTitle: item.bannerTitle || "",
    bannerParagraph: item.bannerParagraph || "",
    benefitTitle: item.benefitTitle || "",
    contactTitle: item.contactTitle || "",
    contactParagraph: item.contactParagraph || "",
    email: item.email || "",
    buttonLabel: item.buttonLabel || "",
    buttonLink: item.buttonLink || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, action, pending] = useActionState(updatePartner, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  return (
    <>
      <form action={action}>
        <div className="my-8 space-y-6 max-w-2xl">
          {/* -------------------------------------------------------------- */}
          {/*                         HERO TITLE                            */}
          {/* -------------------------------------------------------------- */}
          <EditableFieldCard
            label="Hero Title"
            name="bannerTitle"
            icon={Type}
            value={formData.bannerTitle}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.bannerTitle}
            rightMeta={
              <p className="text-xs text-brand-red font-semibold">
                1<span className="text-brand-teal">Technologies</span>
              </p>
            }
          />

          {/* -------------------------------------------------------------- */}
          {/*                        HERO PARAGRAPH                          */}
          {/* -------------------------------------------------------------- */}
          <EditableFieldCard
            label="Hero Paragraph"
            name="bannerParagraph"
            icon={TextQuote}
            value={formData.bannerParagraph}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.bannerParagraph}
            placeholder="Write a short paragraph"
          />

          {/* -------------------------------------------------------------- */}
          {/*                         BENEFITS TITLE                         */}
          {/* -------------------------------------------------------------- */}
          <EditableFieldCard
            label="Benefits Title"
            name="benefitTitle"
            icon={Sparkles}
            value={formData.benefitTitle}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.benefitTitle}
          />

          {/* -------------------------------------------------------------- */}
          {/*                         CONTACT TITLE                          */}
          {/* -------------------------------------------------------------- */}
          <EditableFieldCard
            label="Contact Title"
            name="contactTitle"
            icon={NotebookPen}
            value={formData.contactTitle}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.contactTitle}
          />

          <EditableFieldCard
            label="Contact Paragraph"
            name="contactParagraph"
            icon={MessageSquare}
            value={formData.contactParagraph}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.contactParagraph}
            placeholder="Contact details or intro text"
          />

          {/* -------------------------------------------------------------- */}
          {/*                              EMAIL                              */}
          {/* -------------------------------------------------------------- */}
          <EditableFieldCard
            label="Email"
            name="email"
            icon={Mail}
            value={formData.email}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.email}
            placeholder="hello@company.com"
          />

          {/* -------------------------------------------------------------- */}
          {/*                         BUTTON DETAILS                         */}
          {/* -------------------------------------------------------------- */}
          <EditableFieldCard
            label="Button Label"
            name="buttonLabel"
            icon={Type}
            value={formData.buttonLabel}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.buttonLabel}
          />

          <EditableFieldCard
            label="Button Link"
            name="buttonLink"
            icon={LinkIcon}
            value={formData.buttonLink}
            isEdit={isEdit}
            onChange={handleOnChange}
            error={state?.errors?.buttonLink}
            placeholder="https://..."
          />

          {/* -------------------------------------------------------------- */}
          {/*                        EDIT TOGGLE BUTTONS                     */}
          {/* -------------------------------------------------------------- */}
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
                  <>
                    <Loader2 className="animate-spin mr-2" />
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

      {/* ------------------------------------------------------------------ */}
      {/*                          BENEFITS LIST                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="my-4 space-y-4">
        {allBenefits.length === 0 && (
          <div className="p-10 text-center text-muted-foreground border rounded-md space-y-3">
            <p>No benefits found.</p>
            <p className="text-xs">
              Please click{" "}
              <span className="font-bold text-muted-foreground">
                Add Benefit
              </span>{" "}
              to create new benefits.
            </p>
          </div>
        )}

        {allBenefits.length > 0 && (
          <p className="font-medium">
            Total benefits:{" "}
            <span className="font-bold">{allBenefits.length}</span>
          </p>
        )}

        {allBenefits.map((benefit) => (
          <CardBenefit key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </>
  );
};

/* -------------------------------------------------------------- */
/*                      Benefit Accordion UI                      */
/* -------------------------------------------------------------- */

const CardBenefit = ({ benefit }: any) => (
  <div
    className="
      shadow-md px-4 py-4 rounded-md border-l-4 border-brand-teal 
      transition-all duration-200 hover:shadow-lg hover:scale-[1.02] max-w-2xl
    "
  >
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-0">
        <AccordionTrigger className="flex items-center justify-between w-full rounded-lg">
          <div className="flex items-center gap-2">
            {/* Icon bubble */}

            <h1 className="text-base font-semibold text-foreground tracking-tight">
              {benefit.title}
            </h1>
          </div>
        </AccordionTrigger>

        <AccordionContent className="mt-3 flex flex-col gap-4 text-muted-foreground">
          <p className="leading-relaxed">{benefit.description}</p>

          <div className="flex justify-end gap-2">
            <UpdateBenefitModal benefit={benefit} />
            <DeleteBenefitModal id={benefit.id} title={benefit.title} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default ParterSection;
