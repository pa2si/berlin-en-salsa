"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GermanProgramDownloadModal from "./GermanProgramDownloadModal";

const GermanProgramButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <>
      <motion.div
        className="fixed right-6 bottom-6 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        {/* Pulsing background effect */}
        <motion.div
          className="bg-bes-amber absolute inset-0 rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.button
          className="bg-bes-red relative z-10 flex items-center space-x-2 rounded-full px-3 py-3 shadow-lg sm:px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowDownloadModal(true)}
        >
          {/* Download icon on desktop, program sheet icon on mobile */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-bes-amber hidden h-6 w-6 sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={isHovered ? { rotate: 360 } : {}}
            transition={{ duration: 1.5, ease: "linear" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </motion.svg>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-bes-amber block h-6 w-6 sm:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={isHovered ? { scale: 1.1 } : {}}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </motion.svg>
          <span className="text-bes-amber hidden font-bold sm:inline">
            Programm Herunterladen
          </span>
        </motion.button>
      </motion.div>

      {/* Program Download Modal */}
      <GermanProgramDownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  );
};

export default GermanProgramButton;
