"use client";

import { login } from "@/app/actions/auth";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  // ⭐ Controlled States so values persist on errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⭐ When server returns errors, DO NOT reset inputs
  useEffect(() => {
    if (state && !state.errors?.email && !state.errors?.password) {
      setEmail("");
      setPassword("");
    }
  }, [state]);

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
              className="relative z-20 flex items-center text-sm font-normal"
            >
              <Image src="/logo.svg" alt="logo" width={30} height={30} />
            </Link>

            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign In to{" "}
              <span className="font-medium text-md dark:text-white text-brand-red">
                1<span className="text-brand-teal">Technologies</span>
              </span>
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {state?.errors?.email && (
                <p className="text-red-700 text-xs">{state.errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link href="/forgot-password" className="text-sm">
                    Forgot your password?
                  </Link>
                </Button>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {state?.errors?.password && (
                <p className="text-red-700 text-xs">{state.errors.password}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* GENERAL BACKEND ERROR */}
            {/* {state?.errors?.general && (
              <p className="text-center text-red-700 text-xs mt-2">
                {state.errors.general}
              </p>
            )} */}
          </div>
        </div>
      </form>
    </section>
  );
}
