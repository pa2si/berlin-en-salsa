"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CloseButtonProps {
  onClose: () => void;
  ariaLabel?: string;
}

const CloseButton = ({ onClose, ariaLabel = "Cerrar" }: CloseButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -3, 3, 0],
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClose}
      className="bg-bes-amber hover:bg-opacity-95 group text-bes-red absolute -right-1 -bottom-1 flex items-center space-x-1 rounded-full px-2 py-1.5 font-bold transition-all sm:right-0 sm:bottom-0 sm:px-3 sm:py-2"
      aria-label={ariaLabel}
    >
      <span className="hidden sm:inline">Close</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 sm:h-5 sm:w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </motion.svg>
    </motion.button>
  );
};

export default CloseButton;
