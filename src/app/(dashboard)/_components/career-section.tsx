"use client";

import { updateCareer } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Edit,
  Mail,
  Heading as HeadingIcon,
  Layers,
  BadgeCheck,
  Loader2,
  Briefcase,
  UserCheck,
} from "lucide-react";

import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Job } from "./jobs";
import { AppliedJob } from "./applied-jobs";

/* -------------------------------------------------- */
/*               REUSABLE CARD COMPONENT              */
/* -------------------------------------------------- */

const StyledCard = ({
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

/* -------------------------------------------------- */
/*                 MAIN CAREER SECTION                */
/* -------------------------------------------------- */

interface jobSectionProps {
  item: Promise<{
    id: number;
    heroTitle: string;
    title: string;
    subTitle: string;
    email: string;
  }>;
  allJobs: Promise<any[]>;
  appliedJobs: Promise<any[]>;
}

const CareerSection = ({
  item: VisionItem,
  allJobs,
  appliedJobs: allAppliedJobs,
}: jobSectionProps) => {
  const item = use(VisionItem);
  const jobs = use(allJobs);
  const appliedJobs = use(allAppliedJobs);

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    heroTitle: item.heroTitle || "",
    title: item.title || "",
    subTitle: item.subTitle || "",
    email: item.email || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [state, action, pending] = useActionState(updateCareer, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Career section updated successfully.");
    }
  }, [state]);

  return (
    <>
      {/* -------------------------------------- */}
      {/*           FORM SECTION                 */}
      {/* -------------------------------------- */}
      <form action={action} className="max-w-2xl space-y-6 my-10">
        <StyledCard icon={HeadingIcon} title="Hero Title">
          {!isEdit ? (
            <p className="text-muted-foreground">{item.heroTitle}</p>
          ) : (
            <div className="space-y-1">
              <Input
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleOnChange}
              />
              <div className="flex justify-end text-xs">
                <span className="text-brand-red font-semibold">
                  1<span className="text-brand-teal">Technologies</span>
                </span>
              </div>
            </div>
          )}

          {state?.errors?.heroTitle && (
            <p className="text-xs text-red-600 font-medium">
              {state.errors.heroTitle}
            </p>
          )}
        </StyledCard>

        <StyledCard icon={Layers} title="Title">
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
        </StyledCard>

        <StyledCard icon={BadgeCheck} title="Sub Title">
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
        </StyledCard>

        <StyledCard icon={Mail} title="Notification Email">
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
            <p className="text-xs text-red-600 font-medium">
              {state.errors.email}
            </p>
          )}
        </StyledCard>

        {/* ACTION BUTTONS */}
        {/* {!isEdit ? (
          <div className="flex justify-end">
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsEdit(false)}>
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

      {/* -------------------------------------- */}
      {/*              JOBS TABS                 */}
      {/* -------------------------------------- */}
      <Tabs defaultValue="all-jobs" className="max-w-2xl">
        <TabsList className="mb-4">
          <TabsTrigger
            value="all-jobs"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Briefcase size={14} />
            All Jobs
          </TabsTrigger>

          <TabsTrigger
            value="applied-jobs"
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <UserCheck size={14} />
            Applied Jobs
            {appliedJobs.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-brand-teal text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {appliedJobs.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ALL JOBS */}
        <TabsContent value="all-jobs">
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground border rounded-xl shadow-sm space-y-2">
                <p>No jobs found.</p>
                <p className="text-xs">
                  Click <span className="font-semibold">Add Job</span> to create
                  one.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm">
                  Total jobs: <span className="font-bold">{jobs.length}</span>
                </p>

                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border bg-card shadow-sm hover:shadow-md hover:scale-[1.01] transition"
                  >
                    <Job job={job} />
                  </div>
                ))}
              </>
            )}
          </div>
        </TabsContent>

        {/* APPLIED JOBS */}
        <TabsContent value="applied-jobs">
          <div className="space-y-4">
            {appliedJobs.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground border rounded-xl shadow-sm">
                No one applied yet.
              </div>
            ) : (
              <>
                <p className="text-sm">
                  Total applied jobs:{" "}
                  <span className="font-bold">{appliedJobs.length}</span>
                </p>

                {appliedJobs.map((job) => (
                  <div key={job.id}>
                    <AppliedJob job={job} />
                  </div>
                ))}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CareerSection;
