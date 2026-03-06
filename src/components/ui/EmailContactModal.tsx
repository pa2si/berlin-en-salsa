"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface EmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailContactModal({
  isOpen,
  onClose,
}: EmailContactModalProps) {
  const t = useTranslations("Legal.emailModal");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Close on esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const emails = ["info", "booking", "gastro", "press", "voluntarios"] as const;

  // Toggle between UI variants: set to false to revert to original vertical list
  const useCompactButtons = true;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-xl shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background image with overlay */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage: "url(/bes-section-6-bg.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="absolute inset-0 -z-10 bg-black/30" />

            {useCompactButtons ? (
              <div className="max-h-[75vh] space-y-2 overflow-y-auto p-5 sm:space-y-3 sm:p-6 md:p-8">
                {emails.map((key) => {
                  const emailAddress = t(`emails.${key}.email`);
                  const isCopied = copiedEmail === emailAddress;

                  return (
                    <div
                      key={key}
                      className="group border-bes-red/20 hover:border-bes-red flex items-center justify-between gap-3 rounded-lg border-2 bg-white/80 p-4 transition-all hover:scale-[1.02] hover:bg-white/90 hover:shadow-lg sm:p-5"
                    >
                      <a
                        href={`mailto:${emailAddress}`}
                        className="flex-1 cursor-pointer"
                      >
                        <p className="text-bes-purple mb-1 text-sm font-medium sm:text-base md:text-lg">
                          {t(`emails.${key}.description`)}
                        </p>
                        <p className="text-bes-red text-base font-bold break-all sm:text-lg md:text-xl">
                          {emailAddress}
                        </p>
                      </a>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(emailAddress)}
                          className="text-bes-purple hover:text-bes-red flex-shrink-0 cursor-pointer transition-all"
                          title="Copy email"
                        >
                          {isCopied ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-bes-red h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                            >
                              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                              <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                            </svg>
                          )}
                        </button>
                        <a
                          href={`mailto:${emailAddress}`}
                          className="text-bes-red flex-shrink-0 transition-transform hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                          >
                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="max-h-[75vh] space-y-3 overflow-y-auto p-5 sm:space-y-4 sm:p-6 md:p-8">
                {emails.map((key) => {
                  const emailAddress = t(`emails.${key}.email`);
                  const isCopied = copiedEmail === emailAddress;

                  return (
                    <div
                      key={key}
                      className="border-bes-purple/10 hover:border-bes-red/50 flex flex-col justify-between gap-1 rounded-xl border bg-white/60 p-4 transition-all hover:scale-[1.02] hover:bg-white/90 hover:shadow-lg sm:flex-row sm:items-center sm:p-5"
                    >
                      <div className="flex w-full flex-col">
                        <p className="text-bes-purple mb-1 text-base font-medium sm:text-lg md:text-xl">
                          {t(`emails.${key}.description`)}
                        </p>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${emailAddress}`}
                            className="text-bes-red inline-block cursor-pointer text-lg font-bold break-all hover:underline sm:text-xl md:text-2xl"
                          >
                            {emailAddress}
                          </a>
                          <button
                            onClick={() => copyToClipboard(emailAddress)}
                            className="text-bes-purple hover:text-bes-red flex-shrink-0 cursor-pointer transition-all"
                            title="Copy email"
                          >
                            {isCopied ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-bes-red h-5 w-5 sm:h-6 sm:w-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 sm:h-6 sm:w-6"
                              >
                                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                                <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
