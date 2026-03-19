"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface CallToActionProps {
  data: {
    id: number;
    title: string;
    subTitle: string;
    buttonLabel: string;
    buttonLink: string;
  };
}

export default function CallToAction({ data }: CallToActionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background soft gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_65%)]" />

      {/* Subtle animated background grid */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl px-6"
      >
        {/* CTA Container */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl px-6 py-16 md:py-24 lg:py-28"
        >
          {/* Glow behind card */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)] blur-2xl opacity-60" />

          {/* Extra side gradient accents */}
          <div className="absolute -left-20 top-1/2 h-40 w-40 bg-brand-teal/30 blur-[120px] rounded-full" />
          <div className="absolute -right-20 top-1/2 h-40 w-40 bg-sky-400/30 blur-[120px] rounded-full" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl leading-tight lg:text-5xl font-semibold">
              {data.title}
            </h2>

            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {data.subTitle}
            </p>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-brand-teal hover:bg-brand-teal/90 shadow-lg hover:shadow-brand-teal/40 transition-all"
              >
                <Link href={data.buttonLink}>{data.buttonLabel}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
