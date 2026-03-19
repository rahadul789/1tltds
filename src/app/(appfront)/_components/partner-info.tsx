import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

interface PartnerInfoProps {
  partner: {
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

const PartnerInfo = ({ partner, partnerBenefits }: PartnerInfoProps) => {
  return (
    <div className=" ">
      <div className="relative flex h-[30rem] md:h-[40rem] w-full overflow-hidden rounded-md bg-[#020618] antialiased md:items-center md:justify-center">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px))]"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            {partner.bannerTitle} <br />{" "}
            <p className=" text-brand-teal">
              <span className=" text-brand-red">1</span>Technologies
            </p>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            {partner.bannerParagraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfo;
