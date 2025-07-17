"use client";

import { useRef, useEffect } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const title = language === "es" ? "Enlaces" : "Links";
  const closeText = language === "es" ? "Cerrar" : "Schließen";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="bg-bes-amber max-h-[90vh] w-full max-w-lg rounded-lg shadow-xl"
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-bes-red text-xl font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="text-bes-red hover:text-bes-red/80 rounded-full p-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          <ul className="space-y-4">
            {links.map((link, index) => (
              <li key={index} className="rounded-lg border border-gray-200 p-3">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-2 transition-transform hover:scale-105 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4"
                  title={link.title}
                >
                  <div className="w-full max-w-[220px] flex-shrink-0">
                    <img
                      src={link.image}
                      alt={link.title}
                      className="mx-auto h-auto w-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-bes-red text-center font-medium sm:text-left">
                    {link.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="bg-bes-red hover:bg-bes-red/90 ml-auto flex rounded-lg px-4 py-2 text-white hover:cursor-pointer"
          >
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
};
