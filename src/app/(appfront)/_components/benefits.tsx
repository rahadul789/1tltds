"use client";

import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ChevronRight, Contact, Contact2Icon, Mail } from "lucide-react";
import Link from "next/link";

interface BenefitsProps {
  partners: {
    id: number;
    bannerTitle: string;
    bannerParagraph: string;
    benefitTitle: string;
    contactTitle: string;
    contactParagraph: string;
    email: string;
    buttonLabel: string;
    buttonLink: string;
  };
  partnerBenefits: {
    id: number;
    title: string;
    description: string;
  }[];
}

export function Benefits({ partners, partnerBenefits }: BenefitsProps) {
  // const benefitTitle = partners.benefitTitle;

  const words = partners.benefitTitle.split(" ").map((word, index, arr) => ({
    text: word,
    ...(index === arr.length - 1 && {
      className: "text-brand-teal dark:text-blue-500",
    }),
  }));

  const partner = partners.contactTitle.split(" ").map((word, index, arr) => ({
    text: word,
    ...(index === arr.length - 1 && {
      className: "text-brand-teal dark:text-blue-500",
    }),
  }));

  const parts = partners.contactParagraph.split(/(contact form)/i);

  // render
  const rendered = parts.map((part, idx) =>
    part.toLowerCase() === "contact form" ? (
      <Link href={partners.buttonLink} key={idx} className="text-brand-teal">
        {part}
      </Link>
    ) : (
      <span key={idx}>{part}</span>
    )
  );

  return (
    <div className="max-w-7xl mx-auto ">
      <div className=" mt-20 flex items-center justify-center ">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div>
        <HoverEffect items={partnerBenefits} />
      </div>
      <div className=" mt-20 flex items-center justify-center ">
        <TypewriterEffectSmooth words={partner} />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <blockquote>
          <p className="text-lg font-medium sm:text-xl md:text-3xl">
            {rendered}
          </p>

          <div className="mt-12 flex items-center justify-center gap-6">
            <Button
              className=" rounded-full size-12"
              variant="secondary"
              size="lg"
            >
              <a
                href={`mailto:${partners.email}`}
                aria-label={`Email ${partners.email}`}
              >
                <Mail size={14} />
              </a>
            </Button>

            <div className="space-y-1 border-l pl-6">
              <Link href={partners.buttonLink}>
                <Button>
                  {partners.buttonLabel} <ChevronRight />
                </Button>
              </Link>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
