"use client";

import { motion } from "framer-motion";

interface AnimatedButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  className?: string;
  isPrimary?: boolean;
}

const AnimatedButton = ({ href, icon, text, className = "", isPrimary = true }: AnimatedButtonProps) => {
  return (
    <motion.a
      href={href}
      initial={isPrimary ? { boxShadow: "0px 0px 0px rgba(183, 37, 232, 0)" } : undefined}
      animate={
        isPrimary
          ? {
              boxShadow: [
                "0px 0px 0px rgba(183, 37, 232, 0)",
                "0px 0px 18px rgba(183, 37, 232, 0.9)",
                "0px 0px 8px rgba(183, 37, 232, 0.6)",
                "0px 0px 0px rgba(183, 37, 232, 0)",
              ],
            }
          : undefined
      }
      transition={
        isPrimary
          ? {
              boxShadow: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }
          : undefined
      }
      whileHover={{
        scale: 1.05,
        boxShadow: isPrimary ? "0px 0px 25px rgba(183, 37, 232, 1.0)" : undefined,
      }}
      whileTap={{ scale: 0.95 }}
      className={`group ${
        isPrimary
          ? "bg-bes-amber hover:bg-opacity-90 text-bes-red border-bes-purple border-3"
          : "bg-white hover:bg-opacity-90 text-bes-red border border-bes-amber"
      } flex items-center rounded-full px-5 py-2 font-bold shadow-md transition-all ${className}`}
    >
      <motion.div
        className="flex items-center"
        initial={{ x: 0 }}
        whileHover={{ x: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
        {text}
      </motion.div>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 h-4 w-4 transition-all group-hover:ml-3"
        viewBox="0 0 20 20"
        fill="currentColor"
        initial={{ x: 0 }}
        animate={{ x: [0, 3, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.5,
          repeatDelay: 2,
        }}
      >
        <path
          fillRule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </motion.svg>
    </motion.a>
  );
};

export default AnimatedButton;
