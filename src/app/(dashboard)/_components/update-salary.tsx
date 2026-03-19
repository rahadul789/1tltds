"use client";

import { useActionState, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Edit, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateSalary } from "@/app/lib/actions";
import { toast } from "sonner";

type SalaryType = "negotiable" | "range";

interface UpdateSalaryProps {
  salary: {
    id: number;
    type: string | null;
    visible: string | null;
    interval: string | null;
    min: string | null;
    max: string | null;
  };
}

const UpdateSalary = ({ salary }: UpdateSalaryProps) => {
  /* ------------------------------------------------------
     FIX: Normalize database null → "" to prevent React errors
     ------------------------------------------------------ */
  const [salaryMinValue, setSalaryMinValue] = useState(salary.min ?? "");
  const [salaryMaxValue, setSalaryMaxValue] = useState(salary.max ?? "");
  const [salaryType, setSalaryType] = useState<SalaryType>(
    (salary.type as SalaryType) ?? "negotiable"
  );
  const [salaryInterval, setSalaryInterval] = useState(
    salary.interval ?? "monthly"
  );
  const [isSalaryVisible, setIsSalaryVisible] = useState(
    salary.visible === "true"
  );

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [state, formAction, pending] = useActionState(updateSalary, undefined);

  /* ------------------------------------------------------
     LOCAL VALIDATION
     ------------------------------------------------------ */
  const handleSubmit = (formData: FormData) => {
    const newErrors: any = {};

    if (salaryType === "range") {
      if (!salaryMinValue) newErrors.salaryMin = "Minimum salary is required.";
      if (!salaryMaxValue) newErrors.salaryMax = "Maximum salary is required.";
      if (!salaryInterval) newErrors.salaryInterval = "Interval is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (salaryType === "negotiable") {
      setSalaryMinValue("");
      setSalaryMaxValue("");
      setSalaryInterval("monthly");
    }

    formAction(formData);
  };

  /* ------------------------------------------------------
     SUCCESS HANDLER
     ------------------------------------------------------ */
  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
      toast.success("Salary updated successfully.");
    }
  }, [state]);

  return (
    <div className="bg-muted/20 p-3 rounded-xl border border-border">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <Edit
          size={16}
          className="cursor-pointer text-brand-teal hover:scale-110 transition"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
        />
        <Label className="font-semibold text-sm">Salary</Label>
      </div>

      {/* ------------------------------------------------------
         FORM (EDIT MODE)
         ------------------------------------------------------ */}
      {isEditing ? (
        <form
          action={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="mt-3"
        >
          <input type="hidden" name="id" value={salary.id} />

          <div className=" space-y-2">
            <div>
              <div className="space-y-2 border rounded-md p-3">
                <Label className="text-sm font-semibold">Salary</Label>

                <input type="hidden" name="salaryType" value={salaryType} />

                {/* Salary Type Radio */}
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

                {/* Range Inputs */}
                {salaryType === "range" && (
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Min */}
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Minimum</Label>
                        <Input
                          name="salaryMin"
                          type="number"
                          value={salaryMinValue}
                          onChange={(e) => setSalaryMinValue(e.target.value)}
                        />
                        {errors.salaryMin && (
                          <p className="text-red-600 text-xs font-semibold">
                            {errors.salaryMin}
                          </p>
                        )}
                      </div>

                      {/* Max */}
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Maximum</Label>
                        <Input
                          name="salaryMax"
                          type="number"
                          value={salaryMaxValue}
                          onChange={(e) => setSalaryMaxValue(e.target.value)}
                        />
                        {errors.salaryMax && (
                          <p className="text-red-600 text-xs font-semibold">
                            {errors.salaryMax}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Interval */}
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Interval</Label>

                      <Select
                        value={salaryInterval}
                        onValueChange={(v) => setSalaryInterval(v)}
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

                      {errors.salaryInterval && (
                        <p className="text-red-600 text-xs font-semibold">
                          {errors.salaryInterval}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-red-50 hover:text-red-600"
                onClick={() => setIsEditing(false)}
              >
                <X size={16} />
              </Button>

              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-brand-teal text-white hover:bg-brand-teal/90"
                disabled={pending}
              >
                {pending ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Check size={16} />
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        /* ------------------------------------------------------
           DISPLAY MODE
           ------------------------------------------------------ */
        <p className="text-muted-foreground text-sm mt-2">
          {salary.type === "range" ? (
            <span>
              {salary.min}-{salary.max} tk ({salary.interval})
            </span>
          ) : (
            <span>
              {salary.type
                ? salary.type.charAt(0).toUpperCase() + salary.type.slice(1)
                : ""}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default UpdateSalary;
