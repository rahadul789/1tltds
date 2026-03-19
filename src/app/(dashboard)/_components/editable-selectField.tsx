"use client";

import { useActionState, useEffect, useState } from "react";
import {
  BadgeCheck,
  Check,
  Edit,
  Loader2,
  Pencil,
  Scan,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Option {
  value: string;
  label: string;
}

interface ServerAction {
  (prevState: any, formData: FormData): Promise<{
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
  }>;
}

export default function EditableSelectField({
  id,
  icon,
  label,
  name,
  value,
  onChange,
  options,
  action,
}: {
  id: number;
  icon?: boolean;
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  action: ServerAction;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  function formatWorkType(value: string) {
    return value.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
      onChange(tempValue);
      toast.success(state?.message || `${label} updated successfully.`);
    }
  }, [state]);

  return (
    <div className="bg-muted/20 p-3 rounded-xl border border-border">
      {/* HEADER */}
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Edit
            size={16}
            className="cursor-pointer text-brand-teal hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
          />
          <Label className="font-semibold text-sm">{label}</Label>
        </div>
        {icon && (
          <div className="flex items-center gap-2 bg-brand-teal/10 border border-brand-teal/40 rounded-lg px-3 py-2">
            {/* ICON */}
            <Scan size={16} className="text-brand-teal" />

            {/* TEXT */}
            <span className="text-brand-teal text-xs font-semibold">
              {value ? value.charAt(0).toUpperCase() + value.slice(1) : ""}
            </span>
          </div>
        )}
      </div>

      {/* --------------------------- */}
      {/* -------- EDIT MODE -------- */}
      {/* --------------------------- */}

      {isEditing ? (
        <form
          action={formAction}
          onClick={(e) => e.stopPropagation()}
          className="mt-3"
        >
          <input type="hidden" name="id" value={id} />

          <div className="flex items-center justify-between gap-2">
            <Select value={tempValue} name={name} onValueChange={setTempValue}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              {/* Cancel */}
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-red-50 hover:text-red-600"
                //   onClick={() => {
                //     setValue(initialValue);
                //     setIsEditing(false);
                //   }}
                onClick={() => setIsEditing(false)}
              >
                <X size={16} />
              </Button>

              {/* Submit */}
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
        <div>
          {icon ? (
            <p className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
              {formatWorkType(value)}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm mt-2">
              {formatWorkType(value)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
