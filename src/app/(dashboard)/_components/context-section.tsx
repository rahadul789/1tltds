"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Check, X, Loader2, Sparkles } from "lucide-react";
import { updateAIContext } from "@/app/lib/actions";
import { toast } from "sonner";

/* ------------------------------------------------------ */
/*               Reusable Section Card Wrapper            */
/* ------------------------------------------------------ */
const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

type ContextSectionProps = {
  value: string;
  onChange?: (value: string) => void;
};

const WORD_LIMIT = 50;

export function ContextSection({ value, onChange }: ContextSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const [state, formAction, pending] = useActionState<any, FormData>(
    updateAIContext,
    undefined
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      const trimmed = draft.trim();
      onChange?.(trimmed);
      setExpanded(false);
      setIsEditing(false);
      toast.success("Context updated successfully.");
    } else if (state.errors?.context) {
      toast.error(state.errors.context.join(", "));
    }
  }, [state]);

  const words = value?.trim() ? value.trim().split(/\s+/) : [];
  const isLong = words.length > WORD_LIMIT;

  const truncatedText = isLong ? words.slice(0, WORD_LIMIT).join(" ") : value;
  const displayText = expanded || !isLong ? value : `${truncatedText}...`;

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  return (
    <SectionCard icon={Sparkles} title="AI Context & Instructions">
      <form action={formAction} className="space-y-3 mt-1">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium"></Label>

          {!isEditing ? (
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1"
            >
              <Pencil size={14} />
              Edit
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={handleCancel}
                disabled={pending}
                className="flex items-center gap-1"
              >
                <X size={14} />
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={!draft.trim() || pending}
                className="flex items-center gap-1 bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
              >
                {pending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Check size={14} />
                )}
                {pending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        {isEditing ? (
          <>
            <Textarea
              className="h-[400px] text-sm"
              name="context"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Describe how the assistant should behave, tone of voice, what it knows, etc."
            />

            {state?.errors?.context && (
              <p className="text-xs text-red-500">
                {state.errors.context.join(", ")}
              </p>
            )}
          </>
        ) : (
          <div className="rounded-md border px-3 py-2 text-sm bg-muted/40">
            {value?.trim() ? (
              <>
                <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                  {displayText}
                </p>

                {isLong && (
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className="mt-1 px-0 text-xs text-brand-teal"
                    onClick={() => setExpanded((prev) => !prev)}
                  >
                    {expanded ? "See less" : "See more"}
                  </Button>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">
                No context provided. Click <b>Edit</b> to add instructions.
              </span>
            )}
          </div>
        )}
      </form>
    </SectionCard>
  );
}
