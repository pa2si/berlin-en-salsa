"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { LinksModal } from "./LinksModal";
import { useTranslations, useLocale } from "next-intl";
import { footerLinks } from "../data/footerLinks";

export const Footer = () => {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const fundingTitle = locale === "de" ? "Gefördert durch" : "Financiado por";

  return (
    <footer className="text-bes-red py-8 text-center lg:py-6">
      <div className="container mx-auto px-4">
        <section
          id="footer-funding"
          className="border-bes-red/20 mb-7 border-b pb-6"
        >
          <h3 className="mb-4 text-left text-sm font-semibold tracking-wide sm:text-base">
            {fundingTitle}
          </h3>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-nowrap sm:gap-8">
            <motion.img
              src="/musicbboard-w-text.webp"
              alt="Musicboard Berlin"
              className="h-auto w-[78%] max-w-[380px] object-contain sm:w-[50%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.img
              src="/brot-fuer-die-welt-logo.webp"
              alt="Brot fuer die Welt"
              className="h-auto w-[62%] max-w-[280px] object-contain sm:w-[38%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium md:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:flex-nowrap">
            {footerLinks.map((link, index) => {
              const href = link.href;
              const label = t(link.labelKey as "privacy" | "legal");

              return (
                <React.Fragment key={`footer-link-${index}`}>
                  {index > 0 && <span>|</span>}
                  {link.isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-bes-red/80 flex items-center transition-colors hover:underline"
                    >
                      <span className={link.icon ? "mr-1" : ""}>{label}</span>
                      {link.icon && (
                        <img
                          src={link.icon}
                          alt={`${label} icon`}
                          className="h-4 w-auto"
                        />
                      )}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-bes-red/80 flex items-center transition-colors hover:underline"
                    >
                      <span className={link.icon ? "mr-1" : ""}>{label}</span>
                      {link.icon && (
                        <img
                          src={link.icon}
                          alt={`${label} icon`}
                          className="h-4 w-auto"
                        />
                      )}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <span className="hidden lg:inline">|</span>
          <div className="mt-1 w-full lg:mt-0 lg:w-auto">
            <button
              onClick={() => setIsLinksModalOpen(true)}
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              {t("links")}
            </button>
          </div>
        </div>
        <div className="text-bes-purple mt-2 text-xs">
          © {new Date().getFullYear()} Berlin En Salsa. {t("copyright")}
        </div>
      </div>
      <LinksModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        language={locale as "de" | "es"}
      />
    </footer>
  );
};
