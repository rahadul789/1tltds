import React from "react";
import { Input } from "@/components/ui/input";

interface EditableFieldCardProps {
  label: string;
  name: string;
  value: string;
  isEdit: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string[] | null;
  rightMeta?: React.ReactNode;
  placeholder?: string;
  className?: string;
  icon?: any; // NEW — Lucide icon component
}

/**
 * A highly polished editable field card.
 * - Styled to match your dashboard theme.
 * - Shows an icon + heading + input/text.
 * - Displays error messages + rightMeta UI.
 */
export default function EditableFieldCard({
  label,
  name,
  value,
  isEdit,
  onChange,
  error,
  rightMeta,
  placeholder,
  className = "",
  icon: Icon,
}: EditableFieldCardProps) {
  return (
    <div
      className={`
        p-6 rounded-xl border bg-card shadow-sm space-y-4 
        hover:shadow-md transition 
        ${className}
      `}
    >
      {/* ─── Header row: Icon + Label ─────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Icon bubble */}
        {Icon && (
          <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}

        <h2 className="text-sm font-semibold">{label}</h2>
      </div>

      {/* ─── Editable or Preview Mode ─────────────────────────────────── */}
      {isEdit ? (
        <>
          <Input
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1"
          />

          {/* Right side metadata */}
          {rightMeta && (
            <div className="flex items-center justify-end text-xs text-muted-foreground">
              {rightMeta}
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {value?.trim() ? value : <span className="opacity-50">No data</span>}
        </p>
      )}

      {/* ─── Error Message ───────────────────────────────────────────── */}
      {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
    </div>
  );
}
