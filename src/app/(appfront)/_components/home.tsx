"use client";

import { GlobeDemo } from "./globe";
import { Badge } from "@/components/ui/badge";
import { MovingButton } from "@/components/ui/moving-border";
import { TextReveal } from "@/components/ui/text-reveal";
import { TextScramble } from "@/components/ui/text-scramble";

interface HomeProps {
  data: {
    id: number;
    title1: string;
    title2: string;
    badge1: string;
    badge2: string;
    paragraph: string;
    buttonText: string;
  };
}

import { motion } from "framer-motion";

const Home = ({ data }: HomeProps) => {
  return (
    <div className=" ">
      <div className=" min-h-[80vh] w-full relative">
        {/* Dashed Top Fade Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
            WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Your Content/Components */}
        <div className="relative ">
          <div className="mx-auto max-w-[1380px] ">
            <div className="grid min-h-[70vh] grid-cols-1 items-center gap-10  md:grid-cols-5 md:gap-4 ">
              {/* Text */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1 z-10 md:col-span-3 place-items-center px-4 sm:px-6 lg:px-8"
              >
                <div className="">
                  <div className="space-y-6 md:space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {data.badge1}
                      </Badge>
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                        {data.badge2}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-transparent bg-clip-text bg-gradient-to-tr from-[#57C0C7] via-[#2B86C5] to-[#0C0C38] drop-shadow-[0_0_18px_rgba(87,192,199,0.25)]">
                        <TextScramble className=" text-5xl md:text-7xl font-extrabold  leading-tight tracking-tight">
                          {data.title1}
                        </TextScramble>
                      </div>
                      <p className="text-5xl md:text-7xl font-extrabold  leading-tight tracking-tight text-slate-700 -translate-y-3.5">
                        {data.title2}
                      </p>

                      <div className="max-w-2xl text-pretty text-lg md:pr-13">
                        {" "}
                        <TextReveal variant="blur">
                          {data.paragraph}
                        </TextReveal>{" "}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <MovingButton
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                      >
                        <span className=" mr-2  text-pretty ">
                          {data.buttonText}
                        </span>
                        <div className="box-content w-[3px] h-[12px] px-[5px] py-[5px] border-2 border-brand-teal rounded-[25px] opacity-75">
                          <div
                            className="w-[3px] h-[5px] rounded-[25%] bg-brand-teal animate-scroll "
                            aria-hidden="true"
                          />
                        </div>
                      </MovingButton>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Globe */}
              <div className="order-1 md:order-2 md:col-span-2">
                <GlobeDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
