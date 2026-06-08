"use client";

import { useEffect, useState } from "react";
import { FESTIVAL_CONFIG } from "@/config/festival";

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/85 p-4"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Festival announcement"
    >
      <div
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

        <img
          src="/abran-paso.webp"
          alt="Festival pass"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
