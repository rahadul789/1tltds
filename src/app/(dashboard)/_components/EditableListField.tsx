"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Loader2, Plus, Trash2, X } from "lucide-react";
import clsx from "clsx";
import { Label } from "@/components/ui/label";

export type ServerAction = (prevState: any, formData: FormData) => Promise<any>;

interface EditableListFieldProps {
  id: number | string;
  label: string;
  name: string;
  placeholder?: string;
  initialValues: string[];
  action: ServerAction;
  description?: string;
  className?: string;
}

export function EditableListField({
  id,
  label,
  name,
  placeholder = "Type and press Add",
  initialValues,
  action,
  description,
  className,
}: EditableListFieldProps) {
  const [items, setItems] = useState<string[]>(initialValues ?? []);
  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [state, formAction, pending] = useActionState<any, FormData>(
    action as any,
    {}
  );

  const joinedInitialValues = useMemo(
    () => (initialValues ?? []).join("\u0001"),
    [initialValues]
  );

  useEffect(() => {
    setItems(initialValues ?? []);
  }, [joinedInitialValues, initialValues]);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state?.success]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(items) !== JSON.stringify(initialValues ?? []);
  }, [items, initialValues]);

  const addNew = () => {
    const value = newItem.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setNewItem("");
  };

  const updateAt = (index: number, value: string) => {
    setItems((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const removeAt = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const enterEdit = () => {
    setItems(initialValues ?? []);
    setNewItem("");
    setIsEditing(!isEditing);
  };

  const cancelEdit = () => {
    setItems(initialValues ?? []);
    setNewItem("");
    setIsEditing(false);
  };

  return (
    <div
      className={clsx(
        "rounded-xl p-4 bg-muted/30 border border-border",
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Edit
              size={16}
              className="cursor-pointer text-brand-teal hover:scale-110 transition"
              onClick={enterEdit}
            />
            {label}
          </h3>
          {description && (
            <Label className="text-xs text-muted-foreground mt-1">
              {description}
            </Label>
          )}
        </div>

        {/* Save / Cancel Buttons */}
        {isEditing && (
          <form action={formAction} className="flex items-center gap-2">
            <input type="hidden" name="id" value={String(id)} />

            {items.map((v, i) => (
              <input
                key={`${name}-${i}`}
                type="hidden"
                name={`${name}[]`}
                value={v}
              />
            ))}

            <Button
              type="submit"
              size="sm"
              disabled={!hasChanges || pending}
              className="gap-2"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </Button>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={cancelEdit}
              disabled={pending}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>

      {/* ------------------------------ */}
      {/* -------- READ ONLY VIEW ------- */}
      {/* ------------------------------ */}

      {!isEditing && (
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm ml-1">No items yet.</p>
          ) : (
            items.map((value, index) => (
              <li key={`${value}-${index}`} className="ml-1">
                {value}
              </li>
            ))
          )}
        </ul>
      )}

      {/* ------------------------------ */}
      {/* -------- EDIT MODE VIEW ------- */}
      {/* ------------------------------ */}

      {isEditing && (
        <>
          {/* Existing items */}
          <ul className="mt-3 border bg-background  p-2 rounded-lg ">
            {items.map((value, index) => (
              <li
                key={`${name}-${index}`}
                className="flex items-center gap-2  rounded-lg p-[6px]"
              >
                <Input
                  value={value}
                  onChange={(e) => updateAt(index, e.target.value)}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                  onClick={() => removeAt(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          {/* Add new item */}
          <div className="mt-3 flex items-center gap-2">
            <Input
              value={newItem}
              placeholder={placeholder}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNew();
                }
              }}
            />

            <Button type="button" onClick={addNew} className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </>
      )}

      {/* Validation Errors */}
      {state?.errors && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-xs p-2 rounded-md">
          {Array.isArray(state.errors)
            ? state.errors.join(", ")
            : Object.entries(state.errors).map(([k, v]) => (
                <div key={k}>
                  <span className="font-medium capitalize">{k}: </span>
                  {Array.isArray(v) ? v.join(", ") : String(v)}
                </div>
              ))}
        </div>
      )}

      {state?.success && (
        <p className="mt-2 text-xs text-emerald-600">Saved successfully.</p>
      )}
    </div>
  );
}

export default EditableListField;
