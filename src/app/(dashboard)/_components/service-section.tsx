"use client";

import { updateService } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Heading,
  Quote,
  Layers,
  Package,
  Loader2,
  ImageIcon,
} from "lucide-react";

import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteServiceModal from "./delete-service-modal";
import UpdateServiceModal from "./update-service-modal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface ServiceSectionProps {
  item: Promise<{
    id: number;
    title: string;
    subTitle: string;
  }>;
  allServices: Promise<
    {
      id: number;
      serviceId: number;
      title: string;
      summary: string;
      description: string;
      url: string;
    }[]
  >;
}

const CardSection = ({
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

const ServiceSection = ({
  item: VisionItem,
  allServices,
}: ServiceSectionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(VisionItem);
  const services = use(allServices);

  const [formData, setFormData] = useState({
    title: item.title || "",
    subTitle: item.subTitle || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const [state, action, pending] = useActionState(updateService, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Data updated successfully.");
      setIsEdit(false);
    }
  }, [state]);

  return (
    <>
      {/* MAIN FORM */}
      <form action={action} className="max-w-3xl space-y-6 my-8">
        <CardSection icon={Heading} title="Heading">
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
        </CardSection>

        <CardSection icon={Quote} title="Sub Heading">
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
        </CardSection>

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

      {/* SERVICES LIST */}
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-teal/20 text-brand-teal">
            <Package size={18} />
          </div>
          <p className="text-xs font-bold tracking-wide">SERVICES</p>
        </div>

        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground border rounded-xl shadow-sm space-y-2">
              <p>No services found.</p>
              <p className="text-xs">
                Click <b>Add Service</b> to create new services.
              </p>
            </div>
          ) : (
            <p className="text-sm">
              Total services:{" "}
              <span className="font-bold">{services.length}</span>
            </p>
          )}

          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-xl border bg-card shadow-sm space-y-4"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {service.url ? (
                          <Image
                            src={service.url}
                            alt="logo"
                            width={40}
                            height={40}
                            className="object-cover rounded-sm"
                          />
                        ) : (
                          <ImageIcon className="text-muted-foreground" />
                        )}
                      </div>
                      <p className="font-medium">{service.title}</p>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-3 mt-2">
                    <p className="text-muted-foreground">{service.summary}</p>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="flex justify-end gap-2 pt-2">
                      <UpdateServiceModal services={service} />
                      <DeleteServiceModal
                        id={service.id}
                        title={service.title}
                        length={services.length}
                        url={service.url}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceSection;
