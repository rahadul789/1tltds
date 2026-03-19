"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRightIcon,
  Briefcase,
  MapPin,
  Wallet,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { ApplyModal } from "./apply-modal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface JobProps {
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
}

function formatWorkType(value: string) {
  return value.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Job({ job }: { job: JobProps }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ApplyModal
        open={open}
        setOpen={setOpen}
        jobId={job.id}
        position={job.position}
      />

      <Card className="shadow-sm hover:shadow-md transition border-l-4 border-brand-teal">
        <CardHeader>
          {/* Title Row */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs tracking-wider text-brand-teal font-semibold">
                OPEN ROLE
              </p>
              <CardTitle className="text-2xl mt-1">{job.position}</CardTitle>

              {/* Job Meta Info */}
              <CardDescription className="mt-2">
                <div className="flex flex-wrap items-center text-xs text-gray-500 gap-2">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> {formatWorkType(job.type)}
                  </span>
                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {job.experience}
                  </span>
                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Wallet size={14} />
                    <p className="">
                      {job.salaryType === "range" ? (
                        <span>
                          {job.salaryMin}-{job.salaryMax} tk (
                          {job.salaryInterval})
                        </span>
                      ) : (
                        <span>
                          {job.salaryType?.charAt(0).toUpperCase() +
                            job.salaryType?.slice(1)}
                        </span>
                      )}
                    </p>
                  </span>
                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </span>
                </div>
              </CardDescription>
            </div>

            {/* Desktop Apply Button */}
            <div className="hidden md:flex">
              <Button
                onClick={() => setOpen(true)}
                className="bg-brand-teal hover:bg-brand-teal/80 text-white rounded-full gap-1"
              >
                Apply
                <ArrowUpRightIcon size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible defaultValue="item-0">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left hover:bg-accent bg-accent/40 cursor-pointer px-2 py-1 m-0">
                View job details
              </AccordionTrigger>

              <AccordionContent className="mt-4 space-y-5 text-sm text-gray-700">
                {/* Summary */}
                <p>{job.summary}</p>

                {/* Responsibilities */}
                <div>
                  <p className="font-semibold mb-1">Key Responsibilities:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {job.keyResponsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Qualifications */}
                <div>
                  <p className="font-semibold mb-1">Qualifications:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {job.qualifications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <p className="font-semibold mb-1">Why Join Us?</p>
                  <ul className="list-disc list-inside space-y-1">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        {/* Mobile Apply Button */}
        <div className="md:hidden px-4 pb-4 flex justify-end">
          <Button
            onClick={() => setOpen(true)}
            className="bg-brand-teal hover:bg-brand-teal/80 text-white rounded-full gap-1"
          >
            Apply
            <ArrowUpRightIcon size={16} />
          </Button>
        </div>
      </Card>

      <Separator className="my-4" />
    </>
  );
}
