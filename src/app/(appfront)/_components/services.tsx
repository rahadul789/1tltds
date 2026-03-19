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
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

interface ServicesProps {
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

/* ------------------- ANIMATION VARIANTS ------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ----------------------------------------------------------- */

export default function Features({ data, services }: ServicesProps) {
  return (
    <section className="">
      <div className="min-h-[80vh] w-full bg-slate-900 relative overflow-hidden">
        {/* ------------------- BACKGROUND ------------------- */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%,
              rgba(251,191,36,0.15) 0%,
              rgba(251,191,36,0.06) 25%,
              transparent 60%)
            `,
          }}
        />

        {/* 🔵 MOVING BLUR CIRCLE — TEAL */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-72 h-72 bg-teal-400/40 blur-[120px] rounded-full opacity-60"
          animate={{
            x: ["0vw", "35vw", "-20vw", "0vw"],
            y: ["0vh", "-10vh", "10vh", "0vh"],
            opacity: [0.4, 0.7, 0.5, 0.6],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🔵 MOVING BLUR CIRCLE — SKY */}
        <motion.div
          className="absolute top-[40%] right-[10%] w-80 h-80 bg-sky-500/35 blur-[130px] rounded-full opacity-50"
          animate={{
            x: ["0vw", "-30vw", "25vw", "0vw"],
            y: ["0vh", "12vh", "-15vh", "0vh"],
            opacity: [0.3, 0.6, 0.4, 0.5],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🟣 MOVING BLUR CIRCLE — PURPLE */}
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[420px] h-[420px] bg-purple-500/30 blur-[150px] rounded-full opacity-50"
          animate={{
            x: ["0vw", "-40vw", "35vw", "0vw"],
            y: ["0vh", "-20vh", "12vh", "0vh"],
            opacity: [0.35, 0.55, 0.45, 0.4],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ------------------- TEXT HEADER ------------------- */}
        <div className="mx-auto max-w-7xl px-6 md:py-20 py-14 relative z-10 text-center text-white space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-medium"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base md:text-lg opacity-80"
          >
            {data.subTitle}
          </motion.p>
        </div>

        {/* ------------------- SERVICES GRID ------------------- */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
          {/* ==== NEON GLASS CARD WRAPPER ==== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {services
              .slice(0, 8)
              .map(({ title, summary, description, url }, i) => (
                <motion.div key={i} variants={cardVariants}>
                  <div
                    className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-lg h-full
          overflow-hidden transition-all duration-500
          hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]"
                  >
                    {/* FLOATING LIGHT ORBS */}
                    <motion.span
                      className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-sky-500/20 blur-3xl"
                      animate={{
                        x: [0, 40, 0],
                        y: [0, 20, 0],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{ repeat: Infinity, duration: 10 }}
                    />
                    <motion.span
                      className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl"
                      animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ repeat: Infinity, duration: 12 }}
                    />

                    {/* CONTENT */}
                    <div className="relative z-10">
                      <span
                        className="grid size-12 place-content-center rounded-xl bg-white/10 
              group-hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
                      >
                        <Image
                          src={url}
                          alt="icon"
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </span>

                      <h3 className="mt-3 font-medium text-white">{title}</h3>
                      <p className="text-sm text-gray-300 mt-2">{summary}</p>
                    </div>

                    {/* Learn More Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                          className="
      absolute top-2 right-2 z-20
      text-xs text-sky-300 hover:text-white transition cursor-pointer
      opacity-100                
      md:opacity-0                
      md:group-hover:opacity-100  
    "
                        >
                          Learn more <ChevronRight className="size-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{title}</DialogTitle>
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
                          </DialogTitle>
                          <DialogDescription className="text-sm font-medium">
                            {description}
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            {services.length > 8 && (
              <div className="absolute right-0 bottom-10 flex justify-end mt-4">
                <Link href="/services">
                  <Button
                    variant="link"
                    className="text-xs text-muted cursor-pointer"
                  >
                    +{services.length - 8} more services
                    <ArrowRight className="translate-y-[1px] -translate-x-1" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
