"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

interface CareerInfoProps {
  career: {
    id: number;
    heroTitle: string;
    title: string;
    subTitle: string;
    email: string;
  };
}

const CareerInfo = ({ career }: CareerInfoProps) => {
  return (
    <div className=" relative">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          {/* Start your career <br /> with{" "} */}
          <p className=" max-w-[600px]"> {career.heroTitle} </p>
          <p className=" text-brand-teal">
            <span className=" text-brand-red">1</span>Technologies
          </p>
        </motion.h1>
      </LampContainer>
      <p className=" text-[22vw] text-white absolute top-23 md:top-6 left-1/2  -translate-x-1/2 select-none font-extrabold opacity-5">
        {" "}
        CAREER
      </p>
    </div>
  );
};

export default CareerInfo;
