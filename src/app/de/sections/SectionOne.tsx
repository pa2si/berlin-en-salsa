"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionOne = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <div
        ref={sectionRef}
        className="bg-bes-amber flex h-svh items-center justify-center sm:w-1/2"
      >
        <div className="flex flex-col items-center">
          <h1 className="sr-only">
            Berlin En Salsa - Ein Salsa-Festival in Berlin für alle
          </h1>
          <img
            src="/bes-logo-color.webp"
            alt="Berlin en Salsa Logo"
            className="h-auto max-h-[60vh] min-h-[150px] w-full max-w-[90%] object-contain md:max-w-[70%] lg:max-w-[100%] lg:min-w-[60%]"
          />
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className="text-bes-red w-full max-w-[450px] text-center text-[clamp(1.7rem,5vh,3.8rem)] leading-[1em] font-bold sm:mb-2 md:mb-4 md:w-[95%] xl:w-[115%] xl:max-w-[500px] xl:text-[clamp(1.7rem,5.5vh,4rem)]"
          >
            19 und 20 de julio <br /> Neulich Biergarten
          </motion.p>
        </div>
      </div>

      <div
        className="flex h-svh flex-col items-center justify-center gap-10 bg-cover sm:w-1/2 sm:gap-4 lg:gap-10"
        style={{
          backgroundImage: 'url("/bes-section-1-bg.webp")',
          backgroundPosition: "100% 40%",
        }}
      >
        <div className="text-bes-amber flex h-[65%] flex-col items-center justify-between gap-0 -space-y-[0.35em] py-1.5 font-bold tracking-widest lg:h-[70%]">
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2rem,9.8vh,9rem)]">
            Ein Salsa-
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2rem,9.8vh,9rem)]">
            Festival
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2rem,9.8vh,9rem)]">
            für alle:
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2rem,9.8vh,9rem)]">
            öffentlich
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2rem,9.8vh,9rem)]">
            umsonst
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2rem,9.8vh,9rem)]">
            und draußen!
          </p>
        </div>
        <img
          src="/disco.svg"
          alt="Disco Dekoration"
          className="mt-4 h-[clamp(50px,4vh,160px)] w-auto xl:mt-0"
        />
      </div>
    </div>
  );
};
export default SectionOne;
