import React from "react";
import { Mail } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Job } from "./job";

interface OfferingsProps {
  career: {
    id: number;
    heroTitle: string;
    title: string;
    subTitle: string;
    email: string;
  };
  jobs: {
    id: number;
    jobStatus: string;
    expiresAt: Date | null;
    position: string;
    experience: string;
    type: string;
    educationLevel: string;
    seniorityLevel: string;
    salaryType: string;
    salaryMin: string | null;
    salaryMax: string | null;
    salaryInterval: string | null;
    isSalaryVisible: boolean;
    location: string;
    summary: string;
    keyResponsibilities: string[];
    qualifications: string[];
    benefits: string[];
  }[];
}

const Offerings = ({ career, jobs }: OfferingsProps) => {
  const words = career.subTitle.split(" ").map((word, index, arr) => ({
    text: word,
    ...(index === arr.length - 1 && {
      className: "text-brand-teal dark:text-blue-500",
    }),
    ...(index === arr.length - 3 && {
      className: "text-brand-teal dark:text-blue-500",
    }),
  }));

  return (
    <div>
      <div className=" ">
        <div className="flex flex-col items-center justify-center h-[20rem]  ">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
            {career.title}
          </p>
          <TypewriterEffectSmooth words={words} />
        </div>
      </div>
      <div className=" mx-auto ">
        <div className="grid md:grid-cols-10   gap-4">
          {/* Green Border */}
          <div className=" p-4  md:col-span-3  ">
            <h1 className=" text-5xl font-bold">Our Open Roles</h1>
            <p className=" mt-16 text-brand-teal font-semibold text-xs">
              OR CONTACT US WITH
            </p>
            <a
              href={`mailto:${career.email}`}
              className=" underline hover:opacity-80 text-gray-600 break-all"
            >
              <Mail className=" inline mr-2" size={16} />
              {career.email}
            </a>
          </div>

          {/* Red Border */}
          <div className="  md:col-span-7">
            {jobs.length > 0 ? (
              jobs.map((job) => <Job key={job.id} job={job} />)
            ) : (
              <div className="bg-gray-100  rounded-sm  max-w-2xl mx-auto text-center h-[20rem] flex flex-col justify-center items-center">
                <p className="text-xl font-semibold text-gray-700">
                  No Job Offerings Right Now
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please check back later for updates on job opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerings;
