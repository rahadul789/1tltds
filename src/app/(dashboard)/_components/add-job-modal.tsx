"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrayField } from "./array-field";
import { addJob } from "@/app/lib/actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const initialBenefits = [
  "Be part of a dynamic and innovative team that values collaboration and professional growth.",
  "Competitive salary and benefits package.",
  "Opportunities for continuous learning and career advancement.",
];

type SalaryType = "negotiable" | "range";

export default function AddJobModal() {
  const [open, setOpen] = useState(false);

  // -------------------------------
  // CONTROLLED STATES FOR ALL FIELDS
  // -------------------------------
  const [positionValue, setPositionValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [expiresAtValue, setExpiresAtValue] = useState("");

  const [salaryMinValue, setSalaryMinValue] = useState("");
  const [salaryMaxValue, setSalaryMaxValue] = useState("");

  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [qualifications, setQualifications] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>(initialBenefits);

  const [salaryType, setSalaryType] = useState<SalaryType>("negotiable");
  const [isSalaryVisible, setIsSalaryVisible] = useState(true);
  const [hasExpiry, setHasExpiry] = useState(true);

  const [jobStatus, setJobStatus] = useState("published");
  const [type, setType] = useState("full_time");
  const [educationLevel, setEducationLevel] = useState("none");
  const [seniorityLevel, setSeniorityLevel] = useState("mid");
  const [salaryInterval, setSalaryInterval] = useState("monthly");

  const [state, action, pending] = useActionState(addJob, undefined);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Job added successfully.");

      // RESET ALL FIELDS
      setPositionValue("");
      setExperienceValue("");
      setLocationValue("");
      setSummaryValue("");
      setExpiresAtValue("");

      setSalaryMinValue("");
      setSalaryMaxValue("");

      setResponsibilities([""]);
      setQualifications([""]);
      setBenefits(initialBenefits);

      setSalaryType("negotiable");
      setIsSalaryVisible(true);
      setHasExpiry(true);

      setJobStatus("published");
      setType("full_time");
      setEducationLevel("none");
      setSeniorityLevel("mid");
      setSalaryInterval("monthly");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-brand-teal hover:bg-brand-teal/80 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>Add Job</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b space-y-1">
          <DialogTitle className="text-lg font-semibold">Add Job</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill out the details for a new job posting.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4">
          <form
            className="space-y-4 max-h-[64vh] overflow-y-auto p-1"
            action={action}
            onKeyDown={(e) => {
              const target = e.target as HTMLElement;
              if (e.key === "Enter" && target.tagName !== "TEXTAREA") {
                e.preventDefault();
              }
            }}
          >
            {/* TOP ROW — STATUS + EXPIRY */}
            <div className="flex justify-between border-b pb-4">
              <div className="space-y-1">
                <Label className="text-sm font-semibold"> Job Status</Label>

                <Select value={jobStatus} onValueChange={setJobStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="jobStatus" value={jobStatus} />

                {state?.errors?.jobStatus && (
                  <p className="text-red-700 text-xs font-semibold">
                    {state.errors.jobStatus}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={hasExpiry}
                    onCheckedChange={setHasExpiry}
                    id="hasExpiry"
                  />
                  <Label className="text-sm font-semibold">Expire date</Label>
                </div>

                {hasExpiry && (
                  <div className="space-y-1 mt-2">
                    <Label className="text-sm font-semibold">Expires At</Label>
                    <Input
                      id="expiresAt"
                      name="expiresAt"
                      type="datetime-local"
                      value={expiresAtValue ?? ""}
                      onChange={(e) => setExpiresAtValue(e.target.value)}
                    />

                    {state?.errors?.expiresAt && (
                      <p className="text-red-700 text-xs font-semibold">
                        {state.errors.expiresAt}
                      </p>
                    )}
                  </div>
                )}

                <input
                  type="hidden"
                  name="hasExpiry"
                  value={hasExpiry ? "true" : "false"}
                />
                <input
                  type="hidden"
                  name="salaryInterval"
                  value={salaryInterval}
                />
              </div>
            </div>

            {/* POSITION */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Position</Label>
              <Input
                id="position"
                name="position"
                value={positionValue}
                onChange={(e) => setPositionValue(e.target.value)}
                placeholder="e.g. Senior devops developer"
              />
              {state?.errors?.position && (
                <p className="text-red-700 text-xs font-semibold">
                  {state.errors.position}
                </p>
              )}
            </div>

            {/* EXPERIENCE */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Required Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="text"
                value={experienceValue}
                onChange={(e) => setExperienceValue(e.target.value)}
                placeholder="e.g. 3-5years"
              />
              {state?.errors?.experience && (
                <p className="text-red-700 text-xs font-semibold">
                  {state.errors.experience}
                </p>
              )}
            </div>

            {/* TYPE + EDUCATION + SENIORITY */}
            <div className="flex justify-between flex-wrap gap-2 border rounded-lg py-6 px-4">
              <div className="space-y-1">
                <Label className="text-sm font-semibold">Employment Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full time</SelectItem>
                    <SelectItem value="part_time">Part time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="type" value={type} />
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-semibold">
                  Required Education Level
                </Label>
                <Select
                  value={educationLevel}
                  onValueChange={setEducationLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  name="educationLevel"
                  value={educationLevel}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-semibold">Seniority Level</Label>
                <Select
                  value={seniorityLevel}
                  onValueChange={setSeniorityLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select seniority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  name="seniorityLevel"
                  value={seniorityLevel}
                />
              </div>
            </div>

            {/* SALARY SECTION */}
            <div className="space-y-2 border rounded-md p-3">
              <Label className="text-sm font-semibold">Salary</Label>

              <input type="hidden" name="salaryType" value={salaryType} />
              <input
                type="hidden"
                name="isSalaryVisible"
                value={isSalaryVisible ? "true" : "false"}
              />

              <RadioGroup
                className="flex flex-col gap-2 sm:flex-row"
                value={salaryType}
                onValueChange={(v) => setSalaryType(v as SalaryType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="negotiable" id="sal-neg" />
                  <Label htmlFor="sal-neg">Negotiable</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="range" id="sal-range" />
                  <Label htmlFor="sal-range">Specify range</Label>
                </div>
              </RadioGroup>

              {salaryType === "range" && (
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Minimum</Label>
                      <Input
                        name="salaryMin"
                        type="number"
                        value={salaryMinValue}
                        onChange={(e) => setSalaryMinValue(e.target.value)}
                      />
                      {state?.errors?.salaryMin && (
                        <p className="text-red-700 text-xs font-semibold">
                          {state.errors.salaryMin}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Maximum</Label>
                      <Input
                        name="salaryMax"
                        type="number"
                        value={salaryMaxValue}
                        onChange={(e) => setSalaryMaxValue(e.target.value)}
                      />
                      {state?.errors?.salaryMax && (
                        <p className="text-red-700 text-xs font-semibold">
                          {state.errors.salaryMax}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Interval</Label>

                    <Select
                      value={salaryInterval}
                      onValueChange={setSalaryInterval}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      name="salaryInterval"
                      value={salaryInterval}
                    />
                  </div>
                </div>
              )}

              {/* <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label className="text-xs font-semibold">
                    Show salary in job post
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Turn off to hide salary range but still store it.
                  </p>
                </div>
                <Switch
                  checked={isSalaryVisible}
                  onCheckedChange={setIsSalaryVisible}
                />
              </div> */}
            </div>

            {/* LOCATION */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Location</Label>
              <Input
                name="location"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder="e.g. Dhaka, Bangladesh"
              />
              {state?.errors?.location && (
                <p className="text-red-700 text-xs font-semibold">
                  {state.errors.location}
                </p>
              )}
            </div>

            {/* SUMMARY */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Summary</Label>
              <Textarea
                name="summary"
                value={summaryValue}
                onChange={(e) => setSummaryValue(e.target.value)}
                placeholder="e.g. The candidate must have knowledge about real time data streaming..."
              />
              {state?.errors?.summary && (
                <p className="text-red-700 text-xs font-semibold">
                  {state.errors.summary}
                </p>
              )}
            </div>

            {/* ARRAY FIELDS */}
            <ArrayField
              label="Key Responsibilities"
              fieldName="keyResponsibilities"
              values={responsibilities}
              setValues={setResponsibilities}
            />

            <ArrayField
              label="Qualifications"
              fieldName="qualifications"
              values={qualifications}
              setValues={setQualifications}
            />

            <ArrayField
              label="Benefits"
              fieldName="benefits"
              values={benefits}
              setValues={setBenefits}
            />

            <div className="flex justify-end gap-2 pt-3 border-t mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                disabled={pending}
                className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
