"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GermanProgramDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GermanProgramDownloadModal = ({
  isOpen,
  onClose,
}: GermanProgramDownloadModalProps) => {
  const [activeTab, setActiveTab] = useState<"saturday" | "sunday">("saturday");
  const [isHoveredSat, setIsHoveredSat] = useState(false);
  const [isHoveredSun, setIsHoveredSun] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="bg-bes-red bg-opacity-95 relative max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg p-6 shadow-2xl"
        >
          {/* Animated close button */}
          <motion.button
            onClick={onClose}
            className="text-bes-amber hover:bg-opacity-10 absolute top-4 right-4 rounded-full p-3 hover:bg-white"
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              rotate: [0, -10, 10, -5, 5, 0],
            }}
            transition={{
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.2 },
            }}
            aria-label="Schließen"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
              whileHover={{ fill: "#FFA500" }}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.button>

          {/* Title with animation */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-bes-amber mb-6 text-center text-3xl font-bold"
          >
            Festivalprogramm
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-center text-white"
          >
            Lade das komplette Programm herunter, damit du es immer griffbereit
            hast.
          </motion.p>

          {/* Tab navigation */}
          <div className="mb-6 flex justify-center space-x-4">
            <motion.div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("saturday")}
                className="bg-bes-amber text-bes-red relative rounded-lg px-4 py-2 font-medium shadow-md"
              >
                Samstag
                {activeTab === "saturday" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg ring-2 ring-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
              {activeTab === "saturday" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 -bottom-1 left-0 mx-auto h-1 w-4 rounded-full bg-white"
                />
              )}
            </motion.div>
            <motion.div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("sunday")}
                className="bg-bes-amber text-bes-red relative rounded-lg px-4 py-2 font-medium shadow-md"
              >
                Sonntag
                {activeTab === "sunday" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg ring-2 ring-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
              {activeTab === "sunday" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 -bottom-1 left-0 mx-auto h-1 w-4 rounded-full bg-white"
                />
              )}
            </motion.div>
          </div>

          {/* Program preview and download */}
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6 h-64 w-full overflow-hidden rounded-lg sm:h-80 md:h-96"
              >
                <img
                  src={`/program-${activeTab}.jpeg`}
                  alt={`Programm ${activeTab === "saturday" ? "für Samstag" : "für Sonntag"}`}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Download buttons */}
            <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <motion.a
                href="/program-saturday.jpeg"
                download="Berlin-En-Salsa-Programm-Samstag.jpeg"
                className={`bg-bes-amber text-bes-red flex items-center justify-center space-x-2 rounded-lg px-6 py-3 font-bold shadow-lg transition ${
                  activeTab === "saturday" ? "ring-2 ring-white" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHoveredSat(true)}
                onMouseLeave={() => setIsHoveredSat(false)}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={isHoveredSat ? { y: [0, 3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </motion.svg>
                <span>Programm Samstag</span>
              </motion.a>
              <motion.a
                href="/program-sunday.jpeg"
                download="Berlin-En-Salsa-Programm-Sonntag.jpeg"
                className={`bg-bes-amber text-bes-red flex items-center justify-center space-x-2 rounded-lg px-6 py-3 font-bold shadow-lg transition ${
                  activeTab === "sunday" ? "ring-2 ring-white" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHoveredSun(true)}
                onMouseLeave={() => setIsHoveredSun(false)}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={isHoveredSun ? { y: [0, 3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </motion.svg>
                <span>Programm Sonntag</span>
              </motion.a>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-sm text-white"
          >
            *Alle Veranstaltungen sind kostenlos und öffentlich zugänglich
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GermanProgramDownloadModal;
