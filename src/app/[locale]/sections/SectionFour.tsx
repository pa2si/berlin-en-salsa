"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const SectionFour = () => {
  const t = useTranslations("Sections.SectionFour");
  const locale = useLocale();
  const supportEmailHref = "mailto:info@berlinensalsa.de";
  const saborHref = "https://saboramiberlin.com/";
  const saborText =
    locale === "de" ? "Zu bekommen bei" : "Consigue tu favorito aquí:";

  const description2WithFundingLink = t.rich("description2", {
    fundingLink: (chunks) => (
      <a
        href="#footer-funding"
        className="hover:text-bes-amber/80 underline decoration-2 underline-offset-4 transition-colors"
      >
        {chunks}
      </a>
    ),
  });

  return (
    <>
      {/* Mobile to Large Layout (Visible below xl) */}
      <div className="bg-bes-purple flex min-h-svh flex-col items-center justify-center gap-6 overflow-x-hidden overflow-y-auto p-4 py-8 xl:hidden">
        {/* 1. Title Image - Made smaller */}
        <h2 className="sr-only">{t("title")}</h2>
        <img
          src={locale === "de" ? "/unser-merch.svg" : "/nuestro-merch.svg"}
          alt={t("title")}
          className="w-[60vw] max-w-sm"
        />

        {/* 2. Descriptions - Font size increased */}
        <div className="flex flex-col items-center gap-3 px-2 md:gap-4 md:px-8">
          <p className="text-bes-amber text-center text-[clamp(1.25rem,5vw,1.8rem)] leading-snug font-semibold">
            {t("description1")}
          </p>
          <p className="text-bes-amber text-center text-[clamp(1.25rem,5vw,1.8rem)] leading-snug font-semibold">
            {description2WithFundingLink}
          </p>
          <p className="text-bes-amber text-center text-[clamp(1.25rem,5vw,1.8rem)] leading-snug font-semibold">
            {t("description3")}
          </p>
        </div>

        {/* 3. Button / Sabor a Mi Logo */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="text-bes-amber text-center text-[clamp(1rem,3.5vw,1.4rem)] font-semibold">
            {saborText}
          </p>
          <a
            href={saborHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={saborText}
          >
            <img
              src="/sabor-a-mi.webp"
              alt="Sabor a Mi Berlin"
              className="h-20 w-auto object-contain sm:h-24"
            />
          </a>
        </div>

        {/* Support Link Anchor */}
        <a
          href={supportEmailHref}
          aria-label={t("supportTitle")}
          className="block"
        ></a>

        {/* 4. T-Shirts Images */}
        <div className="flex w-full max-w-3xl flex-row items-center justify-around gap-4 pt-4 sm:gap-8">
          <motion.img
            src="/bes-camiseta-black-2026.webp"
            alt="Berlin en Salsa white t-shirt"
            className="w-[40vw] max-w-[220px] object-contain"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
          <motion.img
            src="/gorra-rosa.webp"
            alt="Berlin en Salsa black t-shirt"
            className="w-[40vw] max-w-[220px] object-contain"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
        </div>
      </div>

      {/* Desktop layout (xl and above) */}
      <div className="bg-bes-purple hidden h-svh grid-cols-3 overflow-x-hidden overflow-y-auto pt-4 xl:grid xl:pt-2 2xl:pt-4">
        <div className="flex items-center justify-center">
          <motion.img
            src="/bes-camiseta-black-2026.webp"
            alt="Berlin en Salsa white t-shirt"
            className="max-w-11/12 px-4"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          />
        </div>
        <div className="flex flex-col items-center justify-center sm:space-y-4 md:space-y-2 lg:space-y-4 2xl:gap-4">
          <div>
            <img
              src={locale === "de" ? "/unser-merch.svg" : "/nuestro-merch.svg"}
              alt={t("title")}
              className="mx-auto max-w-lg min-w-90"
            />
          </div>

          <p className="text-bes-amber text-center font-semibold lg:text-xl xl:text-[1.7rem]">
            {t("description1")}
          </p>
          <p className="text-bes-amber text-center font-semibold lg:text-xl xl:text-[1.7rem]">
            {description2WithFundingLink}
          </p>
          <p className="text-bes-amber text-center font-semibold lg:text-2xl xl:text-[1.7rem]">
            {t("description3")}
          </p>

          <div className="flex flex-col items-center gap-2">
            <p className="text-bes-amber text-center font-semibold lg:text-lg xl:text-[1.3rem]">
              {saborText}
            </p>
            <a
              href={saborHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={saborText}
            >
              <img
                src="/sabor-a-mi.webp"
                alt="Sabor a Mi Berlin"
                className="h-24 w-auto object-contain"
              />
            </a>
          </div>

          <a
            href={supportEmailHref}
            aria-label={t("supportTitle")}
            className="block"
          ></a>
        </div>
        <div className="flex items-center justify-center">
          <motion.img
            src="/gorra-rosa.webp"
            alt="Berlin en Salsa black t-shirt"
            className="max-w-11/12 px-4"
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
