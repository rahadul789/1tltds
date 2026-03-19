"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMessage } from "@/app/lib/actions";
import { toast } from "sonner";

const ContactForm = () => {
  const [state, action, pending] = useActionState(addMessage, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success("Message sent successfully.");
    }
  }, [state]);

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action={action}
        className="bg-card m-auto h-fit w-full max-w-xl rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Contact us</h1>
            <p className="text-sm">
              Share your thoughts by sending message to us.
            </p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Name
              </Label>
              <Input type="text" required name="name" id="name" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
              </div>
              <Input
                type="email"
                required
                name="email"
                id="email"
                className="input sz-md variant-mixed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="block text-sm">
                Message
              </Label>
              <Textarea
                required
                name="message"
                id="message"
                className=" h-30"
              />
            </div>

            <Button className="w-full" disabled={pending}>
              {pending ? "Sending..." : "Send message"}{" "}
            </Button>
          </div>
        </div>
        {
          state?.errors ? (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-b mb-4 mx-8">
              <ul className=" list-disc list-inside">
                {Object.values(state.errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          ) : (
            state?.success && (
              <div className=" bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-xs mb-4 mx-8">
                Your message has been sent successfully.
              </div>
            )
          )
          //success
        }
      </form>
    </section>
  );
};

export default ContactForm;
