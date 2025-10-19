"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";
import { useTranslations } from "next-intl";
import { AnimatedLogo, BannerText, CloseButton } from "@/components/ui";

const PostFestivalBanner = () => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();
  const t = useTranslations("Banners.postFestival");

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsBannerVisible]);

  if (!isBannerVisible) return null;

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
        <CloseButton
          onClose={() => setIsBannerVisible(false)}
          ariaLabel={t("closeLabel")}
        />

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-between space-y-2 lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:space-x-6 lg:py-1"
        >
          <div className="flex items-center">
            {/* Logo */}
            <AnimatedLogo
              src="/bes-logo-habano.png"
              alt="Berlin En Salsa Logo"
            />

            {/* Text content */}
            <BannerText title={t("title")} description={t("description")} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostFestivalBanner;
