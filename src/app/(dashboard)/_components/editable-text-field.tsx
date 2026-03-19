"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2, Check, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}>;

type EditableTextFieldProps = {
  id: number;
  txtArea?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  initialValue: string;
  action: ServerAction;
};

export function EditableTextField({
  id,
  txtArea,
  label,
  name,
  placeholder,
  initialValue,
  action,
}: EditableTextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
      toast.success(state?.message || `${label} updated successfully.`);
    }
    if (state?.errors) {
      const first = Object.values(state.errors)[0]?.[0];
      if (first) toast.error(first);
    }
  }, [state, label]);

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
        <Label className="font-semibold text-sm">{label}</Label>
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

          <div className="flex items-center gap-2">
            {txtArea ? (
              <Textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
            ) : (
              <Input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
            )}

            {/* Cancel */}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-red-50 hover:text-red-600"
              onClick={() => {
                setValue(initialValue);
                setIsEditing(false);
              }}
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
        </form>
      ) : (
        <p className="text-muted-foreground text-sm mt-2">{initialValue}</p>
      )}
    </div>
  );
}
