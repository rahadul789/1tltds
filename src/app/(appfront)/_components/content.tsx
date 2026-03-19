"use client";

import { motion } from "framer-motion";

interface TestimonyProps {
  data: {
    id: number;
    heading: string;
    paragraph: string;
    testimony: string;
    author: string;
  };
}

export default function ContentSection({ data }: TestimonyProps) {
  return (
    <section className="relative py-20 md:py-62 overflow-hidden">
      {/* Soft radial background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* ---------------- LEFT : HEADING ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="relative">
              {/* light glow behind title */}
              <div className="absolute -inset-6 bg-sky-500/10 blur-2xl rounded-full" />

              <h2 className="relative text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                {data.heading}
              </h2>

              {/* animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-4 h-[3px] bg-gradient-to-r from-brand-teal to-sky-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* ---------------- RIGHT : CONTENT ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              {data.paragraph}
            </p>

            {/* Blockquote modern style */}
            <blockquote className="relative rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-md">
              {/* gradient accent bar */}
              <span className="absolute left-0 top-4 h-10 w-[3px] bg-gradient-to-b from-brand-teal to-sky-500 rounded-full" />

              <p className="text-lg italic text-foreground">
                “{data.testimony}”
              </p>

              <cite className="mt-4 block text-sm font-medium text-brand-teal">
                — {data.author}
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
