"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionFour = () => {
  const mobileWhiteTshirtRef = useRef(null);
  const mobileBlackTshirtRef = useRef(null);
  const smWhiteTshirtRef = useRef(null);
  const smBlackTshirtRef = useRef(null);

  // Lower threshold and add margin to detect earlier
  const isInViewMobileWhite = useInView(mobileWhiteTshirtRef, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -200px 0px",
  });
  const isInViewMobileBlack = useInView(mobileBlackTshirtRef, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -200px 0px",
  });
  const isInViewSmWhite = useInView(smWhiteTshirtRef, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -200px 0px",
  });
  const isInViewSmBlack = useInView(smBlackTshirtRef, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -200px 0px",
  });
  return (
    <>
      {/* Mobile layout (only visible below sm) */}
      <div className="bg-bes-purple flex h-svh flex-col items-center justify-around overflow-x-hidden overflow-y-auto pb-8 sm:hidden">
        <h2 className="sr-only">¿Cómo se financia Berlin en Salsa?</h2>
        <img
          src="/como-se-financia-berlin-en-salsa.svg"
          alt="Como se financia Berlin en Salsa"
          className="mx-auto w-[80vw] max-w-[33rem] min-w-[13rem]"
        />

        <p className="text-bes-amber -mt-4 px-2 text-center text-[clamp(0.9rem,3vh,2.1rem)] leading-snug">
          Berlin en Salsa no cuenta con financiación pública ni patrocinio
          comercial.
        </p>

        <p className="text-bes-amber -mt-4 px-2 text-center text-[clamp(0.9rem,3vh,2.1rem)] leading-snug">
          Somos un festival hecho por y para la comunidad salsera, y nos
          financiamos únicamente a través de la venta de camisetas y sus
          donaciones.
        </p>

        <img
          src="/apoyanos-double-line.svg"
          alt="Apoyanos pidiendo tu camiseta"
          className="mx-auto w-[50vw] max-w-[25rem] min-w-[14rem]"
        />

        <div className="-mt-2 flex w-full items-center justify-around gap-4 px-4">
          <motion.img
            ref={mobileWhiteTshirtRef}
            src="/bes-camiseta-white.webp"
            alt="Berlin en Salsa white t-shirt"
            className="w-[40vw] max-w-[15rem] min-w-[6rem]"
            initial={{ opacity: 0, x: -100 }}
            animate={
              isInViewMobileWhite
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -100 }
            }
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
          <motion.img
            ref={mobileBlackTshirtRef}
            src="/bes-camiseta-black.webp"
            alt="Berlin en Salsa black t-shirt"
            className="w-[40vw] max-w-[15rem] min-w-[6rem]"
            initial={{ opacity: 0, x: 100 }}
            animate={
              isInViewMobileBlack
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 100 }
            }
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
        </div>
      </div>

      {/* Small screen layout (sm only) - 2-column layout */}
      <div className="bg-bes-purple hidden h-svh w-full grid-cols-2 overflow-x-hidden overflow-y-auto sm:grid md:hidden">
        {/* Left column - Financing information */}
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src="/como-se-financia-berlin-en-salsa.svg"
            alt="Como se financia Berlin en Salsa"
            className="mx-auto w-[95%] max-w-[13rem]"
          />

          <div className="mt-4 space-y-4 px-2">
            <p className="text-bes-amber text-center text-[clamp(0.9rem,2.9vw,1.9rem)]">
              Berlin en Salsa no cuenta con financiación pública ni patrocinio
              comercial.
            </p>

            <p className="text-bes-amber text-center text-[clamp(0.9rem,2.9vw,1.9rem)]">
              Somos un festival hecho por y para la comunidad salsera, y nos
              financiamos únicamente a través de la venta de camisetas y sus
              donaciones.
            </p>
          </div>
        </div>

        {/* Right column - T-shirts */}
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src="/apoyanos-single-line.svg"
            alt="Apoyanos pidiendo tu camiseta"
            className="mb-4 w-[100%] max-w-[20rem]"
          />

          <div className="flex flex-row items-center justify-center gap-4">
            <motion.img
              ref={smWhiteTshirtRef}
              src="/bes-camiseta-white.webp"
              alt="Berlin en Salsa white t-shirt"
              className="w-[45%] max-w-[12rem]"
              initial={{ opacity: 0, x: -100 }}
              animate={
                isInViewSmWhite ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
            />
            <motion.img
              ref={smBlackTshirtRef}
              src="/bes-camiseta-black.webp"
              alt="Berlin en Salsa black t-shirt"
              className="w-[45%] max-w-[12rem]"
              initial={{ opacity: 0, x: 100 }}
              animate={
                isInViewSmBlack ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
              }
              transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
            />
          </div>
        </div>
      </div>

      {/* Medium to large layout (md to lg) - 2-row layout */}
      <div className="bg-bes-purple hidden h-svh w-full flex-col overflow-x-hidden overflow-y-auto md:flex lg:flex xl:hidden">
        {/* Top row - Financing information */}
        <div className="flex flex-1 flex-col items-center justify-center p-4 lg:p-8">
          <div className="flex h-full flex-col items-center justify-center">
            <img
              src="/como-se-financia-berlin-en-salsa.svg"
              alt="Como se financia Berlin en Salsa"
              className="mx-auto mb-4 max-h-[28vh] w-[clamp(18rem,40vh,32rem)] object-contain lg:mb-4"
            />

            <div className="max-w-3xl space-y-3 px-4 lg:space-y-4">
              <p className="text-bes-amber text-center text-[clamp(1.2rem,3vh,2.2rem)] lg:text-[clamp(1.5rem,3.5vh,2.5rem)]">
                Berlin en Salsa no cuenta con financiación pública ni patrocinio
                comercial.
              </p>

              <p className="text-bes-amber text-center text-[clamp(1.2rem,3vh,2.2rem)] lg:text-[clamp(1.5rem,3.5vh,2.5rem)]">
                Somos un festival hecho por y para la comunidad salsera, y nos
                financiamos únicamente a través de la venta de camisetas y sus
                donaciones.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row - T-shirts */}
        <div className="flex flex-1 flex-col justify-center p-4 lg:items-center lg:p-8">
          <img
            src="/apoyanos-single-line.svg"
            alt="Apoyanos pidiendo tu camiseta"
            className="mx-auto mb-10 max-h-[18vh] w-[clamp(18rem,43vh,40rem)] object-contain lg:mb-8"
          />

          <div className="flex flex-row items-center justify-center gap-10 lg:gap-20">
            <motion.img
              src="/bes-camiseta-white.webp"
              alt="Berlin en Salsa white t-shirt"
              className="max-h-[28vh] w-[clamp(10rem,22vh,18rem)] object-contain"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
            />
            <motion.img
              src="/bes-camiseta-black.webp"
              alt="Berlin en Salsa black t-shirt"
              className="max-h-[28vh] w-[clamp(10rem,22vh,18rem)] object-contain"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
            />
          </div>
        </div>
      </div>

      {/* Desktop layout (only visible at xl and above) */}
      <div className="bg-bes-purple hidden h-svh grid-cols-3 overflow-x-hidden overflow-y-auto px-8 xl:grid">
        <div className="flex items-center justify-center">
          <motion.img
            src="/bes-camiseta-white.webp"
            alt="Berlin en Salsa white t-shirt"
            className="w-full px-4"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
        </div>
        <div className="flex flex-col items-center justify-center px-4 sm:space-y-4 md:space-y-2 lg:space-y-6 2xl:gap-8">
          <div>
            <img
              src="/como-se-financia-berlin-en-salsa.svg"
              alt="Como se financia Berlin en Salsa"
              className="mx-auto max-w-[32rem] min-w-[27rem]"
            />
          </div>

          <p className="text-bes-amber text-center font-semibold lg:text-2xl xl:text-3xl">
            Berlin en Salsa no cuenta con financiación pública ni patrocinio
            comercial.
          </p>
          <p className="text-bes-amber text-center font-semibold lg:text-2xl xl:text-3xl">
            Somos un festival hecho por y para la comunidad salsera, y nos
            financiamos únicamente a través de la venta de camisetas y sus
            donaciones.
          </p>
          <img
            src="/apoyanos-single-line.svg"
            alt="Apoyanos pidiendo tu camiseta"
            className="mx-auto max-w-[35rem] min-w-[10rem]"
          />
        </div>
        <div className="flex items-center justify-center">
          <motion.img
            src="/bes-camiseta-black.webp"
            alt="Berlin en Salsa black t-shirt"
            className="w-full px-4"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
        </div>
      </div>
    </>
  );
};
export default SectionFour;
