"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap, Settings2, Sparkles } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeaturesProps {
  data: {
    id: number;
    title: string;
    subTitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="relative py-16 md:py-42 overflow-hidden">
      {/* FIXED — Constrained background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(78,157,191,0.35)_0%,rgba(110,170,194,0)_70%)] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#050b26]">
            {data.title}
          </h2>
          <p className="mt-4 text-gray-600">{data.subTitle}</p>
        </div>

        {/* FIXED — Grid now centered + max width applied */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="
        mt-14 grid gap-7 
        sm:grid-cols-2 
        lg:grid-cols-3 
        max-w-4xl mx-auto
      "
          >
            <ModernFeatureCard
              icon={<Zap className="size-6 text-white" />}
              title={data.feature1Title}
              description={data.feature1Description}
              color="from-teal-400 via-sky-400 to-blue-400"
            />

            <ModernFeatureCard
              icon={<Settings2 className="size-6 text-white" />}
              title={data.feature2Title}
              description={data.feature2Description}
              color="from-purple-400 via-fuchsia-400 to-pink-400"
            />

            <ModernFeatureCard
              icon={<Sparkles className="size-6 text-white" />}
              title={data.feature3Title}
              description={data.feature3Description}
              color="from-amber-400 via-orange-400 to-red-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   🔥 Modern Feature Card Component
------------------------------------------------------------ */

const ModernFeatureCard = ({
  icon,
  title,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className="relative group"
    >
      {/* Glow ring behind icon */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-gradient-to-br ${color} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-500`}
      />

      <Card
        className="relative overflow-hidden rounded-2xl border border-white/20 
        bg-white/10 backdrop-blur-xl shadow-md
        transition-all duration-500 group-hover:shadow-2xl
        group-hover:border-white/30 group-hover:bg-white/20"
      >
        {/* Light sweep on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />

        <CardHeader className="pb-3 text-center">
          <IconWrapper color={color}>{icon}</IconWrapper>

          <h3 className="mt-6 font-medium text-[#050b26]">{title}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700 text-center">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* -----------------------------------------------------------
   🔥 Fancy Icon Wrapper
------------------------------------------------------------ */

const IconWrapper = ({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) => (
  <div
    className={`mx-auto flex size-16 items-center justify-center rounded-xl 
      bg-gradient-to-br ${color} shadow-lg shadow-black/10`}
  >
    {children}
  </div>
);
