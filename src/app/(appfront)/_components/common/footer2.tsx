"use client";

import React from "react";
import Link from "next/link";
import { HomeIcon, Mail } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  data: {
    id: number;
    title: string;
    address: string;
    email: string;
    copyright: string;
    facebook: string;
    linkedIn: string;
  };
}

const links = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Career", href: "/career" },
  { title: "Pricing", href: "#" },
  { title: "Partner", href: "/partner" },
  { title: "Contact us", href: "/contact-us" },
];

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="relative mt-28 border rounded-xl">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-100/50 to-slate-200 dark:via-slate-800/30 dark:to-slate-900" />

      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_70%)] blur-2xl opacity-30" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top Logo + Socials */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b pb-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <span className="font-semibold text-lg text-brand-red">
              1<span className="text-brand-teal">Technologies</span>
            </span>
          </Link>

          <div className="flex gap-4">
            {/* LinkedIn */}
            <Link
              href={data?.linkedIn || "#"}
              target="_blank"
              className="text-muted-foreground hover:text-brand-teal transition"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                />
              </svg>
            </Link>

            {/* Facebook */}
            <Link
              href={data?.facebook || "#"}
              target="_blank"
              className="text-muted-foreground hover:text-brand-teal transition"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Middle Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-4">
            <a
              href={`mailto:${data?.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-brand-teal transition text-sm"
            >
              <Mail size={15} />
              {data?.email}
            </a>

            <div className="flex gap-2 text-sm text-muted-foreground">
              <HomeIcon size={15} className="mt-[2px]" />
              <span className="max-w-xs">{data?.address}</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-wrap gap-6 justify-start sm:justify-end text-sm">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-muted-foreground hover:text-brand-teal transition"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
