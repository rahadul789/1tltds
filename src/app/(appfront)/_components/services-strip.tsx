"use client";

import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

interface ServicesStripProps {
  data: {
    id: number;
    title: string;
    heading: string;
    url: string;
  }[];
}

/* 🎯 Static particle positions (no runtime work) */
const particlePositions = [
  { top: "12%", left: "8%" },
  { top: "36%", left: "18%" },
  { top: "68%", left: "10%" },
  { top: "22%", left: "78%" },
  { top: "56%", left: "85%" },
  { top: "80%", left: "60%" },
  { top: "14%", left: "55%" },
  { top: "70%", left: "30%" },
];

export default function ServicesStrip({ data }: ServicesStripProps) {
  return (
    <section
      className="
        relative overflow-hidden rounded-3xl
        border border-dashed border-slate-300 dark:border-slate-800
        bg-background/40 backdrop-blur-[2px] py-30
      "
    >
      {/* 🔵 Soft radial glow (static, cheap) */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)]
          opacity-40 blur-3xl
        "
      />

      {/* 🟣 Floating particles — CSS ONLY */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {particlePositions.map((pos, i) => (
          <span
            key={i}
            className="floating-particle"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Left heading */}
          <div className="md:max-w-48 md:border-r md:pr-6 text-center md:text-right">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              {data[0]?.heading}
            </p>
          </div>

          {/* Slider */}
          <div
            className="relative md:flex-1 py-4"
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              contain: "layout paint style",
            }}
          >
            <InfiniteSlider speed={36} speedOnHover={16} gap={96}>
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 text-sm font-medium text-foreground/80"
                >
                  <span
                    className="
                      grid size-11 place-content-center rounded-xl
                      bg-white/60 dark:bg-white/5
                      backdrop-blur-md border
                      border-slate-200/60 dark:border-white/10
                      shadow-sm
                    "
                  >
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                  </span>

                  <span className="whitespace-nowrap tracking-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </InfiniteSlider>

            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-background to-transparent" />

            {/* Blur overlays (reduced cost) */}
            {/* <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={0.6}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={0.6}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
