"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { deleteMessage } from "@/app/lib/actions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2, UserCircle } from "lucide-react";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";

interface MessageProps {
  msg: {
    id: number;
    name: string;
    email: string;
    message: string;
  };
}

export function Message({ msg }: MessageProps) {
  const [state, action, pending] = useActionState(deleteMessage, undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success("Message deleted successfully.");
      setOpen(false);
    }
  }, [state]);

  return (
    <div className="group p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* =========== MESSAGE ACCORDION =========== */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item">
            <AccordionTrigger className="hover:no-underline rounded-lg">
              <div className="flex flex-col text-left w-full gap-2">
                {/* Header */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <UserCircle size={20} className="text-muted-foreground" />

                    <span className="font-semibold text-foreground">
                      {msg.name}
                    </span>

                    <span className="text-muted-foreground">•</span>

                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>

                  {/* Preview */}
                  <p className="text-muted-foreground text-sm mt-1">
                    {msg.message.length > 60
                      ? msg.message.substring(0, 60) + "..."
                      : msg.message}
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            {/* Full Message */}
            <AccordionContent className="pt-4 mt-3 border-t">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Message
                </p>

                <p className="text-foreground leading-relaxed">{msg.message}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* =========== DELETE BUTTON (POPOVER) =========== */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={pending}
              className="rounded-full hover:bg-red-50 transition cursor-pointer"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700" />
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-48">
            <h4 className="font-medium text-sm text-foreground">
              Delete message?
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <form action={action}>
                <input type="hidden" name="id" value={msg.id} />

                <Button variant="destructive" size="sm" type="submit">
                  Delete
                </Button>
              </form>

              <Button
                size="sm"
                variant="outline"
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
