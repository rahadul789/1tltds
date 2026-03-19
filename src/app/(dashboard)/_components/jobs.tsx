"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  updateJobType,
  updatePosition,
  updateSalary,
  updateSummary,
  updateLocation,
  updateKeyResponsibilities,
  updateQualifications,
  updateBenefits,
  deleteJob,
  updateExperience,
  updateEducationalLevel,
  updateSeniorityLevel,
  updateJobStatus,
} from "@/app/lib/actions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import {
  Briefcase,
  MapPin,
  Wallet,
  Trash2,
  Loader2,
  ClipboardList,
  UserCog,
} from "lucide-react";

import { EditableTextField } from "./editable-text-field";
import EditableListField from "./EditableListField";

import { useActionState, useState } from "react";
import UpdateSalary from "./update-salary";
import EditableSelectField from "./editable-selectField";
import TimeExpire from "./expire-time";
import { TimeRemaining } from "./time-remaining";

/* -------------------------------------------------- */
/*                MAIN JOB COMPONENT                  */
/* -------------------------------------------------- */

interface JobProps {
  job: {
    id: number;
    position: string;
    experience: string;
    type: string;
    salaryRange: string;
    location: string;
    summary: string;

    expiresAt: string;
    jobStatus: string;
    educationLevel: string;
    seniorityLevel: string;
    salaryType: string;
    salaryMin: string;
    salaryMax: string;
    salaryInterval: string;
    isSalaryVisible: string;

    keyResponsibilities: string[];
    qualifications: string[];
    benefits: string[];
  };
}

function formatWorkType(value: string) {
  return value.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Job({ job }: JobProps) {
  const [state, action, pending] = useActionState(deleteJob, undefined);
  const [open, setOpen] = useState(false);

  const [educationLevel, setEducationLevel] = useState(job.educationLevel);
  const [workType, setWorkType] = useState(job.type);
  const [seniorityLevel, setSeniorityLevel] = useState(job.seniorityLevel);
  const [jobStatus, setJObStatus] = useState(job.jobStatus);

  const salaryObj = {
    id: job.id,
    type: job.salaryType,
    visible: job.isSalaryVisible,
    interval: job.salaryInterval,
    min: job.salaryMin,
    max: job.salaryMax,
  };

  return (
    <div className="flex items-start gap-3 w-full">
      {/* ------------------------------------- */}
      {/*              ACCORDION CARD           */}
      {/* ------------------------------------- */}
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-0">
          <AccordionTrigger className="rounded-lg px-2 py-1 hover:bg-muted/50">
            <div className="flex flex-col w-full text-left">
              <div className=" flex items-center justify-between">
                {/* POSITION TITLE */}
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-brand-teal" />
                  {job.position}
                </h1>
                <div className=" flex flex-wrap gap-2 items-center ">
                  {job.jobStatus === "draft" && (
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px]  bg-muted/20 p-3 border border-border">
                      <span className="text-brand-teal text-xs d">
                        {job.jobStatus
                          ? job.jobStatus.charAt(0).toUpperCase() +
                            job.jobStatus.slice(1)
                          : ""}
                      </span>
                    </div>
                  )}
                  <div className="text-brand-teal text-sm ">
                    <TimeRemaining expiresAt={job.expiresAt} />
                  </div>
                </div>
              </div>

              {/* META INFO */}
              <div className="flex text-xs text-muted-foreground gap-2 mt-1 flex-wrap">
                <span>{formatWorkType(job.type)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  {job.salaryType == "range" ? (
                    <span>
                      {job.salaryMin}-{job.salaryMax} tk
                    </span>
                  ) : (
                    <span>
                      {job.salaryType?.charAt(0).toUpperCase() +
                        job.salaryType?.slice(1)}
                    </span>
                  )}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </span>
              </div>
            </div>
          </AccordionTrigger>

          {/* ------------------------------------- */}
          {/*              CONTENT PANEL            */}
          {/* ------------------------------------- */}
          <AccordionContent className="px-4 mt-4 space-y-4">
            <div className=" border border-brand-teal rounded-xl p-4 space-y-2 mb-8 border-dashed">
              <EditableSelectField
                id={job.id}
                icon={true}
                label="Job status"
                name="jobStatus"
                value={jobStatus}
                onChange={setJObStatus}
                action={updateJobStatus}
                options={[
                  { value: "published", label: "Published" },
                  { value: "draft", label: "Draft" },
                ]}
              />

              <div className=" ">
                <TimeExpire
                  jobId={job.id.toString()}
                  time={job.expiresAt ? job.expiresAt.toLocaleString() : ""}
                />
              </div>
            </div>
            {/* <div className=" border-b border-border py-4" /> */}
            <EditableTextField
              id={job.id}
              label="Position"
              name="position"
              placeholder="Senior DevOps Developer"
              initialValue={job.position}
              action={updatePosition}
            />

            <EditableTextField
              id={job.id}
              label="Experience"
              name="experience"
              placeholder="4+ years"
              initialValue={job.experience}
              action={updateExperience}
            />

            <EditableSelectField
              id={job.id}
              label="Work Type"
              name="type"
              value={workType}
              onChange={setWorkType}
              action={updateJobType}
              options={[
                { value: "full_time", label: "Full time" },
                { value: "part_time", label: "Part time" },
                { value: "contract", label: "Contract" },
                { value: "internship", label: "Internship" },
                { value: "temporary", label: "Temporary" },
              ]}
            />

            <UpdateSalary salary={salaryObj} />

            <EditableSelectField
              id={job.id}
              label="Education Level"
              name="educationLevel"
              value={educationLevel}
              onChange={setEducationLevel}
              action={updateEducationalLevel}
              options={[
                { value: "none", label: "None" },
                { value: "diploma", label: "Diploma" },
                { value: "bachelor", label: "Bachelor" },
                { value: "master", label: "Master" },
                { value: "phd", label: "PhD" },
              ]}
            />

            <EditableSelectField
              id={job.id}
              label="Experience Level"
              name="seniorityLevel"
              value={seniorityLevel}
              onChange={setSeniorityLevel}
              action={updateSeniorityLevel}
              options={[
                { value: "entry", label: "Entry level" },
                { value: "mid", label: "Mid level" },
                { value: "senior", label: "Senior" },
                { value: "lead", label: "Lead" },
                { value: "director", label: "Director" },
              ]}
            />

            <EditableTextField
              id={job.id}
              label="Location"
              name="location"
              placeholder="Dhaka, Bangladesh"
              initialValue={job.location}
              action={updateLocation}
            />

            <EditableTextField
              id={job.id}
              txtArea={true}
              label="Summary"
              name="summary"
              placeholder="Write a short summary..."
              initialValue={job.summary}
              action={updateSummary}
            />

            {/* LIST FIELDS */}
            <div className="space-y-5 pt-3 border-t">
              <EditableListField
                id={job.id}
                label="Key Responsibilities"
                name="keyResponsibilities"
                initialValues={job.keyResponsibilities}
                action={updateKeyResponsibilities}
              />

              <EditableListField
                id={job.id}
                label="Qualifications"
                name="qualifications"
                initialValues={job.qualifications}
                action={updateQualifications}
              />

              <EditableListField
                id={job.id}
                label="Benefits"
                name="benefits"
                initialValues={job.benefits}
                action={updateBenefits}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ------------------------------------- */}
      {/*          DELETE BUTTON + POPOVER       */}
      {/* ------------------------------------- */}

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
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
