"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";

const DarkOverlay = () => {
  const { isBannerVisible } = useBannerContext();

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-opacity-50 fixed inset-0 z-40 bg-black backdrop-blur-sm"
          style={{ pointerEvents: "none" }} // This allows interaction with content underneath
        />
      )}
    </AnimatePresence>
  );
};

export default DarkOverlay;
