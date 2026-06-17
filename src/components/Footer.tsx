"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { LinksModal } from "./LinksModal";
import { Collaborations } from "./Collaborations";
import { Financed } from "./Financed";
import { useTranslations, useLocale } from "next-intl";
import { footerLinks } from "../data/footerLinks";

export const Footer = () => {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const t = useTranslations("Navigation");
  const locale = useLocale();

  return (
    <footer className="text-bes-red py-8 text-center lg:py-6">
      <div className="container mx-auto px-4">
        {/* --- Top Sections (Financed & Collaborations) --- */}
        {/* Switched to xl:flex-row so it only goes side-by-side on extra large screens */}
        <div className="border-bes-red/20 mb-7 flex flex-col gap-12 border-b pb-8 xl:flex-row xl:items-start xl:gap-10">
          {/* Left Column - Aligns with Subscribe Form on xl */}
          <div className="flex w-full flex-col xl:w-1/2">
            <Financed />
          </div>

          {/* Right Column - Aligns with Map on xl */}
          <div className="flex w-full flex-col xl:w-1/2">
            <Collaborations />
          </div>
        </div>

        {/* --- Links Section --- */}
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
              className="hover:text-bes-red/80 transition-colors hover:cursor-pointer hover:underline"
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
