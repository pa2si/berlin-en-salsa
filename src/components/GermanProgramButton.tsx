"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const GermanProgramButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="bg-bes-red fixed right-6 bottom-6 z-40 flex items-center space-x-2 rounded-full px-3 py-3 shadow-lg sm:px-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-bes-amber h-6 w-6"
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </motion.svg>
      <span className="text-bes-amber hidden font-bold sm:inline">
        Programm Ansehen
      </span>
    </motion.button>
  );
};

export default GermanProgramButton;
