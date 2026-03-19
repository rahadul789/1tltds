"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function ForgotPassword() {
  const [state, action, pending] = useActionState(
    requestPasswordReset,
    undefined
  );

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action={action}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <Link
              href="/"
              className="relative z-20  flex items-center  text-sm font-normal "
            >
              <Image src="/logo.svg" alt="logo" width={30} height={30} />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Forgot password{" "}
            </h1>
            <p className="text-sm">Enter you email to continue</p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
              {state?.message && (
                <p className="text-green-600 text-xs">{state.message}</p>
              )}
            </div>

            <Button className="w-full" disabled={pending} type="submit">
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
