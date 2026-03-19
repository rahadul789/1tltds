"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ServicesSectionProps {
  data: {
    updated_at: Date;
    created_at: Date;
    id: number;
    title: string;
    subTitle: string;
  };
  services: {
    id: number;
    serviceId: number;
    title: string;
    summary: string;
    description: string;
    url: string;
  }[];
}

/* Parent stagger reveal */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

/* Each card reveal */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesSection({
  data,
  services,
}: ServicesSectionProps) {
  return (
    <section className="relative">
      {/* ============================================================
          🔥 HERO BANNER WITH 3 FLOATING CIRCLES
      ============================================================ */}
      <div className="relative w-full min-h-[45vh] md:min-h-[60vh] bg-brand-teal overflow-hidden">
        {/* Background base layer */}
        <div className="absolute inset-0 bg-brand-teal z-0" />

        {/* Gold glow behind heading */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_60%)]" />

        {/* ANIMATED CIRCLE 1 — TEAL BRAND */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-72 h-72 bg-teal-400/40 blur-[120px] rounded-full opacity-60"
          animate={{
            x: ["0vw", "40vw", "-20vw", "0vw"],
            y: ["0vh", "-10vh", "5vh", "0vh"],
            opacity: [0.4, 0.7, 0.4, 0.6],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ANIMATED CIRCLE 2 — SKY BLUE */}
        <motion.div
          className="absolute top-[40%] left-[60%] w-80 h-80 bg-sky-500/35 blur-[130px] rounded-full opacity-50"
          animate={{
            x: ["10vw", "-30vw", "20vw", "0vw"],
            y: ["0vh", "8vh", "-12vh", "0vh"],
            opacity: [0.3, 0.6, 0.3, 0.5],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ANIMATED CIRCLE 3 — PURPLE */}
        <motion.div
          className="absolute top-[65%] left-[25%] w-[420px] h-[420px] bg-purple-500/30 blur-[150px] rounded-full opacity-50"
          animate={{
            x: ["0vw", "-35vw", "30vw", "0vw"],
            y: ["0vh", "-15vh", "10vh", "0vh"],
            opacity: [0.35, 0.6, 0.4, 0.35],
          }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero heading */}
        <div className="relative z-10 px-6 py-20 md:py-28 max-w-3xl mx-auto text-center text-white space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg opacity-85"
          >
            {data.subTitle}
          </motion.p>
        </div>
      </div>

      {/* ============================================================
          🔥 SERVICES CARDS — EQUAL HEIGHT & ANIMATED
      ============================================================ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {services.map(({ title, summary, description, url }, i) => (
            <motion.div key={i} variants={cardVariants} className="h-full">
              {/* CARD (your styling preserved exactly) */}
              <div
                className={[
                  "group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 h-full flex flex-col",
                  "border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900",
                  "hover:border-sky-400 hover:shadow-[0_0_24px_rgba(56,189,248,0.45)]",
                  i === 0 &&
                    "border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.45)]",
                ].join(" ")}
              >
                {/* Glow Halo */}
                <span
                  className={[
                    "pointer-events-none absolute inset-0 rounded-2xl",
                    "bg-[radial-gradient(120px_120px_at_20%_-10%,rgba(56,189,248,0.25),transparent),radial-gradient(120px_120px_at_120%_120%,rgba(168,85,247,0.2),transparent)]",
                    "blur-md transition-opacity duration-300",
                    "opacity-0 group-hover:opacity-100",
                    i === 0 && "opacity-100",
                  ].join(" ")}
                />

                {/* Top part */}
                <div className="relative flex-1">
                  <div className="space-y-2">
                    <span
                      className={[
                        "grid size-10 place-content-center rounded-md bg-sky-500/10 transition-all duration-300",
                        "group-hover:bg-sky-500/20",
                        i === 0 && "bg-sky-500/20",
                      ].join(" ")}
                    >
                      <Image
                        src={url}
                        alt="logo"
                        width={35}
                        height={35}
                        className="rounded-sm aspect-square"
                      />
                    </span>

                    <h3 className="text-sm font-medium">{title}</h3>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 my-3">
                    {summary}
                  </p>
                </div>

                {/* Learn more button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="pl-0 ml-0
                      

                      absolute bottom-2 right-2 z-20
      text-xs text-sky-300 hover:text-black transition cursor-pointer
      opacity-100                
      md:opacity-0                
      md:group-hover:opacity-100  
                      
                      "
                    >
                      Learn more
                      <ChevronRight className="pt-1" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="my-5 space-y-2">
                        <span className="grid size-45 place-content-center rounded-lg bg-sky-500/10">
                          <Image
                            src={url}
                            alt="logo"
                            width={290}
                            height={290}
                            className="rounded-md"
                          />
                        </span>
                        <span>{title}</span>
                      </DialogTitle>

                      <DialogDescription className="text-sm font-medium">
                        {description}
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
