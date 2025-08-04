"use client";

import { motion } from "framer-motion";

interface AnimatedLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const AnimatedLogo = ({
  src = "/bes-logo-habano.png",
  alt = "Berlin En Salsa Logo",
  className = "h-15 w-auto",
}: AnimatedLogoProps) => {
  return (
    <motion.div
      animate={{ rotate: [0, 10, -10, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
      className="mr-4 hidden lg:block"
    >
      <img src={src} alt={alt} className={className} />
    </motion.div>
  );
};

export default AnimatedLogo;
