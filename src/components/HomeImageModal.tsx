"use client";

import { useEffect, useState } from "react";
import { FESTIVAL_CONFIG } from "@/config/festival";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeImageModal() {
  const [isOpen, setIsOpen] = useState(
    FESTIVAL_CONFIG.homeOverlayModal.isEnabled,
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // 1. Animate the backdrop fade
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Festival announcement"
        >
          <motion.div
            // 2. Animate the modal content scale and fade
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[calc(100dvh-7rem)] w-full max-w-[92vw] sm:h-[85vh] sm:max-h-[900px] sm:max-w-[620px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-bes-red hover:text-bes-red/80 absolute -top-12 right-0 animate-pulse cursor-pointer p-2 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
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
            </button>

            <img alt="Festival pass" className="h-full w-full object-contain" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
