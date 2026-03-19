"use client";

import { deleteAppliedJob } from "@/app/lib/actions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, CircleUser, Loader2, Trash2 } from "lucide-react";

import { useActionState, useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";

interface JobProps {
  job: {
    id: number;
    position: string;
    experience: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    github: string | null;
    linkedIn: string | null;
    expectedSalary: string;
    whyInterested: string;
    keySkills: string | null;
    coverLetter: string | null;
    resumeUrl: string;
  };
}

export function AppliedJob({ job }: JobProps) {
  const [state, action, pending] = useActionState(deleteAppliedJob, undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success("Application deleted successfully.");
      setOpen(false);
    }
  }, [state]);

  return (
    <div className="group p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3">
        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item">
            <AccordionTrigger className="rounded-lg hover:no-underline">
              <div className="flex flex-col w-full gap-3">
                {/* Position */}
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness
                    className="text-muted-foreground"
                    size={16}
                  />
                  <p className="text-sm font-semibold">{job.position}</p>
                </div>

                {/* Name */}
                <div className="flex items-center gap-2">
                  <CircleUser className="text-brand-teal" size={20} />
                  <h1 className="text-lg font-semibold">{job.name}</h1>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground font-medium">
                  <span>Experience: {job.experience}</span>
                  <span>•</span>
                  <span>Expected Salary: {job.expectedSalary} tk</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>

                {/* CV Button */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-fit mt-1 text-xs shadow-sm"
                >
                  <a href={job.resumeUrl} target="_blank">
                    View Resume
                  </a>
                </Button>
              </div>
            </AccordionTrigger>

            {/* Expanded Section */}
            <AccordionContent className="pt-4 mt-2 border-t">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {/* Email */}
                <InfoBlock title="Email" value={job.email} />

                {/* Phone */}
                <InfoBlock title="Phone" value={job.phone} />

                {/* GitHub */}
                {job.github && (
                  <InfoBlock
                    title="GitHub"
                    value={
                      <a
                        href={job.github}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {job.github}
                      </a>
                    }
                  />
                )}

                {/* LinkedIn */}
                {job.linkedIn && (
                  <InfoBlock
                    title="LinkedIn"
                    value={
                      <a
                        href={job.linkedIn}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {job.linkedIn}
                      </a>
                    }
                  />
                )}

                {/* Why Interested */}
                <InfoBlock
                  title="Why Interested"
                  full
                  value={<p>{job.whyInterested}</p>}
                />

                {/* Key Skills */}
                <InfoBlock
                  title="Key Skills"
                  full
                  value={<p>{job.keySkills}</p>}
                />

                {/* Cover Letter */}
                <InfoBlock
                  title="Cover Letter"
                  full
                  value={<p>{job.coverLetter}</p>}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Delete Popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={pending}
              className="rounded-full hover:bg-red-50 cursor-pointer"
            >
              {pending ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Trash2 className="text-red-600 h-4 w-4" />
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-48">
            <h4 className="font-medium text-sm">Are you sure?</h4>
            <p className="text-xs text-muted-foreground mt-1">
              This action cannot be undone.
            </p>

            <div className="flex gap-2 justify-end mt-4">
              <form action={action}>
                <input type="hidden" name="id" value={job.id} />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Delete
                </Button>
              </form>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

/* ---------------------------------------------- */
/* ---------- Small Reusable UI Block ----------- */
/* ---------------------------------------------- */

function InfoBlock({
  title,
  value,
  full = false,
}: {
  title: string;
  value: any;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {title}
      </p>
      <div className="mt-1 text-sm font-medium text-foreground leading-relaxed">
        {title !== "Email" ? (
          <span>{value}</span>
        ) : (
          <a href={`mailto:${value}`}>{value}</a>
        )}
      </div>
    </div>
  );
}
