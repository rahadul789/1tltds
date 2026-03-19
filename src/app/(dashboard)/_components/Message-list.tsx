"use client";

import { deleteMessage } from "@/app/lib/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, MessageCircleDashed, Trash2, UserCircle } from "lucide-react";
import { use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Message } from "./message";

interface MessageListProps {
  allMessages: Promise<
    {
      id: number;
      name: string;
      email: string;
      message: string;
    }[]
  >;
}

const MessageList = ({ allMessages }: MessageListProps) => {
  const messages = use(allMessages);
  const [state, action, pending] = useActionState(deleteMessage, undefined);
  const [open, setOpen] = useState(false);

  // SUCCESS TOAST SHOWS NOW ✔️
  useEffect(() => {
    if (state?.success) {
      toast.success("Data deleted successfully.");
      setOpen(false); // Close after success
    }
  }, [state]);

  return (
    <div className="my-8 space-y-4 max-w-2xl">
      {Array.isArray(messages) && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <MessageCircleDashed className="w-12 h-12 mb-2" />
          <p>No messages available.</p>
        </div>
      )}
      {messages.map((message) => (
        <div key={message.id}>
          <Message msg={message} />
        </div>
      ))}
    </div>
  );
};

export default MessageList;
