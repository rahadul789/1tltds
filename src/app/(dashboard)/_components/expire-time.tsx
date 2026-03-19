import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toDatetimeLocal } from "@/lib/utils";
import { Check, Edit, Loader2, Timer, TimerOff, X } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { TimeRemaining } from "./time-remaining";
import { updateExipreTime } from "@/app/lib/actions";
import { toast } from "sonner";

interface TimeExpireProps {
  time: string;
  jobId: string;
}

function formatReadableDate(date: string | Date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";

  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TimeExpire = ({ time, jobId }: TimeExpireProps) => {
  const [hasExpiry, setHasExpiry] = useState(!!time);
  const [isEditing, setIsEditing] = useState(false);

  const timeExpire = time ? toDatetimeLocal(time) : "";
  const [expiresAtValue, setExpiresAtValue] = useState(timeExpire);

  const [error, setError] = useState(""); // ❗ new error state

  const [state, action, pending] = useActionState(updateExipreTime, undefined);

  // const isExpired = time ? new Date(time) < new Date() : false;

  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    if (!time) return;

    const checkExpiry = () => {
      const expired = new Date(time).getTime() < Date.now();
      setIsExpired(expired);
    };

    checkExpiry(); // Run immediately
    const t = setInterval(checkExpiry, 1000); // Auto-update

    return () => clearInterval(t);
  }, [time]);

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  // ❗ Validation before submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (hasExpiry) {
      if (!expiresAtValue || expiresAtValue.trim() === "") {
        e.preventDefault();
        setError("Expire date is required.");
        return;
      }
    }

    if (!hasExpiry) {
      setExpiresAtValue("");
    }

    setError(""); // clear previous error
  };

  return (
    <div className="bg-muted/20 p-3 rounded-xl border border-border">
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Edit
            size={16}
            className="cursor-pointer text-brand-teal hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
          />
          <Label className="font-semibold text-sm">Expire time</Label>
        </div>

        <div className="flex items-center gap-2 bg-brand-teal/10 border border-brand-teal/40 rounded-lg px-3 py-2">
          {/* ICON */}
          {!time ? (
            <TimerOff size={16} className="text-brand-teal" />
          ) : (
            <Timer
              size={16}
              className={isExpired ? "text-red-600" : "text-brand-teal"}
            />
          )}

          {/* TEXT */}
          <div className="text-xs text-brand-teal font-semibold">
            {!time ? (
              <span className="">Not set</span>
            ) : isExpired ? (
              <span className="text-red-600">Expired</span>
            ) : (
              <span className="text-brand-teal text-sm">
                <TimeRemaining expiresAt={time} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODE */}
      {isEditing ? (
        <form className="mt-3" action={action} onSubmit={handleSubmit}>
          <div className="flex  flex-col items-start gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Switch
                  checked={hasExpiry}
                  onCheckedChange={(checked) => {
                    setHasExpiry(checked);
                    if (!checked) {
                      setError("");
                    }
                  }}
                  id="hasExpiry"
                />
                <Label className="text-sm font-semibold">
                  {hasExpiry ? "Enabled" : "Disabled"}
                </Label>
              </div>

              {hasExpiry && (
                <div className="space-y-1 mt-2">
                  <Label className="text-sm font-semibold">Expires At</Label>
                  <Input
                    id="expiresAt"
                    name="expiresAt"
                    type="datetime-local"
                    value={expiresAtValue || ""}
                    onChange={(e) => {
                      setExpiresAtValue(e.target.value);
                      setError("");
                    }}
                  />

                  {/* ❗ Validation Error Message */}
                  {error && (
                    <p className="text-red-600 text-xs mt-1">{error}</p>
                  )}
                </div>
              )}
            </div>

            <input type="hidden" name="id" value={jobId} readOnly />

            <div className="flex gap-2 justify-end w-full">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                }}
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
        <p className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
          {time ? formatReadableDate(time) : "Not set"}
        </p>
      )}
    </div>
  );
};

export default TimeExpire;
