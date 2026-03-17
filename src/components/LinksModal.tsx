"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LinkItem {
  url: string;
  title: string;
  image: string;
}

interface LinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "es" | "de";
}

export const LinksModal = ({ isOpen, onClose, language }: LinksModalProps) => {
  // Close on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const links: LinkItem[] = [
    {
      url: "https://youtu.be/rtWWDUUSJ9I?si=jFC1veBjJPtdDhST",
      title: 'Berlin En Salsa Documentary "by El Son Obrero"',
      image: "/el-son-obrero.webp",
    },
    {
      url: "https://www.salsa-berlin.de/",
      title: "salsa-berlin.de",
      image: "/salsa-berlin-468X98.gif",
    },
    {
      url: "https://www.thf-berlin.de/aktuelles/veranstaltungen/veranstaltung/berlin-en-salsa-festival-19-2007",
      title: "THF Berlin En Salsa Event",
      image: "/logo-thf.svg",
    },
    {
      url: "https://www.the-berliner.com/berlin/what-to-do-this-weekend-best-events/",
      title: "The Berliner: What to do this weekend in Berlin",
      image: "/the-berliner.png",
    },
    {
      url: "https://rausgegangen.de/en/events/berlin-en-salsa-festival-day-day-01-0/",
      title: "Rausgegangen: Berlin En Salsa Festival",
      image: "/rausgegangen.svg",
    },
  ];

  const closeText = language === "es" ? "Cerrar" : "Schließen";

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
          <div className="relative">
            {/* Close button - mobile only, outside modal */}
            <motion.button
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={onClose}
              className="hover:text-bes-red absolute -top-10 -right-2 z-20 text-white transition-colors focus:outline-none sm:-top-10 sm:-right-10"
              aria-label={closeText}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl shadow-2xl"
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

              <div className="[&::-webkit-scrollbar-thumb]:bg-bes-red/50 hover:[&::-webkit-scrollbar-thumb]:bg-bes-red max-h-[75vh] space-y-3 overflow-y-auto p-5 sm:space-y-4 sm:p-6 md:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-track]:bg-transparent">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-bes-red/20 hover:border-bes-red flex cursor-pointer items-center gap-4 rounded-lg border-2 bg-white/80 p-4 transition-all hover:scale-[1.02] hover:bg-white hover:shadow-lg sm:p-5"
                    title={link.title}
                  >
                    <div className="shrink-0">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="h-16 w-auto max-w-[120px] object-contain sm:h-20 sm:max-w-40"
                      />
                    </div>
                    <span className="text-bes-red flex-1 text-base font-bold sm:text-lg md:text-xl">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
