"use client";

import { signup } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  // ⭐ Controlled inputs for persistent form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  // Reset fields only when signup succeeds
  useEffect(() => {
    if (state && !state.errors && !state.message) {
      setName("");
      setEmail("");
      setPassword("");
      setPin("");
    }
  }, [state]);

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-22 dark:bg-transparent">
      <form
        action={action}
        className="bg-card m-auto  w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
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
              Create Account —{" "}
              <span className="font-medium text-md dark:text-white text-brand-red">
                1<span className="text-brand-teal">Technologies</span>
              </span>
            </h1>
            <p className="text-sm">Join and manage your dashboard access.</p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-2">
            {/* NAME */}
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-sm">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {state?.errors?.name && (
                <p className="text-red-700 text-xs">{state.errors.name}</p>
              )}
            </div>

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
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
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

            {/* REGISTER PIN */}
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-sm">
                Registration Pin
              </Label>
              <Input
                id="pin"
                name="pin"
                placeholder="Enter registration PIN"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              {state?.errors?.pin && (
                <p className="text-red-700 text-xs">{state.errors.pin}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>

            {/* GENERAL ERROR */}
            {/* {state?.errors?.general && (
              <p className="text-red-700 text-xs text-center mt-1">
                {state.errors.general}
              </p>
            )} */}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Already have an account?
            <Button asChild variant="link" className="px-2">
              <Link href="/1tltd-login">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
