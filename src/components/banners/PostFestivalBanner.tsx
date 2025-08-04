"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";
import { AnimatedButton, AnimatedLogo, BannerText, CloseButton } from "@/components/ui";

const PostFestivalBanner = () => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsBannerVisible]);

  if (!isBannerVisible) return null;
  
  // Gallery button icon
  const galleryIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-1.5 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      }}
      className="bg-bes-red bg-opacity-95 fixed top-0 right-0 left-0 z-50 px-4 py-3 text-center shadow-lg backdrop-blur-sm"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Close button */}
        <CloseButton onClose={() => setIsBannerVisible(false)} ariaLabel="Cerrar anuncio" />

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-between space-y-2 lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:space-x-6 lg:py-1"
        >
          <div className="flex items-center">
            {/* Logo */}
            <AnimatedLogo src="/bes-logo-habano.png" alt="Berlin En Salsa Logo" />
            
            {/* Text content */}
            <BannerText 
              title="¡Gracias por ser parte de Berlin En Salsa!"
              description="¡Nos vemos en la próxima edición! Mantente al tanto de nuestras próximas actividades."
            />
          </div>
          
          {/* Gallery button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-3 flex items-center justify-center lg:mt-0"
          >
            <AnimatedButton 
              href="/gallery"
              icon={galleryIcon}
              text="Ver galería"
              isPrimary={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostFestivalBanner;
