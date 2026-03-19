"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";

export function NavbarDemo({ children }: { children?: React.ReactNode }) {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Career",
      link: "/career",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="top-2 z-50">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <Link
              href="/partner"
              className="px-4 py-2 text-xs font-semibold  backdrop-blur-sm border bg-brand-teal/10 border-brand-teal/20  mx-auto text-center rounded-full relative "
            >
              <span>Partner →</span>
              <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-brand-red to-transparent" />
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link
                href="/partner"
                className="px-4 py-2 w-full backdrop-blur-sm border bg-brand-teal/10 border-brand-teal/20  mx-auto text-center rounded-full relative "
              >
                <span>Partner →</span>
                <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-brand-red to-transparent" />
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {children}
    </div>
  );
}
